import BookedTicketsClientGrid from '@/Components/Dashboard/User/MyBookedTickets/BookedTicketsClientGrid';
import { getUserBookedTickets } from '@/lib/api/userBookingTickets';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

export const metadata = {
  title: "TicketCore || Booked-Tickets",
  description: "Online ticket booking platform",
};

const BookedTicketsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const user = session?.user;
  const userId = user?.id;

  // Fetch safely from MongoDB via API
  const bookedTickets = userId ? (await getUserBookedTickets(userId)) || [] : [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-800 dark:text-zinc-200 antialiased p-4 sm:p-8 transition-colors duration-300 text-left">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ==================== 🏆 ULTRA-MODERN BRAND HEADER & COUNTER ==================== */}
        <div className="relative overflow-hidden bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 rounded-3xl shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left transition-colors duration-200">
          
          {/* 🌌 Soft Ambient Glow Background Element */}
          <div className="absolute -top-10 -right-10 w-36 h-36 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Left: Text Stream */}
          <div className="space-y-1 relative z-10">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              My Personal <span className="text-blue-600 dark:text-blue-400">Reservations</span>
            </h1>
            <p className="text-xs font-semibold text-slate-400 dark:text-zinc-500 mt-0.5">
              Monitor reservation lifecycles, ledger states, and secure settlement parameters.
            </p>
          </div>

          {/* Right: ⚡ High-Tech Micro Capsule Indicator Badge */}
          <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 px-4 py-2 rounded-2xl self-start sm:self-auto shadow-sm relative z-10 transition-colors duration-200">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500 block">Total Bookings</span>
            <span className="text-sm font-black text-blue-600 dark:text-blue-400">
              {(Array.isArray(bookedTickets) ? bookedTickets.length : 0)} Ledgers
            </span>
          </div>
        </div>

        {/* Client Interactive Matrix Engine with Search */}
        <BookedTicketsClientGrid initialBookings={bookedTickets} />

      </div>
    </div>
  );
};

export default BookedTicketsPage;