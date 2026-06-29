
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

// ড্রাইভার লেভেলে অপশনস যোগ করা হলো
const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db('online-ticket-booking-platform');

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: mongodbAdapter(db), // অ্যাডাপ্টারের ভেতরের কনফিগারেশন স্ট্যান্ডার্ড রাখা হলো
  emailAndPassword: {
    enabled: true,
  }
});