'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, ArrowLeft, Lock, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 transition-colors duration-300 relative overflow-hidden">
      {/* ব্যাকগ্রাউন্ড ডেকোরেটিভ গ্লো */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-96 w-96 bg-red-500/5 dark:bg-red-500/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 h-72 w-72 bg-blue-500/5 dark:bg-blue-500/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md text-center z-10">

        {/* 🛡️ অ্যানিমেটেড আইকন সেকশন */}
        <div className="relative inline-flex items-center justify-center mb-8">
          {/* আউটার পালস রিং */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.2, 0.4] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute h-24 w-24 bg-red-500/10 dark:bg-red-500/5 rounded-3xl"
          />

          {/* মেইন আইকন কন্টেনার */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative h-16 w-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-center shadow-md text-red-500 dark:text-red-400"
          >
            <ShieldAlert className="h-8 w-8" />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute -top-1 -right-1 bg-slate-950 dark:bg-slate-100 text-white dark:text-slate-950 p-1 rounded-lg border border-slate-800 dark:border-slate-200"
            >
              <Lock className="h-3 w-3" />
            </motion.div>
          </motion.div>
        </div>

        {/* 📝 টেক্সট কন্টেন্ট */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="space-y-3"
        >
          <span className="text-[11px] font-black text-red-500 dark:text-red-400 uppercase tracking-widest bg-red-50 dark:bg-red-500/10 px-3 py-1 rounded-full border border-red-100 dark:border-red-500/10">
            Error Code: 403 Forbidden
          </span>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 dark:text-slate-100 pt-2">
            Access Unauthorized
          </h1>

          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium max-w-sm mx-auto leading-relaxed">
            You do not have the required permissions to view this secure directory. Please verify your account credentials or contact administration.
          </p>
        </motion.div>

        {/* 🔘 অ্যাকশন বাটন প্যানেল */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-3 mt-8"
        >
          {/* গো ব্যাক বাটন */}
          <button
            type="button"
            onClick={() => router.back()}
            className="w-full sm:flex-1 py-3 bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-900 dark:hover:bg-slate-850 border border-slate-200/60 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all uppercase tracking-wider"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Go Back
          </button>

          {/* হোম পেজ বাটন */}
          <button
            type="button"
            onClick={() => router.push('/')}
            className="w-full sm:flex-1 py-3 bg-slate-950 hover:bg-slate-900 dark:bg-slate-100 dark:hover:bg-slate-200 text-slate-100 dark:text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md transition-all uppercase tracking-wider"
          >
            <Home className="h-3.5 w-3.5" /> Return Home
          </button>
        </motion.div>

      </div>
    </main>
  );
}