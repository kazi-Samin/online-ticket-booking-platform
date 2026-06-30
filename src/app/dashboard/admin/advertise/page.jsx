import ClientAdvertiseView from '@/Components/Dashboard/Admin/Advertise/ClientAdvertiseView';
import { getAdminAllTickets } from '@/lib/api/adminAllTickets';
import React from 'react';

export const metadata = {
  title: "TicketCore || Advertisements ",
  description: "Online ticket booking platform",
};

const AdvertisePage = async () => {

    const tickets = await getAdminAllTickets() || [];

    return (
        <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 p-4 md:p-8 text-left transition-colors duration-200">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Dashboard Header */}
                <div className="space-y-1">
                    <h1 className="text-2xl md:text-3xl font-black text-[#1E293B] dark:text-slate-100 tracking-tight">
                        Campaign & Advertisements
                    </h1>
                    <p className="text-xs md:text-sm text-slate-400 dark:text-slate-500 font-medium">
                        Promote premier routes to the homepage banner grid. Maximized capping allocation is locked at 6 slots.
                    </p>
                </div>

                {/* Main Client Control Panel */}
                <ClientAdvertiseView initialTickets={tickets} />

            </div>
        </div>
    );
};

export default AdvertisePage;