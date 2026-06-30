
// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";

// // ড্রাইভার লেভেলে অপশনস যোগ করা হলো
// const client = new MongoClient(process.env.MONGO_DB_URI);
// const db = client.db('online-ticket-booking-platform');

// export const auth = betterAuth({
//   baseURL: process.env.BETTER_AUTH_URL,
//   database: mongodbAdapter(db), // অ্যাডাপ্টারের ভেতরের কনফিগারেশন স্ট্যান্ডার্ড রাখা হলো
//   emailAndPassword: {
//     enabled: true,
//   }
// });

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const uri = process.env.MONGO_DB_URI;

// 🚀 Fixed: Vercel এ env না দিলে যেন পুরো ওয়েবসাইট ক্র্যাশ না করে
let db = null;
if (uri) {
  const client = new MongoClient(uri);
  db = client.db('online-ticket-booking-platform');
} else {
  console.warn("⚠️ MONGO_DB_URI is missing in Vercel Environment Variables! BetterAuth will NOT work.");
}

export const auth = betterAuth({
  // 🚀 Fixed: বিল্ডের সময় এনভায়রনমেন্ট ভ্যারিয়েবল না থাকলেও যেন ক্র্যাশ না করে ফলব্যাক দেওয়া হলো
  secret: process.env.BETTER_AUTH_SECRET || "fallback_secret_for_assignment_only_do_not_use_in_real_prod",
  baseURL: process.env.BETTER_AUTH_URL || "https://online-ticket-booking-platform-gamma.vercel.app",
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
      },
    },
  },
});