'use client'

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, CreditCard, Ticket, CheckCircle2,
  Clock, XCircle, ChevronLeft, ChevronRight, Activity, Globe
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import Image from 'next/image';

// 🔥 সম্পূর্ণ নতুন গ্লাস টুলটিপ
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-950/90 dark:bg-slate-900/90 backdrop-blur-xl text-slate-100 p-4 rounded-2xl border border-slate-800 shadow-2xl space-y-1.5 text-xs">
        <p className="font-bold text-slate-400">{data.date}</p>
        <p className="font-black text-sm text-teal-400">৳{data.amount.toLocaleString()}</p>
        <div className="border-t border-slate-800 pt-1 mt-1">
          <p className="font-medium text-slate-300">Ticket: {data.title}</p>
        </div>
      </div>
    );
  }
  return null;
};

export default function UserDashboardOverview({ tickets = [], transactions = [], user }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 📊 স্ট্যাটস ক্যালকুলেশন
  const stats = useMemo(() => {
    const total = tickets.length;
    const booked = tickets.filter(t => t.status === 'paid' || t.status === 'booked').length;
    const accepted = tickets.filter(t => t.status === 'confirmed' || t.status === 'paid' || t.status === 'accepted').length;
    const rejected = tickets.filter(t => t.status === 'cancelled' || t.status === 'rejected').length;
    const totalSpent = transactions.reduce((sum, tx) => sum + (tx.amount || 0), 0);

    return { total, booked, accepted, rejected, totalSpent };
  }, [tickets, transactions]);

  // 📈 চার্ট ডেটা
  const chartData = useMemo(() => {
    const sortedTx = [...transactions].sort((a, b) => new Date(a.paymentDate) - new Date(b.paymentDate));
    return sortedTx.map(tx => ({
      date: new Date(tx.paymentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      amount: tx.amount,
      title: tx.ticketTitle
    }));
  }, [transactions]);

  // 📄 পেজিনেশন
  const totalPages = Math.ceil(tickets.length / itemsPerPage);
  const paginatedTickets = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return tickets.slice(start, start + itemsPerPage);
  }, [tickets, currentPage]);

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 p-4 sm:p-6 md:p-8 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* 🌟 নতুন মিনিমালিস্ট গ্লাস হেডার */}
        <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-md rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-slate-50">
              Welcome Back, <span className="text-teal-600 dark:text-teal-400">{user?.name || 'Aritro'}</span> ✨
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              System analytics dashboard configuration & real-time ticket statistics tracking.
            </p>
          </div>
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold rounded-2xl transition-all shadow-md active:scale-95 self-start sm:self-auto"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </button>
        </div>

        {/* 📊 গ্রিড কার্ডস (নতুন গ্লোয়িং বর্ডার আর্কিটেকচার) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* মোট খরচ */}
          <div className="p-6 bg-slate-900 text-white rounded-3xl shadow-lg border border-slate-800 flex flex-col justify-between space-y-4">
            <div className="p-3 bg-white/10 w-fit rounded-2xl"><CreditCard className="h-5 w-5 text-teal-400" /></div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Total Balance Spent</p>
              <h3 className="text-2xl font-black tracking-tight mt-1 text-white">৳{stats.totalSpent.toLocaleString()}</h3>
            </div>
          </div>

          {/* Added */}
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl shadow-sm flex flex-col justify-between space-y-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-500/10 w-fit rounded-2xl"><Ticket className="h-5 w-5 text-blue-600 dark:text-blue-400" /></div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 dark:text-slate-400">Tickets Added</p>
              <h3 className="text-2xl font-black tracking-tight mt-1 text-slate-900 dark:text-slate-100">{stats.total}</h3>
            </div>
          </div>

          {/* Booked */}
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl shadow-sm flex flex-col justify-between space-y-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-500/10 w-fit rounded-2xl"><Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" /></div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 dark:text-slate-400">Pending Booked</p>
              <h3 className="text-2xl font-black tracking-tight mt-1 text-slate-900 dark:text-slate-100">{stats.booked}</h3>
            </div>
          </div>

          {/* Accepted */}
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl shadow-sm flex flex-col justify-between space-y-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 w-fit rounded-2xl"><CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" /></div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 dark:text-slate-400">Total Accepted</p>
              <h3 className="text-2xl font-black tracking-tight mt-1 text-slate-900 dark:text-slate-100">{stats.accepted}</h3>
            </div>
          </div>

          {/* Rejected */}
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl shadow-sm flex flex-col justify-between space-y-4">
            <div className="p-3 bg-rose-50 dark:bg-rose-500/10 w-fit rounded-2xl"><XCircle className="h-5 w-5 text-rose-600 dark:text-rose-400" /></div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 dark:text-slate-400">Total Rejected</p>
              <h3 className="text-2xl font-black tracking-tight mt-1 text-slate-900 dark:text-slate-100">{stats.rejected}</h3>
            </div>
          </div>
        </div>

        {/* 📈 নিউ জেনারেশন এরিয়া চার্ট (Smooth Flow Area) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-[32px] p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
            <Activity className="h-4 w-4 text-teal-600 dark:text-teal-400" />
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">Financial Activity Network Analytics</h2>
          </div>

          <div className="w-full h-[280px]">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" h="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-slate-100 dark:stroke-slate-800" />
                  <XAxis dataKey="date" className="text-[10px] font-bold fill-slate-500 dark:fill-slate-400" tickLine={false} axisLine={false} dy={10} />
                  <YAxis width={45} className="text-[10px] font-bold fill-slate-500 dark:fill-slate-400" tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#6366f1', strokeWidth: 1.5 }} />
                  <Area type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs font-bold text-slate-400">No transaction records generated in graph engine.</div>
            )}
          </div>
        </div>

        {/* 📋 মডার্ন স্লিক টিকিট টেবিল (১০০% কন্ট্রাস্ট অ্যান্ড ক্লিয়ার টেক্সট গ্যারান্টি) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-[32px] overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-teal-500" />
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-50">Ticket Management System</h2>
            </div>
            <span className="text-[10px] font-black px-2.5 py-1 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl border border-slate-200/60 dark:border-slate-700/60 shadow-sm">
              5 Rows Per Page
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                {/* 🎯 এখানে ব্যাকগ্রাউন্ডকে জিংক-১০০ এবং টেক্সটকে একদম সলিড ডার্ক জিংক-৯০০ করা হয়েছে যাতে টেক্সট সাদা হয়ে না যায় */}
            <tr className='bg-[#1E3A8A] text-[#9ebdee]'>
                  <th className="py-4 px-6">Transport Specification</th>
                  <th className="py-4 px-6">Schedule</th>
                  <th className="py-4 px-6 text-center">Seats</th>
                  <th className="py-4 px-6">Gross Price</th>
                  <th className="py-4 px-6 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {paginatedTickets.length > 0 ? (
                  paginatedTickets.map((ticket) => (
                    <tr
                      key={ticket._id}
                      onClick={() => router.push('/dashboard/user/booked-tickets')}
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-950/40 cursor-pointer transition-colors group"
                    >
                      <td className="py-4 px-6 flex items-center gap-4">
                        <div className="relative h-10 w-10 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex-shrink-0 shadow-sm">
                          {ticket.image && <Image fill src={ticket.image} alt={ticket.ticketTitle} className="object-cover group-hover:scale-105 transition-transform duration-300" />}
                        </div>
                        <div>
                          <div className="font-black text-xs text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{ticket.ticketTitle}</div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold mt-0.5">{ticket.from} ➔ {ticket.to}</div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-xs font-bold text-slate-700 dark:text-slate-300">
                        {new Date(ticket.departureDateTime).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                      </td>
                      <td className="py-4 px-6 text-xs font-black text-center text-slate-900 dark:text-slate-100">{ticket.bookingQuantity}</td>
                      <td className="py-4 px-6 text-xs font-black text-teal-600 dark:text-teal-400">৳{ticket.totalPrice.toLocaleString()}</td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-flex items-center text-[9px] font-black uppercase tracking-wide px-2.5 py-1 rounded-xl ${
                          ticket.status === 'paid' || ticket.status === 'confirmed' || ticket.status === 'accepted'
                            ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-500/20'
                            : 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200/50 dark:border-amber-500/20'
                        }`}>
                          {ticket.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-12 text-center text-xs font-bold text-slate-400 dark:text-slate-500">No system tickets detected.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* 🔘 মডার্ন পেজিনেশন প্যানেল */}
          {totalPages > 1 && (
            <div className="p-4 bg-slate-50/50 dark:bg-slate-950/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Showing Page <span className="text-slate-900 dark:text-slate-100">{currentPage}</span> of {totalPages}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 disabled:opacity-40 transition-all shadow-sm active:scale-95"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 disabled:opacity-40 transition-all shadow-sm active:scale-95"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}