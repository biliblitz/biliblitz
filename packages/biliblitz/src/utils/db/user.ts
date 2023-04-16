import { MongoServerError, ObjectId, WithId } from "mongodb";
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

/**
 * Register user
 *
 * @param username username
 * @param password password
 * @returns Created user
 * @throws {Error} if faced any problem
 */
export async function userRegister(username: string, password: string) {
  try {
    const result = await collUser.insertOne({ username, password });

    if (!result.acknowledged) {
      throw new Error("Database Error");
    }

    const user = await getUserById(result.insertedId);
    if (!user) {
      throw new Error("unreachable");
    }

    return serializeUser(user);
  } catch (e) {
    if (e instanceof MongoServerError && e.code === 11000) {
      throw new Error("Username was taken");
    }
    throw e;
  }
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
