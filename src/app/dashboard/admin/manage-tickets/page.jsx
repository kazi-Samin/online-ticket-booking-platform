import ManageTicketsTable from '@/Components/Dashboard/Admin/ManageTickts/ManageTicketsTable';
import { getAdminAllTickets } from '@/lib/api/adminAllTickets';
import { ShieldCheck } from 'lucide-react';
import React from 'react';

export const metadata = {
  title: "TicketCore || Manage-Tickets",
  description: "Online ticket booking platform",
};

const ManageTicketsPage = async () => {
  const tickets = (await getAdminAllTickets()) || [];

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4 sm:p-8 pb-12 text-left bg-slate-50 dark:bg-black min-h-screen text-slate-800 dark:text-slate-200 transition-colors duration-300">
      
      {/* ==================== 🏆 ULTRA-MODERN BRAND HEADER BANNER ==================== */}
      <div className="relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xs flex items-center space-x-4">
        
        {/* 🌌 Soft Ambient Glow Background Element */}
        <div className="absolute -top-10 -right-10 w-36 h-36 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl pointer-events-none" />
        
        {/* Left Icon Container with Brand Identity */}
        <div className="p-3 bg-blue-600 dark:bg-blue-500/10 text-white dark:text-blue-400 rounded-2xl shadow-md shrink-0 relative z-10">
          <ShieldCheck className="h-6 w-6" />
        </div>
        
        {/* Right Label Text Content */}
        <div className="space-y-0.5 relative z-10">
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Global Itinerary Auditing Matrix
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            Monitor infrastructure compliance, audit vendor logs, and authorize pipelines live.
          </p>
        </div>
      </div>

      {/* Main Client Master Interactive Component */}
      <ManageTicketsTable initialTickets={tickets} />
    </div>
  );
};

export default ManageTicketsPage;