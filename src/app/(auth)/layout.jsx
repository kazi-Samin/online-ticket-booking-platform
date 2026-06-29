// import Navbar from "@/Components/Navbar";
// import { Inter } from "next/font/google";
// import "../globals.css";
// import { ToastContainer } from "react-toastify";

// const sansBody = Inter({
//   subsets: ["latin"],
//   variable: "--font-body",
// });

// const AuthLayout = ({ children }) => {
//   return (
//     // 💡 HTML/Body bad diye orignal layouts class direct div wrapper-e switch kora holo
//     <div className={`${sansBody.className} min-h-full antialiased bg-gray-50`}>

//       {/* Dynamic Navigation Header component */}
//       <Navbar />

//       {/* Main viewport grid layouts */}
//       <main className="container mx-auto bg-gray-50">
//         {children}
//       </main>

//       {/* Global Toast Alerts container */}
//       <ToastContainer position="top-center" />

//     </div>
//   );
// };

// export default AuthLayout;
import Navbar from "@/Components/Navbar";
import { Inter } from "next/font/google";
import "../globals.css";
import { ToastContainer } from "react-toastify";

const sansBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const AuthLayout = ({ children }) => {
  return (
    // এখানে bg-gray-50 বাদ দিয়ে গ্লোবাল থিম ফ্রেন্ডলি ক্লাস দেওয়া হয়েছে 
    <div className={`${sansBody.className} min-h-screen antialiased bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300 flex flex-col`}>

      {/* Dynamic Navigation Header component */}
      <Navbar />

      {/* এখানে container mx-auto এবং bg-gray-50 সম্পূর্ণ রিমুভ করা হয়েছে!
        w-full এবং flex-1 এর কারণে কন্টেন্ট এখন কোনো গ্যাপ ছাড়া পুরো স্ক্রিন জুড়ে জায়গা নিবে।
      */}
      <main className="w-full flex-1 flex flex-col">
        {children}
      </main>

      {/* Global Toast Alerts container */}
      <ToastContainer position="top-center" />

    </div>
  );
};

export default AuthLayout;