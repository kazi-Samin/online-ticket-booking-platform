// 'use client';

// import React from 'react';
// import { useRouter, useSearchParams, usePathname } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';
// import Link from 'next/link';
// import { Search, SlidersHorizontal, ArrowUpDown, Calendar, Clock, ArrowRight, LayoutGrid } from 'lucide-react';
// import Image from 'next/image';

// export default function TicketsClientController({ tickets, totalPages, currentPage }) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   // URL এর বর্তমান value গুলো পড়ো (refresh করলেও state ঠিক থাকবে)
//   const searchFrom = searchParams.get('from') || '';
//   const searchTo = searchParams.get('to') || '';
//   const transportFilter = searchParams.get('transport') || 'all';
//   const priceSort = searchParams.get('sort') || 'none';

//   // একটা single helper - নতুন param সেট করে URL বদলাবে
//   const updateParams = (updates) => {
//     const params = new URLSearchParams(searchParams.toString());
//     Object.entries(updates).forEach(([key, value]) => {
//       if (value && value !== 'all' && value !== 'none') {
//         params.set(key, value);
//       } else {
//         params.delete(key);
//       }
//     });
//     params.set('page', '1'); // ফিল্টার বদলালে page 1 এ ফিরে যাও
//     router.push(`${pathname}?${params.toString()}`);
//   };

//   const goToPage = (pageNum) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set('page', pageNum);
//     router.push(`${pathname}?${params.toString()}`);
//   };

//   const resetFilters = () => {
//     router.push(pathname);
//   };

//   const calculateTimeLeft = (dateString) => {
//     const difference = new Date(dateString) - new Date();
//     if (difference <= 0) return { passed: true, text: "Passed" };
//     const days = Math.floor(difference / (1000 * 60 * 60 * 24));
//     const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
//     if (days > 0) return { passed: false, text: `${days}d ${hours}h left` };
//     return { passed: false, text: `${hours}h left` };
//   };

//   const formatDateTime = (dateTimeString) => {
//     if (!dateTimeString) return { date: "N/A", time: "N/A" };
//     const dateObj = new Date(dateTimeString);
//     return {
//       date: dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
//       time: dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
//     };
//   };

//   return (
//     <div className="space-y-6 text-left">

//       {/* Control Deck */}
//       <div className="bg-white dark:bg-[#0B1224] border border-slate-200 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

//         <div>
//           <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 block mb-1.5 pl-1">Origin Node</label>
//           <div className="relative">
//             <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
//             <input
//               type="text"
//               placeholder="Leaving from..."
//               defaultValue={searchFrom}
//               onChange={(e) => updateParams({ from: e.target.value })}
//               className="w-full bg-slate-50 dark:bg-[#070A12] pl-10 pr-4 py-2.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-[#1E3A8A] transition-all placeholder:text-slate-400"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 block mb-1.5 pl-1">Target Terminal</label>
//           <div className="relative">
//             <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
//             <input
//               type="text"
//               placeholder="Going to..."
//               defaultValue={searchTo}
//               onChange={(e) => updateParams({ to: e.target.value })}
//               className="w-full bg-slate-50 dark:bg-[#070A12] pl-10 pr-4 py-2.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-[#1E3A8A] transition-all placeholder:text-slate-400"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 block mb-1.5 pl-1">Classification</label>
//           <div className="relative">
//             <SlidersHorizontal className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
//             <select
//               value={transportFilter}
//               onChange={(e) => updateParams({ transport: e.target.value })}
//               className="w-full bg-slate-50 dark:bg-[#070A12] pl-10 pr-4 py-2.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#1E3A8A] appearance-none cursor-pointer"
//             >
//               <option value="all">All</option>
//               <option value="bus">Bus</option>
//               <option value="train">Rail</option>
//               <option value="plane">Plane</option>
//               <option value="launch">Launch </option>
//             </select>
//           </div>
//         </div>

//         <div>
//           <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 block mb-1.5 pl-1">Sort Metric</label>
//           <div className="relative">
//             <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
//             <select
//               value={priceSort}
//               onChange={(e) => updateParams({ sort: e.target.value })}
//               className="w-full bg-slate-50 dark:bg-[#070A12] pl-10 pr-4 py-2.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#1E3A8A] appearance-none cursor-pointer"
//             >
//               <option value="none">Standard Sequence</option>
//               <option value="lowToHigh">Fare: Low to High</option>
//               <option value="highToLow">Fare: High to Low</option>
//             </select>
//           </div>
//         </div>

