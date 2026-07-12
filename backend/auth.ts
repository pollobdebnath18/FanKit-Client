import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error("MONGODB_URI is not defined.");
}

const client = new MongoClient(mongoUri);
const db = client.db("fankit");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
  },
  secret: process.env.BETTER_AUTH_SECRET || "dev-secret-change-me",
  baseURL: process.env.BETTER_AUTH_BASE_URL || "http://localhost:3000",
});
