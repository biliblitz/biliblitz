import { randomUUID } from "crypto";
import { ObjectId } from "mongodb";
import { db } from "../db";
import { getUserById } from "./user";

export interface Session {
  user: ObjectId;
  session: string;
  createdAt: Date;
}

const collSession = db.collection<Session>("session");

collSession.createIndexes([
  {
    key: { session: 1 },
    unique: true,
  },
]);

export async function issueSession(user: ObjectId) {
  const uuid = randomUUID();
  const result = await collSession.insertOne({
    user,
    session: uuid,
    createdAt: new Date(),
  });

  if (!result.acknowledged) {
    throw new Error("Failed to write on DB");
  }

  return uuid;
}

export async function checkSession(session?: string | null) {
  if (!session) return null;
  const sess = await collSession.findOne({ session });
  return sess && (await getUserById(sess.user));
}
