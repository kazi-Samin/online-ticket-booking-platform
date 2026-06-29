// 'use client';

// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Search, Filter, AlertTriangle, ShieldCheck, ChevronLeft, ChevronRight, Hourglass, CheckCircle2, XCircle } from 'lucide-react';
// import { updateBookingStatus } from '@/lib/actions/bookingStatus';
// import { toast } from 'react-toastify';

// export default function RequestedBookingsClient({ initialBookings }) {
//   const [bookings, setBookings] = useState(initialBookings);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 8;

//   const [modalConfig, setModalConfig] = useState({ isOpen: false, type: null, booking: null });
//   const [isUpdating, setIsUpdating] = useState(false);

//   // Global counts for premium stats
//   const totalPending = bookings.filter(b => b.status === 'pending').length;
//   const totalAccepted = bookings.filter(b => b.status === 'accepted').length;
//   const totalRejected = bookings.filter(b => b.status === 'rejected').length;

//   // Filter Logic
//   const filteredBookings = bookings.filter(booking => {
//     const matchesSearch =
//       booking.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       booking.userEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       booking.ticketTitle?.toLowerCase().includes(searchQuery.toLowerCase());

//     const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;

//     return matchesSearch && matchesStatus;
//   });

//   const totalPages = Math.ceil(filteredBookings.length / itemsPerPage) || 1;

//   // Safe pagination cleanup logic
//   useEffect(() => {
//     if (currentPage > totalPages) {
//       setCurrentPage(totalPages);
//     }
//   }, [filteredBookings.length, totalPages, currentPage]);

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);

//   const openConfirmationModal = (booking, type) => {
//     setModalConfig({ isOpen: true, type, booking });
//   };

//   const handleStatusUpdate = async () => {
//     const { booking, type } = modalConfig;
//     if (!booking) return;

//     const targetStatus = type === 'accept' ? 'accepted' : 'rejected';
//     setIsUpdating(true);

//     try {
//       const res = await updateBookingStatus(booking._id, { status: targetStatus });

//       if (res?.modifiedCount > 0) {
//         toast.success(`Booking successfully ${targetStatus}!`);

//         setBookings(prev =>
//           prev.map(b => b._id === booking._id ? { ...b, status: targetStatus } : b)
//         );
//       } else {
//         toast.info("No changes were made.");
//       }

