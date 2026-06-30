// 'use client'

// import React, { useEffect, useRef, useState } from 'react';
// import { Users, Ticket, Route, ShieldAlert } from 'lucide-react';
// import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

// const stats = [
//   { icon: <Users className="h-6 w-6 text-emerald-400" />, target: 500, suffix: "K+", label: "Happy Travellers" },
//   { icon: <Ticket className="h-6 w-6 text-blue-400" />, target: 1.2, suffix: "M+", label: "Tickets Sold" },
//   { icon: <Route className="h-6 w-6 text-emerald-400" />, target: 250, suffix: "+", label: "Routes Covered" },
//   { icon: <ShieldAlert className="h-6 w-6 text-purple-400" />, target: 99.9, suffix: "%", label: "Reliability Rate" },
// ];

// // 🔢 রিয়েল-টাইম স্ক্রোল কাউন্টার সাব-কমপোনেন্ট
// function AnimatedNumber({ value }) {
//   const ref = useRef(null);
//   const motionValue = useMotionValue(0);
//   // স্মুথ স্প্রিং ট্রানজিশন (ড্যাম্পিং আর স্টিফনেস দিয়ে গতি কন্ট্রোল করা হয়েছে)
//   const springValue = useSpring(motionValue, { stiffness: 40, damping: 20 });
//   const isInView = useInView(ref, { once: true, margin: "-100px" });

//   useEffect(() => {
//     if (isInView) {
//       motionValue.set(value);
//     }
//   }, [isInView, value, motionValue]);

//   useEffect(() => {
//     return springValue.on("change", (latest) => {
//       if (ref.current) {
//         // যদি ডেসিমাল নাম্বার হয় (যেমন ১.২ বা ৯৯.৯) তবে ১ ঘর ফিক্সড রাখবে, নয়তো পুর্ণসংখ্যা দেখাবে
//         ref.current.textContent = latest % 1 === 0 ? Math.floor(latest) : latest.toFixed(1);
//       }
//     });
//   }, [springValue]);

//   return <span ref={ref}>0</span>;
// }

// export function StatsCounter() {
//   return (
//     <section className="w-full bg-gradient-to-br from-[#1E3A8A] via-[#162A65] to-slate-950 text-white py-16 px-4 relative overflow-hidden transition-all duration-300">

//       {/* 🔮 ব্যাকগ্রাউন্ড গ্লো ডেকোরেশন */}
//       <div className="absolute top-1/2 left-1/4 -translate-y-1/2 h-64 w-64 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
//       <div className="absolute top-1/2 right-1/4 -translate-y-1/2 h-64 w-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

//       <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center relative z-10">
//         {stats.map((stat, i) => (
//           <motion.div
//             key={i}
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: i * 0.1 }}
//             whileHover={{
//               y: -8,
//               backgroundColor: "rgba(255, 255, 255, 0.08)",
//               borderColor: "rgba(255, 255, 255, 0.2)"
//             }}
//             className="flex flex-col items-center gap-2 p-6 rounded-[24px] bg-white/5 border border-white/5 backdrop-blur-sm cursor-pointer transition-all duration-300 shadow-lg group"
//           >
//             {/* 🛸 আইকন কন্টেইনার (হোভার করলে হালকা ঘুরবে এবং গ্লো করবে) */}
//             <div className="p-3 bg-white/10 rounded-2xl mb-1 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
//               {stat.icon}
//             </div>

//             {/* 📈 কাউন্টিং নাম্বার ও সাফিক্স */}
//             <div className="text-3xl sm:text-4xl font-black tracking-tight text-white group-hover:text-emerald-400 transition-colors duration-300 flex items-center justify-center">
//               <AnimatedNumber value={stat.target} />
//               <span>{stat.suffix}</span>
//             </div>

//             {/* 🏷️ লেবেল */}
//             <span className="text-[11px] sm:text-xs text-slate-300 dark:text-slate-400 font-bold tracking-widest uppercase transition-colors group-hover:text-white">
//               {stat.label}
//             </span>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }
'use client'

import React, { useEffect, useRef } from 'react';
import { Users, Ticket, Route, ShieldAlert } from 'lucide-react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

const stats = [
  { icon: <Users className="h-7 w-7 text-teal-600 dark:text-teal-400 group-hover:text-teal-500 dark:group-hover:text-teal-300 transition-colors" />, target: 500, suffix: "K+", label: "Happy Travellers" },
  { icon: <Ticket className="h-7 w-7 text-violet-600 dark:text-violet-400 group-hover:text-violet-500 dark:group-hover:text-violet-300 transition-colors" />, target: 1.2, suffix: "M+", label: "Tickets Sold" },
  { icon: <Route className="h-7 w-7 text-fuchsia-600 dark:text-fuchsia-400 group-hover:text-fuchsia-500 dark:group-hover:text-fuchsia-300 transition-colors" />, target: 250, suffix: "+", label: "Routes Covered" },
  { icon: <ShieldAlert className="h-7 w-7 text-rose-600 dark:text-rose-400 group-hover:text-rose-500 dark:group-hover:text-rose-300 transition-colors" />, target: 99.9, suffix: "%", label: "Reliability Rate" },
];

function AnimatedNumber({ value }) {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 40, damping: 20 });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = latest % 1 === 0 ? Math.floor(latest) : latest.toFixed(1);
      }
    });
  }, [springValue]);

  return <span ref={ref}>0</span>;
}

export function StatsCounter() {
  return (
    <section className="w-full bg-slate-50 dark:bg-slate-950 py-24 px-4 relative overflow-hidden flex justify-center items-center transition-colors duration-300">
      
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative z-10">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            whileHover={{ y: -12 }}
            className="group relative flex flex-col items-center justify-center gap-5 p-8 rounded-3xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/50 backdrop-blur-xl hover:bg-slate-100/50 dark:hover:bg-slate-900/80 hover:border-teal-500/30 hover:shadow-[0_0_40px_rgba(99,102,241,0.05)] dark:hover:shadow-[0_0_40px_rgba(99,102,241,0.1)] transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500" />

            <div className="p-4 bg-slate-100/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/50 rounded-2xl group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500 ease-out shadow-sm dark:shadow-lg">
              {stat.icon}
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="text-4xl lg:text-5xl font-extrabold tracking-tighter text-slate-900 dark:text-slate-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-teal-600 group-hover:to-violet-500 dark:group-hover:from-teal-400 dark:group-hover:to-violet-400 transition-all duration-300 flex items-center justify-center">
                <AnimatedNumber value={stat.target} />
                <span>{stat.suffix}</span>
              </div>

              <span className="text-[11px] lg:text-xs text-slate-400 dark:text-slate-500 font-bold tracking-[0.2em] uppercase mt-1 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">
                {stat.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}