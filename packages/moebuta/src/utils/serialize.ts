import { ObjectId } from "mongodb";

type Serialize<T> = { [K in keyof T]: T[K] extends ObjectId ? string : T[K] };

export function serializeObject<T>(obj: T): Serialize<T> {
  if (!obj) throw new Error("Serialize null");
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      value instanceof ObjectId ? value.toHexString() : value,
    ])
  ) as Serialize<T>;
}