//       setModalConfig({ isOpen: false, type: null, booking: null });
//     } catch (error) {
//       console.error("Database update failed:", error);
//       toast.error("Failed to update database status.");
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   return (
//     <div className="space-y-6 max-w-7xl mx-auto p-1 text-slate-800 dark:text-zinc-200 selection:bg-slate-200 dark:selection:bg-zinc-800 selection:text-current transition-colors duration-200">

//       {/* ==================== 📊 COUNTER CARDS (HYBRID LIGHT/DARK) ==================== */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         {/* Pending Card */}
//         <div className="bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-amber-500/10 p-5 rounded-2xl flex items-center justify-between shadow-sm dark:shadow-none transition-all hover:border-amber-500/40 hover:shadow-md dark:hover:shadow-[0_0_15px_rgba(245,158,11,0.05)]">
//           <div className="space-y-1">
//             <p className="text-[10px] font-black tracking-widest uppercase text-amber-500 dark:text-amber-400/80">Pending Requests</p>
//             <h3 className="text-2xl font-black text-slate-900 dark:text-white">{totalPending}</h3>
//           </div>
//           <div className="p-3 bg-amber-50 dark:bg-amber-500/10 text-amber-500 dark:text-amber-400 rounded-xl border border-amber-100 dark:border-amber-500/20">
//             <Hourglass className="h-5 w-5 animate-pulse" />
//           </div>
//         </div>

//         {/* Accepted Card */}
//         <div className="bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-emerald-500/10 p-5 rounded-2xl flex items-center justify-between shadow-sm dark:shadow-none transition-all hover:border-emerald-500/40 hover:shadow-md dark:hover:shadow-[0_0_15px_rgba(16,185,129,0.05)]">
//           <div className="space-y-1">
//             <p className="text-[10px] font-black tracking-widest uppercase text-emerald-600 dark:text-emerald-400/80">Approved Bookings</p>
//             <h3 className="text-2xl font-black text-slate-900 dark:text-white">{totalAccepted}</h3>
//           </div>
//           <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl border border-emerald-100 dark:border-emerald-500/20">
//             <CheckCircle2 className="h-5 w-5" />
//           </div>
//         </div>

//         {/* Rejected Card */}
//         <div className="bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-red-500/10 p-5 rounded-2xl flex items-center justify-between shadow-sm dark:shadow-none transition-all hover:border-red-500/40 hover:shadow-md dark:hover:shadow-[0_0_15px_rgba(239,68,68,0.05)]">
//           <div className="space-y-1">
//             <p className="text-[10px] font-black tracking-widest uppercase text-red-500 dark:text-red-400/80">Rejected Logs</p>
//             <h3 className="text-2xl font-black text-slate-900 dark:text-white">{totalRejected}</h3>
//           </div>
//           <div className="p-3 bg-red-50 dark:bg-red-500/10 text-red-500 dark:text-red-400 rounded-xl border border-red-100 dark:border-red-500/20">
//             <XCircle className="h-5 w-5" />
//           </div>
//         </div>
//       </div>

//       {/* ==================== 🛠️ CONTROLS BAR (HYBRID LIGHT/DARK) ==================== */}
//       <div className="bg-white dark:bg-zinc-900/60 p-4 border border-slate-200 dark:border-zinc-800 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-sm dark:shadow-none transition-all hover:border-slate-300 dark:hover:border-zinc-700">
//         <div className="relative flex-1 group">
//           <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 dark:text-zinc-500 group-focus-within:text-slate-700 group-focus-within:dark:text-zinc-200 transition-colors">
//             <Search className="h-4 w-4" />
//           </span>
//           <input
//             type="text"
//             placeholder="Search passenger name, email, or ticket title..."
//             value={searchQuery}
//             onChange={(e) => {
//               setSearchQuery(e.target.value);
//               setCurrentPage(1);
//             }}
//             className="w-full bg-slate-50 dark:bg-zinc-950/50 border border-slate-200 dark:border-zinc-800 pl-10 pr-4 py-2.5 rounded-xl text-xs font-bold text-slate-800 dark:text-zinc-200 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-400 focus:dark:border-zinc-600 focus:bg-white focus:dark:bg-zinc-950 focus:ring-4 focus:ring-slate-100 focus:dark:ring-zinc-900 transition-all"
//           />
//         </div>

//         <div className="flex items-center gap-2">
//           <div className="relative flex-1 md:flex-initial min-w-[160px] flex items-center group">
//             <span className="absolute left-3.5 pointer-events-none text-slate-400 dark:text-zinc-500 group-focus-within:text-slate-700 group-focus-within:dark:text-zinc-200 transition-colors">
//               <Filter className="h-3.5 w-3.5" />
//             </span>
//             <select
//               value={statusFilter}
//               onChange={(e) => {
//                 setStatusFilter(e.target.value);
//                 setCurrentPage(1);
//               }}
//               className="w-full bg-slate-50 dark:bg-zinc-950/50 border border-slate-200 dark:border-zinc-800 pl-9 pr-10 py-2.5 rounded-xl text-xs font-black text-slate-700 dark:text-zinc-300 focus:outline-none focus:border-slate-400 focus:dark:border-zinc-600 focus:bg-white focus:dark:bg-zinc-950 focus:ring-4 focus:ring-slate-100 focus:dark:ring-zinc-900 transition-all appearance-none cursor-pointer"
//             >
//               <option value="all" className="bg-white dark:bg-zinc-950 text-slate-700 dark:text-zinc-300">📊 All Statuses</option>
//               <option value="pending" className="bg-white dark:bg-zinc-950 text-amber-600 dark:text-amber-400">⏳ Pending</option>
//               <option value="accepted" className="bg-white dark:bg-zinc-950 text-emerald-600 dark:text-emerald-400">✅ Accepted</option>
//               <option value="rejected" className="bg-white dark:bg-zinc-950 text-red-600 dark:text-red-400">❌ Rejected</option>
//             </select>
//             <div className="absolute right-3.5 pointer-events-none text-slate-400 dark:text-zinc-500 text-[10px] font-bold group-hover:text-slate-600 group-hover:dark:text-zinc-300 transition-colors">▼</div>
//           </div>
//         </div>
//       </div>

//       {/* ==================== 📋 MATRIX TABLE (HYBRID LIGHT/DARK) ==================== */}
//       {filteredBookings.length === 0 ? (
//         <div className="bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-zinc-800 rounded-2xl p-12 text-center text-slate-400 dark:text-zinc-500 font-bold text-xs uppercase tracking-widest shadow-sm dark:shadow-none">
//           No requested reservation logs found.
//         </div>
//       ) : (
//         <div className="bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-sm dark:shadow-2xl overflow-hidden">

//           {/* Desktop Layout */}
//           <div className="hidden md:block overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="bg-slate-50 dark:bg-zinc-900/80 border-b border-slate-200 dark:border-zinc-800 text-[10px] font-black tracking-widest uppercase text-slate-400 dark:text-zinc-500">
//                   <th className="p-4 pl-6">User Name / Email</th>
//                   <th className="p-4">Ticket Title</th>
//                   <th className="p-4 text-center">Booking Quantity</th>
//                   <th className="p-4">Total Price</th>
//                   <th className="p-4 text-center">Status</th>
//                   <th className="p-4 pr-6 text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60 text-xs text-slate-600 dark:text-zinc-300 font-medium">
//                 {currentItems.map((booking) => (
//                   <tr key={booking._id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/20 transition-colors">
//                     <td className="p-4 pl-6">
//                       <div className="font-extrabold text-slate-900 dark:text-white">{booking.userName}</div>
//                       <div className="text-[11px] text-slate-400 dark:text-zinc-500 font-semibold mt-0.5">{booking.userEmail}</div>
//                     </td>
//                     <td className="p-4 font-extrabold text-blue-600 dark:text-blue-400">{booking.ticketTitle}</td>
//                     <td className="p-4 text-center font-black text-slate-500 dark:text-zinc-400">{booking.bookingQuantity} Units</td>
//                     <td className="p-4 font-black text-slate-900 dark:text-white">৳{booking.totalPrice.toLocaleString()}</td>
//                     <td className="p-4 text-center">
//                       <span className={`inline-block px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider border ${
//                         booking.status === 'accepted' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20' :
//                         booking.status === 'rejected' ? 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/20' :
//                         'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/20'
//                       }`}>
//                         {booking.status}
//                       </span>
//                     </td>
//                     <td className="p-4 pr-6 text-right">
//                       <div className="flex items-center justify-end space-x-2">
//                         <button
//                           onClick={() => openConfirmationModal(booking, 'accept')}
//                           disabled={booking.status === 'accepted'}
//                           className={`px-3 py-1.5 font-black text-[10px] uppercase tracking-wide rounded-lg transition-all ${
//                             booking.status === 'accepted'
//                               ? 'bg-slate-100 dark:bg-zinc-800 text-slate-300 dark:text-zinc-600 cursor-not-allowed opacity-50 border border-slate-200 dark:border-zinc-700/50'
//                               : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm dark:shadow-emerald-900/20'
//                           }`}
//                         >
//                           Accept
//                         </button>
//                         <button
//                           onClick={() => openConfirmationModal(booking, 'reject')}
//                           disabled={booking.status === 'rejected'}
//                           className={`px-3 py-1.5 font-black text-[10px] uppercase tracking-wide rounded-lg transition-all border ${
//                             booking.status === 'rejected'
//                               ? 'bg-slate-100 dark:bg-zinc-800 text-slate-300 dark:text-zinc-600 cursor-not-allowed opacity-50 border border-slate-200 dark:border-zinc-700/50'
//                               : 'bg-transparent border-red-200 dark:border-red-500/30 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10'
//                           }`}
//                         >
//                           Reject
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Responsive Mobile Layout */}
//           <div className="block md:hidden divide-y divide-slate-100 dark:divide-zinc-800/60">
//             {currentItems.map((booking) => (
//               <div key={booking._id} className="p-5 space-y-3 bg-transparent text-xs">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h3 className="text-sm font-black text-blue-600 dark:text-blue-400">{booking.ticketTitle}</h3>
//                     <p className="text-slate-800 dark:text-zinc-200 font-extrabold mt-1">{booking.userName}</p>
//                     <p className="text-slate-400 dark:text-zinc-500 font-semibold text-[11px]">{booking.userEmail}</p>
//                   </div>
//                   <span className={`px-2.5 py-1 rounded text-[9px] font-black uppercase tracking-wider border ${
//                     booking.status === 'accepted' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20' :
//                     booking.status === 'rejected' ? 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/20' :
//                     'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/20'
//                   }`}>
//                     {booking.status}
//                   </span>
//                 </div>

