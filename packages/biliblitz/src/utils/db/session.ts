import type { Cookie } from "@builder.io/qwik-city";
import { randomUUID } from "crypto";
import type { ObjectId } from "mongodb";
import { db } from "../db";
import { getUserById } from "./user";
import { assertAcknowledged } from "../assert";

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
  assertAcknowledged(result);

  return uuid;
}

export async function checkSession(cookie: Cookie) {
  const session = cookie.get("session")?.value;
  if (!session) return null;
  const sess = await collSession.findOne({ session });
  return sess && (await getUserById(sess.user));
}
