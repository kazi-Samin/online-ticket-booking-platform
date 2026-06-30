// 'use client';

// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Search, Calendar, ChevronLeft, ChevronRight, ArrowRight, Filter, AlertCircle } from 'lucide-react';
// import StripePaymentButton from './StripePaymentButton';
// import Image from 'next/image';
// import { authClient } from '@/lib/auth-client';

// // ⏱️ Clean Minimal Countdown Engine Component
// function TicketCardCountdown({ targetDate, status }) {
//   const [timeLeft, setTimeLeft] = useState("Calculating...");
//   const [isPassed, setIsPassed] = useState(false);

//   useEffect(() => {
//     if (status === 'rejected' || status === 'paid') return;

//     const calculate = () => {
//       const difference = new Date(targetDate) - new Date();
//       if (difference <= 0) {
//         setTimeLeft("Expired");
//         setIsPassed(true);
//         return;
//       }
//       const days = Math.floor(difference / (1000 * 60 * 60 * 24));
//       const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
//       const minutes = Math.floor((difference / 1000 / 60) % 60);

//       setTimeLeft(days > 0 ? `${days}d ${hours}h ${minutes}m` : `${hours}h ${minutes}m`);
//     };

//     calculate();
//     const interval = setInterval(calculate, 60000);
//     return () => clearInterval(interval);
//   }, [targetDate, status]);

//   if (status === 'rejected' || status === 'paid') return null;

//   return (
//     <span className={`text-[11px] font-bold ${isPassed ? "text-[#EF4444]" : "text-emerald-400"}`}>
//       {isPassed ? "Expired" : `Ends in: ${timeLeft}`}
//     </span>
//   );
// }

// export default function BookedTicketsClientGrid({ initialBookings }) {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   // 🔐 Auth Client Session Hook for Fraud checking
//   const { data: session } = authClient.useSession();
//   const user = session?.user;

//   // 🔍 Advanced Filtering: Search + Status Filter Combined
//   const filteredBookings = initialBookings.filter(booking => {
//     const matchesSearch =
//       booking.ticketTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       booking.from?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       booking.to?.toLowerCase().includes(searchQuery.toLowerCase());

//     const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;

//     return matchesSearch && matchesStatus;
//   });

//   // 🔢 Pagination Calculations
//   const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);

//   // 🎨 Premium Status Mapping
//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'paid': return 'bg-[#22C55E] text-white';
//       case 'accepted': return 'bg-[#1E3A8A] text-white';
//       case 'rejected': return 'bg-[#EF4444] text-white';
//       default: return 'bg-[#EAB308] text-slate-900';
//     }
//   };

//   return (
//     <div className="space-y-6 text-left">

//       {/* 🛠️ PREMIUM CONTROLS BAR: ডার্ক মোডে স্লেট-৯০০ ব্যাকগ্রাউন্ড এবং বর্ডার ডার্ক মোড ফ্রেন্ডলি করা হয়েছে */}
//       <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm transition-colors duration-200">

//         {/* Crisp Search Input Box */}
//         <div className="relative flex-1">
//           <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
//             <Search className="h-4 w-4 text-slate-400 dark:text-slate-500" />
//           </span>
//           <input
//             type="text"
//             placeholder="Search bookings by destination or transport..."
//             value={searchQuery}
//             onChange={(e) => {
//               setSearchQuery(e.target.value);
//               setCurrentPage(1);
//             }}
//             className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 pl-10 pr-4 py-2.5 rounded-xl text-xs font-semibold text-[#1E293B] dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-slate-400 dark:focus:border-slate-600 transition-all shadow-inner"
//           />
//         </div>

//         {/* Premium Status Filter Dropdown */}
//         <div className="relative min-w-40 flex items-center">
//           <span className="absolute left-3.5 pointer-events-none text-slate-400 dark:text-slate-500">
//             <Filter className="h-3.5 w-3.5" />
//           </span>
//           <select
//             value={statusFilter}
//             onChange={(e) => {
//               setStatusFilter(e.target.value);
//               setCurrentPage(1);
//             }}
//             className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 pl-9 pr-8 py-2.5 rounded-xl text-xs font-bold text-[#1E293B] dark:text-slate-200 focus:outline-none focus:border-slate-400 dark:focus:border-slate-600 transition-all appearance-none cursor-pointer"
//           >
//             <option value="all" className="dark:bg-slate-900">All Statuses</option>
//             <option value="pending" className="dark:bg-slate-900">⏳ Pending</option>
//             <option value="accepted" className="dark:bg-slate-900">✅ Accepted</option>
//             <option value="paid" className="dark:bg-slate-900">💵 Paid</option>
//             <option value="rejected" className="dark:bg-slate-900">❌ Rejected</option>
//           </select>
//           <div className="absolute right-3.5 pointer-events-none text-slate-400 dark:text-slate-500 text-[10px]">
//             ▼
//           </div>
//         </div>

