"use client";

import React from 'react';
import Link from 'next/link';
import { FaTicketAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 pt-20 pb-8 transition-colors duration-300">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-16 border-b border-slate-200 dark:border-slate-900 w-full">
          
          <div className="md:col-span-5 space-y-5">
            <Link href="/" className="flex items-center gap-2.5 font-extrabold tracking-tight text-teal-600 dark:text-teal-400 text-2xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 border border-teal-100 dark:border-teal-900/50 shadow-sm dark:shadow-none">
                <FaTicketAlt className="h-5 w-5 transform -rotate-12" />
              </div>
              <span>Ticket<span className="text-slate-900 dark:text-white font-medium">Core</span></span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-sm font-medium">
              The ultimate centralized ticketing terminal in Bangladesh. Experience secure, seamless and rapid bookings for all transport modes.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="h-9 w-9 rounded-xl bg-white dark:bg-slate-900 hover:bg-teal-600 dark:hover:bg-teal-600 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-white dark:hover:text-white flex items-center justify-center text-sm transition-all shadow-sm">
                <FaFacebook />
              </a>
              <a href="#" className="h-9 w-9 rounded-xl bg-white dark:bg-slate-900 hover:bg-teal-600 dark:hover:bg-teal-600 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-white dark:hover:text-white flex items-center justify-center text-sm transition-all shadow-sm">
                <FaTwitter />
              </a>
              <a href="#" className="h-9 w-9 rounded-xl bg-white dark:bg-slate-900 hover:bg-teal-600 dark:hover:bg-teal-600 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-white dark:hover:text-white flex items-center justify-center text-sm transition-all shadow-sm">
                <FaInstagram />
              </a>
              <a href="#" className="h-9 w-9 rounded-xl bg-white dark:bg-slate-900 hover:bg-teal-600 dark:hover:bg-teal-600 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-white dark:hover:text-white flex items-center justify-center text-sm transition-all shadow-sm">
                <FaLinkedin />
              </a>
            </div>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors font-medium">Home Portal</Link></li>
              <li><Link href="/tickets" className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors font-medium">Browse Tickets</Link></li>
              <li><Link href="/login" className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors font-medium">Sign In</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest">Support</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="text-slate-600 dark:text-slate-400 font-medium">Help Center & FAQ</li>
              <li className="text-slate-600 dark:text-slate-400 font-medium">Terms of Service</li>
              <li className="text-slate-600 dark:text-slate-400 font-medium">Privacy Policy</li>
            </ul>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 gap-4 w-full">
          <p className="text-xs text-slate-450 dark:text-slate-500 font-medium">
            &copy; 2026 TicketCore Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-450 dark:text-slate-500 font-medium">
            <span>Built securely for academic submission.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}