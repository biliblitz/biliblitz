import { $ } from "zx";
import { Ffprobe } from "./types";

export async function ffprobe(file: string) {
  const result =
    await $`ffprobe -v quiet -print_format json -show_streams -show_chapters -show_format ${file}`.quiet();
  return JSON.parse(result.stdout) as Ffprobe;
}
