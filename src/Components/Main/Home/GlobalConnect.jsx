// 'use client'

// import React from 'react';
// import { motion } from 'framer-motion';
// import { Globe, Users, Zap, ShieldCheck } from 'lucide-react';
// import Image from 'next/image';

// export default function GlobalConnect() {
//   // ম্যাপের ইমেজের রেশিও অনুযায়ী নিখুঁত লোকেশন পিন পয়েন্ট
//   const activeNodes = [
//     { id: 1, top: '34%', left: '22%', label: 'North America' },
//     { id: 2, top: '28%', left: '50%', label: 'Europe' },
//     { id: 3, top: '44%', left: '72%', label: 'Bangladesh (HQ)' },
//     { id: 4, top: '68%', left: '32%', label: 'South America' },
//     { id: 5, top: '72%', left: '84%', label: 'Australia' },
//   ];

//   return (
//     <section className="w-full py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden border-t border-b border-slate-200/60 dark:border-slate-900">
//       <div className="max-w-6xl mx-auto px-4">

//         {/* সেকশন হেডার */}
//         <div className="text-center max-w-2xl mx-auto mb-16">
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 text-[#1E3A8A] dark:text-blue-400 text-xs font-black uppercase tracking-widest mb-4"
//           >
//             <Globe className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: '12s' }} />
//             Global Infrastructure
//           </motion.div>

//           <motion.h2
//             initial={{ opacity: 0, y: 10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.1 }}
//             className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950 dark:text-slate-100"
//           >
//             Connecting Transit Networks Globally
//           </motion.h2>

//           <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 font-medium leading-relaxed">
//             Our optimized routing servers span across multiple continents, ensuring sub-millisecond data execution and seamless ticketing experiences everywhere.
//           </p>
//         </div>

//         {/* ম্যাপ কন্টেনার কার্ড */}
//         <div className="relative rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-10 shadow-sm overflow-hidden">

//           {/* ব্যাকগ্রাউন্ড ডেকোরেティブ ব্লার গ্লো */}
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 bg-blue-500/5 dark:bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

//           {/* 🗺️ ম্যাপ ইমেজ ও অ্যানিমেশন এরিয়া */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.98 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="relative w-full aspect-[2/1] min-h-[320px] max-h-[500px] flex items-center justify-center bg-slate-50/50 dark:bg-slate-950/30 rounded-2xl overflow-hidden"
//           >
//             {/* 🖼️ নিখুঁত ওয়ার্ল্ড ম্যাপ ইমেজ ব্যাকগ্রাউন্ড (ডার্ক মোডে ইনভার্ট হবে ট্রানজিশনসহ) */}
//             <Image width={600} height={400}
//               src="https://i.ibb.co.com/8L2HbgdN/image.png"
//               alt="World Map Grid"
//               className="absolute inset-0 w-full h-full object-contain opacity-60 dark:opacity-20 dark:invert transition-all duration-300 pointer-events-none"
//             />

//             {/* 📍 অ্যানিমেটেড লোকেশন নোডস (Pulse & Label Effect) */}
//             {activeNodes.map((node) => (
//               <div
//                 key={node.id}
//                 className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 group"
//                 style={{ top: node.top, left: node.left }}
//               >
//                 {/* পালস অ্যানিমেশন */}
//                 <span className="absolute inline-flex h-6 w-6 -top-1.5 -left-1.5 rounded-full bg-[#FF6B35]/30 animate-ping opacity-75" />

//                 {/* কোর পয়েন্ট */}
//                 <span className="relative flex h-3 w-3 rounded-full bg-[#FF6B35] shadow-md shadow-orange-500/50" />

//                 {/* হাই-কন্ট্রাস্ট ডার্ক ও লাইট লেবেল */}
//                 <div className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-950 dark:bg-slate-100 text-slate-100 dark:text-slate-950 font-black text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-xl shadow-lg border border-slate-800 dark:border-slate-200 opacity-100 transition-all duration-200">
//                   {node.label}
//                 </div>
//               </div>
//             ))}
//           </motion.div>

//           {/* বটম ইনফো গ্রিড */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-slate-100 dark:border-slate-800/80 pt-8 mt-6">
//             <div className="flex items-center gap-3.5 pl-2">
//               <div className="p-3 bg-slate-50 dark:bg-slate-950 text-[#1E3A8A] dark:text-blue-400 rounded-2xl border border-slate-100 dark:border-slate-800">
//                 <Users className="h-5 w-5" />
//               </div>
//               <div>
//                 <div className="text-xl font-black text-slate-950 dark:text-slate-100">10M+</div>
//                 <div className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wide">Active Commuters</div>
//               </div>
//             </div>

//             <div className="flex items-center gap-3.5 pl-2">
//               <div className="p-3 bg-slate-50 dark:bg-slate-950 text-[#FF6B35] rounded-2xl border border-slate-100 dark:border-slate-800">
//                 <Zap className="h-5 w-5" />
//               </div>
//               <div>
//                 <div className="text-xl font-black text-slate-950 dark:text-slate-100">&lt; 45ms</div>
//                 <div className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wide">Server Response Time</div>
//               </div>
//             </div>

//             <div className="flex items-center gap-3.5 pl-2">
//               <div className="p-3 bg-slate-50 dark:bg-slate-950 text-emerald-600 dark:text-emerald-400 rounded-2xl border border-slate-100 dark:border-slate-800">
//                 <ShieldCheck className="h-5 w-5" />
//               </div>
//               <div>
//                 <div className="text-xl font-black text-slate-950 dark:text-slate-100">99.99%</div>
//                 <div className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wide">Transaction Uptime</div>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import React from 'react';
import { HiLightningBolt, HiShieldCheck, HiStatusOnline, HiGlobe } from 'react-icons/hi';

export default function GlobalConnect() {
  const connectionStats = [
    { 
      id: 1, 
      title: 'Active Routing Engine', 
      desc: 'Secure Unified API Request Pipeline', 
      value: '1,240+', 
      status: 'Node Active', 
      icon: HiStatusOnline, 
      color: 'text-emerald-600 dark:text-emerald-400', 
      bg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/50', 
      metricColor: 'text-emerald-600 dark:text-emerald-400/90' 
    },
    { 
      id: 2, 
      title: 'Database Distributed Clusters', 
      desc: 'Real-time MongoDB Atlas Network Synchronization', 
      value: '99.9%', 
      status: 'Connected', 
      icon: HiGlobe, 
      color: 'text-teal-600 dark:text-teal-400', 
      bg: 'bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-900/50', 
      metricColor: 'text-teal-600 dark:text-teal-400/90' 
    },
    { 
      id: 3, 
      title: 'Advanced Session Cryptography', 
      desc: 'Multi-layer Authentication Protocols Verified', 
      value: '256-bit', 
      status: 'Verified', 
      icon: HiShieldCheck, 
      color: 'text-cyan-600 dark:text-cyan-400', 
      bg: 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-900/50', 
      metricColor: 'text-cyan-600 dark:text-cyan-400/90' 
    },
  ];

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 py-24 border-t border-slate-200 dark:border-slate-900 transition-colors duration-300 relative overflow-hidden flex justify-center items-center">
      
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-teal-500/10 dark:bg-teal-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-violet-400/10 dark:bg-violet-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-xs uppercase tracking-widest mb-3">
              <HiLightningBolt className="text-sm animate-pulse" />
              System Core Performance
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Global Centralized <span className="text-teal-600 dark:text-teal-400">Data Architecture</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-3 leading-relaxed font-medium">
              Experience flawless real-time ticket query synchronization through distributed nodes and high-availability backup framework layers.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {connectionStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.id}
                className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-3xl border border-slate-200 dark:border-slate-800/80 rounded-2xl p-8 hover:border-slate-300 dark:hover:border-slate-700/60 transition-all duration-300 shadow-md dark:shadow-xl group hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${stat.bg}`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md bg-slate-100/80 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 ${stat.color}`}>
                    {stat.status}
                  </span>
                </div>

                <div className="mb-4">
                  <span className={`text-3xl font-black tracking-tight ${stat.metricColor}`}>
                    {stat.value}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 transition-colors group-hover:text-teal-600 dark:group-hover:text-teal-400">
                  {stat.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
                  {stat.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}