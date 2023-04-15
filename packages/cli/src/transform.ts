import { $, path } from "zx";
import { AudioStream, Ffprobe, VideoStream } from "./types";
import { readFile } from "fs/promises";
import inquirer from "inquirer";
import { Question } from "inquirer";
import { CheckboxQuestion } from "inquirer";

/**
 * Parse and generate variants for video
 */
export async function transform(file: string) {
  const folder = file + ".biliblitz";
  await $`[ -d ${folder} ] || mkdir -p ${folder}`;

  await $`[ -f ${folder}/ffprobe.json ] || ffprobe -v quiet -print_format json -show_streams -show_chapters -show_format ${file} > ${folder}/ffprobe.json`;

  const probe = JSON.parse(
    await readFile(`${folder}/ffprobe.json`, "utf8")
  ) as Ffprobe;

  const videoStreams = probe.streams.filter(
    (s): s is VideoStream => s.codec_type === "video"
  );
  const audioStreams = probe.streams.filter(
    (s): s is AudioStream => s.codec_type === "audio"
  );

  if (!videoStreams.length) {
    throw new Error("Must provide at least 1 video track");
  }

  if (!audioStreams.length) {
    throw new Error("Must provide at least 1 audio track");
  }

  let videoTrack = videoStreams[0];
  let audioTrack = audioStreams[0];

  // select video and audio track
  if (videoStreams.length > 1 || audioStreams.length > 1) {
    const choices = videoStreams.flatMap((video) => {
      const videoLang = video.tags.language || "unknown";
      const videoDesc = `${video.codec_name}[${videoLang}]#${video.index}`;
      return audioStreams.map((audio) => {
        const audioLang = audio.tags.language || "unknown";
        const audioDesc = `${audio.codec_name}[${audioLang}]#${audio.index}`;
        return {
          name: `${videoDesc}, ${audioDesc}`,
          value: [video, audio] as const,
        };
      });
    });

    const choice = await inquirer.prompt([
      {
        type: "list",
        name: "tracks",
        message: "Please select video and audio track",
        choices,
      },
    ]);

    [videoTrack, audioTrack] = choice.tracks;
  }

  const { codec: videoCodecs, bitrate: bitrates } = (await inquirer.prompt([
    {
      type: "checkbox",
      name: "codec",
      message: `Select target video codecs (from ${videoTrack.codec_name})`,
      choices: [{ name: "avc" }, { name: "hevc" }, { name: "vp9" }],
      validate(answer) {
        return answer.length > 0 || "You must choose at least one video codec.";
      },
    },
    {
      type: "checkbox",
      name: "bitrate",
      message: `Select target bitrate (origin ${probe.format.bit_rate})`,
      choices: [
        ["360p", "1200k", "128k"],
        ["480p", "2500k", "256k"],
        ["720p", "5000k", "320k"],
        ["1080p", "8000k", "320k"],
        ["1440p (2K)", "16000k", "320k"],
        ["2160p (4K)", "40000k", "320k"],
        ["4320p (8K)", "80000k", "320k"],
      ].map(([a, b, c]) => ({ name: `${a} (${b}, ${c})`, value: [a, b, c] })),
      validate(answer) {
        return answer.length > 0 || "You must choose at least one bitrate.";
      },
    },
  ])) as { codec: string[]; bitrate: [string, string, string][] };
  const audioCodecs = ["aac"];

  for (const videoCodec of videoCodecs) {
    for (const audioCodec of audioCodecs) {
      for (const [resolution, videoBitrate, audioBitrate] of bitrates) {
        const outfile = path.join(
          folder,
          [
            videoTrack.index,
            videoCodec,
            audioTrack.index,
            audioCodec,
            resolution.split(" ")[0],
          ].join("_") + ".mp4"
        );

        await $`ffmpeg -hwaccel auto -i ${file} -map 0:${videoTrack.index} -map 0:${audioTrack.index} -c:v ${videoCodec} -c:a ${audioCodec} -b:v ${videoBitrate} -b:a ${audioBitrate} ${outfile}`;
      }
    }
  }
}
