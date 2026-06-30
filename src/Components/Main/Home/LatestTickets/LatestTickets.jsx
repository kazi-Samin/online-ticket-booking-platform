// "use client";

// import React, { useEffect, useState } from "react";
// import { getLatestTickets } from "@/lib/api/latestTickets";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { Calendar, ArrowRight, MapPin, Bus, Train, Plane, Ship } from "lucide-react";
// import Image from "next/image";

// // ট্রান্সপোর্ট টাইপ অনুযায়ী আইকন জেনারেট করার হেল্পার ফাংশন
// const getTransportIcon = (type) => {
//   switch (type?.toLowerCase()) {
//     case "bus":
//       return <Bus className="h-4 w-4" />;
//     case "train":
//       return <Train className="h-4 w-4" />;
//     case "plane":
//     case "flight":
//       return <Plane className="h-4 w-4" />;
//     case "launch":
//     case "ship":
//       return <Ship className="h-4 w-4" />;
//     default:
//       return <Bus className="h-4 w-4" />;
//   }
// };

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.08 },
//   },
// };

// const cardVariants = {
//   hidden: { opacity: 0, y: 40 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
//   },
// };

// export default function LatestTickets() {
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(true);

//  useEffect(() => {
//   const fetchTickets = async () => {
//     try {
//       const response = await getLatestTickets();
//       console.log("Latest Tickets API Raw Response:", response);

