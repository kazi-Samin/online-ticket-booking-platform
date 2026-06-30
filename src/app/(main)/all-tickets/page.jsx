// import TicketsClientController from '@/Components/Main/AllTicketCard/TicketsClientController';
// import { getAllTickets } from '@/lib/api/allTickets';
// import { Ticket } from 'lucide-react';
// import React from 'react';

// export const metadata = {
//   title: "TicketBari- All-Tickets",
//   description: "Online ticket booking platform",
// };

// const AllTickets = async ({ searchParams }) => {
//   const params = await searchParams; // Next.js 15+ এ await লাগে

//   const data = await getAllTickets(params);
//   const tickets = data?.tickets || [];
//   const totalPages = data?.totalPages || 1;
//   const currentPage = data?.currentPage || 1;
//   const totalCount = data?.totalCount || 0;

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] text-[#1E293B] dark:text-slate-200 antialiased p-4 sm:p-8 selection:bg-emerald-600/10 transition-colors duration-200">
//       <div className="max-w-7xl mx-auto space-y-8 text-left">

        
//         <div className="relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-[24px] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors duration-200">
//           <div className="flex items-center space-x-4 relative z-10">
//             <div className="p-3.5 bg-[#1E3A8A] dark:bg-teal-950 rounded-xl shadow-sm text-emerald-400">
//               <Ticket className="h-6 w-6 shrink-0" />
//             </div>
//             <div>
//               <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
//                 Global Transit Fleet
//               </h1>
//               <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">
//                 Explore authenticated corridors, direct line networks, and seat assets live.
//               </p>
//             </div>
//           </div>


//           <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 px-5 py-3 rounded-xl self-start md:self-auto shadow-sm transition-colors duration-200">
//             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 block">Active Clearances</span>
//             <span className="text-xl font-black text-[#1E3A8A] dark:text-emerald-400">
//               {totalCount} Nodes Mapped
//             </span>
//           </div>
//         </div>

//         <TicketsClientController
//           tickets={tickets}
//           totalPages={totalPages}
//           currentPage={currentPage}
//         />

//       </div>
//     </div>
//   );
// };

// export default AllTickets;

import TicketsClientController from '@/Components/Main/AllTicketCard/TicketsClientController';
import { getAllTickets } from '@/lib/api/allTickets';
import { Ticket } from 'lucide-react';
import React from 'react';


export const metadata = {
  title: "TicketCore || All-Tickets",
  description: "Online ticket booking platform",
};

const AllTickets = async ({ searchParams }) => {
  const params = await searchParams;

  // এক্সপ্রেস ক্লাউড ডাটাবেজ এপিআই পাইপলাইন কল
  const data = await getAllTickets(params);
  
  let tickets = data?.tickets || [];
  let totalPages = data?.totalPages || 1;
  let currentPage = data?.currentPage || 1;
  let totalCount = data?.totalCount || 0;

  return (
    // 🎨 Fixed: Theme backgrounds completely synced to TicketCore core signature colors
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased p-4 sm:p-8 selection:bg-teal-500/20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8 text-left">
        
        {/* Header Hero Board Panel */}
        <div className="relative overflow-hidden bg-white/80 dark:bg-slate-900/30 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 p-6 sm:p-8 rounded-[24px] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all">
          {/* Radial Glowing Core Matrix Effect */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center space-x-4 relative z-10">
            <div className="p-3.5 bg-teal-600/10 border border-teal-500/20 rounded-xl shadow-lg text-teal-400">
              <Ticket className="h-6 w-6 shrink-0 filter drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                Global Transit Fleet
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                Explore authenticated corridors, direct line networks, and seat assets live.
              </p>
            </div>
          </div>

          {/* Metrics Mapped Allocation Gauge */}
          <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 px-5 py-3 rounded-xl self-start md:self-auto shadow-inner">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">Active Clearances</span>
            <span className="text-xl font-black text-teal-600 dark:text-teal-400">
              {totalCount} Nodes Mapped
            </span>
          </div>
        </div>

        {/* 🎛️ Data Stream Grid Controller Controller */}
        <TicketsClientController
          tickets={tickets}
          totalPages={totalPages}
          currentPage={currentPage}
        />

      </div>
    </div>
  );
};

export default AllTickets;