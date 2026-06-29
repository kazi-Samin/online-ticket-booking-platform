// "use client";

// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, EffectFade } from "swiper/modules";
// import { motion } from "framer-motion";
// // import SearchCard from "../SearchCard";

// // Swiper styles আমদানি
// import "swiper/css";
// import "swiper/css/effect-fade";
// import Image from "next/image";
// import SearchCard from "./SearchCard";

// export default function HeroSlider() {
//   // স্লাইডারের ৪টি অবজেক্ট ডাটা (বাস, ট্রেন, প্লেন, লঞ্চ)
//   const slidesData = [
//     {
//       id: 1,
//       title: "Fly High, Explore Further",
//       subtitle: "Find Cheap Flights & Airline Tickets Easily",
//       image: "https://i.ibb.co.com/TsmpNNh/photo-1436491865332-7a61a109cc05-q-80-w-1600-auto-format-fit-crop.jpg", // Plane
//     },
//     {
//       id: 2,
//       title: "Scenic Routes & Smooth Rides",
//       subtitle: "Book Premium Intercity Bus Tickets Instantly",
//       image: "https://i.ibb.co.com/dZbnVjB/photo-1544620347-c4fd4a3d5957-q-80-w-1600-auto-format-fit-crop.jpg", // Bus
//     },
//     {
//       id: 3,
//       title: "Track Your Next Adventure",
//       subtitle: "Comfortable and Secure Train Journey Across the Country",
//       image: "https://i.ibb.co.com/tpsrs1rP/photo-1474487548417-781cb71495f3-q-80-w-1600-auto-format-fit-crop.jpg", // Train
//     },
//     {
//       id: 4,
//       title: "Sail the Serene Waters",
//       subtitle: "Get Top-Tier Launch Cabins & Deck Slots Effortlessly",
//       image: "https://i.ibb.co.com/Kpxzy09n/photo-1507525428034-b723cf961d3e-q-80-w-1600-auto-format-fit-crop.jpg", // Launch / Cruise Water concept
//     },
//   ];

//   return (
//     <div className="relative w-full h-[20vh] min-h-[480px] bg-zinc-900 overflow-hidden">

//       {/* 🔮 Swiper Background Engine */}
//       <Swiper
//         modules={[Autoplay, EffectFade]}
//         effect={"fade"}
//         autoplay={{
//           delay: 5000,
//           disableOnInteraction: false,
//         }}
//         loop={true}
//         className="absolute inset-0 w-full h-full z-0"
//       >
//         {slidesData.map((slide) => (
//           <SwiperSlide key={slide.id} className="relative w-full h-full">
//             {/* ডার্ক গ্রেডিয়েন্ট ওভারলে যাতে টেক্সট এবং কার্ড ক্রিস্টাল ক্লিয়ার দেখায় */}
//             <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-zinc-950/80 z-10" />
//             <Image width={1000} height={1000}
//               src={slide.image}
//               alt={slide.title}
//               className="w-full h-full object-cover object-center"
//             />
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* 🏯 ফোরগ্রাউন্ড কন্টেন্ট লেয়ার (স্লাইডারের উপরে যা থাকবে) */}
//       <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 text-center">

//         {/* টাইটেল এবং সাবটাইটেল সেকশন (Framer Motion দিয়ে মসৃণ এন্ট্রান্স) */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
//           className="mb-8 max-w-2xl text-white"
//         >
//           <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight drop-shadow-md">
//             Where to <span className="text-[#FF6B35]">Explore?</span>
//           </h1>
//           <p className="text-sm sm:text-base text-zinc-200 mt-3 drop-shadow-sm font-medium">
//             Find Cheap Bus, Train, Flight & Launch Tickets in Bangladesh
//           </p>
//         </motion.div>

//         {/* 💳 ইন্টারেক্টিভ সার্চ কার্ড মেকানিজম */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.96, y: 30 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
//           className="w-full flex justify-center"
//         >
//           <SearchCard />
//         </motion.div>

//       </div>
//     </div>
//   );
// }
"use client";

import React, { useState } from 'react';
import { FaTrain, FaPlane, FaShip, FaSearch } from 'react-icons/fa';
import { FaBusSimple } from 'react-icons/fa6';

export default function Hero() {
  const [activeTab, setActiveTab] = useState('all');

  const vehicleTypes = [
    { id: 'all', label: 'All Vehicles', icon: null },
    { id: 'bus', label: 'Bus', icon: FaBusSimple },
    { id: 'train', label: 'Train', icon: FaTrain },
    { id: 'flight', label: 'Flight', icon: FaPlane },
    { id: 'launch', label: 'Launch', icon: FaShip },
  ];

  return (
    // ডার্ক মোডে এখানে zinc-950 এর বদলে তোমার স্ক্রিনশটের আসল কালার slate-950 দেওয়া হলো
    <div className="relative w-full min-h-[640px] bg-slate-50 dark:bg-slate-950 flex items-center justify-center overflow-hidden transition-colors duration-300">
      
      <div className="absolute inset-0 z-0 w-full h-full">
        <img 
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1920" 
          alt="Premium Travel Destination" 
          className="w-full h-full object-cover opacity-35 dark:opacity-10 scale-100"
        />
        {/* গ্রেডিয়েন্ট টোনটা কুচকুচে কালোর বদলে slate-950 দিয়ে ম্যাচ করা হলো */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/20 via-slate-100/60 to-slate-50 dark:from-slate-950/40 dark:via-slate-950/80 dark:to-slate-950" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-6">
          Where to <span className="text-indigo-600 dark:text-indigo-400">Explore?</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-14 font-medium">
          Find Cheap Bus, Train, Flight & Launch Tickets in Bangladesh
        </p>

        {/* সার্চ কার্ডের ব্যাকগ্রাউন্ড ডার্ক মোডে পারফেক্টলি slate-900/60 করা হয়েছে যা image_34d0ba.png এর কার্ডের সাথে মিলবে */}
        <div className="w-full bg-white/80 dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200 dark:border-slate-800/80 p-6 sm:p-10 rounded-3xl shadow-2xl text-left transition-all duration-300">
          
          {/* ট্যাব সেকশনের বর্ডার */}
          <div className="flex flex-wrap gap-2.5 mb-8 border-b border-slate-200 dark:border-slate-800/80 pb-5">
            {vehicleTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setActiveTab(type.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                    activeTab === type.id
                      ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20'
                      : 'bg-slate-100 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {type.label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end w-full">
            
            {/* From Input Container */}
            <div className="md:col-span-4 space-y-2.5 w-full">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest pl-1">From</label>
              <div className="relative w-full">
                <input 
                  type="text" 
                  placeholder="Where from?" 
                  className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm transition-all text-sm font-medium"
                />
              </div>
            </div>

            {/* To Input Container */}
            <div className="md:col-span-4 space-y-2.5 w-full">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest pl-1">To</label>
              <div className="relative w-full">
                <input 
                  type="text" 
                  placeholder="Where to?" 
                  className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm transition-all text-sm font-medium"
                />
              </div>
            </div>

            {/* Find Tickets Button */}
            <div className="md:col-span-4 w-full">
              <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/10 active:scale-[0.99] text-sm tracking-wide">
                <FaSearch className="h-4 w-4" />
                Find Best Tickets
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}