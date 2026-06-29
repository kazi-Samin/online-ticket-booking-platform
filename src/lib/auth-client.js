// // import { createAuthClient } from "better-auth/react"

// // export const authClient = createAuthClient({
// //     baseURL: process.env.BETTER_AUTH_URL ,
// // })

// // export const { signIn, signUp, useSession, signOut } = authClient;  // () ছাড়া, এবং singOut না signOut

// 'use client'

// import { createAuthClient } from "better-auth/react"

// // Next.js-এর ক্লায়েন্ট সাইডে এনভায়রনমেন্ট ভ্যারিয়েবল অ্যাক্সেস করার জন্য 
// // NEXT_PUBLIC_ ব্যবহার করা বাধ্যতামূলক, যাতে ব্রাউজারে এটি undefined না আসে।
// export const authClient = createAuthClient({
//     baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL
// })

// // এক্সপোর্ট অবজেক্ট (বানান সংশোধন করে নিখুঁত করা হয়েছে)
// export const { 
//     signIn, 
//     signUp, 
//     useSession, 
//     signOut 
// } = authClient;
'use client'

import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000"
})