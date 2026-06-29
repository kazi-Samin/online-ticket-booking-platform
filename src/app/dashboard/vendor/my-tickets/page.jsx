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
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#09090b] text-[#1E293B] dark:text-[#E2E8F0] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Dynamic Descriptive Section Header */}
 {/* ==================== 🏆 ULTRA-MODERN BRAND HEADER & COUNTER ==================== */}
<div className="relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 p-6 rounded-3xl shadow-xl shadow-slate-200/30 dark:shadow-none flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">

  {/* 🌌 Soft Ambient Glow Background Element */}
  <div className="absolute -top-10 -right-10 w-36 h-36 bg-gradient-to-br from-[#FF6B35]/10 to-[#1E3A8A]/10 rounded-full blur-2xl pointer-events-none" />

  {/* Left: Text Stream */}
  <div className="space-y-1.5 relative z-10">
    <div className="flex items-center space-x-1.5 mb-0.5">
      <span className="text-[10px] font-black tracking-widest uppercase text-[#FF6B35]">
        Inventory Management
      </span>
    </div>
    <h2 className="text-2xl font-black tracking-tight text-[#1E293B] dark:text-white">
      My Added Tickets
    </h2>
    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-relaxed">
      Monitor verification lifecycle status and dispatch actions safely.
    </p>
  </div>

  {/* Right: ⚡ High-Tech Micro Capsule Indicator Badge */}
  <div className="inline-flex items-center gap-2.5 bg-[#FF6B35]/5 dark:bg-[#FF6B35]/10 border border-[#FF6B35]/20 dark:border-[#FF6B35]/30 rounded-2xl px-4 py-2.5 self-start sm:self-center shadow-xs relative z-10 transition-all select-none">
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B35] opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6B35]"></span>
    </span>
    <p className="text-xs font-black text-[#1E293B] dark:text-slate-300 tracking-wider uppercase">
      Total Assets: <span className="text-[#FF6B35] ml-0.5 font-black">{tickets?.length || 0}</span>
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