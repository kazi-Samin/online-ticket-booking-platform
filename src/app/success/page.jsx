import { redirect } from 'next/navigation';
import { stripe } from '../../lib/stripe';
import Link from 'next/link';
import { CheckCircle, Calendar, Mail, ArrowRight, Download } from 'lucide-react';
import { patchMutation } from '@/lib/core/server';

// 🎯 নোট: যদি আপনার ডাটাবেজ কানেকশনের কোনো ফাংশন থাকে (যেমন bookingsCollection), তবে সেটি এখানে ইম্পোর্ট করবেন
// import { updateBookingPaymentStatus } from '@/lib/actions/bookings';

export const metadata = {
  title: "TicketCore || Payment-Success",
  description: "Online ticket booking platform",
};

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)');
  }

  // ১. স্ট্রাইপ সেশন থেকে ডাটা রিট্রিভ করা
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  });

  const { status, customer_details, client_reference_id: bookingId, amount_total } = session;
  const customerEmail = customer_details?.email;

  if (status === 'open') {
    return redirect('/');
  }

  if (status === 'complete') {
    // 🎯 ডাটাবেজ আপডেট পাইপলাইন (CRITICAL BUG FIX)
    // এখানে আপনার এক্সপ্রেস ব্যাকএন্ডে বা মঙ্গোডিবির বুকিং কালেকশনে হিট করে
    // এই `bookingId` এর স্ট্যাটাস 'paid' বা 'approved' করে দিতে হবে।
    if (bookingId) {
      try {
        await patchMutation(`/api/booking/payment-success/${bookingId}`, {
          transactionId: session.payment_intent?.id || session_id,
          amount: amount_total / 100
        });
      } catch (dbError) {
        console.error("Database status sync failed:", dbError);
      }
    }

    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 antialiased">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-2xl p-8 text-center space-y-6">

          {/* Success Animated Icon */}
          <div className="flex justify-center">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-full animate-bounce">
              <CheckCircle className="h-12 w-12 text-emerald-500" />
            </div>
          </div>

          {/* Header Text */}
          <div className="space-y-2">
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Payment Successful!
            </h1>
            <p className="text-xs text-slate-400 uppercase font-black tracking-widest">
              Transaction Cleared
            </p>
          </div>

          <hr className="border-slate-100 dark:border-slate-800/60" />

          {/* Dynamic Invoice Metadata */}
          <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60 rounded-2xl p-4 text-left space-y-3 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <div className="flex justify-between">
              <span>Booking Node:</span>
              <span className="font-mono text-slate-900 dark:text-slate-200">#{bookingId || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span>Amount Paid:</span>
              <span className="font-black text-slate-900 dark:text-white text-sm">৳ {(amount_total / 100).toFixed(2)}</span>
            </div>
          </div>

          {/* Email Info Notification */}
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-[320px] mx-auto">
            We appreciate your business! A confirmation ticket invoice stream will be pushed to{" "}
            <span className="font-bold text-slate-900 dark:text-white">{customerEmail}</span>.
          </p>

          {/* Interactive Routing Call To Actions (Two Buttons Grid) */}
          <div className="pt-2 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              {/* Button 1: Download Tickets Page */}
              <Link
                href="/dashboard/user/download-tickets"
                className="inline-flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all active:scale-95 cursor-pointer shadow-md"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download Tickets Page</span>
              </Link>

              {/* Button 2: Go to Home */}
              <Link
                href="/"
                className="inline-flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs uppercase tracking-wider transition-all active:scale-95 cursor-pointer shadow-md"
              >
                <span>Go to Home</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

            </div>

            <p className="text-[10px] text-slate-400 font-medium pt-1">
              Need help? Contact <a href="mailto:orders@example.com" className="underline hover:text-slate-600 dark:hover:text-slate-300">orders@example.com</a>
            </p>
          </div>

        </div>
      </main>
    );
  }
}