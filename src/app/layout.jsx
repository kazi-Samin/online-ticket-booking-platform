// import { Plus_Jakarta_Sans, Inter } from "next/font/google";
// import "./globals.css";
// import Providers from "@/Providers";



// const sansHeading = Plus_Jakarta_Sans({
//   subsets: ["latin"],
//   variable: "--font-heading",
// });

// const sansBody = Inter({
//   subsets: ["latin"],
//   variable: "--font-body",
// });

// export const metadata = {
//   title: "TicketBari",
//   description: "Online ticket booking platform",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html
//       lang="en" suppressHydrationWarning
//       className={`${sansBody.className}  h-full antialiased`}
//     >
//       <body className="min-h-full flex flex-col" suppressHydrationWarning={true}>
//         <Providers>
//           <main className="container mx-auto">
//             {children}
//           </main>
//         </Providers>

//       </body>
//     </html>
//   );
// }
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/Providers";

const sansHeading = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
});

const sansBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata = {
  title: "TicketBari",
  description: "Online ticket booking platform",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sansBody.className} h-full antialiased`}
    >
      {/* এখানে ডার্ক মোডে (dark:bg-zinc-950) এবং লাইট মোডে (bg-zinc-50) এর গ্লোবাল ব্যাকগ্রাউন্ড সেট করা হয়েছে।
        transition-colors duration-300 এর কারণে দিন/রাত মোড চেঞ্জ করলে পুরো স্ক্রিন জুড়ে খুব স্মুথ একটা অ্যানিমেশন হবে।
      */}
      <body 
        className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 transition-colors duration-300" 
        suppressHydrationWarning={true}
      >
        <Providers>
          {/* এখানে container mx-auto বাদ দিয়ে শুধু w-full দেওয়া হয়েছে, 
            যেন Hero Section বা Navbar পুরো স্ক্রিন জুড়ে ছড়াতে পারে।
            ভেতরের পেজগুলোতে প্রয়োজন মতো max-w-7xl বা container ইউজ করা যাবে।
          */}
          <main className="w-full flex-1 flex flex-col">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}