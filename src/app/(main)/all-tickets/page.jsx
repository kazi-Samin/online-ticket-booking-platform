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
//     <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] text-[#1E293B] dark:text-slate-200 antialiased p-4 sm:p-8 selection:bg-[#FF6B35]/10 transition-colors duration-200">
//       <div className="max-w-7xl mx-auto space-y-8 text-left">

        
//         <div className="relative overflow-hidden bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 p-6 sm:p-8 rounded-[24px] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors duration-200">
//           <div className="flex items-center space-x-4 relative z-10">
//             <div className="p-3.5 bg-[#1E3A8A] dark:bg-indigo-950 rounded-xl shadow-sm text-[#FF6B35]">
//               <Ticket className="h-6 w-6 shrink-0" />
//             </div>
//             <div>
//               <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
//                 Global Transit Fleet
//               </h1>
//               <p className="text-xs sm:text-sm text-zinc-500 dark:text-slate-400 font-medium mt-0.5">
//                 Explore authenticated corridors, direct line networks, and seat assets live.
//               </p>
//             </div>
//           </div>


//           <div className="bg-zinc-50 dark:bg-slate-800/50 border border-zinc-200 dark:border-slate-700/60 px-5 py-3 rounded-xl self-start md:self-auto shadow-sm transition-colors duration-200">
//             <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-slate-500 block">Active Clearances</span>
//             <span className="text-xl font-black text-[#1E3A8A] dark:text-[#FF6B35]">
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
    // 🎨 Fixed: Theme backgrounds completely synced to TicketCore core signature colors (#09090b)
    <div className="min-h-screen bg-[#09090b] text-zinc-100 antialiased p-4 sm:p-8 selection:bg-indigo-500/20">
      <div className="max-w-7xl mx-auto space-y-8 text-left">
        
        {/* Header Hero Board Panel */}
        <div className="relative overflow-hidden bg-zinc-900/30 backdrop-blur-md border border-zinc-800/80 p-6 sm:p-8 rounded-[24px] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Radial Glowing Core Matrix Effect */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center space-x-4 relative z-10">
            <div className="p-3.5 bg-indigo-600/10 border border-indigo-500/20 rounded-xl shadow-lg text-indigo-400">
              <Ticket className="h-6 w-6 shrink-0 filter drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Global Transit Fleet
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 font-medium mt-0.5">
                Explore authenticated corridors, direct line networks, and seat assets live.
              </p>
            </div>
          </div>

          {/* Metrics Mapped Allocation Gauge */}
          <div className="bg-zinc-950/60 border border-zinc-800 px-5 py-3 rounded-xl self-start md:self-auto shadow-inner">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block">Active Clearances</span>
            <span className="text-xl font-black text-indigo-400">
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