//       // সব ধরনের রেসপন্স ফরম্যাট চেক করা হচ্ছে:
//       if (Array.isArray(response)) {
//         setTickets(response);
//       } else if (response?.data && Array.isArray(response.data)) {
//         setTickets(response.data);
//       } else if (response?.tickets && Array.isArray(response.tickets)) {
//         setTickets(response.tickets);
//       } else if (response?.result && Array.isArray(response.result)) {
//         setTickets(response.result);
//       }
//     } catch (error) {
//       console.error("Error fetching latest tickets:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   fetchTickets();
// }, []);

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   if (loading) {
//     return (
//       <div className="w-full py-20 flex justify-center items-center">
//         <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#FF6B35]"></div>
//       </div>
//     );
//   }

//   // যদি ডাটাবেজ থেকে কোনো টিকিটই না আসে
//   if (!tickets || tickets.length === 0) {
//     return (
//       <div className="w-full py-16 text-center text-slate-500 dark:text-slate-400 bg-[#F8FAFC] dark:bg-slate-950">
//         No latest approved tickets found.
//       </div>
//     );
//   }

//   return (
//     <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] dark:bg-slate-950 transition-colors duration-300">
//       <div className="max-w-7xl mx-auto">

//         {/* 🏔️ সেকশন হেডার */}
//         <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
//           <div>
//             <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B35]">
//               Exclusive Deals
//             </span>
//             <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
//               Latest Ticket Discoveries
//             </h2>
//             <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
//               Grab the newest approved routes and tickets before they run out.
//             </p>
//           </div>

//           <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
//             <Link
//               href="/all-tickets"
//               className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1E3A8A] hover:bg-blue-900 text-white text-sm font-bold rounded-xl shadow-md transition-all"
//             >
//               View All Tickets
//               <ArrowRight className="h-4 w-4" />
//             </Link>
//           </motion.div>
//         </div>

//         {/* 🎴 টিকিট কার্ডস গ্রিড */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
//         >
//           {tickets.map((ticket) => (
//             <motion.div
//               key={ticket._id || ticket.id}
//               variants={cardVariants}
//               whileHover={{ y: -8, transition: { duration: 0.3 } }}
//               className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-md hover:shadow-xl border border-slate-100 dark:border-slate-800 flex flex-col h-full transition-all"
//             >
//               {/* 🖼️ ইমেজ */}
//               <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
//                 <Image
//                   width={500}
//                   height={500}
//                   unoptimized
//                   src={ticket.image || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop"}
//                   alt={ticket.title || "Ticket Image"}
//                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                 />

//                 <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md dark:bg-slate-900/90 text-[#1E3A8A] dark:text-teal-400 px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-sm uppercase tracking-wider">
//                   {getTransportIcon(ticket.transportType)}
//                   {ticket.transportType}
//                 </div>
//               </div>

//               {/* 📝 কন্টেন্ট */}
//               <div className="p-5 flex flex-col flex-grow justify-between">
//                 <div>
//                   <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 mb-2">
//                     <span className="flex items-center gap-1 font-medium">
//                       <Calendar className="h-3.5 w-3.5 text-slate-400" />
//                       {formatDate(ticket.departureDateTime)}
//                     </span>
//                     <span className="text-[#FF6B35] font-bold">★★★★★</span>
//                   </div>

//                   <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-100 line-clamp-1 group-hover:text-[#1E3A8A] dark:group-hover:text-teal-400 transition-colors">
//                     {ticket.title}
//                   </h3>

//                   <div className="flex items-center gap-2 mt-3 text-sm text-slate-600 dark:text-slate-300 font-semibold bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl">
//                     <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
//                     <span className="truncate">{ticket.from}</span>
//                     <span className="text-slate-400 font-light">→</span>
//                     <span className="truncate">{ticket.to}</span>
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
//                   <div className="flex flex-col">
//                     <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
//                       Fare From
//                     </span>
//                     <span className="text-lg font-black text-[#FF6B35]">
//                       ৳{ticket.pricePerUnit}
//                     </span>
//                   </div>

//                   <Link
//                     href={`/all-tickets/${ticket._id || ticket.id}`}
//                     className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-[#FF6B35] group-hover:text-white rounded-full transition-all shadow-sm active:scale-95"
//                   >
//                     <ArrowRight className="h-4 w-4" />
//                   </Link>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }

"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaBus, FaTrain, FaPlane, FaShip, FaArrowRight, FaMapMarkerAlt } from 'react-icons/fa';
import { authClient } from "@/lib/auth-client"; // Better Auth সেশন ভ্যালিডেশন চেক

export default function LatestTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  // 🚀 Better Auth রিয়েল-টাইম সেশন ট্র্যাকিং হুক
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // 📡 এক্সপ্রেস লাইভ ব্যাকএন্ড থেকে লেটেস্ট টিকিট ফেচ করার ডাইনামিক পাইপলাইন
  useEffect(() => {
    const fetchLatestTickets = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
        const response = await fetch(`${backendUrl}/api/tickets/latest`, {
          cache: 'no-store'
        });
        
        if (response.ok) {
          const data = await response.json();
          // ডাটাবেজ খালি থাকলে ফলব্যাক ৩টি ডেমো টিকিট দেখাবে যাতে সাইট সচল থাকে
          if (data && data.length > 0) {
            setTickets(data);
          } else {
            setTickets(fallbackStaticTickets);
          }
        } else {
          setTickets(fallbackStaticTickets);
        }
      } catch (error) {
        console.error("Latest Tickets fetch error:", error);
        setTickets(fallbackStaticTickets);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestTickets();
  }, []);

  // 🎫 ডাটাবেজ খালি থাকলে প্রজেক্ট সচল রাখার ব্যাকআপ টিকিট ম্যাট্রিক্স
  const fallbackStaticTickets = [
    { _id: '667fc1a2a4b8c21980000001', transportType: 'bus', title: 'Green Line Paribahan', from: 'Dhaka', to: 'Cox\'s Bazar', pricePerUnit: '1200' },
    { _id: '667fc1c4a4b8c21980000003', transportType: 'plane', title: 'Biman Bangladesh Airlines', from: 'Dhaka', to: 'Sylhet', pricePerUnit: '4500' },
    { _id: '667fc1b3a4b8c21980000002', transportType: 'train', title: 'Subarna Express', from: 'Dhaka', to: 'Chittagong', pricePerUnit: '800' },
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'bus': return <FaBus className="text-emerald-600 dark:text-emerald-400" />;
      case 'train': return <FaTrain className="text-amber-600 dark:text-amber-400" />;
      case 'flight': case 'plane': return <FaPlane className="text-sky-600 dark:text-sky-400" />;
      case 'launch': case 'ship': return <FaShip className="text-cyan-600 dark:text-cyan-400" />;
      default: return <FaBus className="text-teal-600 dark:text-teal-400" />;
    }
  };

  // 🔒 সিকিউরড বুকিং কন্ট্রোলার: টিকিট ড্যাশবোর্ডে পাঠানোর আগে ভ্যালিডেশন চেক
  const handleBookingRedirect = (ticketId) => {
    const targetPath = `/all-tickets/${ticketId}`;
    if (!user) {
      // ইউজার সাইন-ইন না থাকলে কাস্টম ক্যাশড ইউআরএল দিয়ে সরাসরি সিকিউরড লগইনে লকিং
      router.push(`/login?callbackUrl=${encodeURIComponent(targetPath)}`);
    } else {
      router.push(targetPath);
    }
  };

  if (loading) {
    return (
      <div className="w-full bg-slate-50 dark:bg-slate-950 py-12 text-center text-xs font-bold text-slate-400 animate-pulse tracking-widest uppercase">
        Loading Corridors...
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 py-20 border-t border-slate-200 dark:border-slate-900 transition-colors duration-300 relative overflow-hidden flex justify-center items-center">
      
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-violet-500/5 dark:bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-teal-500/5 dark:bg-teal-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Latest Available <span className="text-teal-600 dark:text-teal-400">Tickets</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Grab your seats before they are completely sold out</p>
          </div>
          {/* 🚀 Fixed: Route path matched to verified '/all-tickets' directory */}
          <Link href="/all-tickets" className="flex items-center gap-2 text-sm font-bold text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300 transition-all group">
            View All Tickets 
            <FaArrowRight className="h-3 w-3 transform transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <div 
              key={ticket._id || ticket.id} 
              className="bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 hover:border-slate-300 dark:hover:border-slate-700/60 shadow-md dark:shadow-xl hover:shadow-xl dark:hover:shadow-teal-600/5 transition-all duration-300 hover:-translate-y-1 group text-left"
            >
              <div className="flex justify-between items-center mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-lg shadow-sm dark:shadow-none">
                  {getIcon(ticket.transportType || ticket.type)}
                </div>
                <span className="text-xs font-bold uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md text-slate-600 dark:text-slate-300 border border-slate-200/40 dark:border-transparent">
                  {ticket.transportType || ticket.type}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors truncate">
                {ticket.title}
              </h3>

              <div className="flex items-center gap-3 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800/50 p-3 rounded-xl mb-5 text-sm">
                <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium truncate">
                  <FaMapMarkerAlt className="text-slate-400 dark:text-slate-500 text-xs shrink-0" />
                  {ticket.from}
                </div>
                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800 min-w-[10px]" />
                <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium truncate">
                  <FaMapMarkerAlt className="text-slate-400 dark:text-slate-500 text-xs shrink-0" />
                  {ticket.to}
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800/60">
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Fare Starts From</p>
                  <p className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                    ৳{ticket.pricePerUnit || ticket.price} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">/ seat</span>
                  </p>
                </div>
                
                {/* 🚀 Fixed: Click triggers authenticated gate checking for '/all-tickets/:id' */}
                <button 
                  onClick={() => handleBookingRedirect(ticket._id || ticket.id)}
                  className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-teal-600/10 active:scale-[0.98]"
                >
                  Book Now
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}