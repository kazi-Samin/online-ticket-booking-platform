import React from 'react';
import { headers } from "next/headers";
import { getVendorAddedTickets } from '@/lib/api/vendorAddedTickets';
import MyTicketsClient from '@/Components/Dashboard/Vendor/MyAddTickets/MyTicketsClient';
import { auth } from '@/lib/auth';

export const metadata = {
  title: "TicketCore || My-Added-Tickets",
  description: "Online ticket booking platform",
};

const MyAddedTickets = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const user = session?.user;
  const userId = user?.id;

  // Server Side Data Fetch Node
  const tickets = await getVendorAddedTickets(userId) || [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-800 dark:text-zinc-200 transition-colors duration-300 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ==================== 🏆 ULTRA-MODERN BRAND HEADER & COUNTER ==================== */}
        <div className="relative overflow-hidden bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 rounded-3xl shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">

          {/* 🌌 Soft Ambient Glow Background Element */}
          <div className="absolute -top-10 -right-10 w-36 h-36 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Left: Text Stream */}
          <div className="space-y-1.5 relative z-10">
            <div className="flex items-center space-x-1.5 mb-0.5">
              <span className="text-[10px] font-black tracking-widest uppercase text-blue-600 dark:text-blue-400">
                Inventory Logistics
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              My Added Itineraries
            </h2>
            <p className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-widest leading-relaxed">
              Track verification cycle logs and manage distribution channels safely.
            </p>
          </div>

          {/* Right: ⚡ High-Tech Micro Capsule Indicator Badge */}
          <div className="inline-flex items-center gap-2.5 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-2xl px-4 py-2.5 self-start sm:self-center shadow-xs relative z-10 select-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <p className="text-xs font-black text-slate-800 dark:text-zinc-300 tracking-wider uppercase">
              Total Assets: <span className="text-blue-600 dark:text-blue-400 ml-0.5 font-black">{tickets?.length || 0}</span>
            </p>
          </div>
        </div>

        {/* Client Layer Matrix Dispatcher injection */}
        <MyTicketsClient initialTickets={tickets} />

      </div>
    </div>
  );
};

export default MyAddedTickets;