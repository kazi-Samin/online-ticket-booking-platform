// 'use client';

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { X, ShoppingBag, AlertCircle, CheckCircle2, Plus, Minus } from 'lucide-react';
// import { authClient } from '@/lib/auth-client';
// import { bookingTicket } from '@/lib/actions/bookingTickets';
// import { toast } from 'react-toastify';
// import { useRouter } from 'next/navigation';


// export default function BookingModal({ ticket, onClose }) {
//   const router = useRouter();
//   // 🔐 Better-Auth Session Mock/Simulation Block (Real dynamic production auth value placeholder)
//   // Integrates with session payload data maps seamlessly
// const { data: session } =authClient.useSession();
// const user = session?.user;



//   const maxAvailable = ticket.quantity || 0;

//   // Set initial quantity safely. If stock is 0, initialize at 0.
//   const [quantity, setQuantity] = useState(maxAvailable > 0 ? 1 : 0);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errorMsg, setErrorMsg] = useState('');
//   const [success, setSuccess] = useState(false);

//   // Plus - Minus Control Handlers with Bounds Protection
//   const incrementQty = () => {
//     if (quantity < maxAvailable) {
//       setQuantity(prev => prev + 1);
//       setErrorMsg('');
//     } else {
//       setErrorMsg(`Booking quantity can't be greater than Ticket Quantity (${maxAvailable}).`);
//     }
//   };

//   const decrementQty = () => {
//     if (quantity > 1) {
//       setQuantity(prev => prev - 1);
//       setErrorMsg('');
//     }
//   };

//   // Real-time calculation submission processing handler
//   const handleBookingSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMsg('');

//     // Strict state logic guards validation
//     if (maxAvailable === 0) {
//       setErrorMsg('Ticket is entirely sold out. Action unauthorized.');
//       return;
//     }
//     if (quantity <= 0) {
//       setErrorMsg('Desired ticket quantity must be at least 1 unit.');
//       return;
//     }
//     if (quantity > maxAvailable) {
//       setErrorMsg(`Booking quantity can't be greater than Ticket Quantity (${maxAvailable}).`);
//       return;
//     }

//     setIsSubmitting(true);

//     // Dynamic Total Price Calculation
//     const calculatedTotal = quantity * (ticket.pricePerUnit || 0);

//     // 🎯 EXACT BACKEND MONGODB TARGET PAYLOAD OBJECT STRUCTURING
//     const bookingPayload = {
//       ticketId: ticket._id || ticket.id || "N/A", // Support database _id mapping
//       ticketTitle: ticket.title,
//       image: ticket.image || "https://i.ibb.co.com/rfcHK5ym/image.png",
//       userId: user?.id,
//       userEmail: user?.email,
//       userName: user?.name,
//       userRole: user?.role,
//       bookingQuantity: quantity,
//       totalPrice: calculatedTotal,
//       from: ticket.from,
//       to: ticket.to,
//       isFraud:user?.isFraud,
//       vendorId: ticket.vendorId,
//       departureDateTime: ticket.departureDateTime,
//       status: "pending", // Schema rules: "pending" | "accepted" | "rejected" | "paid"
//       createdAt: new Date().toISOString()
//     };

//     // 🚀 CONSOLE BLOCK: Ready to patch into MongoDB via server action or router route handler
//     // console.log("=== TARGET BACKEND BOOKING PAYLOAD ===");
//     // console.log(bookingPayload);
//     // console.log("======================================");



//     try {

//        const data = await bookingTicket(bookingPayload);

//     if(data.insertedID){
//       toast.success('Ticket booking request has been successfully submitted.');
//     }
//       // Simulate post network delay line framework layer
//       await new Promise(resolve => setTimeout(resolve, 1400));

//       setSuccess(true);
//       setTimeout(() => {
//         onClose();
//         router.push('/dashboard/user/booked-tickets');
//       }, 1800);

//     } catch (err) {
//       setErrorMsg('System interface error saving booking asset execution. Try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

//       {/* Dark Blur Overlay Frame wrapper */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         onClick={onClose}
//         className="absolute inset-0 bg-slate-950/50 backdrop-blur-md"
//       />

