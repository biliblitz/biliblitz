import type { ObjectId, WithId } from "mongodb";
import { db } from "../db";
import { assertAcknowledged, assertNotNull, assertNull } from "../assert";

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

/**
 * Login by username
 *
 * @param username username
 * @param password password
 * @returns Found user or null
 */
export async function userLoginByUsername(username: string, password: string) {
  return await collUser.findOne({ username, password });
}

/**
 * Login by email
 *
 * @param email email
 * @param password password
 * @returns Found user or null
 */
export async function userLoginByEmail(email: string, password: string) {
  return await collUser.findOne({ email, password });
}

/**
 * Register user
 *
 * @param username username
 * @param password password not hashed
 * @returns Created user
 */
export async function userRegister(username: string, password: string) {
  const olduser = await collUser.findOne({ username });
  assertNull(olduser, "Username was already taken");

  const result = await collUser.insertOne({ username, password });
  assertAcknowledged(result);

  const user = await collUser.findOne({ _id: result.insertedId });
  assertNotNull(user, "Should find inserted user", 500);

  return user;
}

export async function getUserById(userId: ObjectId) {
  return await collUser.findOne({ _id: userId });
}

export function serializeUser(user: WithId<User>) {
  return {
    _id: user._id.toHexString(),
    username: user.username,
  };
}
