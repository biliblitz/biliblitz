import { ObjectId } from "mongodb";

export function assertObjectId(param: string | null) {
  return param?.length === 24 && ObjectId.isValid(param);
}
