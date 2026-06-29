// import { auth } from "@/lib/auth"; // path to your auth file
// import { toNextJsHandler } from "better-auth/next-js";

// export const { POST, GET } = toNextJsHandler(auth);

// import { auth } from "@/lib/auth"; // উইন্ডোজ ও টার্বোপ্যাকের জন্য নিখুঁত গ্লোবাল পাথ
// import { toNextJsHandler } from "better-auth/next-js";

// const handler = toNextJsHandler(auth);

// export { handler as GET, handler as POST };
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);