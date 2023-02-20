import { exec as _exec } from "child_process";

import type { File } from "undici";
import { randomUUID } from "crypto";
import { tmpdir } from "os";
import path from "path";
import { mkdir, rm, writeFile } from "fs/promises";
import { promisify } from "util";
import { mkdirSync } from "fs";

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

export type Ffprobe = {
  streams: Stream[];
  chapters: Chapter[];
};

export type Subtitle = {
  title: string;
  language: string;
  source: string;
  fonts: string[];
};

async function ffprobe(filename: string) {
  return new Promise<Ffprobe>((resolve, reject) => {
    _exec(
      `ffprobe -v quiet -print_format json -show_streams -show_chapters ${filename}`,
      (err, stdout, _) => {
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

// TODO
export const MOUNT_POINT = "/var/railgun";

const tmp = path.join(tmpdir(), "railgun-upload");
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
    switch (file.type) {
      case "video/mp4":
      case "video/x-flv":
      case "video/x-matroska": {
        container = "mp4";
        break;
      }
      case "video/ogg": {
        container = "ogv";
        break;
      }
      case "video/webm": {
        container = "webm";
        break;
      }
      default:
        throw new Error(
          "Unsupported container: only flv/mp4/mkv/webm supported"
        );
    }

    const probe = await ffprobe(tmpfile);

    const ffmpegPreParams: string[] = [];
    const ffmpegParams: string[] = [];

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

    const destfile = path.join(destdir, `video.${container}`);
    ffmpegParams.push("-map", `0:${video.index}`, "-c:v", "copy");

    // audio
    const audios = probe.streams.filter(
      (value) => value.codec_type === "audio"
    );
    if (audios.length > 1) {
      throw new Error(
        "Multiply audio tracks detected, please use single audio track."
      );
    }
    const audio = audios.at(0);
    if (!audio) {
      warnings.push("No audio track detected.");
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
      ffmpegParams.push("-map", `0:${audio.index}`, "-c:a", "copy");
    }

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
        const source = `font${attachment.index}.${attachment.codec_name}`;
        fonts.push(source);
        const output = path.join(destdir, source);
        ffmpegPreParams.push(
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

    const subttls: Subtitle[] = [];
    const subtitles = probe.streams.filter(
      (value) => value.codec_type === "subtitle"
    );
    for (const subtitle of subtitles) {
      const title = subtitle.tags.title ?? `Subtitle #${subtitle.index}`;
      const language = subtitle.tags.language ?? "C";
      const source = `${language}.${subtitle.index}.${subtitle.codec_name}`;
      const output = path.join(destdir, source);
      ffmpegPreParams.push(`-dump_attachment:${subtitle.index}`, `"${output}"`);
      subttls.push({ title, language, source, fonts });
      warnings.push(`Subtitle(${language}): ${title}`);
    }

    const command = [
      "ffmpeg -y",
      ...ffmpegPreParams,
      `-i "${tmpfile}"`,
      ...ffmpegParams,
      `"${destfile}"`,
    ].join(" ");

    console.log(`$ ${command}`);
    // await exec(command);

    return {
      source: destfile,
      subtitles: subttls,
      warnings,
    };
  } finally {
    await rm(tmpfile);
  }
}