//                 <div className="grid grid-cols-2 gap-2 bg-slate-50 dark:bg-zinc-950/40 p-2.5 rounded-xl border border-slate-200 dark:border-zinc-800/80 text-[11px]">
//                   <div>
//                     <span className="text-slate-400 dark:text-zinc-500 block font-bold text-[9px] uppercase">Quantity</span>
//                     <span className="font-extrabold text-slate-700 dark:text-zinc-300">{booking.bookingQuantity} Units</span>
//                   </div>
//                   <div>
//                     <span className="text-slate-400 dark:text-zinc-500 block font-bold text-[9px] uppercase">Total Price</span>
//                     <span className="font-black text-slate-900 dark:text-white">৳{booking.totalPrice.toLocaleString()}</span>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-2 pt-1">
//                   <button
//                     onClick={() => openConfirmationModal(booking, 'accept')}
//                     disabled={booking.status === 'accepted'}
//                     className="w-full py-2 bg-emerald-600 text-white font-black text-xs uppercase tracking-widest rounded-xl disabled:opacity-30 disabled:cursor-not-allowed"
//                   >
//                     Accept
//                   </button>
//                   <button
//                     onClick={() => openConfirmationModal(booking, 'reject')}
//                     disabled={booking.status === 'rejected'}
//                     className="w-full py-2 bg-transparent border border-red-200 dark:border-red-500/30 text-red-500 dark:text-red-400 font-black text-xs uppercase tracking-widest rounded-xl disabled:opacity-30 disabled:cursor-not-allowed"
//                   >
//                     Reject
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* ==================== 🔢 PAGINATION FOOTER (HYBRID) ==================== */}
//           {totalPages > 1 && (
//             <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-slate-100 dark:border-zinc-800/60 bg-slate-50/50 dark:bg-zinc-950/30">
//               <span className="text-xs font-semibold text-slate-400 dark:text-zinc-500 text-center sm:text-left">
//                 Showing <span className="text-slate-700 dark:text-zinc-300 font-bold">{indexOfFirstItem + 1}</span> to{' '}
//                 <span className="text-slate-700 dark:text-zinc-300 font-bold">
//                   {indexOfLastItem > filteredBookings.length ? filteredBookings.length : indexOfLastItem}
//                 </span>{' '}
//                 of <span className="text-slate-700 dark:text-zinc-300 font-bold">{filteredBookings.length}</span> Results
//               </span>

