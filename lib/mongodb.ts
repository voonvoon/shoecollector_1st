import { MongoClient } from "mongodb";

if (!process.env.DATABASE_URL) {
  throw new Error("Please add your Mongo URI to .env.local");
}

const client = new MongoClient(process.env.DATABASE_URL);
const clientPromise = client.connect();

export default clientPromise;
