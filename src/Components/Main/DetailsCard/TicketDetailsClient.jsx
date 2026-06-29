
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ArrowRight, ShieldCheck, MapPin, Sparkles, AlertTriangle, ArrowLeft, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import BookingModal from './BookingModal';
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';

export default function TicketDetailsClient({ ticket }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ passed: false, text: "Calculating..." });

  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    const calculateTime = () => {
      const difference = new Date(ticket.departureDateTime) - new Date();

      if (difference <= 0) {
        setTimeLeft({ passed: true, text: "EXPIRED" });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      if (days > 0) {
        setTimeLeft({ passed: false, text: `${days}d ${hours}h ${minutes}m ${seconds}s` });
      } else {
        setTimeLeft({ passed: false, text: `${hours}h ${minutes}m ${seconds}s` });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [ticket.departureDateTime]);

  const dateObj = ticket.departureDateTime ? new Date(ticket.departureDateTime) : null;
  const formattedDate = dateObj ? dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A';
  const formattedTime = dateObj ? dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) : 'N/A';

  const isExpired = timeLeft.passed;
  const isOutOfStock = (ticket.quantity || 0) <= 0;

  const isPassenger = user?.role === 'user';
  const isStaffOrVendor = user?.role === 'vendor' || user?.role === 'admin';

  const isBookingDisabled = isExpired || isOutOfStock || !user || !isPassenger;

  return (
    <div className="space-y-6 text-left selection:bg-[#FF6B35]/20 bg-[#09090b] min-h-screen p-4 sm:p-6 text-zinc-100">
      <div className="flex items-center justify-between pb-2">
        <button
          onClick={() => router.back()}
          className="group flex items-center space-x-2 px-4 py-2.5 bg-zinc-900/50 backdrop-blur-md hover:bg-zinc-800/80 border border-zinc-800 rounded-xl text-xs font-bold text-zinc-400 transition-all shadow-sm"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1 text-indigo-400" />
          <span>Back to Fleet</span>
        </button>
        <span className="text-[11px] font-black tracking-widest uppercase bg-indigo-950/40 text-indigo-400 px-3 py-1.5 rounded-lg border border-indigo-900/50">
          Ticket Management Console
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900/40 backdrop-blur-md p-3 rounded-2xl border border-zinc-800 shadow-xl overflow-hidden relative group"
          >
            <div className="relative h-48 sm:h-64 w-full rounded-xl overflow-hidden bg-zinc-950">
              <Image 
                width={500} 
                height={500}
                src={ticket.image || "https://i.ibb.co.com/rfcHK5ym/image.png"}
                alt={ticket.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
              <span className="absolute top-3 left-3 bg-indigo-600 border border-indigo-500/50 text-white text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-lg shadow-lg">
                {ticket.transportType}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 p-6 rounded-3xl shadow-2xl space-y-5 relative overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#FF6B35]">
                Live Reservation
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            </div>

            <div className={`p-4 rounded-xl border transition-all text-center ${
              isExpired
                ? "bg-red-950/20 border-red-900/50 text-red-400"
                : "bg-zinc-950/80 border-zinc-800 text-white"
            }`}>
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 block mb-1">Gateway Countdown</span>
              <p className="text-xl font-black tracking-wider font-mono text-[#FF6B35]">
                {timeLeft.text}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-zinc-950/40 p-3.5 rounded-xl border border-zinc-800/80 text-center">
                <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold block mb-1">Available</span>
                <span className={`text-base font-black tracking-tight ${isOutOfStock ? "text-red-500" : "text-indigo-400"}`}>
                  {ticket.quantity || 0} Seats
                </span>
              </div>
              <div className="bg-zinc-950/40 p-3.5 rounded-xl border border-zinc-800/80 text-center">
                <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold block mb-1">Fare</span>
                <span className="text-base font-black text-zinc-100 tracking-tight">
                  ৳{ticket.pricePerUnit}
                </span>
              </div>
            </div>

            {(isExpired || isOutOfStock) && (
              <div className="flex items-center space-x-2 text-[11px] font-bold text-red-400 bg-red-950/20 p-3 rounded-xl border border-red-900/40">
                <AlertTriangle className="h-4 w-4 shrink-0 text-red-400" />
                <span>{isExpired ? "Departure schedule has passed." : "Sold out!"}</span>
              </div>
            )}

            {isStaffOrVendor && !(isExpired || isOutOfStock) && (
              <div className="flex items-start space-x-2 text-[11px] font-bold text-amber-400 bg-amber-950/20 p-3 rounded-xl border border-amber-900/40">
                <Lock className="h-4 w-4 shrink-0 mt-0.5 text-amber-500" />
                <span>
                  Booking restricted! Admins and Vendors are not permitted to reserve passenger tickets.
                </span>
              </div>
            )}

            {!user && (
              <div className="flex items-center space-x-2 text-[11px] font-bold text-zinc-400 bg-zinc-950/40 p-3 rounded-xl border border-zinc-800">
                <Lock className="h-4 w-4 shrink-0 text-zinc-500" />
                <span>Please log in as a passenger to purchase tickets.</span>
              </div>
            )}

            <motion.button
              whileHover={!isBookingDisabled ? { scale: 1.01 } : {}}
              whileTap={!isBookingDisabled ? { scale: 0.99 } : {}}
              onClick={() => setIsModalOpen(true)}
              disabled={isBookingDisabled}
              className="w-full flex items-center justify-center space-x-2 py-4 bg-indigo-600 border border-indigo-500/30 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-indigo-950/50 hover:bg-indigo-700 disabled:opacity-20 disabled:bg-zinc-800 disabled:border-transparent disabled:text-zinc-500 disabled:cursor-not-allowed"
            >
              <ShieldCheck className="h-4 w-4 text-[#FF6B35]" />
              <span>
                {isStaffOrVendor ? "Restricted for Management" : "Book This Ticket"}
              </span>
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-7 bg-zinc-900/40 backdrop-blur-md border border-zinc-800 p-6 sm:p-8 rounded-3xl shadow-xl space-y-6"
        >
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block mb-1">Fleet Designation</span>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
              {ticket.title}
            </h1>
          </div>

          <div className="space-y-2.5">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block pl-0.5">Route Network Blueprint</span>
            <div className="grid grid-cols-1 md:grid-cols-7 items-center gap-4 bg-zinc-950/40 p-5 border border-zinc-800/60 rounded-xl">
              <div className="md:col-span-3 flex items-center space-x-3">
                <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl">
                  <MapPin className="h-4 w-4 text-zinc-500" />
                </div>
                <div>
                  <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold block">Origin</span>
                  <span className="text-sm font-extrabold text-zinc-200">{ticket.from}</span>
                </div>
              </div>
              <div className="hidden md:flex md:col-span-1 justify-center">
                <div className="h-8 w-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-md">
                  <ArrowRight className="h-3.5 w-3.5 text-[#FF6B35]" />
                </div>
              </div>
              <div className="md:col-span-3 flex gap-2 items-center space-x-3 md:justify-end md:text-right">
                <div className="md:order-2 p-2.5 bg-indigo-950/40 rounded-xl border border-indigo-900/40">
                  <MapPin className="h-4 w-4 text-indigo-400" />
                </div>
                <div className="md:order-1">
                  <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold block">Destination Terminal</span>
                  <span className="text-sm font-extrabold text-indigo-400">{ticket.to}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3.5 p-4 rounded-xl border border-zinc-800 bg-zinc-950/20 shadow-inner">
              <div className="p-2.5 bg-indigo-950/40 text-indigo-400 rounded-xl border border-indigo-900/30">
                <Calendar className="h-4 w-4" />
              </div>
              <div>
                <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold block">Departure Date</span>
                <span className="text-xs font-black text-zinc-200">{formattedDate}</span>
              </div>
            </div>
            <div className="flex items-center space-x-3.5 p-4 rounded-xl border border-zinc-800 bg-zinc-950/20 shadow-inner">
              <div className="p-2.5 bg-orange-950/30 text-[#FF6B35] rounded-xl border border-orange-900/20">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold block">Departure Time</span>
                <span className="text-xs font-black text-zinc-200">{formattedTime}</span>
              </div>
            </div>
          </div>

          {ticket.perks && ticket.perks.length > 0 && (
            <div className="space-y-2.5 pt-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block pl-0.5">Premium Included Perks</span>
              <div className="flex flex-wrap gap-2">
                {ticket.perks.map((perk, idx) => (
                  <div key={idx} className="flex items-center space-x-1.5 text-xs font-bold px-3 py-2 bg-zinc-900/60 text-zinc-300 border border-zinc-800 rounded-xl shadow-sm">
                    <Sparkles className="h-3.5 w-3.5 text-[#FF6B35]" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <BookingModal
            ticket={ticket}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}