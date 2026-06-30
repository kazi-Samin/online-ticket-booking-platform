"use client";

import React, { useState, useEffect } from 'react';
import { FaTrain, FaPlane, FaShip, FaSearch } from 'react-icons/fa';
import { FaBusSimple } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';
import { getTransportImage } from '@/lib/defaultImages';
import Link from 'next/link';

export default function HeroSlider() {
  const [activeTab, setActiveTab] = useState('all');
  const [currentImage, setCurrentImage] = useState(
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1920"
  );

  const vehicleTypes = [
    { id: 'all', label: 'All Vehicles', icon: null, image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1920" },
    { id: 'bus', label: 'Bus', icon: FaBusSimple, image: getTransportImage('bus') },
    { id: 'train', label: 'Train', icon: FaTrain, image: getTransportImage('train') },
    { id: 'flight', label: 'Flight', icon: FaPlane, image: getTransportImage('flight') },
    { id: 'launch', label: 'Launch', icon: FaShip, image: getTransportImage('launch') },
  ];

  // When tab changes, update the background image smoothly
  useEffect(() => {
    const activeVehicle = vehicleTypes.find(v => v.id === activeTab);
    if (activeVehicle) {
      setCurrentImage(activeVehicle.image);
    }
  }, [activeTab]);

  return (
    <div className="relative w-full min-h-[680px] bg-slate-50 dark:bg-slate-950 flex items-center justify-center overflow-hidden transition-colors duration-300 selection:bg-teal-500/30">
      
      {/* 🌌 Dynamic Background System */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <AnimatePresence mode="wait">
          <motion.img 
            key={currentImage}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.35, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            src={currentImage} 
            alt="Travel Destination" 
            className="w-full h-full object-cover dark:opacity-20"
          />
        </AnimatePresence>
        
        {/* Premium Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/10 via-slate-100/70 to-slate-50 dark:from-slate-950/40 dark:via-slate-950/90 dark:to-slate-950 z-10" />
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
        
        {/* 🪄 Animated Headers */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white mb-6 drop-shadow-sm">
            Where to <span className="text-teal-600 dark:text-teal-400">Explore?</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-16 font-medium">
            Find the cheapest and most premium Bus, Train, Flight & Launch Tickets across Bangladesh.
          </p>
        </motion.div>

        {/* 🔮 Glassmorphic Search Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full bg-white/70 dark:bg-slate-900/40 backdrop-blur-3xl border border-white/50 dark:border-slate-800/80 p-6 sm:p-10 rounded-[2rem] shadow-2xl text-left transition-all duration-300"
        >
          
          {/* Dynamic Tabs */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 border-b border-slate-200 dark:border-slate-800/80 pb-5">
            {vehicleTypes.map((type) => {
              const Icon = type.icon;
              const isActive = activeTab === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setActiveTab(type.id)}
                  className={`relative flex items-center gap-2 px-5 sm:px-6 py-3 rounded-2xl text-sm font-black transition-all duration-300 overflow-hidden ${
                    isActive
                      ? 'text-white shadow-xl shadow-teal-600/30 transform -translate-y-1'
                      : 'bg-slate-100 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-600 z-0"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <div className="relative z-10 flex items-center gap-2">
                    {Icon && <Icon className="h-4 w-4" />}
                    {type.label}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Search Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end w-full">
            
            <div className="md:col-span-4 space-y-2.5 w-full">
              <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest pl-2">Departure</label>
              <div className="relative w-full group">
                <input 
                  type="text" 
                  placeholder="Leaving from..." 
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-teal-500 dark:focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 shadow-inner transition-all text-sm font-bold"
                />
              </div>
            </div>

            <div className="md:col-span-4 space-y-2.5 w-full">
              <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest pl-2">Destination</label>
              <div className="relative w-full group">
                <input 
                  type="text" 
                  placeholder="Going to..." 
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-teal-500 dark:focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 shadow-inner transition-all text-sm font-bold"
                />
              </div>
            </div>

            <div className="md:col-span-4 w-full">
              <Link href={`/all-tickets${activeTab !== 'all' ? `?transport=${activeTab}` : ''}`}>
                <button className="w-full bg-gradient-to-r from-slate-900 to-slate-800 dark:from-teal-600 dark:to-teal-500 hover:from-slate-800 hover:to-slate-700 dark:hover:from-teal-500 dark:hover:to-teal-400 text-white font-black py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-slate-900/20 dark:shadow-teal-900/30 active:scale-[0.98] text-sm tracking-widest uppercase border border-slate-700 dark:border-teal-400/30">
                  <FaSearch className="h-4 w-4" />
                  Explore Tickets
                </button>
              </Link>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}