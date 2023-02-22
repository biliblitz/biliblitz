import { MongoClient } from "mongodb";
import { MONGO_DBNAME, MONGO_URL } from "./envs";

const client = new MongoClient(MONGO_URL);
const db = client.db(MONGO_DBNAME);

export { db };
