'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Compass, Heart, Award, Sparkles, Target, Milestone, Globe, Zap, Users, ArrowRight } from 'lucide-react';
import Image from 'next/image';

// --- System Core Values synced with your Brand Palette ---
const uniqueValues = [
  { 
    icon: <Zap className="h-6 w-6 text-teal-500" />, 
    title: "Instant Verification", 
    desc: "Built on automated high-speed nodes, ensuring real-time seat allocations and absolute synchronization with transport operators." 
  },
  { 
    icon: <ShieldCheck className="h-6 w-6 text-teal-500" />, 
    title: "Cryptographic Protection", 
    desc: "Your transactional state and user profile layers are isolated through next-gen end-to-end security architectures." 
  },
  { 
    icon: <Users className="h-6 w-6 text-teal-500" />, 
    title: "Commuter Centricity", 
    desc: "A completely unified interface engineered to eliminate terminal queues and optimize your operational transit flow." 
  },
];

const platformStats = [
  { count: "10M+", label: "Seats Reserved" },
  { count: "64", label: "Districts Synced" },
  { count: "99.9%", label: "Gateway Uptime" },
];

export default function AboutPage() {
  return (
    <main className="bg-slate-50 dark:bg-[#070a13] text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-500 overflow-hidden">
      
      {/* 🚀 Hero Section */}
      <section className="relative pt-36 pb-24 px-4 border-b border-slate-200/60 dark:border-slate-900/50 bg-slate-100/30 dark:bg-[#05070f]">
        <div className="absolute inset-0 opacity-20 dark:opacity-30 bg-[linear-gradient(to_right,#4f46e50a_1px,transparent_1px),linear-gradient(to_bottom,#4f46e50a_1px,transparent_1px)] [background-size:32px_32px]" />
        
        {/* Deep Glowing Accent Ball */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-teal-600/10 dark:bg-teal-600/10 rounded-full blur-[130px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Our Corporate DNA
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black tracking-tight text-slate-950 dark:text-white leading-[1.15]"
          >
            Pioneering the Future of Infrastructure in <span className="text-teal-600 dark:text-teal-400 relative inline-block">Bangladesh</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-medium"
          >
            TicketCore is reimagining multi-modal travel networks. We construct highly-scalable cloud architectures that consolidate every bus, train, flight, and launch transit ecosystem into a frictionless portal.
          </motion.p>
        </div>
      </section>

      {/* 🎯 Our Mission Section */}
      <section className="py-24 px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-xs uppercase tracking-widest">
            <Milestone className="h-4 w-4" /> Comprehensive Mission
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950 dark:text-white leading-tight">
            Eliminating Intercity Friction, One Route at a Time
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base font-medium">
            Conceived as a technical response to the structural constraints of legacy physical terminals, TicketCore merges high-speed processing clusters with simplified user layers.
          </p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base font-medium">
            We adhere to structural parameters of absolute financial transparency, lightning-fast instant refunds, and real-time live synchronization vectors.
          </p>
          
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-slate-900">
            {platformStats.map((stat, sIdx) => (
              <div key={sIdx} className="space-y-0.5">
                <div className="text-2xl sm:text-3xl font-black text-teal-600 dark:text-teal-400 tracking-tight">{stat.count}</div>
                <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 🛠️ Image Grid - Fixed Broken URL with High-Res Unsplash Production Link */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-7 grid grid-cols-12 gap-4 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-teal-600/10 to-transparent blur-3xl pointer-events-none -z-10" />
          
          <div className="col-span-7 relative h-[280px] sm:h-[380px] rounded-[24px] overflow-hidden shadow-2xl border border-slate-200/60 dark:border-slate-800/80">
            <Image
              src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800"
              alt="Integrated Platform Engineering"
              fill
              priority
              className="object-cover"
              sizes="(max-w-768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex items-end p-6">
              <div>
                <p className="text-white font-black text-base tracking-tight">Synchronous System Live</p>
                <p className="text-slate-300 font-medium text-xs">Tracking inter-district schedules with 0.5s precision.</p>
              </div>
            </div>
          </div>
          
          <div className="col-span-5 flex flex-col gap-4">
            <div className="relative flex-1 bg-slate-100 dark:bg-slate-900/60 backdrop-blur-md rounded-[24px] border border-slate-200/60 dark:border-slate-800/60 p-6 flex flex-col justify-center text-center group hover:border-teal-500 transition-colors duration-300">
              <Globe className="h-8 w-8 text-teal-600 dark:text-teal-400 mx-auto mb-3" />
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Node Sync</div>
              <div className="text-sm font-black mt-1 text-slate-950 dark:text-white">Seamless Multi-Channel Operations</div>
            </div>
            
            <div className="relative flex-1 bg-teal-600 rounded-[24px] p-6 flex flex-col justify-end text-white shadow-lg shadow-teal-600/20">
              <Award className="h-6 w-6 text-teal-200 mb-3" />
              <p className="font-bold text-xs sm:text-sm leading-snug tracking-tight">Safeguarding and managing high-volume localized transit metrics effortlessly.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 💎 Core Values Section */}
      <section className="py-24 bg-slate-100 dark:bg-slate-950 border-t border-b border-slate-200 dark:border-slate-900 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
            <div className="space-y-1">
              <div className="text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Target className="h-3.5 w-3.5" /> Foundational Framework
              </div>
              <h2 className="text-3xl font-black text-slate-950 dark:text-white tracking-tight sm:text-4xl">
                The Protocols Directing Our Core Ecosystem
              </h2>
            </div>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm font-semibold text-xs sm:text-sm leading-relaxed">
              TicketCore operates under strict microservice principles to ensure maximum structural throughput and platform safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {uniqueValues.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-[#0c0f1d] p-8 rounded-[24px] border border-slate-200/80 dark:border-slate-900 shadow-md shadow-slate-200/30 dark:shadow-none hover:border-teal-500/50 dark:hover:border-teal-500/30 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-900/80 w-fit rounded-xl mb-6 border border-slate-100 dark:border-slate-800/80 group-hover:bg-teal-500/10 transition-colors duration-300">
                    {v.icon}
                  </div>
                  <h3 className="text-xl font-black text-slate-950 dark:text-white tracking-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {v.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-3 leading-relaxed font-semibold">
                    {v.desc}
                  </p>
                </div>
                
                <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-900 flex items-center justify-between text-slate-400 dark:text-slate-600 group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors">
                  <span className="text-[10px] font-black uppercase tracking-wider">Protocol TC-0{i+1}</span>
                  <ArrowRight className="h-4 w-4 transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}