//         <div className="flex items-end">
//           <button
//             onClick={resetFilters}
//             className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 tracking-wider text-slate-600 dark:text-slate-400 uppercase transition-all duration-200 active:scale-[0.98]"
//           >
//             Reset Filters
//           </button>
//         </div>

//       </div>

//       {/* Card Layout */}
//       <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
//         <AnimatePresence mode="popLayout">
//           {tickets.map((ticket, index) => {
//             const timeStatus = calculateTimeLeft(ticket.departureDateTime);
//             const departure = formatDateTime(ticket.departureDateTime);

//             return (
//               <motion.div
//                 key={ticket._id || ticket.id}
//                 layout
//                 initial={{ opacity: 0, y: 15 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 transition={{ duration: 0.35, delay: index * 0.03 }}
//                 whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.06)", transition: { duration: 0.2 } }}
//                 className="bg-white dark:bg-[#0B1224] rounded-2xl border-2 border-slate-100 dark:border-slate-800/80 shadow-sm overflow-hidden flex flex-col justify-between transition-all duration-300 group text-left"
//               >
//                 <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-950 overflow-hidden">
//                   <Image width={400} height={400}
//                     src={ticket.image || "https://i.ibb.co.com/rfcHK5ym/image.png"}
//                     alt={ticket.title}
//                     className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
//                   />
//                   <span className="absolute top-4 left-4 bg-[#1E3A8A] text-white text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-lg shadow-sm">
//                     {ticket.transportType}
//                   </span>
//                   <div className={`absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider backdrop-blur-md border ${
//                     timeStatus.passed ? "bg-red-500/10 border-red-200 text-red-600 dark:text-red-400" : "bg-slate-900/95 border-slate-800 text-emerald-400"
//                   }`}>
//                     <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
//                     <span>{timeStatus.text}</span>
//                   </div>
//                 </div>

//                 <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
//                   <div className="space-y-4">
//                     <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug group-hover:text-[#1E3A8A] dark:group-hover:text-blue-400 transition-colors">
//                       {ticket.title}
//                     </h3>

//                     <div className="flex items-center gap-3 text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-[#070A12] p-3 rounded-xl border border-slate-100 dark:border-slate-900">
//                       <span className="truncate text-slate-900 dark:text-slate-200">{ticket.from}</span>
//                       <div className="flex-1 flex items-center justify-center min-w-[20px]">
//                         <span className="h-[1px] flex-1 bg-gradient-to-r from-slate-200 via-emerald-500/30 to-slate-200 dark:from-slate-900 dark:to-slate-900" />
//                         <ArrowRight className="h-3.5 w-3.5 text-emerald-400 shrink-0 mx-1.5 animate-pulse" />
//                         <span className="h-[1px] flex-1 bg-gradient-to-r from-slate-200 via-emerald-500/30 to-slate-200 dark:from-slate-900 dark:to-slate-900" />
//                       </div>
//                       <span className="text-[#1E3A8A] dark:text-blue-400 truncate">{ticket.to}</span>
//                     </div>

//                     <div className="grid grid-cols-2 gap-2 text-xs font-semibold border border-slate-100 dark:border-slate-900/60 p-3 rounded-xl bg-slate-50/50 dark:bg-[#070A12]/50">
//                       <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
//                         <Calendar className="h-3.5 w-3.5 text-[#1E3A8A] dark:text-blue-500" />
//                         <span className="text-[11px] font-bold text-slate-800 dark:text-slate-300 truncate">{departure.date}</span>
//                       </div>
//                       <div className="flex items-center space-x-2 justify-end text-slate-500">
//                         <Clock className="h-3.5 w-3.5 text-slate-400" />
//                         <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400">{departure.time}</span>
//                       </div>
//                     </div>