//       </div>

//       {/* Grid System */}
//       {filteredBookings.length === 0 ? (
//         <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[24px] p-12 text-center text-slate-400 dark:text-slate-500 font-medium text-sm">
//           No matching operational logs discovered.
//         </div>
//       ) : (
//         <>
//           <div className="flex flex-col gap-6 max-w-4xl mx-auto">
//             <AnimatePresence mode="popLayout">
//               {currentItems.map((booking) => {
//                 const dateObj = new Date(booking.departureDateTime);
//                 const formattedDate = dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase();
//                 const isTimePassed = dateObj - new Date() <= 0;

//                 return (
//                   <motion.div
//                     key={booking._id}
//                     layout
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     whileHover={{ y: -2 }}
//                     transition={{ duration: 0.3, ease: "easeInOut" }}
//                     className="bg-slate-50/70 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/80 backdrop-blur-md rounded-[24px] shadow-sm hover:shadow-md overflow-hidden relative group flex flex-col md:flex-row items-stretch md:h-56 transition-all duration-200"
//                   >
//                     {/* 📸 Left Side: Fixed Proportion Image Frame */}
//                     <div className="relative h-48 md:h-auto md:w-[35%] shrink-0 overflow-hidden border-b md:border-b-0 md:border-r border-slate-200/60 dark:border-slate-800/80">
//                       <Image width={400} height={400}
//                         src={booking?.image}
//                         alt={booking?.ticketTitle}
//                         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
//                       />
//                       <span className={`absolute top-4 left-4 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md shadow-sm ${getStatusColor(booking?.status)}`}>
//                         {booking?.status}
//                       </span>
//                     </div>

//                     {/* 📝 Right Side: Content Panel with Dark Support */}
//                     <div className="p-5 md:p-6 flex-1 flex flex-col justify-between space-y-4">

//                       {/* Top Meta Line: Date */}
//                       <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 font-bold">
//                         <div className="flex items-center space-x-1.5">
//                           <Calendar className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
//                           <span>{formattedDate}</span>
//                         </div>
//                       </div>

//                       {/* Title & Route Hierarchy */}
//                       <div className="space-y-1">
//                         <h2 className="text-lg md:text-xl font-black text-[#1E293B] dark:text-white tracking-tight leading-tight group-hover:text-[#1E3A8A] dark:group-hover:text-teal-400 transition-colors">
//                           {booking?.ticketTitle}
//                         </h2>

//                         <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400 font-bold">
//                           <span>{booking?.from}</span>
//                           <ArrowRight className="h-3 w-3 text-emerald-400 stroke-[2.5]" />
//                           <span className="text-[#1E3A8A] dark:text-teal-400 font-extrabold">{booking?.to}</span>
//                         </div>

//                         {/* Tracker Subtitle */}
//                         <div className="flex items-center space-x-2 text-[11px] text-slate-400 dark:text-slate-500 font-medium pt-0.5">
//                           <span>Qty: {booking.bookingQuantity} Units</span>
//                           {booking.status !== 'paid' && booking.status !== 'rejected' && (
//                             <>
//                               <span>•</span>
//                               <TicketCardCountdown targetDate={booking.departureDateTime} status={booking.status} />
//                             </>
//                           )}
//                         </div>
//                       </div>

//                       {/* Divider Bottom Action Hub */}
//                       <div className="border-t border-slate-200/80 dark:border-slate-800 pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-auto">

//                         {/* Price Details */}
//                         <div>
//                           <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium block">Total price :</span>
//                           <span className="text-lg font-black text-[#1E293B] dark:text-slate-200">
//                             ৳{booking.totalPrice.toLocaleString()}
//                           </span>
//                         </div>