//               <div className="flex items-center space-x-1.5">
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                   disabled={currentPage === 1}
//                   className="p-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl text-slate-600 dark:text-zinc-400 hover:text-slate-900 hover:dark:text-white hover:border-slate-400 hover:dark:border-zinc-600 transition-all disabled:opacity-20"
//                 >
//                   <ChevronLeft className="h-4 w-4" />
//                 </button>

//                 {Array.from({ length: totalPages }, (_, i) => (
//                   <button
//                     key={i + 1}
//                     onClick={() => setCurrentPage(i + 1)}
//                     className={`h-8 w-8 text-xs font-bold rounded-xl transition-all ${
//                       currentPage === i + 1
//                         ? 'bg-slate-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-black'
//                         : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-400 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600 dark:hover:text-white'
//                     }`}
//                   >
//                     {i + 1}
//                   </button>
//                 ))}

//                 <button
//                   onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                   disabled={currentPage === totalPages}
//                   className="p-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl text-slate-600 dark:text-zinc-400 hover:text-slate-900 hover:dark:text-white hover:border-slate-400 hover:dark:border-zinc-600 transition-all disabled:opacity-20"
//                 >
//                   <ChevronRight className="h-4 w-4" />
//                 </button>
//               </div>
//             </div>
//           )}

//         </div>
//       )}

