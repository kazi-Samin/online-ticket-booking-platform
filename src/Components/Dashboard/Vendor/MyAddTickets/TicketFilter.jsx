"use client";
import React from 'react';

export default function TicketFilter({ search, setSearch, filterStatus, setFilterStatus }) {
  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-[#0F172A] border border-zinc-100 dark:border-zinc-800/60 p-4 rounded-2xl shadow-sm mb-8">

      {/* Search Input Vector Section */}
      <div className="relative w-full sm:max-w-md">
        <span className="absolute inset-y-0 left-3 flex items-center text-zinc-400 pointer-events-none">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by route, title or city..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 text-sm text-[#1E293B] dark:text-[#E2E8F0] placeholder-zinc-400 focus:outline-none focus:border-[#1E3A8A] dark:focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Select Filter Tabs Matrix */}
      <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto select-none no-scrollbar">
        {['all', 'pending', 'approved', 'rejected'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all whitespace-nowrap capitalize ${
              filterStatus === status
                ? "bg-[#FF6B35] border-[#FF6B35] text-white shadow-md shadow-orange-500/10"
                : "bg-zinc-50 dark:bg-[#09090b] border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-[#1E293B] dark:hover:text-white"
            }`}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
}