//                         {/* Dynamic Action Hub Text & Status Control */}
//                         <div className="flex justify-end items-center sm:w-auto max-w-xs md:max-w-md">

//                           {booking?.ticketDeleted === true ? (
//                             <div className="flex items-center space-x-1.5 text-[#EF4444] font-bold text-[10px] sm:text-[11px] leading-tight bg-red-50/80 dark:bg-red-950/20 px-3 py-2 rounded-xl border border-red-200 dark:border-red-900/50">
//                               <AlertCircle className="h-4 w-4 text-[#EF4444] shrink-0" />
//                               <span>Booking Closed (Ticket unavailable)</span>
//                             </div>
//                           ) : booking.status === 'accepted' ? (

//                            booking?.isFraud === true ? (
//                               <div className="flex items-start space-x-2 text-[#D97706] dark:text-amber-400 bg-amber-50/90 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 p-2.5 rounded-xl text-[11px] font-semibold leading-normal shadow-sm">
//                                 <AlertCircle className="h-4 w-4 text-[#D97706] dark:text-amber-400 shrink-0 mt-0.5" />
//                                 <span>
//                                   This vendor has been suspended. This ticket is no longer available for payment. Please contact support if you have already paid.
//                                 </span>
//                               </div>
//                             ) : (
//                               <StripePaymentButton
//                                 bookingId={booking._id}
//                                 totalAmount={booking?.totalPrice}
//                                 ticketTitle={booking?.ticketTitle}
//                                 isTimePassed={isTimePassed}
//                               />
//                             )
//                           ) : booking.status === 'paid' ? (
//                             <div className="flex items-center space-x-1.5 text-white font-black text-xs uppercase tracking-wider bg-[#22C55E] px-3 py-1.5 rounded-xl shadow-sm">
//                               <span>Booked</span>
//                               <div className="h-3.5 w-3.5 rounded-full bg-white text-[#22C55E] flex items-center justify-center text-[9px] font-black">
//                                 ✓
//                               </div>
//                             </div>
//                           ) : booking.status === 'rejected' ? (
//                             <div className="text-white font-black text-xs uppercase tracking-wider bg-[#EF4444] px-3 py-1.5 rounded-xl">
//                               Cancelled
//                             </div>
//                           ) : (
//                             <div className="text-slate-700 dark:text-amber-950 font-black text-[10px] text-center uppercase tracking-wider bg-[#EAB308] px-3 py-1.5 rounded-xl animate-pulse">
//                               Awaiting Approval
//                             </div>
//                           )}
//                         </div>

//                       </div>
//                     </div>

//                   </motion.div>
//                 );
//               })}
//             </AnimatePresence>
//           </div>

//           {/* Premium Pagination */}
//           {totalPages > 1 && (
//             <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
//               <span className="text-xs font-medium text-slate-400 dark:text-slate-500 text-center sm:text-left">
//                 Showing <span className="text-[#1E293B] dark:text-slate-300 font-bold">{indexOfFirstItem + 1}</span> to{' '}
//                 <span className="text-[#1E293B] dark:text-slate-300 font-bold">
//                   {indexOfLastItem > filteredBookings.length ? filteredBookings.length : indexOfLastItem}
//                 </span>{' '}
//                 of <span className="text-[#1E293B] dark:text-slate-300 font-bold">{filteredBookings.length}</span> Results
//               </span>

//               <div className="flex items-center space-x-1.5">
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                   disabled={currentPage === 1}
//                   className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl transition-all disabled:opacity-30 text-slate-600 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-600"
//                 >
//                   <ChevronLeft className="h-4 w-4" />
//                 </button>

//                 {Array.from({ length: totalPages }, (_, i) => (
//                   <button
//                     key={i + 1}
//                     onClick={() => setCurrentPage(i + 1)}
//                     className={`h-8 w-8 text-xs font-bold rounded-xl transition-all ${
//                       currentPage === i + 1
//                         ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
//                         : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600'
//                     }`}
//                   >
//                     {i + 1}
//                   </button>
//                 ))}

//                 <button
//                   onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                   disabled={currentPage === totalPages}
//                   className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl transition-all disabled:opacity-30 text-slate-600 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-600"
//                 >
//                   <ChevronRight className="h-4 w-4" />
//                 </button>
//               </div>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, ChevronLeft, ChevronRight, ArrowRight, Filter, AlertCircle } from 'lucide-react';
import StripePaymentButton from './StripePaymentButton';
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';