//       {/* ==================== 🪟 GLASS-MODAL CONTEXT ==================== */}
//       <AnimatePresence>
//         {modalConfig.isOpen && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//             <motion.div
//               key="modal-overlay"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => !isUpdating && setModalConfig({ isOpen: false, type: null, booking: null })}
//               className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm"
//             />

//             <motion.div
//               key="modal-card"
//               initial={{ opacity: 0, scale: 0.95, y: 10 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.95, y: 10 }}
//               className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 p-6 rounded-2xl w-full max-w-sm relative z-10 shadow-xl dark:shadow-2xl space-y-4 text-center"
//             >
//               <div className="flex justify-center">
//                 {modalConfig.type === 'accept' ? (
//                   <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full border border-emerald-100 dark:border-emerald-500/20">
//                     <ShieldCheck className="h-6 w-6" />
//                   </div>
//                 ) : (
//                   <div className="p-3 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-full border border-red-100 dark:border-red-500/20">
//                     <AlertTriangle className="h-6 w-6" />
//                   </div>
//                 )}
//               </div>

//               <div>
//                 <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-tight">
//                   {modalConfig.type === 'accept' ? 'Execute Approval' : 'Execute Rejection'}
//                 </h3>
//                 <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium mt-2">
//                   Are you absolutely certain you want to toggle the status to <strong className="uppercase text-slate-800 dark:text-zinc-200">{modalConfig.type === 'accept' ? 'accepted' : 'rejected'}</strong> for{' '}
//                   <strong className="text-blue-600 dark:text-blue-400 font-bold">{modalConfig.booking?.ticketTitle}</strong>?
//                 </p>
//               </div>

//               <div className="grid grid-cols-2 gap-3 pt-2">
//                 <button
//                   type="button"
//                   disabled={isUpdating}
//                   onClick={() => setModalConfig({ isOpen: false, type: null, booking: null })}
//                   className="py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 disabled:opacity-50 text-slate-700 dark:text-zinc-300 font-bold text-xs uppercase tracking-wider rounded-xl border border-slate-200 dark:border-zinc-800 transition-all"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   disabled={isUpdating}
//                   onClick={handleStatusUpdate}
//                   className={`py-2.5 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md ${
//                     modalConfig.type === 'accept'
//                       ? 'bg-emerald-600 hover:bg-emerald-500'
//                       : 'bg-red-600 hover:bg-red-500'
//                   } disabled:opacity-50`}
//                 >
//                   {isUpdating ? 'Processing...' : 'Confirm'}
//                 </button>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>

//     </div>
//   );
// }
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, AlertTriangle, ShieldCheck, ChevronLeft, ChevronRight, Hourglass, CheckCircle2, XCircle } from 'lucide-react';
import { updateBookingStatus } from '@/lib/actions/bookingStatus';
import { toast } from 'react-toastify';

