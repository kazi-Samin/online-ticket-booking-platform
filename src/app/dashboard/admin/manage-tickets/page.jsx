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
    <div className="max-w-7xl mx-auto space-y-6 p-4 sm:p-8 pb-12 text-left">
      {/* Admin Header Banner */}
      <div className="bg-gradient-to-r from-[#1E3A8A] to-indigo-900 dark:from-zinc-900 dark:to-zinc-950 p-6 sm:p-8 rounded-3xl shadow-xl border border-zinc-100 dark:border-zinc-800 text-white flex items-center space-x-4">
        <div className="p-3 bg-[#FF6B35] rounded-2xl shadow-lg">
          <ShieldCheck className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-tight">Global Ticket Distribution Matrix</h1>
          <p className="text-sm text-indigo-200 dark:text-zinc-400 font-medium mt-0.5">
            Audit, verify, and modulate routing structures live.
          </p>
        </div>
      </div>

      {/* Main Client Master Interactive Component */}
      <ManageTicketsTable initialTickets={tickets} />
    </div>
  );
};

export default ManageTicketsPage;