//       {/* Central Interactive Input Card sheet */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95, y: 15 }}
//         animate={{ opacity: 1, scale: 1, y: 0 }}
//         exit={{ opacity: 0, scale: 0.95, y: 15 }}
//         className="bg-white border-2 border-slate-900 w-full max-w-md rounded-[28px] shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] relative overflow-hidden z-10 p-6 text-left space-y-5"
//       >
//         {/* Header Block element */}
//         <div className="flex items-center justify-between border-b border-slate-100 pb-3">
//           <div className="flex items-center space-x-2.5 text-slate-900">
//             <div className="p-2 bg-[#1E3A8A]/5 text-[#1E3A8A] rounded-xl border border-[#1E3A8A]/10">
//               <ShoppingBag className="h-4 w-4" />
//             </div>
//             <h3 className="font-black text-sm uppercase tracking-wider text-slate-800">Confirm Reservation</h3>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-all border border-transparent hover:border-slate-200"
//           >
//             <X className="h-4 w-4" />
//           </button>
//         </div>

//         {success ? (
//           /* Success Indicator Layout View */
//           <motion.div
//             initial={{ opacity: 0, y: 5 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="py-8 flex flex-col items-center text-center space-y-3"
//           >
//             <div className="h-14 w-14 rounded-full bg-emerald-50 border-2 border-emerald-400 flex items-center justify-center text-emerald-500 shadow-md shadow-emerald-100">
//               <CheckCircle2 className="h-7 w-7 animate-pulse" />
//             </div>
//             <h4 className="font-black text-slate-900 text-lg tracking-tight">Booking Logged Safely</h4>
//             <p className="text-xs text-slate-400 font-semibold max-w-70">
//               Status mapped as <span className="text-emerald-400 font-black uppercase">Pending</span>. Payload data dispatched to system router.
//             </p>
//           </motion.div>
//         ) : (
//           /* Core Data Entry Input form container logic field */
//           <form onSubmit={handleBookingSubmit} className="space-y-4">

//             {/* Target Core Overview Block */}
//             <div className="bg-linear-to-r from-slate-50 to-slate-100/50 p-4 border border-slate-200 rounded-2xl relative overflow-hidden">
//               <div className="absolute top-0 right-0 w-16 h-16 bg-[#1E3A8A]/5 rounded-full blur-xl" />
//               <span className="text-[9px] text-slate-400 uppercase tracking-widest font-black block mb-0.5">Target Resource</span>
//               <p className="text-sm font-black text-slate-800 truncate">{ticket.title}</p>
//               <div className="flex items-center justify-between mt-1 pt-2 border-t border-slate-200/50 text-[11px] font-bold text-slate-500">
//                 <span>Unit Cost: ৳{ticket.pricePerUnit}</span>
//                 <span className={`px-2 py-0.5 rounded-md text-[10px] ${maxAvailable === 0 ? "bg-red-50 text-red-600 border border-red-100" : "bg-blue-50 text-[#1E3A8A] border border-[#1E3A8A]/10"}`}>
//                   Stock Pool: {maxAvailable} Left
//                 </span>
//               </div>
//             </div>

//             {/* Field Capture Input Segment: Colorful Counter Engine */}
//             <div className="space-y-2">
//               <label className="text-[10px] text-slate-400 uppercase tracking-widest font-black pl-0.5">Required Quantity</label>

//               <div className="flex items-center justify-between bg-slate-50 border-2 border-slate-200 p-2 rounded-2xl transition-all focus-within:border-slate-900">
//                 {/* Decrement Button */}
//                 <button
//                   type="button"
//                   onClick={decrementQty}
//                   disabled={quantity <= 1 || maxAvailable === 0}
//                   className="h-10 w-10 flex items-center justify-center bg-white border border-slate-200 hover:border-slate-400 active:bg-slate-100 text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl transition-all shadow-sm"
//                 >
//                   <Minus className="h-4 w-4 stroke-3" />
//                 </button>

//                 {/* Live Value Track */}
//                 <div className="text-center flex-1">
//                   <span className="text-base font-black text-slate-800 font-mono">
//                     {quantity}
//                   </span>
//                   <span className="text-[10px] text-slate-400 font-bold block -mt-1">Units Selected</span>
//                 </div>

