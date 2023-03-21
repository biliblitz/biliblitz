import { config } from "dotenv";

config();

const ENV_PREFIX = "BILIBLITZ_";

function env(name: string) {
  const envname = ENV_PREFIX + name;
  const result = process.env[envname];
  if (!result) {
    throw new Error(`env ${envname} is empty`);
  }
  return result;
}

export const MONGO_URL = env("MONGO_URL");
export const MONGO_DBNAME = env("MONGO_DBNAME");
export const MOUNT_POINT = env("MOUNT_POINT");