//                     {ticket.perks && ticket.perks.length > 0 && (
//                       <div className="space-y-1.5">
//                         <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600 block pl-0.5">Included Perks</span>
//                         <div className="flex flex-wrap gap-1.5">
//                           {ticket.perks.slice(0, 3).map((perk, idx) => (
//                             <span key={idx} className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#070A12] text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-900">
//                               {perk}
//                             </span>
//                           ))}
//                           {ticket.perks.length > 3 && (
//                             <span className="text-[10px] font-black text-emerald-400 bg-emerald-600/5 px-2 py-1 rounded-lg border border-emerald-500/10">
//                               +{ticket.perks.length - 3} More
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   <div className="pt-4 border-t-2 border-dashed border-slate-100 dark:border-slate-900 space-y-4">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <span className="text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold block">Per Ticket Price</span>
//                         <span className="text-2xl font-black text-emerald-400 tracking-tight">৳{ticket.pricePerUnit}</span>
//                       </div>
//                       <div className="text-right">
//                         <span className="text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold block">Allocation</span>
//                         <span className="text-[11px] font-black bg-slate-100 dark:bg-[#070A12] text-slate-800 dark:text-slate-300 px-2.5 py-1 rounded-lg inline-block mt-1">
//                           {ticket.quantity || 0} Units
//                         </span>
//                       </div>
//                     </div>

//                     <Link
//                       href={`/all-tickets/${ticket._id || ticket.id}`}
//                       className="w-full flex items-center justify-center space-x-2 py-3 bg-[#1E3A8A] hover:bg-teal-900 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all duration-200 active:scale-[0.98] shadow-sm shadow-blue-900/10"
//                     >
//                       <span>See Details</span>
//                       <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
//                     </Link>
//                   </div>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </AnimatePresence>
//       </motion.div>

//       {tickets.length === 0 && (
//         <div className="text-center py-24 bg-white dark:bg-[#0B1224] border border-slate-200 dark:border-slate-900 rounded-2xl space-y-3">
//           <div className="p-3 bg-slate-50 dark:bg-[#070A12] max-w-max mx-auto rounded-full text-slate-400">
//             <LayoutGrid className="h-6 w-6 shrink-0" />
//           </div>
//           <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
//             No active transit corridors intersect criteria filters.
//           </p>
//         </div>
//       )}

//       {totalPages > 1 && (
//         <div className="flex items-center justify-between px-1 pt-5 border-t border-slate-200 dark:border-slate-900">
//           <button
//             onClick={() => goToPage(Math.max(currentPage - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl bg-white dark:bg-[#0B1224] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 disabled:opacity-40 transition-all hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer disabled:cursor-not-allowed"
//           >
//             Previous
//           </button>

//           <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
//             Page <span className="text-[#1E3A8A] dark:text-blue-500 font-black">{currentPage}</span> of {totalPages}
//           </span>

//           <button
//             onClick={() => goToPage(Math.min(currentPage + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl bg-white dark:bg-[#0B1224] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 disabled:opacity-40 transition-all hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer disabled:cursor-not-allowed"
//           >
//             Next
//           </button>
//         </div>
//       )}

//     </div>
//   );
// }

'use client';

import React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Search, SlidersHorizontal, ArrowUpDown, Calendar, Clock, ArrowRight, LayoutGrid } from 'lucide-react';
import Image from 'next/image';
import { authClient } from "@/lib/auth-client"; 
import { getTransportImage } from "@/lib/defaultImages";

