import { exec as _exec } from "child_process";
import { promisify } from "util";

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

export type FFProbe = {
  streams: Stream[];
  chapters: Chapter[];
};

export async function ffprobe(filename: string) {
  const { stdout } = await exec(
    `ffprobe -v quiet -print_format json -show_streams -show_chapters ${filename}`
  );
  return JSON.parse(stdout) as FFProbe;
}