export default function RequestedBookingsClient({ initialBookings }) {
  const [bookings, setBookings] = useState(initialBookings);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: null, booking: null });
  const [isUpdating, setIsUpdating] = useState(false);

  const totalPending = bookings.filter(b => b.status === 'pending').length;
  const totalAccepted = bookings.filter(b => b.status === 'accepted').length;
  const totalRejected = bookings.filter(b => b.status === 'rejected').length;

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch =
      booking.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.userEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.ticketTitle?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage) || 1;

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [filteredBookings.length, totalPages, currentPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);

  const openConfirmationModal = (booking, type) => {
    setModalConfig({ isOpen: true, type, booking });
  };

  const handleStatusUpdate = async () => {
    const { booking, type } = modalConfig;
    if (!booking) return;

    const targetStatus = type === 'accept' ? 'accepted' : 'rejected';
    setIsUpdating(true);

    try {
      const res = await updateBookingStatus(booking._id, { status: targetStatus });

      if (res?.modifiedCount > 0) {
        toast.success(`Booking successfully ${targetStatus}!`);

        setBookings(prev =>
          prev.map(b => b._id === booking._id ? { ...b, status: targetStatus } : b)
        );
      } else {
        toast.info("No changes were made.");
      }

      setModalConfig({ isOpen: false, type: null, booking: null });
    } catch (error) {
      console.error("Database update failed:", error);
      toast.error("Failed to update database status.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 min-h-screen bg-[#09090b] text-zinc-200 selection:bg-indigo-500/30 selection:text-white transition-colors duration-200">

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl flex items-center justify-between backdrop-blur-md transition-all hover:border-amber-500/30 hover:shadow-[0_0_25px_rgba(245,158,11,0.03)]">
          <div className="space-y-1.5">
            <p className="text-[10px] font-black tracking-widest uppercase text-amber-400/90">Pending Requests</p>
            <h3 className="text-3xl font-black text-white tracking-tight">{totalPending}</h3>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20 shadow-inner">
            <Hourglass className="h-5 w-5 animate-pulse" />
          </div>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl flex items-center justify-between backdrop-blur-md transition-all hover:border-emerald-500/30 hover:shadow-[0_0_25px_rgba(16,185,129,0.03)]">
          <div className="space-y-1.5">
            <p className="text-[10px] font-black tracking-widest uppercase text-emerald-400/90">Approved Bookings</p>
            <h3 className="text-3xl font-black text-white tracking-tight">{totalAccepted}</h3>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20 shadow-inner">
            <CheckCircle2 className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl flex items-center justify-between backdrop-blur-md transition-all hover:border-red-500/30 hover:shadow-[0_0_25px_rgba(239,68,68,0.03)]">
          <div className="space-y-1.5">
            <p className="text-[10px] font-black tracking-widest uppercase text-red-400/90">Rejected Logs</p>
            <h3 className="text-3xl font-black text-white tracking-tight">{totalRejected}</h3>
          </div>
          <div className="p-3 bg-red-500/10 text-red-400 rounded-xl border border-red-500/20 shadow-inner">
            <XCircle className="h-5 w-5" />
          </div>
        </div>
      </div>

      <div className="bg-zinc-900/60 p-4 border border-zinc-800/80 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 backdrop-blur-lg transition-all hover:border-zinc-700/60">
        <div className="relative flex-1 group">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-500 group-focus-within:text-indigo-400 transition-colors">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            placeholder="Search passenger name, email, or ticket title..."
            value={searchQuery}
            onChange={(e) => {
              searchQuery;
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-zinc-950/40 border border-zinc-800 pl-10 pr-4 py-2.5 rounded-xl text-xs font-bold text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:bg-zinc-950/80 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-inner"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:flex-initial min-w-[180px] flex items-center group">
            <span className="absolute left-3.5 pointer-events-none text-zinc-500 group-focus-within:text-indigo-400 transition-colors">
              <Filter className="h-3.5 w-3.5" />
            </span>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-zinc-950/40 border border-zinc-800 pl-9 pr-10 py-2.5 rounded-xl text-xs font-black text-zinc-300 focus:outline-none focus:border-indigo-500/50 focus:bg-zinc-950/80 focus:ring-4 focus:ring-indigo-500/10 transition-all appearance-none cursor-pointer"
            >
              <option value="all" className="bg-zinc-950 text-zinc-300">📊 All Statuses</option>
              <option value="pending" className="bg-zinc-950 text-amber-400">⏳ Pending</option>
              <option value="accepted" className="bg-zinc-950 text-emerald-400">✅ Accepted</option>
              <option value="rejected" className="bg-zinc-950 text-red-400">❌ Rejected</option>
            </select>
            <div className="absolute right-3.5 pointer-events-none text-zinc-500 text-[9px] font-black group-hover:text-zinc-300 transition-colors">▼</div>
          </div>
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="bg-zinc-900/20 border border-zinc-800/60 rounded-2xl p-16 text-center text-zinc-500 font-bold text-xs uppercase tracking-widest backdrop-blur-sm">
          No requested reservation logs found.
        </div>
      ) : (
        <div className="bg-zinc-900/20 border border-zinc-800/80 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md">

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-900/60 border-b border-zinc-800 text-[10px] font-black tracking-widest uppercase text-zinc-500">
                  <th className="p-4 pl-6">User Name / Email</th>
                  <th className="p-4">Ticket Title</th>
                  <th className="p-4 text-center">Booking Quantity</th>
                  <th className="p-4">Total Price</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50 text-xs text-zinc-300 font-medium">
                {currentItems.map((booking) => (
                  <tr key={booking._id} className="hover:bg-zinc-800/10 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="font-extrabold text-white text-sm">{booking.userName}</div>
                      <div className="text-[11px] text-zinc-500 font-semibold mt-0.5">{booking.userEmail}</div>
                    </td>
                    <td className="p-4 font-extrabold text-indigo-400">{booking.ticketTitle}</td>
                    <td className="p-4 text-center font-black text-zinc-400">{booking.bookingQuantity} Units</td>
                    <td className="p-4 font-black text-white text-sm">৳{booking.totalPrice.toLocaleString()}</td>
                    <td className="p-4 text-center">
                      <span className={`inline-block px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-wider border ${
                        booking.status === 'accepted' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        booking.status === 'rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                        'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => openConfirmationModal(booking, 'accept')}
                          disabled={booking.status === 'accepted'}
                          className={`px-3 py-1.5 font-black text-[10px] uppercase tracking-wide rounded-lg transition-all ${
                            booking.status === 'accepted'
                              ? 'bg-zinc-900 text-zinc-700 cursor-not-allowed border border-zinc-800/50'
                              : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-950/50'
                          }`}
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => openConfirmationModal(booking, 'reject')}
                          disabled={booking.status === 'rejected'}
                          className={`px-3 py-1.5 font-black text-[10px] uppercase tracking-wide rounded-lg transition-all border ${
                            booking.status === 'rejected'
                              ? 'bg-zinc-900 text-zinc-700 cursor-not-allowed border border-zinc-800/50'
                              : 'bg-transparent border-red-500/20 text-red-400 hover:bg-red-500/10'
                          }`}
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="block md:hidden divide-y divide-zinc-800/50">
            {currentItems.map((booking) => (
              <div key={booking._id} className="p-5 space-y-4 bg-transparent text-xs">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-sm font-black text-indigo-400">{booking.ticketTitle}</h3>
                    <p className="text-white font-extrabold">{booking.userName}</p>
                    <p className="text-zinc-500 font-semibold text-[11px]">{booking.userEmail}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded text-[9px] font-black uppercase tracking-wider border ${
                    booking.status === 'accepted' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    booking.status === 'rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                    'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}>
                    {booking.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-zinc-950/40 p-3 rounded-xl border border-zinc-800/60 text-[11px]">
                  <div>
                    <span className="text-zinc-500 block font-bold text-[9px] uppercase tracking-wider">Quantity</span>
                    <span className="font-extrabold text-zinc-300">{booking.bookingQuantity} Units</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block font-bold text-[9px] uppercase tracking-wider">Total Price</span>
                    <span className="font-black text-white">৳{booking.totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <button
                    onClick={() => openConfirmationModal(booking, 'accept')}
                    disabled={booking.status === 'accepted'}
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-widest rounded-xl disabled:bg-zinc-900 disabled:text-zinc-700 disabled:cursor-not-allowed transition-all shadow-md"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => openConfirmationModal(booking, 'reject')}
                    disabled={booking.status === 'rejected'}
                    className="w-full py-2.5 bg-transparent border border-red-500/20 text-red-400 font-black text-xs uppercase tracking-widest rounded-xl disabled:bg-zinc-900 disabled:text-zinc-700 disabled:border-zinc-800 disabled:cursor-not-allowed transition-all"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 border-t border-zinc-800/60 bg-zinc-950/20">
              <span className="text-xs font-semibold text-zinc-500 text-center sm:text-left">
                Showing <span className="text-zinc-300 font-bold">{indexOfFirstItem + 1}</span> to{' '}
                <span className="text-zinc-300 font-bold">
                  {indexOfLastItem > filteredBookings.length ? filteredBookings.length : indexOfLastItem}
                </span>{' '}
                of <span className="text-zinc-300 font-bold">{filteredBookings.length}</span> Results
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 bg-zinc-900/60 border border-zinc-800 rounded-xl text-zinc-400 hover:text-white hover:border-zinc-600 transition-all disabled:opacity-20"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`h-8 w-8 text-xs font-bold rounded-xl transition-all ${
                      currentPage === i + 1
                        ? 'bg-zinc-100 text-zinc-950 font-black shadow-lg shadow-white/5'
                        : 'bg-zinc-900/60 text-zinc-400 border border-zinc-800 hover:border-zinc-600 hover:text-white'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 bg-zinc-900/60 border border-zinc-800 rounded-xl text-zinc-400 hover:text-white hover:border-zinc-600 transition-all disabled:opacity-20"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      <AnimatePresence>
        {modalConfig.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              key="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isUpdating && setModalConfig({ isOpen: false, type: null, booking: null })}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              key="modal-card"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl w-full max-w-sm relative z-10 shadow-2xl space-y-5 text-center"
            >
              <div className="flex justify-center">
                {modalConfig.type === 'accept' ? (
                  <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 shadow-inner">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                ) : (
                  <div className="p-3 bg-red-500/10 text-red-400 rounded-full border border-red-500/20 shadow-inner">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  {modalConfig.type === 'accept' ? 'Execute Approval' : 'Execute Rejection'}
                </h3>
                <p className="text-xs text-zinc-400 font-medium leading-relaxed">
                  Are you absolutely certain you want to toggle the status to <strong className="uppercase text-white font-extrabold">{modalConfig.type === 'accept' ? 'accepted' : 'rejected'}</strong> for{' '}
                  <strong className="text-indigo-400 font-bold">{modalConfig.booking?.ticketTitle}</strong>?
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  disabled={isUpdating}
                  onClick={() => setModalConfig({ isOpen: false, type: null, booking: null })}
                  className="py-2.5 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50 text-zinc-300 font-bold text-xs uppercase tracking-wider rounded-xl border border-zinc-800 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isUpdating}
                  onClick={handleStatusUpdate}
                  className={`py-2.5 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md ${
                    modalConfig.type === 'accept'
                      ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-950/40'
                      : 'bg-red-600 hover:bg-red-500 shadow-red-950/40'
                  } disabled:opacity-50`}
                >
                  {isUpdating ? 'Processing...' : 'Confirm'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}