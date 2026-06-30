'use client';

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, Banknote, Ticket, TrendingUp, User, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ClientVendorRevenueView({ data }) {
  const { totalTicketsAdded, totalTicketsSold, totalRevenue, paidBookings = [] } = data;

  // 🔢 পেজিনেশন স্টেট ও কনফিগারেশন (Exact Pure Logic)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // 📊 ১. চার্টের জন্য ডেটা ফরম্যাট
  const chartData = [
    {
      name: 'Ticket Volume',
      Added: totalTicketsAdded,
      Sold: totalTicketsSold,
    }
  ];

  // 🔢 পেজিনেশন লজিক ক্যালকুলেশন (No structure modification)
  const totalPages = Math.ceil(paidBookings.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = paidBookings.slice(indexOfFirstItem, indexOfLastItem);

  // কাস্টম চার্ট টুলটিপ (Hybrid Color Integration)
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 dark:bg-slate-950/95 border border-slate-200 dark:border-slate-800 p-3 rounded-2xl shadow-2xl backdrop-blur-md">
          <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2">Inventory Ratio</p>
          {payload.map((p, idx) => (
            <div key={idx} className="flex items-center justify-between gap-6 text-xs text-slate-800 dark:text-slate-200 my-1">
              <span className="font-medium">{p.name}:</span>
              <span className="font-black" style={{ color: p.color }}>{p.value} Units</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 selection:bg-slate-200 dark:selection:bg-slate-800 selection:text-current">

      {/* ⚡ PREMIUM HYBRID CARD COUNTERS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

        {/* Card 1: Total Revenue */}
        <div className="bg-slate-900 dark:bg-slate-900 border border-slate-800/80 p-5 rounded-[24px] text-white flex flex-col justify-between shadow-xl h-36 relative overflow-hidden group">
          <div className="absolute right-4 bottom-2 text-slate-800/40 dark:text-slate-800/30 pointer-events-none group-hover:scale-110 transition-transform duration-300">
            <Banknote className="h-20 w-20 stroke-[1.5]" />
          </div>
          <div className="flex items-center justify-between z-10">
            <span className="text-[10px] font-black uppercase text-emerald-400 tracking-widest">Gross Earnings</span>
            <TrendingUp className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="mt-4 z-10">
            <span className="text-3xl font-black tracking-tight block">৳{totalRevenue.toLocaleString()}</span>
            <span className="text-[10px] text-slate-400 dark:text-slate-400 font-medium block mt-0.5">Total Revenue Node Volume</span>
          </div>
        </div>

        {/* Card 2: Tickets Sold */}
        <div className="bg-white dark:bg-slate-900/50 dark:backdrop-blur-md border border-slate-200/70 dark:border-slate-800/60 p-5 rounded-[24px] text-slate-800 dark:text-white flex flex-col justify-between shadow-sm dark:shadow-lg h-36 relative overflow-hidden group hover:shadow-md dark:hover:border-slate-700/60 transition-all">
          <div className="absolute right-4 bottom-2 text-slate-100 dark:text-slate-800/20 pointer-events-none group-hover:scale-110 transition-transform duration-300">
            <Ticket className="h-20 w-20 stroke-[1.5]" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest">Sales Velocity</span>
            <span className="text-xs font-black text-emerald-500 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-md">Active</span>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black tracking-tight text-[#1E293B] dark:text-white block">{totalTicketsSold}</span>
            <span className="text-[10px] text-slate-400 dark:text-slate-400 font-medium block mt-0.5">Tickets Successfully Sold</span>
          </div>
        </div>

        {/* Card 3: Tickets Added */}
        <div className="bg-white dark:bg-slate-900/50 dark:backdrop-blur-md border border-slate-200/70 dark:border-slate-800/60 p-5 rounded-[24px] text-slate-800 dark:text-white flex flex-col justify-between shadow-sm dark:shadow-lg h-36 relative overflow-hidden group hover:shadow-md dark:hover:border-slate-700/60 transition-all">
          <div className="absolute right-4 bottom-2 text-slate-100 dark:text-slate-800/20 pointer-events-none group-hover:scale-110 transition-transform duration-300">
            <Ticket className="h-20 w-20 stroke-[1.5]" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest">Total Pipeline</span>
            <span className="text-xs font-black text-[#1E3A8A] dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded-md">Total</span>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black tracking-tight text-[#1E293B] dark:text-white block">{totalTicketsAdded}</span>
            <span className="text-[10px] text-slate-400 dark:text-slate-400 font-medium block mt-0.5">Tickets Injected to System</span>
          </div>
        </div>

      </div>

      {/* 📊 VISUAL CHART REVENUE BLOCK */}
      <div className="bg-white dark:bg-slate-900/40 dark:backdrop-blur-md border border-slate-200/70 dark:border-slate-800/60 p-6 rounded-[32px] shadow-sm dark:shadow-lg transition-colors">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest block mb-0.5">Volume Distribution</span>
            <span className="text-base font-black text-[#1E293B] dark:text-white tracking-tight">Inventory Allocation Analytics</span>
          </div>
        </div>

        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }} barGap={12}>
              <CartesianGrid strokeDasharray="4 4" stroke="#E2E8F0" dark-stroke="#27272a" className="stroke-slate-200 dark:stroke-slate-800" strokeOpacity={0.6} vertical={false} />
              <XAxis dataKey="name" stroke="#94A3B8" className="fill-slate-400 dark:fill-slate-500" fontSize={11} fontWeight="700" axisLine={false} tickLine={false} />
              <YAxis stroke="#94A3B8" className="fill-slate-400 dark:fill-slate-500" fontSize={10} fontWeight="700" axisLine={false} tickLine={false} />
              <Tooltip content={CustomTooltip} cursor={{ fill: 'currentColor', className: 'text-slate-50 dark:text-slate-900/40', opacity: 0.4 }} />
              <Legend verticalAlign="top" height={36} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px', fontWeight: '700' }} />
              <Bar dataKey="Added" fill="#1E3A8A" dark-fill="#3b82f6" className="fill-blue-800 dark:fill-blue-500" radius={[10, 10, 0, 0]} maxBarSize={60} />
              <Bar dataKey="Sold" fill="#10b981" radius={[10, 10, 0, 0]} maxBarSize={60} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 📋 PAID BOOKINGS HISTORICAL TABLE SECTION */}
      <div className="bg-white dark:bg-slate-900/40 dark:backdrop-blur-md border border-slate-200/80 dark:border-slate-800/60 rounded-[24px] shadow-sm dark:shadow-lg overflow-hidden transition-colors">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
          <h3 className="text-base font-black text-[#1E293B] dark:text-white">Settled Ticket Transactions</h3>
          <span className="text-[10px] font-black text-slate-400 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-lg">
            {paidBookings.length} PAID ORDERS
          </span>
        </div>

        {paidBookings.length === 0 ? (
          <div className="p-12 text-center text-slate-400 dark:text-slate-500 text-sm font-medium">
            No processed financial clearances detected.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900/80 text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800/60">
                    <th className="py-4 px-6">Ticket Details</th>
                    <th className="py-4 px-6">Customer</th>
                    <th className="py-4 px-6">Quantity</th>
                    <th className="py-4 px-6 text-right">Settled Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-xs text-slate-600 dark:text-slate-400 font-semibold">
                  {currentBookings.map((booking, idx) => {
                    return (
                      <tr key={booking._id || idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/30 transition-colors group">

                        {/* Ticket Title */}
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-[#1E3A8A] dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                              <Ticket className="h-4 w-4" />
                            </div>
                            <div>
                              <span className="font-black text-[#1E293B] dark:text-white block text-sm">{booking.ticketTitle || 'Standard Ticket'}</span>
                              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Route ID Verified</span>
                            </div>
                          </div>
                        </td>

                        {/* Customer Info */}
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-1.5 text-slate-700 dark:text-slate-300">
                            <User className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                            <span className="font-bold text-[#1E293B] dark:text-slate-200">{booking.userEmail || 'Anonymous'}</span>
                          </div>
                        </td>

                        {/* Quantity */}
                        <td className="py-4 px-6 text-slate-400 dark:text-slate-500 font-mono text-[13px]">
                          <span className="text-[#1E293B] dark:text-white font-bold">{booking.bookingQuantity || 0}</span> Units
                        </td>

                        {/* Total Payout */}
                        <td className="py-4 px-6 text-right">
                          <div className="inline-flex flex-col items-end">
                            <span className="text-sm font-black text-[#1E293B] dark:text-white flex items-center">
                              ৳{(booking.totalPrice || 0).toLocaleString()}
                              <ArrowUpRight className="h-3 w-3 text-emerald-500 dark:text-emerald-400 ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </span>
                            <span className="text-[9px] font-black uppercase text-[#22C55E] dark:text-emerald-400 tracking-wider bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded-md mt-0.5">
                              Disbursed
                            </span>
                          </div>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* 🛠️ CONTROLS PAGINATION BAR */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/20">
                <span className="text-xs font-medium text-slate-400 dark:text-slate-500 text-center sm:text-left">
                  Showing <span className="text-[#1E293B] dark:text-white font-bold">{indexOfFirstItem + 1}</span> to{' '}
                  <span className="text-[#1E293B] dark:text-white font-bold">
                    {indexOfLastItem > paidBookings.length ? paidBookings.length : indexOfLastItem}
                  </span>{' '}
                  of <span className="text-[#1E293B] dark:text-white font-bold">{paidBookings.length}</span> Results
                </span>

                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl transition-all disabled:opacity-30 text-slate-600 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-700 dark:hover:text-white"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`h-8 w-8 text-xs font-bold rounded-xl transition-all ${
                        currentPage === i + 1
                          ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950'
                          : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-400 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800 dark:hover:border-slate-700 dark:hover:text-white'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl transition-all disabled:opacity-30 text-slate-600 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-700 dark:hover:text-white"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

    </div>
  );
}