import RequestedBookingsClient from '@/Components/Dashboard/Vendor/Bookings/RequestedBookingsClient';
import { getVendorBookingRequest } from '@/lib/api/vendorBookingRequest';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';
import { Layers } from 'lucide-react';

export const metadata = {
  title: "TicketCore || Bookings-Request",
  description: "Online ticket booking platform",
};

const RequestedBookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const user = session?.user;
  const vendorId = user?.id;

  const bookings = await getVendorBookingRequest(vendorId) || [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black p-4 md:p-8 text-left transition-colors duration-300 text-slate-800 dark:text-slate-200">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ==================== 🏆 PREMIUM BRAND HEADER CONTAINER ==================== */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-3xl shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

          {/* Decorative Gradient Background Blur Element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-2 relative z-10">
            <div className="flex items-center space-x-2">
              <span className="p-1.5 bg-blue-600 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg">
                <Layers className="h-4 w-4" />
              </span>
              <span className="text-[10px] font-black tracking-widest uppercase text-blue-600 dark:text-blue-400">
                Operator Console Hub
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Passenger Reservation <span className='text-blue-600 dark:text-blue-400'>Requests</span>
            </h1>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-relaxed">
              Track system reservation queues and manage ticketing transactions safely
            </p>
          </div>

          {/* Quick Counter Indicator Badge */}
          <div className="bg-blue-600 text-white dark:bg-blue-500/10 dark:text-blue-400 px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider shadow-sm border border-blue-200 dark:border-blue-500/20 shrink-0 relative z-10">
            Total Request Load: <span className="text-slate-900 dark:text-white font-black ml-1">{(Array.isArray(bookings) ? bookings.length : 0)}</span>
          </div>
        </div>

        {/* ==================== ⚡ CLIENT GRAPHICS VIEW ENGINE ==================== */}
        <div className="relative z-10">
          <RequestedBookingsClient initialBookings={bookings} />
        </div>

      </div>
    </div>
  );
};

export default RequestedBookingsPage;