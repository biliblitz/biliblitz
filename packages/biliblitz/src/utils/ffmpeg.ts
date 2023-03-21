import { exec as _exec } from "child_process";

import type { File } from "undici";
import { randomUUID } from "crypto";
import { tmpdir } from "os";
import path from "path";
import { mkdir, rm, writeFile } from "fs/promises";
import { promisify } from "util";
import { accessSync, constants, mkdirSync } from "fs";
import type { SubtitleSource, VideoSource } from "./db/video";
import { MOUNT_POINT } from "./envs";

const exec = promisify(_exec);

export type Stream = {
  index: number;
  codec_type: "video" | "audio" | "subtitle" | "attachment";
  codec_long_name: string;
  codec_name: string;
  codec_tag: string;
  codec_tag_string: string;
  tags: Record<string, string>;
  [key: string]: any;
};

export type Chapter = {
  id: number;
  time_base: string;
  start: number;
  start_time: string;
  end: number;
  end_time: string;
  tags: Record<string, string>;
};

export type Format = {
  filename: string;
  nb_streams: number;
  nb_programs: number;
  format_name: string;
  format_long_name: string;
  start_time: string;
  duration: string;
  size: string;
  bit_rate: string;
  probe_score: number;
  tags: Record<string, string>;
};

export type Ffprobe = {
  streams: Stream[];
  chapters: Chapter[];
  format: Format;
};

async function ffprobe(filename: string) {
  return new Promise<Ffprobe>((resolve, reject) => {
    _exec(
      `ffprobe -v quiet -print_format json -show_streams -show_chapters -show_format ${filename}`,
      (err, stdout) => {
        if (err) {
          return reject(err);
        }
        try {
          resolve(JSON.parse(stdout) as Ffprobe);
        } catch (e) {
          reject(e);
        }
      }
    );
  });
}

accessSync(MOUNT_POINT, constants.R_OK | constants.W_OK);

const tmp = path.join(tmpdir(), "biliblitz-upload");
mkdirSync(tmp, { recursive: true });

