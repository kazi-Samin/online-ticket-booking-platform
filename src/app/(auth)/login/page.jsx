
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaEnvelope, FaLock, FaGoogle, FaArrowRight, FaTicketAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
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
                  className="absolute inset-y-0 right-3 flex items-center justify-center my-auto h-10 w-10 rounded-xl text-slate-400 dark:text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-[18px] w-[18px]" />
                  ) : (
                    <FaEye className="h-[18px] w-[18px]" />
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