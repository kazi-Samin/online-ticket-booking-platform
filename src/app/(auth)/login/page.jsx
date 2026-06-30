
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaEnvelope, FaLock, FaGoogle, FaArrowRight, FaTicketAlt } from 'react-icons/fa';
import { authClient } from "@/lib/auth-client"; // আপনার কারেক্ট ক্লায়েন্ট পাথ

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // 🚀 Fixed: authClient.signIn.email ব্যবহার করা হয়েছে
      const { data, error } = await authClient.signIn.email({
        email: email,
        password: password,
        callbackUrl: "/all-tickets" // সাকসেসফুল হলে সোজা টিকেট পেজে পাঠাবে
      });

      if (error) {
        setErrorMsg(error.message || "Invalid email or password.");
      } else {
        router.push('/all-tickets');
      }
    } catch (error) {
      console.error("Login crashed:", error);
      setErrorMsg("An unexpected system error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // গুগল দিয়ে সাইন-ইন হ্যান্ডলার
  const handleGoogleLogin = async () => {
    try {
      // 🚀 Fixed: authClient.signIn.social ব্যবহার করা হয়েছে
      await authClient.signIn.social({
        provider: "google",
        callbackUrl: "/all-tickets"
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 flex relative overflow-hidden transition-colors duration-300">
      
      {/* বাম পাশের প্রফেশনাল পিকচার এবং ব্র্যান্ডিং সেকশন */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-100 dark:bg-slate-900 items-center justify-center p-12 overflow-hidden border-r border-slate-200 dark:border-slate-800/50">
        <img 
          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800" 
          alt="Terminal" 
          className="absolute inset-0 w-full h-full object-cover opacity-25 dark:opacity-20 object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-teal-900/40 via-slate-100/70 to-slate-50/90 dark:from-teal-950/80 dark:via-slate-900/60 dark:to-slate-950/90" />
        
        <div className="relative z-10 max-w-md space-y-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-xl shadow-teal-600/30">
            <FaTicketAlt className="h-6 w-6 transform -rotate-12" />
          </div>
          <blockquote className="space-y-4">
            <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              The smartest gateway to book transport tickets seamlessly across Bangladesh.
            </p>
            <footer className="text-sm font-semibold text-teal-600 dark:text-teal-400 tracking-wider uppercase">
              Centralized Ticket Core Terminal
            </footer>
          </blockquote>
        </div>
      </div>

      {/* ডান পাশের লগইন ফর্ম সেকশন */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-16 relative z-10 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <div className="w-full max-w-md space-y-8">
          
          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Welcome <span className="text-teal-600 dark:text-teal-400">Back</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 font-medium">Sign in to your account to manage your ticket bookings</p>
          </div>

          {/* এরর মেসেজ বক্স */}
          {errorMsg && (
            <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl text-sm font-semibold text-red-600 dark:text-red-400">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest pl-0.5">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500"><FaEnvelope /></span>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com" 
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-11 pr-4 py-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 shadow-sm transition-all text-sm font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center pl-0.5">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Password</label>
                <a href="#" className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline">Forgot?</a>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500"><FaLock /></span>
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-11 pr-12 py-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 shadow-sm transition-all text-sm font-medium"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 dark:text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 focus:outline-none"
                >
                  {showPassword ? (
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"></path></svg>
                  ) : (
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></svg>
                  )}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-500 disabled:bg-teal-600/50 text-white font-extrabold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-teal-600/10 active:scale-[0.99] text-sm tracking-wide"
            >
              {loading ? "Verifying Credentials..." : "Sign In Account"}
              {!loading && <FaArrowRight className="text-xs" />}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-wider">
              <span className="bg-slate-50 dark:bg-slate-950 px-4 text-slate-400 dark:text-slate-500 font-bold">Or continue with</span>
            </div>
          </div>

          <button 
            onClick={handleGoogleLogin}
            className="w-full bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-bold py-3.5 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center gap-3 text-sm active:scale-[0.99]"
          >
            <FaGoogle className="text-red-500" />
            Sign in with Google
          </button>

          <p className="text-center text-sm text-slate-600 dark:text-slate-400 font-medium pt-2">
            New to the platform? <Link href="/register" className="text-teal-600 dark:text-teal-400 font-bold hover:underline">Create an account</Link>
          </p>
          
        </div>
      </div>

    </div>
  );
}