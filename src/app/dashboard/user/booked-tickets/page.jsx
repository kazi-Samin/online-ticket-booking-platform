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

  // Fetch from MongoDB via API
  const bookedTickets = userId ? (await getUserBookedTickets(userId)) || [] : [];

  return (
    // 🎯 মেইন ব্যাকগ্রাউন্ড: ডার্ক মোডে deep slate blue এবং টেক্সট ডাইনামিক করা হলো
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#000000] text-[#1E293B] dark:text-slate-200 antialiased p-4 sm:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* 🎯 টপ হেডার ব্যানার: ডার্ক মোডে ব্যাকগ্রাউন্ড slate-900 এবং বর্ডার ডার্ক মোড ফ্রেন্ডলি করা হয়েছে */}
        <div className="bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 p-6 rounded-[24px] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left transition-colors duration-200">
          <div>
            <h1 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
              My <span className='text-orange-600 dark:text-[#FF6B35]'>Booked Tickets</span>
            </h1>
            <p className="text-xs font-semibold text-zinc-400 dark:text-slate-500 mt-0.5">
              Monitor reservation cycles, ledger states, and secure settlement parameters.
            </p>
          </div>

          {/* 🎯 ডান পাশের টোটাল বুকিং বক্স: ডার্ক কালার ট্রিটমেন্ট */}
          <div className="bg-zinc-50 dark:bg-slate-800/50 border border-zinc-200 dark:border-slate-700/60 px-4 py-2 rounded-xl self-start sm:self-auto shadow-sm transition-colors duration-200">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-slate-500 block">Total Bookings</span>
            <span className="text-base font-black text-[#1E3A8A] dark:text-indigo-400">{bookedTickets.length} Ledgers</span>
          </div>
        </div>

        {/* Client Interactive Matrix Engine with Search */}
        <BookedTicketsClientGrid initialBookings={bookedTickets} />

      </div>
    </div>
  );
};

export default BookedTicketsPage;