export async function processVideo(file: File) {
  const uuid = randomUUID();
  const tmpfile = path.join(tmp, uuid);
  await writeFile(tmpfile, Buffer.from(await file.arrayBuffer()));
  const destdir = path.join(MOUNT_POINT, uuid);
  await mkdir(destdir, { recursive: true });

  const warnings: string[] = [];

  try {
    let container = "";
    let mimetype = "";
    switch (file.type) {
      case "video/x-matroska":
      case "video/x-flv":
        /* eslint-disable no-fallthrough */
        warnings.push("[warning] Convert file into MP4 format");
      case "video/mp4": {
        container = "mp4";
        mimetype = "video/mp4";
        break;
      }
      case "video/ogg": {
        container = "ogv";
        mimetype = "video/ogg";
        break;
      }
      case "video/webm": {
        container = "webm";
        mimetype = "video/webm";
        break;
      }
      default:
        throw new Error(
          "Unsupported Video Format: only FLV/MP4/MKV/WebM supported"
        );
    }

    const probe = await ffprobe(tmpfile);

    const dumpAttachmentParams: string[] = [];
    const ffmpegParams: string[] = [];
    const videoParams: string[] = [];
    const audioParams: string[] = [];

    // video
    const videos = probe.streams.filter(
      (value) => value.codec_type === "video"
    );
    if (videos.length > 1) {
      throw new Error(
        "Multiply video tracks detected, please use single video track."
      );
    }
    const video = videos.at(0);
    if (!video) {
      throw new Error("No video track detected");
    }
    switch (video.codec_name) {
      case "hevc": {
        warnings.push("[warning] HEVC is not widely supported.");
        break;
      }
      case "av1": {
        warnings.push("[warning] AV1 maybe very slow in some situations");
        break;
      }
      case "theora":
      case "h264":
      case "vp8":
      case "vp9":
        break;
      default: {
        throw new Error(`Unknown video codec: ${video.codec_name}`);
      }
    }

    const videoname = `video.${container}`;
    const destfile = path.join(destdir, videoname);
    videoParams.push(`-map 0:${video.index} -c:v copy`);

    // audio
    const audios = probe.streams.filter(
      (value) => value.codec_type === "audio"
    );
    if (audios.length > 1) {
      throw new Error(
        "Multiply audio tracks detected, please leave single audio track."
      );
    }
    const audio = audios.at(0);
    if (!audio) {
      warnings.push("[warning] No audio track detected.");
    } else {
      switch (audio.codec_name) {
        case "aac":
        case "flac":
        case "mp3":
        case "opus":
        case "vorbis": {
          break;
        }
        default: {
          throw new Error(`Unknown audio codec: ${audio.codec_name}`);
        }
      }
      audioParams.push(`-map 0:${audio.index} -c:a copy`);
    }

    // merge video and audio
    ffmpegParams.push(
      [...videoParams, ...audioParams, `"${destfile}"`].join(" ")
    );

    // fonts
    const attachments = probe.streams.filter(
      (value) => value.codec_type === "attachment"
    );
    const fonts: string[] = [];
    for (const attachment of attachments) {
      if (
        attachment.codec_name === "ttf" ||
        attachment.codec_name === "otf" ||
        attachment.codec_name === "woff" ||
        attachment.codec_name === "woff2"
      ) {
        const source = `font.${attachment.index}.${attachment.codec_name}`;
        fonts.push(`/source/${uuid}/${source}`);
        const output = path.join(destdir, source);
        dumpAttachmentParams.push(
          `-dump_attachment:${attachment.index}`,
          `"${output}"`
        );
        warnings.push(
          `Attachment(${attachment.codec_name}): ${attachment.tags.filename}`
        );
      } else {
        warnings.push(
          `Ignoring non-font attachment(${attachment.codec_name}): ${attachment.tags.filename}`
        );
      }
    }

    // subtitles
    const subtitles: SubtitleSource[] = [];
    probe.streams
      .filter((value) => value.codec_type === "subtitle")
      .forEach((subtitle) => {
        switch (subtitle.codec_name) {
          case "srt":
          case "webvtt":
          case "ass": {
            break;
          }
          default: {
            warnings.push(
              `[warning] Unknown subtitle codec: ${subtitle.codec_name}`
            );
            return;
          }
        }
        const title = subtitle.tags.title ?? `Subtitle #${subtitle.index}`;
        const language = subtitle.tags.language ?? "C";
        const ext = subtitle.codec_name.slice(-3);
        const source = `${language}.${subtitle.index}.${ext}`;
        const output = path.join(destdir, source);
        ffmpegParams.push(`-map 0:${subtitle.index} -c copy "${output}"`);
        warnings.push(`Subtitle(${language}): ${title}`);
        subtitles.push({
          title,
          language,
          source: `/source/${uuid}/${source}`,
          fonts,
          type: subtitle.codec_name,
        });
      });

    const command = [
      "ffmpeg -y",
      ...dumpAttachmentParams,
      `-i "${tmpfile}"`,
      ...ffmpegParams,
    ].join(" ");

    console.log(`$ ${command}`);
    await exec(command);

    const thumbnail = "thumbnail.jpg";
    await generateThumbnails(destfile, path.join(destdir, thumbnail));

    const source: VideoSource = {
      mimetype: mimetype,
      source: `/source/${uuid}/${videoname}`,
      thumbnail: `/source/${uuid}/${thumbnail}`,
    };

    return {
      source,
      subtitles,
      warnings,
    };
  } catch (e) {
    await rm(destdir, { recursive: true, force: true });
    throw e;
  } finally {
    await rm(tmpfile);
  }
}

export async function generateThumbnails(video: string, target: string) {
  const tmpdir = path.join(tmp, randomUUID());
  await mkdir(tmpdir, { recursive: true });

  try {
    const { format } = await ffprobe(video);
    await exec(
      `ffmpeg -i "${video}" -f image2 -vf fps=100/${format.duration},scale=160:-1 "${tmpdir}/thumb%03d.jpg"`
    );
    await exec(`montage "${tmpdir}/*.jpg" -tile x1 -geometry 160x "${target}"`);
  } finally {
    await rm(tmpdir, { recursive: true, force: true });
  }
}