function TicketCardCountdown({ targetDate, status }) {
  const [timeLeft, setTimeLeft] = useState("Calculating...");
  const [isPassed, setIsPassed] = useState(false);

  useEffect(() => {
    if (status === 'rejected' || status === 'paid') return;

    const calculate = () => {
      const difference = new Date(targetDate) - new Date();
      if (difference <= 0) {
        setTimeLeft("Expired");
        setIsPassed(true);
        return;
      }
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);

      setTimeLeft(days > 0 ? `${days}d ${hours}h ${minutes}m` : `${hours}h ${minutes}m`);
    };

    calculate();
    const interval = setInterval(calculate, 60000);
    return () => clearInterval(interval);
  }, [targetDate, status]);

  if (status === 'rejected' || status === 'paid') return null;

  return (
    <span className={`text-[11px] font-black tracking-wider uppercase ${isPassed ? "text-rose-500" : "text-amber-500"}`}>
      {isPassed ? "Expired" : `Ends in: ${timeLeft}`}
    </span>
  );
}

export default function BookedTicketsClientGrid({ initialBookings }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const filteredBookings = initialBookings.filter(booking => {
    const matchesSearch =
      booking.ticketTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.from?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.to?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);

  const getStatusColor = (status) => {
    switch(status) {
      case 'paid': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      case 'accepted': return 'bg-teal-500/10 text-teal-400 border border-teal-500/20';
      case 'rejected': return 'bg-rose-500/10 text-rose-400 border border-rose-500/20';
      default: return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
    }
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-900/40 backdrop-blur-md border border-slate-800/80 p-4 rounded-2xl shadow-xl transition-all duration-300">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
            <Search className="h-4 w-4 text-slate-500" />
          </span>
          <input
            type="text"
            placeholder="Search bookings by destination or transport..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-slate-950 border border-slate-800 pl-10 pr-4 py-2.5 rounded-xl text-xs font-semibold text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500/50 transition-all shadow-inner"
          />
        </div>

        <div className="relative min-w-40 flex items-center">
          <span className="absolute left-3.5 pointer-events-none text-slate-500">
            <Filter className="h-3.5 w-3.5" />
          </span>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-slate-950 border border-slate-800 pl-9 pr-8 py-2.5 rounded-xl text-xs font-bold text-slate-200 focus:outline-none focus:border-teal-500/50 transition-all appearance-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="pending">⏳ Pending</option>
            <option value="accepted">✅ Accepted</option>
            <option value="paid">💵 Paid</option>
            <option value="rejected">❌ Rejected</option>
          </select>
          <div className="absolute right-3.5 pointer-events-none text-slate-500 text-[10px]">
            ▼
          </div>
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="bg-slate-900/20 backdrop-blur-md border border-slate-800/60 rounded-3xl p-12 text-center text-slate-500 font-medium text-sm">
          No matching operational logs discovered.
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-6 max-w-4xl mx-auto">
            <AnimatePresence mode="popLayout">
              {currentItems.map((booking) => {
                const dateObj = new Date(booking.departureDateTime);
                const formattedDate = dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase();
                const isTimePassed = dateObj - new Date() <= 0;

                return (
                  <motion.div
                    key={booking._id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="bg-slate-900/30 border border-slate-800/60 backdrop-blur-md rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden relative group flex flex-col md:flex-row items-stretch md:h-56 transition-all duration-300"
                  >
                    <div className="relative h-48 md:h-auto md:w-[35%] shrink-0 overflow-hidden border-b md:border-b-0 md:border-r border-slate-800/60">
                      <Image 
                        width={400} 
                        height={400}
                        src={booking?.image}
                        alt={booking?.ticketTitle}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <span className={`absolute top-4 left-4 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md shadow-md backdrop-blur-md ${getStatusColor(booking?.status)}`}>
                        {booking?.status}
                      </span>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4 bg-gradient-to-br from-transparent to-slate-950/20">
                      <div className="flex items-center justify-between text-xs text-slate-500 font-bold tracking-wider">
                        <div className="flex items-center space-x-1.5">
                          <Calendar className="h-3.5 w-3.5 text-slate-500" />
                          <span>{formattedDate}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h2 className="text-lg md:text-xl font-black text-white tracking-tight leading-tight group-hover:text-teal-400 transition-colors duration-300">
                          {booking?.ticketTitle}
                        </h2>

                        <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-bold">
                          <span>{booking?.from}</span>
                          <ArrowRight className="h-3 w-3 text-teal-500 stroke-[2.5]" />
                          <span className="text-teal-400 font-extrabold">{booking?.to}</span>
                        </div>

                        <div className="flex items-center space-x-2 text-[11px] text-slate-500 font-medium pt-0.5">
                          <span>Qty: {booking.bookingQuantity} Units</span>
                          {booking.status !== 'paid' && booking.status !== 'rejected' && (
                            <>
                              <span>•</span>
                              <TicketCardCountdown targetDate={booking.departureDateTime} status={booking.status} />
                            </>
                          )}
                        </div>
                      </div>

                      <div className="border-t border-slate-800/80 pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-auto">
                        <div>
                          <span className="text-[11px] text-slate-500 font-medium block uppercase tracking-wider">Total Price</span>
                          <span className="text-xl font-black text-white">
                            ৳{booking.totalPrice.toLocaleString()}
                          </span>
                        </div>

                        <div className="flex justify-end items-center sm:w-auto max-w-xs md:max-w-md">
                          {booking?.ticketDeleted === true ? (
                            <div className="flex items-center space-x-1.5 text-rose-400 font-bold text-[10px] sm:text-[11px] leading-tight bg-rose-500/5 px-3 py-2 rounded-xl border border-rose-500/10">
                              <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
                              <span>Booking Closed (Ticket unavailable)</span>
                            </div>
                          ) : booking.status === 'accepted' ? (
                            booking?.isFraud === true ? (
                              <div className="flex items-start space-x-2 text-amber-400 bg-amber-500/5 border border-amber-500/10 p-2.5 rounded-xl text-[11px] font-semibold leading-normal">
                                <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                                <span>
                                  This vendor has been suspended. This ticket is no longer available for payment. Please contact support if you have already paid.
                                </span>
                              </div>
                            ) : (
                              <StripePaymentButton
                                bookingId={booking._id}
                                totalAmount={booking?.totalPrice}
                                ticketTitle={booking?.ticketTitle}
                                isTimePassed={isTimePassed}
                              />
                            )
                          ) : booking.status === 'paid' ? (
                            <div className="flex items-center space-x-1.5 text-white font-black text-xs uppercase tracking-widest bg-emerald-600 px-4 py-2 rounded-xl shadow-md shadow-emerald-900/20">
                              <span>Booked</span>
                              <div className="h-3.5 w-3.5 rounded-full bg-white text-emerald-600 flex items-center justify-center text-[9px] font-black">
                                ✓
                              </div>
                            </div>
                          ) : booking.status === 'rejected' ? (
                            <div className="text-white font-black text-xs uppercase tracking-widest bg-rose-600 px-4 py-2 rounded-xl shadow-md shadow-rose-900/20">
                              Cancelled
                            </div>
                          ) : (
                            <div className="text-slate-950 font-black text-[10px] text-center uppercase tracking-widest bg-amber-500 px-4 py-2 rounded-xl animate-pulse shadow-md shadow-amber-500/10">
                              Awaiting Approval
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800/80">
              <span className="text-xs font-medium text-slate-500 text-center sm:text-left">
                Showing <span className="text-slate-300 font-bold">{indexOfFirstItem + 1}</span> to{' '}
                <span className="text-slate-300 font-bold">
                  {indexOfLastItem > filteredBookings.length ? filteredBookings.length : indexOfLastItem}
                </span>{' '}
                of <span className="text-slate-300 font-bold">{filteredBookings.length}</span> Results
              </span>

              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 bg-slate-900 border border-slate-800 rounded-xl transition-all disabled:opacity-30 text-slate-400 hover:border-slate-700"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`h-8 w-8 text-xs font-bold rounded-xl transition-all ${
                      currentPage === i + 1
                        ? 'bg-slate-100 text-slate-900 shadow-xl'
                        : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 bg-slate-900 border border-slate-800 rounded-xl transition-all disabled:opacity-30 text-slate-400 hover:border-slate-700"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}