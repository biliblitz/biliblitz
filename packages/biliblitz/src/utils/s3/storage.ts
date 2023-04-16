import path from "path";
import { MOUNT_POINT } from "../envs";
import * as fs from "fs/promises";

function resolvePath(filepath: string) {
  if (MOUNT_POINT.endsWith("/")) {
    return MOUNT_POINT.slice(0, -1) + filepath;
  } else {
    return MOUNT_POINT + filepath;
  }
}

export async function s3_writeFile(_filepath: string, file: Buffer) {
  const filepath = resolvePath(_filepath);
  const dirname = path.dirname(filepath);
  await fs.mkdir(dirname, { recursive: true });
  return await fs.writeFile(filepath, file);
}

export async function s3_readFile(_filepath: string, signal: AbortSignal) {
  return await fs.readFile(_filepath, { signal });
}
