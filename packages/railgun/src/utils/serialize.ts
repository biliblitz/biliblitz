import { ObjectId } from "mongodb";

type SerializeId<T> = T extends ObjectId
  ? string
  : T extends Date
  ? Date
  : T extends {}
  ? { [K in keyof T]: SerializeId<T[K]> }
  : T;

export function serializeId<T>(object: T): SerializeId<T> {
  if (object instanceof ObjectId) {
    return object.toHexString() as SerializeId<T>;
  }
  if (Array.isArray(object)) {
    return object.map(serializeId) as SerializeId<T>;
  }
  if (typeof object === "object") {
    if (object instanceof Date) {
      return object as SerializeId<T>;
    }
    if (!object) {
      return object as SerializeId<T>;
    }
    return Object.fromEntries(
      Object.entries(object as any).map(([key, value]) => [
        key,
        serializeId(value),
      ])
    ) as SerializeId<T>;
  }
  return object as SerializeId<T>;
}
