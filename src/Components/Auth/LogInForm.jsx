
"use client";

import React, { useState } from "react";
import { Form, TextField, Label, Input, FieldError, Button } from "@heroui/react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function LogInForm() {
  const [isVisible, setIsVisible] = useState(false);

  // 👁️ Password Visibility Swapper Engine
  const toggleVisibility = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(!isVisible);
  };

  // Credentials Submission Flow
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    // 🚀 Fixed: callbackUrl সিনট্যাক্স সংশোধন করা হয়েছে
    const { data, error } = await authClient.signIn.email({
      email: payload.email,
      password: payload.password,
      callbackUrl: "/",
      rememberMe: false
    });

    if (data) {
      toast.success('Successfully Login');
    }
    if (error) {
      toast.error(error.message);
    }
  };

  // Google Authentication Stream
  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackUrl: "/",
      });
      toast.success('Redirecting to Google Sign-In... 🚀');
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error(error?.message || "Something went wrong during Google Sign-In");
    }
  };

  // 🎭 Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-slate-950 p-4 sm:p-6 lg:p-8 transition-colors duration-200">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 lg:grid-cols-12 w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-zinc-100 dark:border-slate-800/60 min-h-[600px] transition-colors duration-200"
      >
        {/* Left Column: Visual Branding Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5 bg-[#1E3A8A] dark:bg-slate-950 p-8 lg:p-12 flex flex-col justify-between text-white relative overflow-hidden transition-colors duration-200"
        >
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-800 dark:bg-indigo-900 rounded-full blur-2xl opacity-40"></div>
          <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-[#FF6B35] rounded-full blur-3xl opacity-20"></div>

          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Ticket<span className="text-[#FF6B35]">Bari</span>
            </h2>
            <p className="text-indigo-200 dark:text-indigo-300 text-sm mt-2">Your Trusted Journey Companion</p>
          </div>

          <div className="my-8 lg:my-0 space-y-4">
            <h3 className="text-2xl font-bold leading-snug">
              Welcome Back! <br />
              Ready to Explore?
            </h3>
            <p className="text-indigo-100 dark:text-slate-300 text-xs leading-relaxed max-w-xs">
              Log in to access your secured ticket management portal, dashboard history, and personalized preferences effortlessly.
            </p>
          </div>

          <div className="text-xs text-indigo-300 dark:text-slate-500">
            &copy; 2026 TicketBari. All rights reserved.
          </div>
        </motion.div>

        {/* Right Column: Interactive Form */}
        <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-center bg-white dark:bg-slate-900 transition-colors duration-200">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full">
            <motion.div variants={itemVariants} className="mb-6">
              <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-slate-100">Sign In</h1>
              <p className="text-sm text-zinc-500 dark:text-slate-400 mt-1">Access secure ticket booking parameters</p>
            </motion.div>

            <Form className="flex flex-col gap-4 w-full" onSubmit={handleLoginSubmit}>
              {/* Email */}
              <motion.div variants={itemVariants} className="w-full">
                <TextField
                  isRequired
                  name="email"
                  type="email"
                  className="flex flex-col gap-1 w-full"
                  validate={(value) => {
                    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                      return "Please enter a valid email address";
                    }
                    return null;
                  }}
                >
                  <Label className="text-sm font-semibold text-zinc-700 dark:text-slate-300">Email Address</Label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3 h-4 w-4 text-zinc-400 dark:text-slate-500 pointer-events-none" />
                    <Input
                      placeholder="you@example.com"
                      className="w-full h-11 pl-10 pr-3 rounded-xl border border-zinc-200 dark:border-slate-800 bg-transparent focus:border-indigo-500 dark:focus:border-blue-500 text-zinc-800 dark:text-slate-100 text-sm outline-none transition-colors"
                    />
                  </div>
                  <FieldError className="text-xs text-red-500 mt-0.5" />
                </TextField>
              </motion.div>

              {/* Password */}
              <motion.div variants={itemVariants} className="w-full">
                <TextField isRequired name="password" type={isVisible ? "text" : "password"} className="flex flex-col gap-1 w-full">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-semibold text-zinc-700 dark:text-slate-300">Password</Label>
                    <span className="text-xs font-bold text-[#1E3A8A] dark:text-blue-400 hover:underline cursor-pointer">
                      Forgot?
                    </span>
                  </div>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-3 h-4 w-4 text-zinc-400 dark:text-slate-500 pointer-events-none" />
                    <Input
                      placeholder="Enter your password"
                      className="w-full h-11 pl-10 pr-10 rounded-xl border border-zinc-200 dark:border-slate-800 bg-transparent focus:border-indigo-500 dark:focus:border-blue-500 text-zinc-800 dark:text-slate-100 text-sm outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={toggleVisibility}
                      className="absolute right-3 p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-slate-800 transition-colors focus:outline-none z-20"
                    >
                      {isVisible ? <EyeOff className="h-4 w-4 text-zinc-400 dark:text-slate-500" /> : <Eye className="h-4 w-4 text-zinc-400 dark:text-slate-500" />}
                    </button>
                  </div>
                  <FieldError className="text-xs text-red-500 mt-0.5" />
                </TextField>
              </motion.div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 mt-4">
                <motion.div variants={itemVariants}>
                  <Button
                    type="submit"
                    className="w-full bg-[#1E3A8A] dark:bg-blue-600 hover:bg-indigo-900 dark:hover:bg-blue-700 text-white font-bold h-11 rounded-xl shadow-md active:scale-[0.98] transition-all"
                  >
                    Log In
                  </Button>
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-center my-2">
                  <div className="flex-1 border-t border-zinc-200 dark:border-slate-800"></div>
                  <span className="px-3 text-xs text-zinc-400 dark:text-slate-500 uppercase font-medium">Or continue with</span>
                  <div className="flex-1 border-t border-zinc-200 dark:border-slate-800"></div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full flex items-center justify-center space-x-2.5 h-11 border border-zinc-200 dark:border-slate-800 hover:bg-zinc-50 dark:hover:bg-slate-800/50 rounded-xl text-sm font-bold text-zinc-700 dark:text-slate-300 active:scale-[0.98] transition-all bg-white dark:bg-slate-900"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                      <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.11C18.422 1.242 15.583 0 12.24 0 5.58 0 0 5.37 0 12s5.58 12 12.24 12c6.96 0 11.57-4.83 11.57-11.79 0-.795-.085-1.4-.195-1.925H12.24z" />
                    </svg>
                    <span>Continue with Google</span>
                  </button>
                </motion.div>

                <motion.p variants={itemVariants} className="text-xs text-center text-zinc-500 dark:text-slate-400 mt-2">
                  Don't have an account yet?{" "}
                  <motion.span className="inline-block" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href="/register" className="text-[#FF6B35] font-bold hover:underline">
                      Sign Up
                    </Link>
                  </motion.span>
                </motion.p>
              </div>
            </Form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}