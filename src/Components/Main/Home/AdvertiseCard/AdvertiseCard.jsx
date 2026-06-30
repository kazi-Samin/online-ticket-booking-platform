"use client";

import React, { useEffect, useState } from "react";
import { getAdvertiseTickets } from "@/lib/api/advertiseTickets";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Sparkles, ArrowUpRight, Calendar, Clock } from "lucide-react";

// Swiper এর প্রয়োজনীয় স্টাইল ইম্পোর্ট
import "swiper/css";
import "swiper/css/pagination";

export default function AdvertiseCard() {
  const router = useRouter();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdvertiseTickets = async () => {
      try {
        const response = await getAdvertiseTickets();

        // 🎯 সেফটি চেক পাইপলাইন
        let data = [];
        if (Array.isArray(response)) {
          data = response;
        } else if (response && Array.isArray(response.tickets)) {
          data = response.tickets;
        } else if (response && Array.isArray(response.data)) {
          data = response.data; 
        }

        setTickets(data);
      } catch (error) {
        console.error("Error fetching advertised tickets:", error);
        setTickets([]); 
      } finally {
        setLoading(false);
      }
    };
    fetchAdvertiseTickets();
  }, []);

  // 🗓️ ফরম্যাটেড ডেট জেনারেটর (যেমন: 23 Jun 2026)
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // ⏰ ফরম্যাটেড টাইম জেনারেটর (যেমন: 08:30 PM)
  const formatTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (loading) {
    return (
      <div className="w-full py-20 flex justify-center items-center bg-[#09090b]">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-teal-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!tickets || tickets.length === 0) return null;

  return (
    // 🎨 Fixed UI: Synced to deep obsidian gradient backgrounds matching TicketCore design identity
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#09090b] via-slate-950 to-[#09090b] text-slate-100 transition-colors duration-300 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-teal-600/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">

        {/* 🌟 সেকশন হেডার */}
        <div className="text-center md:text-left mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-black uppercase tracking-widest mb-3">
            <Sparkles className="h-3.5 w-3.5 filter drop-shadow-[0_0_4px_rgba(129,140,248,0.6)]" />
            Featured Destinations
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Top Picked Packages
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-xl font-medium">
            Exclusive routes handpicked by our experts for your luxury and comfort. Book now before slots run out!
          </p>
        </div>

        {/* 🎚️ Swiper Premium Slider Container */}
        <div className="relative px-2 py-4">
          <Swiper
            modules={[Autoplay, Pagination]}
            spacing={24}
            slidesPerView={1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
            className="advertised-swiper !pb-14"
          >
            {tickets.map((ticket) => (
              <SwiperSlide key={ticket._id || ticket.id}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => router.push(`/all-tickets/${ticket._id || ticket.id}`)}
                  className="group relative h-[470px] w-full rounded-[32px] overflow-hidden shadow-2xl border border-slate-900/60 bg-slate-950 cursor-pointer flex flex-col justify-end"
                >

                  {/* 🖼️ ফুল-স্কেল ব্যাকগ্রাউন্ড ইমেজ লেয়ার */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={ticket.image || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800"}
                      alt={ticket.title || "Destination"}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10" />
                  </div>

                  {/* 🚏 ট্রান্সপোর্ট টাইপ ফ্লোটিং ব্যাজ */}
                  <div className="absolute top-5 left-5 z-20 px-3.5 py-1.5 bg-slate-950/80 backdrop-blur-md border border-slate-800 text-teal-400 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg">
                    {ticket.transportType || "Transit"}
                  </div>

                  {/* 💎 গ্লাসমরফিক ইনফোカード */}
                  <div className="relative z-20 m-5 p-5 bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-800/40 shadow-2xl transition-all">

                    {/* ⏱️ ডেট এবং টাইম সেকশন */}
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-2.5 font-bold">
                      <span className="flex items-center gap-1.5 bg-slate-950/40 border border-slate-800/60 px-2.5 py-1 rounded-lg">
                        <Calendar className="h-3.5 w-3.5 text-teal-400" />
                        {formatDate(ticket.departureDateTime)}
                      </span>
                      <span className="flex items-center gap-1.5 bg-slate-950/40 border border-slate-800/60 px-2.5 py-1 rounded-lg">
                        <Clock className="h-3.5 w-3.5 text-teal-400" />
                        {formatTime(ticket.departureDateTime)}
                      </span>
                    </div>

                    {/* টাইটেল এবং অ্যারো আইকন */}
                    <div className="flex items-start justify-between gap-2 mb-2 text-left">
                      <h3 className="text-base font-black text-white line-clamp-1 group-hover:text-teal-400 transition-colors duration-300">
                        {ticket.title}
                      </h3>
                      <div className="p-1.5 bg-slate-950 border border-slate-800 text-slate-300 group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-500 rounded-xl transition-all shadow-sm shrink-0">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>

                    {/* রুট ট্র্যাকিং */}
                    <div className="flex items-center gap-1.5 text-xs font-black text-slate-500 uppercase tracking-wide mb-4 text-left">
                      <span>{ticket.from || "Start"}</span>
                      <span className="text-teal-500/60 font-medium">→</span>
                      <span>{ticket.to || "End"}</span>
                    </div>

                    {/* Perks / সুযোগ-সুবিধা */}
                    {ticket.perks && ticket.perks.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {ticket.perks.slice(0, 2).map((perk, index) => (
                          <span
                            key={index}
                            className="text-[10px] font-black px-2.5 py-1 bg-slate-950/50 text-teal-300/90 rounded-lg border border-teal-500/10 uppercase tracking-wide"
                          >
                            ✨ {perk}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* 💳 ফুটার গ্রিড */}
                    <div className="flex items-center justify-between pt-3.5 border-t border-slate-800/60">
                      <div className="text-left">
                        <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                          Price per unit
                        </span>
                        <span className="text-lg font-black text-teal-400 tracking-tight">
                          ৳{ticket.pricePerUnit}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                          Available Slots
                        </span>
                        <span className="inline-block text-xs font-black px-2.5 py-1 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-lg mt-0.5">
                          {ticket.quantity} Left
                        </span>
                      </div>
                    </div>

                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>

      {/* ペジネーションスタイル */}
      <style jsx global>{`
        .advertised-swiper .swiper-pagination-bullet-active {
          background: #6366f1 !important;
          width: 24px !important;
          border-radius: 6px !important;
        }
        .advertised-swiper .swiper-pagination-bullet {
          background: #3f3f46;
          opacity: 0.8;
        }
      `}</style>
    </section>
  );
}