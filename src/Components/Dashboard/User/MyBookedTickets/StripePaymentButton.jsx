'use client';

import React from 'react';
import { ArrowRight, AlertTriangle } from 'lucide-react';

export default function StripePaymentButton({ bookingId, totalAmount, isTimePassed ,ticketTitle}) {

  // ⚠️ Time Expired Guard Condition
  if (isTimePassed) {
    return (
      <div className="flex items-center space-x-1 text-red-500 text-[10px] font-black uppercase tracking-wider bg-red-50/60 px-2.5 py-1.5 rounded-lg border border-red-100">
        <AlertTriangle className="h-3 w-3 shrink-0" />
        <span>Expired</span>
      </div>
    );
  }

  return (
    /* 🚀 স্ট্রাইপ ডক্স স্ট্যান্ডার্ড: ফর্ম অ্যাকশনের মাধ্যমে সরাসরি POST রিকোয়েস্ট */
    <form
      action="/api/checkout_sessions"
      method="POST"
      onClick={(e) => e.stopPropagation()} // কার্ডের হোভার বা অন্য ক্লিকে যেন ঝামেলা না করে
    >
      {/* 🛠️ হিডেন ইনপুট ফিল্ডস: যাতে ব্যাকএন্ড ফর্ম সাবমিট থেকে আইডি আর অ্যামাউন্ট পেয়ে যায় */}
      <input type="hidden" name="bookingId" value={bookingId} />
      <input type="hidden" name="totalAmount" value={totalAmount} />
      <input type="hidden" name="ticketTitle" value={ticketTitle} />

      <button
        type="submit"
        role="link"
        className="flex items-center space-x-2 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-[11px] font-black uppercase tracking-widest rounded-xl transition-all shadow-sm active:scale-[0.97] group/btn"
      >
        <span>Pay Now</span>

        <div className="h-4 w-4 rounded-full bg-zinc-800 flex items-center justify-center transition-transform group-hover/btn:translate-x-0.5">
          <ArrowRight className="h-2.5 w-2.5 text-[#FF6B35] stroke-3" />
        </div>
      </button>
    </form>
  );
}