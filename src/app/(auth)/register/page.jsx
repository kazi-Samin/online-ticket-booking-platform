
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaArrowRight, FaTicketAlt } from 'react-icons/fa';
import { authClient } from "@/lib/auth-client"; // আপনার কারেক্ট ক্লায়েন্ট পাথ

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // 🚀 Fixed: authClient.signUp.email ব্যবহার করা হয়েছে
      const { data, error } = await authClient.signUp.email({
        email: email,
        password: password,
        name: name,
        callbackUrl: "/all-tickets" // সফলভাবে অ্যাকাউন্ট খোলার পর সরাসরি টিকেট পেজে নিয়ে যাবে
      });

      if (error) {
        setErrorMsg(error.message || "Failed to register account. Please try again.");
      } else {
        router.push('/all-tickets');
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setErrorMsg("An unexpected system error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // গুগল সাইন-আপ সোশ্যাল গেটওয়ে ট্রিগার
  const handleGoogleSignUp = async () => {
    try {
      // 🚀 Fixed: authClient.signIn.social ব্যবহার করা হয়েছে
      await authClient.signIn.social({
        provider: "google",
        callbackUrl: "/all-tickets"
      });
    } catch (err) {
      console.error("Google auth registration error:", err);
    }
  };

  return (
    <div className="w-full min-h-screen bg-zinc-50 dark:bg-zinc-950 flex relative overflow-hidden transition-colors duration-300">
      
      {/* 🏙️ বাম পাশের প্রফেশনাল পিকচার এবং ব্র্যান্ডিং সেকশন */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-zinc-100 dark:bg-zinc-900 items-center justify-center p-12 overflow-hidden border-r border-zinc-200 dark:border-zinc-800/50">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800" 
            alt="Journey Navigation" 
            className="w-full h-full object-cover opacity-25 dark:opacity-20 object-center block"
          />
        </div>
        {/* থিম অনুযায়ী গ্রেডিয়েন্ট অ্যাডজাস্টমেন্ট */}
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/40 via-zinc-100/70 to-zinc-50/90 dark:from-indigo-950/80 dark:via-zinc-900/60 dark:to-zinc-950/95" />
        
        <div className="relative z-10 max-w-md space-y-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-600/30">
            <FaTicketAlt className="h-6 w-6 transform -rotate-12" />
          </div>
          <blockquote className="space-y-4">
            <p className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight leading-tight">
              Create your global account and join thousands of travelers across the country.
            </p>
            <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase">
              Centralized Ticket Core Terminal
            </div>
          </blockquote>
        </div>
      </div>

      {/* 📝 ডান পাশের রেজিস্ট্রেশন ফর্ম সেকশন */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-16 relative z-10 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
        <div className="w-full max-w-md space-y-8">
          
          <div>
            <h2 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
              Get <span className="text-indigo-600 dark:text-indigo-400">Started</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-2 font-medium">Create a secure unified user account to start planning journeys</p>
          </div>

          {/* ডাটাবেজ বা ভ্যালিডেশন এরর মেসেজ框 */}
          {errorMsg && (
            <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl text-sm font-semibold text-red-600 dark:text-red-400">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest pl-0.5">Full Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400 dark:text-zinc-500"><FaUser /></span>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe" 
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-11 pr-4 py-4 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm transition-all text-sm font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest pl-0.5">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400 dark:text-zinc-500"><FaEnvelope /></span>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com" 
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-11 pr-4 py-4 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm transition-all text-sm font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest pl-0.5">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400 dark:text-zinc-500"><FaLock /></span>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-11 pr-4 py-4 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm transition-all text-sm font-medium"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white font-extrabold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/10 active:scale-[0.99] text-sm tracking-wide"
            >
              {loading ? "Registering System Account..." : "Register Account"}
              {!loading && <FaArrowRight className="text-xs" />}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200 dark:border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-wider">
              <span className="bg-zinc-50 dark:bg-zinc-950 px-4 text-zinc-400 dark:text-zinc-500 font-bold">Or continue with</span>
            </div>
          </div>

          <button 
            type="button" 
            onClick={handleGoogleSignUp}
            className="w-full bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-200 font-bold py-3.5 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center gap-3 text-sm active:scale-[0.99]"
          >
            <FaGoogle className="text-red-500" />
            Sign up with Google
          </button>

          <p className="text-center text-sm text-zinc-600 dark:text-zinc-400 font-medium pt-2">
            Already have an account? <Link href="/login" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">Sign In</Link>
          </p>
          
        </div>
      </div>

    </div>
  );
}