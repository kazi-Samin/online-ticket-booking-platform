// 'use client'

// import React from 'react';
// import { ShieldCheck, Clock, BadgePercent, HeartHandshake, Sparkles } from 'lucide-react';
// import { motion } from 'framer-motion';

// const features = [
//   {
//     icon: <ShieldCheck className="h-6 w-6 text-blue-500" />,
//     badge: "Security First",
//     title: "100% Secure Booking Pipeline",
//     desc: "Your payments and transactions are tightly guarded with bank-grade SSL encrypted protocols. Travel with absolute peace of mind."
//   },
//   {
//     icon: <Clock className="h-6 w-6 text-[#FF6B35]" />,
//     badge: "Always Available",
//     title: "24/7 Elite Instant Support",
//     desc: "No matter if it's midnight or dawn, our dedicated transit experts are just one click away to smooth out your booking emergencies."
//   },
//   {
//     icon: <BadgePercent className="h-6 w-6 text-emerald-500" />,
//     badge: "Best Rates",
//     title: "Transparent Pricing, No Hidden Fees",
//     desc: "What you see is exactly what you pay. Enjoy verified cashback, exclusive student discounts, and zero dynamic pricing traps."
//   },
//   {
//     icon: <HeartHandshake className="h-6 w-6 text-purple-500" />,
//     badge: "Flexibility",
//     title: "Seamless Easy Cancellation",
//     desc: "Sudden plan changes? Don't stress. Refund or reschedule your tickets instantly through our streamlined single-tap automation panel."
//   }
// ];

// export function WhyChooseUs() {
//   return (
//     <section className="py-24 px-4 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300 overflow-hidden">
//       <div className="max-w-6xl mx-auto relative">

//         {/* 🏔️ প্রিমিয়াম সেকশন হেডার */}
//         <div className="text-center mb-20 relative z-10">
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/30 text-[#FF6B35] text-xs font-black uppercase tracking-widest mb-3"
//           >
//             <Sparkles className="h-3.5 w-3.5" />
//             The TicketBari Edge
//           </motion.div>
//           <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
//             Why Book With Us?
//           </h2>
//           <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 mt-3 max-w-xl mx-auto font-medium">
//             We abandoned boring tables to bring you the smoothest, safest, and most intelligent transit ecosystem in Bangladesh.
//           </p>
//         </div>

//         {/* 🛤️ ট্র্যাকিং টাইমলাইন এরিয়া */}
//         <div className="relative">

//           {/* 📍 সেন্ট্রাল কানেক্টিং লাইন */}
//           <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-zinc-200 dark:bg-[#1E3A8A]/40 transform md:-translate-x-1/2 z-0" />

//           <div className="space-y-12 md:space-y-0">
//             {features.map((f, i) => {
//               const isEven = i % 2 === 0;

//               return (
//                 <div key={i} className="flex flex-col md:flex-row items-stretch relative z-10 md:mb-16 last:mb-0">

//                   {/* বাম সাইডের কন্টেন্ট */}
//                   <div className={`w-full md:w-1/2 flex ${isEven ? 'md:justify-end md:pr-16' : 'md:justify-start md:pl-16 md:order-2'} pl-12 md:pl-0`}>
//                     <motion.div
//                       initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
//                       whileInView={{ opacity: 1, x: 0, y: 0 }}
//                       viewport={{ once: true, margin: "-100px" }}
//                       transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
//                       className="w-full max-w-md bg-zinc-100/90 dark:bg-zinc-900/90 p-6 sm:p-8 rounded-[24px] border border-zinc-200 dark:border-zinc-800 shadow-md hover:shadow-lg dark:hover:border-[#1E3A8A] transition-all duration-500 group"
//                     >
//                       <span className="text-[10px] font-black uppercase tracking-widest text-[#FF6B35] block mb-1">
//                         {f.badge}
//                       </span>

//                       {/* 🔥 ফিক্সড টাইটেল: ডাইরেক্ট text-black আর dark:text-white দিয়ে দিয়েছি */}
//                       <h3 className="text-lg sm:text-xl font-black text-black dark:text-white tracking-tight group-hover:text-[#FF6B35] transition-colors duration-300">
//                         {f.title}
//                       </h3>

//                       <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed font-semibold">
//                         {f.desc}
//                       </p>
//                     </motion.div>
//                   </div>

//                   {/* 🎯 সেন্টার গ্লোয়িং নাম্বার এবং আইকন নোড */}
//                   <div className="absolute left-0 md:left-1/2 top-2 md:top-1/2 transform -translate-x-0 md:-translate-x-1/2 md:-translate-y-1/2 flex items-center justify-center z-20">
//                     <motion.div
//                       initial={{ scale: 0.6, opacity: 0 }}
//                       whileInView={{ scale: 1, opacity: 1 }}
//                       viewport={{ once: true }}
//                       transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
//                       className="relative flex items-center justify-center"
//                     >
//                       {/* মেইন আইকন সার্কেল */}
//                       <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-700 flex items-center justify-center shadow-md text-zinc-700 dark:text-zinc-300">
//                         {f.icon}
//                       </div>

//                       {/* নাম্বার ব্যাজ ট্র্যাকার */}
//                       <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center text-[10px] font-black border border-white dark:border-zinc-900 shadow-sm">
//                         {i + 1}
//                       </div>
//                     </motion.div>
//                   </div>

//                   {/* রাইট সাইডের জাস্ট খালি প্লেসহোল্ডার ব্যালেন্স রাখার জন্য */}
//                   <div className={`hidden md:block w-full md:w-1/2 ${isEven ? 'md:order-2' : ''}`} />

//                 </div>
//               );
//             })}
//           </div>

//         </div>

//       </div>
//     </section>
//   );
// }
'use client'

import React from 'react';
import { ShieldCheck, Clock, BadgePercent, HeartHandshake, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <ShieldCheck className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
    badge: "Security First",
    title: "100% Secure Booking Pipeline",
    desc: "Your payments and transactions are tightly guarded with bank-grade SSL encrypted protocols. Travel with absolute peace of mind."
  },
  {
    icon: <Clock className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
    badge: "Always Available",
    title: "24/7 Elite Instant Support",
    desc: "No matter if it's midnight or dawn, our dedicated transit experts are just one click away to smooth out your booking emergencies."
  },
  {
    icon: <BadgePercent className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
    badge: "Best Rates",
    title: "Transparent Pricing, No Hidden Fees",
    desc: "What you see is exactly what you pay. Enjoy verified cashback, exclusive student discounts, and zero dynamic pricing traps."
  },
  {
    icon: <HeartHandshake className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
    badge: "Flexibility",
    title: "Seamless Easy Cancellation",
    desc: "Sudden plan changes? Don't stress. Refund or reschedule your tickets instantly through our streamlined single-tap automation panel."
  }
];