//                 {/* Increment Button */}
//                 <button
//                   type="button"
//                   onClick={incrementQty}
//                   disabled={quantity >= maxAvailable || maxAvailable === 0}
//                   className="h-10 w-10 flex items-center justify-center bg-[#1E3A8A] hover:bg-teal-950 text-white disabled:opacity-30 disabled:cursor-not-allowed rounded-xl transition-all shadow-md shadow-blue-900/10"
//                 >
//                   <Plus className="h-4 w-4 stroke-3" />
//                 </button>
//               </div>
//             </div>

//             {/* Calculated Real-time Tariff projection ledger */}
//             <div className="bg-[#1E3A8A]/5 p-3.5 rounded-xl border border-[#1E3A8A]/10 flex justify-between items-center text-xs font-bold">
//               <span className="text-slate-500">Projected Base Total:</span>
//               <span className="text-base font-black text-emerald-400 tracking-tight">
//                 ৳{(quantity || 0) * (ticket.pricePerUnit || 0)}
//               </span>
//             </div>

//             {/* Error Notification system component */}
//             {errorMsg && (
//               <div className="flex items-center space-x-2 text-xs font-bold text-red-600 bg-red-50 p-3 rounded-xl border border-red-100">
//                 <AlertCircle className="h-4 w-4 shrink-0" />
//                 <span>{errorMsg}</span>
//               </div>
//             )}

//             {/* Execution Buttons Deck */}
//             <div className="flex items-center justify-end space-x-3 pt-2 border-t border-slate-100">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-400 hover:bg-slate-50 border border-transparent hover:border-slate-200 rounded-xl transition-all"
//               >
//                 Cancel
//               </button>

//               <button
//                 type="submit"
//                 disabled={isSubmitting || maxAvailable === 0}
//                 className="px-5 py-2.5 bg-[#1E3A8A] hover:bg-teal-950 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-md disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:bg-[#1E3A8A]"
//               >
//                 {isSubmitting ? "Syncing Ledger..." : maxAvailable === 0 ? "Out of Stock" : "Confirm Ledger"}
//               </button>
//             </div>

//           </form>
//         )}

