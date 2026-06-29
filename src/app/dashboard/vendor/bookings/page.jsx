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

    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#000309] p-4 md:p-8 text-left transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ==================== 🏆 PREMIUM BRAND HEADER CONTAINER ==================== */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 p-6 md:p-8 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-none flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

          {/* Decorative Gradient Background Blur Element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF6B35]/10 to-[#1E3A8A]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-2 relative z-10">
            <div className="flex items-center space-x-2">
              <span className="p-1.5 bg-[#1E3A8A]/10 dark:bg-[#1E3A8A]/20 text-[#1E3A8A] dark:text-blue-400 rounded-lg">
                <Layers className="h-4 w-4" />
              </span>
              <span className="text-[10px] font-black tracking-widest uppercase text-[#FF6B35]">
                Vendor Workspace Console
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-[#1E293B] dark:text-[#E2E8F0] tracking-tight">
              Requested <span className='text-orange-600'>Bookings</span>
            </h1>
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-relaxed">
              Manage passenger reservation flows and ticketing logs
            </p>
          </div>

          {/* Quick Counter Indicator Badge */}
          <div className="bg-[#1E3A8A] text-white dark:bg-slate-800 dark:text-[#E2E8F0] px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider shadow-md shadow-[#1E3A8A]/10 border border-[#1E3A8A]/10 dark:border-slate-700/60 shrink-0">
            Total Request Load: <span className="text-[#FF6B35] font-black ml-1">{bookings.length}</span>
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