export default function TicketsClientController({ tickets, totalPages, currentPage }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 🚀 কারেন্ট সেশন এবং ইউজার চেক
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const searchFrom = searchParams.get('from') || '';
  const searchTo = searchParams.get('to') || '';
  const transportFilter = searchParams.get('transport') || 'all';
  const priceSort = searchParams.get('sort') || 'none';

  const updateParams = (updates) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== 'all' && value !== 'none') {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  const goToPage = (pageNum) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNum);
    router.push(`${pathname}?${params.toString()}`);
  };

  const resetFilters = () => {
    router.push(pathname);
  };

  // 🚀 See Details বাটনের সিকিউরিটি গার্ড ফাংশন
  const handleDetailsNavigation = (ticketId) => {
    // ✅ Fixed: ভুল ডিরেক্টরি /tickets/ পরিবর্তন করে /all-tickets/${ticketId} করা হলো
    const targetPath = `/all-tickets/${ticketId}`;
    if (!user) {
      // 🔒 ইউজার লগইন না থাকলে লগইন পেজে রিডাইরেক্ট করবে এবং ব্যাক ইউআরএল বাটন ট্র্যাকিং সেট রাখবে
      router.push(`/login?callbackUrl=${encodeURIComponent(targetPath)}`);
    } else {
      // ✅ লগইন থাকলে সোজা টিকেটের ডিটেইলস ও সিট সিলেক্টর টার্মিনালে এক্সেস দিবে
      router.push(targetPath);
    }
  };

  const calculateTimeLeft = (dateString) => {
    const difference = new Date(dateString) - new Date();
    if (difference <= 0) return { passed: true, text: "Passed" };
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    if (days > 0) return { passed: false, text: `${days}d ${hours}h left` };
    return { passed: false, text: `${hours}h left` };
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return { date: "N/A", time: "N/A" };
    const dateObj = new Date(dateTimeString);
    return {
      date: dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    };
  };

  return (
    <div className="space-y-6 text-left selection:bg-emerald-600/20 bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1.5 pl-1">Origin Node</label>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Leaving from..."
              defaultValue={searchFrom}
              onChange={(e) => updateParams({ from: e.target.value })}
              className="w-full bg-slate-100 dark:bg-slate-950/60 pl-10 pr-4 py-2.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-slate-400 dark:focus:border-slate-700 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-inner"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1.5 pl-1">Target Terminal</label>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Going to..."
              defaultValue={searchTo}
              onChange={(e) => updateParams({ to: e.target.value })}
              className="w-full bg-slate-100 dark:bg-slate-950/60 pl-10 pr-4 py-2.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-slate-400 dark:focus:border-slate-700 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-inner"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1.5 pl-1">Classification</label>
          <div className="relative">
            <SlidersHorizontal className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
            <select
              value={transportFilter}
              onChange={(e) => updateParams({ transport: e.target.value })}
              className="w-full bg-slate-100 dark:bg-slate-950/60 pl-10 pr-4 py-2.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-300 focus:outline-none focus:border-slate-400 dark:focus:border-slate-700 transition-all appearance-none cursor-pointer"
            >
              <option value="all" className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200">All</option>
              <option value="bus" className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200">Bus</option>
              <option value="train" className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200">Rail</option>
              <option value="plane" className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200">Plane</option>
              <option value="launch" className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200">Launch</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1.5 pl-1">Sort Metric</label>
          <div className="relative">
            <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
            <select
              value={priceSort}
              onChange={(e) => updateParams({ sort: e.target.value })}
              className="w-full bg-slate-100 dark:bg-slate-950/60 pl-10 pr-4 py-2.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-300 focus:outline-none focus:border-slate-400 dark:focus:border-slate-700 transition-all appearance-none cursor-pointer"
            >
              <option value="none" className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200">Standard Sequence</option>
              <option value="lowToHigh" className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200">Fare: Low to High</option>
              <option value="highToLow" className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200">Fare: High to Low</option>
            </select>
          </div>
        </div>

        <div className="flex items-end">
          <button
            onClick={resetFilters}
            className="w-full py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-black bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 tracking-widest text-slate-500 dark:text-slate-400 uppercase transition-all duration-200 active:scale-[0.99] shadow-md"
          >
            Reset Filters
          </button>
        </div>

      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        <AnimatePresence mode="popLayout">
          {tickets.map((ticket, index) => {
            const timeStatus = calculateTimeLeft(ticket.departureDateTime);
            const departure = formatDateTime(ticket.departureDateTime);

            return (
              <motion.div
                key={ticket._id || ticket.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: index * 0.03 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white dark:bg-slate-900/30 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col justify-between transition-all duration-300 group text-left"
              >
                <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-950 overflow-hidden border-b border-slate-200 dark:border-slate-800/50">
                  <Image 
                    width={400} 
                    height={400}
                    src={ticket.image || getTransportImage(ticket.transportType)}
                    alt={ticket.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-700 ease-out"
                  />
                  <span className="absolute top-4 left-4 bg-teal-600 border border-teal-500/30 text-white text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-lg shadow-lg">
                    {ticket.transportType}
                  </span>
                  <div className={`absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider backdrop-blur-md border ${
                    timeStatus.passed ? "bg-red-950/40 border-red-900/50 text-red-400" : "bg-slate-950/80 border-slate-800 text-emerald-400"
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    <span>{timeStatus.text}</span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-4">
                    <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {ticket.title}
                    </h3>

                    <div className="flex items-center gap-3 text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-950/40 p-3 rounded-xl border border-slate-200 dark:border-slate-800/60">
                      <span className="truncate text-slate-800 dark:text-slate-300">{ticket.from}</span>
                      <div className="flex-1 flex items-center justify-center min-w-[20px]">
                        <span className="h-[1px] flex-1 bg-gradient-to-r from-slate-200 dark:from-slate-800/10 via-emerald-500/20 to-slate-200 dark:to-slate-800/10" />
                        <ArrowRight className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400 shrink-0 mx-1.5 animate-pulse" />
                        <span className="h-[1px] flex-1 bg-gradient-to-r from-slate-200 dark:from-slate-800/10 via-emerald-500/20 to-slate-200 dark:to-slate-800/10" />
                      </div>
                      <span className="text-teal-600 dark:text-teal-400 truncate font-extrabold">{ticket.to}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs font-semibold border border-slate-200 dark:border-slate-800/50 p-3 rounded-xl bg-slate-50/50 dark:bg-slate-950/20">
                      <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
                        <Calendar className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
                        <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 truncate">{departure.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 justify-end text-slate-500">
                        <Clock className="h-3.5 w-3.5 text-slate-400 dark:text-slate-600" />
                        <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400">{departure.time}</span>
                      </div>
                    </div>

                    {ticket.perks && ticket.perks.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-600 block pl-0.5">Included Perks</span>
                        <div className="flex flex-wrap gap-1.5">
                          {ticket.perks.slice(0, 3).map((perk, idx) => (
                            <span key={idx} className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-950/40 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800/60">
                              {perk}
                            </span>
                          ))}
                          {ticket.perks.length > 3 && (
                            <span className="text-[10px] font-black text-emerald-400 bg-emerald-600/5 px-2 py-1 rounded-lg border border-emerald-500/20">
                              +{ticket.perks.length - 3} More
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-dashed border-slate-200 dark:border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-black block mb-0.5">Fare</span>
                        <span className="text-xl font-black text-emerald-500 dark:text-emerald-400 tracking-tight">৳{ticket.pricePerUnit}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-black block mb-0.5">Allocation</span>
                        <span className="text-[11px] font-black bg-slate-100 dark:bg-slate-950/60 text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-800/60 px-2.5 py-1 rounded-lg inline-block mt-0.5 shadow-inner">
                          {ticket.quantity || 0} Units
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDetailsNavigation(ticket._id || ticket.id)}
                      className="w-full flex items-center justify-center space-x-2 py-3.5 bg-teal-600 border border-teal-500/30 hover:bg-teal-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all duration-200 active:scale-[0.99] shadow-lg shadow-teal-950/50"
                    >
                      <span>See Details</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {tickets.length === 0 && (
        <div className="text-center py-24 bg-white/50 dark:bg-slate-900/10 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-3xl space-y-3">
          <div className="p-3 bg-slate-50 dark:bg-slate-950/40 max-w-max mx-auto rounded-full text-slate-400 dark:text-slate-600 border border-slate-200 dark:border-slate-800/40">
            <LayoutGrid className="h-6 w-6 shrink-0" />
          </div>
          <p className="text-xs font-black text-slate-500 uppercase tracking-widest">
            No active transit corridors intersect criteria filters.
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-1 pt-5 border-t border-slate-200 dark:border-slate-800/60">
          <button
            onClick={() => goToPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 disabled:opacity-50 dark:disabled:opacity-20 transition-all hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer disabled:cursor-not-allowed shadow-sm"
          >
            Previous
          </button>

          <span className="text-xs font-black text-slate-500 uppercase tracking-widest">
            Page <span className="text-teal-600 dark:text-teal-400 font-black">{currentPage}</span> of {totalPages}
          </span>

          <button
            onClick={() => goToPage(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 disabled:opacity-50 dark:disabled:opacity-20 transition-all hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer disabled:cursor-not-allowed shadow-sm"
          >
            Next
          </button>
        </div>
      )}

    </div>
  );
}