//       </motion.div>
//     </div>
//   );
// }

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ShoppingBag, AlertCircle, CheckCircle2, Plus, Minus, Sparkles } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { bookingTicket } from '@/lib/actions/bookingTickets';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function BookingModal({ ticket, onClose }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const maxAvailable = ticket.quantity || 0;

  const [quantity, setQuantity] = useState(maxAvailable > 0 ? 1 : 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const incrementQty = () => {
    if (quantity < maxAvailable) {
      setQuantity(prev => prev + 1);
      setErrorMsg('');
    } else {
      setErrorMsg(`Booking quantity can't be greater than Ticket Quantity (${maxAvailable}).`);
    }
  };

  const decrementQty = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
      setErrorMsg('');
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (maxAvailable === 0) {
      setErrorMsg('Ticket is entirely sold out. Action unauthorized.');
      return;
    }
    if (quantity <= 0) {
      setErrorMsg('Desired ticket quantity must be at least 1 unit.');
      return;
    }
    if (quantity > maxAvailable) {
      setErrorMsg(`Booking quantity can't be greater than Ticket Quantity (${maxAvailable}).`);
      return;
    }

    setIsSubmitting(true);
    const calculatedTotal = quantity * (ticket.pricePerUnit || 0);

    const bookingPayload = {
      ticketId: ticket._id || ticket.id || "N/A",
      ticketTitle: ticket.title,
      image: ticket.image || "https://i.ibb.co.com/rfcHK5ym/image.png",
      userId: user?.id,
      userEmail: user?.email,
      userName: user?.name,
      userRole: user?.role,
      bookingQuantity: quantity,
      totalPrice: calculatedTotal,
      from: ticket.from,
      to: ticket.to,
      isFraud: user?.isFraud,
      vendorId: ticket.vendorId,
      departureDateTime: ticket.departureDateTime,
      status: "pending",
      createdAt: new Date().toISOString()
    };

    try {
      const data = await bookingTicket(bookingPayload);

      if (data.insertedID) {
        toast.success('Ticket booking request has been successfully submitted.');
      }
      
      await new Promise(resolve => setTimeout(resolve, 1400));

      setSuccess(true);
      setTimeout(() => {
        onClose();
        router.push('/dashboard/user/booked-tickets');
      }, 1800);

    } catch (err) {
      setErrorMsg('System interface error saving booking asset execution. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-slate-900/90 dark:bg-slate-950/80 border border-slate-800 rounded-[28px] shadow-2xl relative overflow-hidden z-10 p-6 text-left space-y-5 w-full max-w-md backdrop-blur-xl"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-600/10 rounded-full blur-xl pointer-events-none" />

        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center space-x-2.5 text-slate-100">
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <h3 className="font-black text-xs sm:text-sm uppercase tracking-widest text-slate-200 flex items-center gap-1.5">
              Confirm Reservation <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-500 hover:bg-slate-800 hover:text-slate-200 transition-all border border-transparent hover:border-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {success ? (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-8 flex flex-col items-center text-center space-y-3"
          >
            <div className="h-14 w-14 rounded-full bg-emerald-950/30 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-900/20">
              <CheckCircle2 className="h-7 w-7 animate-pulse" />
            </div>
            <h4 className="font-black text-slate-100 text-lg tracking-tight">Booking Logged Safely</h4>
            <p className="text-xs text-slate-400 font-semibold max-w-xs">
              Status mapped as <span className="text-orange-500 font-black uppercase">Pending</span>. Payload data dispatched to system router.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div className="bg-slate-950/50 p-4 border border-slate-800/60 rounded-2xl relative overflow-hidden">
              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-black block mb-1">Target Resource</span>
              <p className="text-sm font-bold text-slate-100 truncate">{ticket.title}</p>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/80 text-[11px] font-bold text-slate-400">
                <span>Unit Cost: ৳{ticket.pricePerUnit}</span>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${maxAvailable === 0 ? "bg-red-950/40 text-red-400 border border-red-900/30" : "bg-blue-950/40 text-blue-400 border border-blue-900/30"}`}>
                  Stock Pool: {maxAvailable} Left
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-slate-500 uppercase tracking-widest font-black pl-0.5">Required Quantity</label>

              <div className="flex items-center justify-between bg-slate-950/40 border border-slate-800 p-2 rounded-2xl transition-all focus-within:border-blue-500/50">
                <button
                  type="button"
                  onClick={decrementQty}
                  disabled={quantity <= 1 || maxAvailable === 0}
                  className="h-10 w-10 flex items-center justify-center bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 active:scale-95 text-slate-300 disabled:opacity-20 disabled:cursor-not-allowed disabled:scale-100 rounded-xl transition-all shadow-sm"
                >
                  <Minus className="h-4 w-4 stroke-[3]" />
                </button>

                <div className="text-center flex-1">
                  <span className="text-base font-black text-slate-100 font-mono block">
                    {quantity}
                  </span>
                  <span className="text-[10px] text-slate-500 font-bold block -mt-0.5">Units Selected</span>
                </div>

                <button
                  type="button"
                  onClick={incrementQty}
                  disabled={quantity >= maxAvailable || maxAvailable === 0}
                  className="h-10 w-10 flex items-center justify-center bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white disabled:opacity-20 disabled:cursor-not-allowed rounded-xl transition-all shadow-md shadow-blue-900/20 active:scale-95 disabled:scale-100"
                >
                  <Plus className="h-4 w-4 stroke-[3]" />
                </button>
              </div>
            </div>

            <div className="bg-blue-500/5 p-3.5 rounded-xl border border-blue-500/10 flex justify-between items-center text-xs font-bold">
              <span className="text-slate-400">Projected Base Total:</span>
              <span className="text-base font-black text-orange-500 tracking-tight">
                ৳{(quantity || 0) * (ticket.pricePerUnit || 0)}
              </span>
            </div>

            {errorMsg && (
              <div className="flex items-center space-x-2 text-xs font-bold text-red-400 bg-red-950/20 p-3 rounded-xl border border-red-900/30">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="flex items-center justify-end space-x-3 pt-2 border-t border-slate-800/60">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-200 rounded-xl transition-all"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting || maxAvailable === 0}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-orange-500 hover:to-orange-600 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-teal-600"
              >
                {isSubmitting ? "Syncing Ledger..." : maxAvailable === 0 ? "Out of Stock" : "Confirm Ledger"}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}