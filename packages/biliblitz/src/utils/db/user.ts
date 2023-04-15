import type { ObjectId } from "mongodb";
import { db } from "../db";

export interface User {
  username: string;
  password: string;
}

const collUser = db.collection<User>("user");

collUser.createIndexes([
  {
    key: { username: 1 },
    unique: true,
  },
]);

export function userLoginByUsername(username: string, password: string) {
  return collUser.findOne({ username, password });
}

export function userLoginByEmail(email: string, password: string) {
  return collUser.findOne({ email, password });
}

export function userRegister(username: string, password: string) {
  return collUser.insertOne({ username, password });
}

export function getUserById(userId: ObjectId) {
  return collUser.findOne({ _id: userId });
}