export function WhyChooseUs() {
  return (
    <section className="py-24 px-4 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-hidden border-t border-slate-200 dark:border-slate-900 relative flex flex-col justify-center items-center" suppressHydrationWarning>
      
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-violet-500/10 dark:bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10" suppressHydrationWarning>

        <div className="text-center mb-20 relative z-10" suppressHydrationWarning>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-widest mb-4 animate-pulse"
          >
            <Sparkles className="h-3.5 w-3.5" />
            The TicketCore Edge
          </motion.div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Why Book With Us?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-4 max-w-xl mx-auto font-medium leading-relaxed">
            We abandoned boring tables to bring you the smoothest, safest, and most intelligent transit ecosystem in Bangladesh.
          </p>
        </div>

        <div className="relative" suppressHydrationWarning>

          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-900 md:-translate-x-1/2 z-0" />

          <div className="space-y-12 md:space-y-0" suppressHydrationWarning>
            {features.map((f, i) => {
              const isEven = i % 2 === 0;

              return (
                <div key={i} className="flex flex-col md:flex-row items-stretch relative z-10 md:mb-20 last:mb-0" suppressHydrationWarning>

                  <div className={`w-full md:w-1/2 flex ${isEven ? 'md:justify-end md:pr-16' : 'md:justify-start md:pl-16 md:order-2'} pl-12 md:pl-0`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full max-w-md bg-white dark:bg-slate-900/40 backdrop-blur-3xl p-6 sm:p-8 rounded-[24px] border border-slate-200 dark:border-slate-800/80 shadow-md dark:shadow-xl hover:shadow-xl dark:hover:shadow-2xl hover:border-indigo-500/30 hover:shadow-indigo-500/5 transition-all duration-500 group"
                    >
                      <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 block mb-2">
                        {f.badge}
                      </span>

                      <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                        {f.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed font-medium">
                        {f.desc}
                      </p>
                    </motion.div>
                  </div>

                  <div className="absolute left-0 md:left-1/2 top-2 md:top-1/2 transform -translate-x-0 md:-translate-x-1/2 md:-translate-y-1/2 flex items-center justify-center z-20">
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
                      className="relative flex items-center justify-center"
                    >
                      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-md dark:shadow-2xl text-indigo-600 dark:text-indigo-400 transform transition-transform duration-500 group-hover:rotate-12">
                        {f.icon}
                      </div>

                      <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-md bg-indigo-600 text-white flex items-center justify-center text-[10px] font-black border border-white dark:border-slate-950 shadow-md">
                        {i + 1}
                      </div>
                    </motion.div>
                  </div>

                  <div className={`hidden md:block w-full md:w-1/2 ${isEven ? 'md:order-2' : ''}`} />

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}