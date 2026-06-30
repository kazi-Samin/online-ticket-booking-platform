"use client";

import React from 'react';
import Link from 'next/link';
import { HiTicket, HiHome, HiArrowRight } from 'react-icons/hi';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-400 flex flex-col items-center justify-center relative overflow-hidden px-4 select-none">

      {/* Dynamic Background Premium Royal Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-violet-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Orchestration Container */}
      <div className="relative z-10 max-w-xl text-center space-y-8 flex flex-col items-center">

        {/* Animated Big 404 Header Layout */}
        <div className="relative">
          <h1 className="text-[120px] sm:text-[160px] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-slate-100 to-slate-800 leading-none">
            404
          </h1>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-teal-600 text-white text-[10px] font-black tracking-widest uppercase rounded-md shadow-lg shadow-teal-500/20 whitespace-nowrap border border-teal-500/30">
            Route Not Found
          </div>
        </div>

        {/* Dynamic Ticket Terminal Lost Panel Concept */}
        <div className="w-full max-w-sm bg-slate-900/20 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-2 left-3 flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
          </div>

          <div className="py-4 flex flex-col items-center space-y-4">
            {/* Custom Ticket Displacement Tracker */}
            <div className="animate-bounce duration-1000 text-slate-600 group-hover:text-teal-400 transition-colors">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-600/10 text-teal-400 border border-teal-500/20 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300 transform -rotate-12">
                <HiTicket className="h-8 w-8" />
              </div>
            </div>
            
            {/* Professional English Notification Messages */}
            <div className="space-y-1.5 px-2">
              <h4 className="text-sm font-black text-slate-200">Terminal Disconnection</h4>
              <p className="text-xs font-medium tracking-wide text-slate-500 text-center leading-relaxed">
                The directory path or destination module you are trying to access does not exist within our synchronized network.
              </p>
            </div>
          </div>
        </div>

        {/* Premium Synced Action Link Triggers */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 bg-teal-600 hover:bg-teal-500 border border-teal-500/30 text-white font-black text-sm rounded-xl shadow-lg shadow-teal-500/10 active:scale-95 transition-all"
          >
            <HiHome className="h-4 w-4" />
            <span>Return to Hub (Home)</span>
          </Link>

          <Link
            href="/all-tickets"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 border border-slate-800 bg-slate-950/40 hover:bg-slate-900 text-slate-300 font-bold text-sm rounded-xl active:scale-95 transition-all"
          >
            <span>Browse Active Tickets</span>
            <HiArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}