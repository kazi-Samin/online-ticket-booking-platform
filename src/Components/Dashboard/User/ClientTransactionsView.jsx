'use client';

import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ArrowUpRight, Calendar, CreditCard, Ticket } from 'lucide-react';

export default function ClientTransactionsView({ transactions }) {

    // 📈 ১. Recharts এর জন্য ডেটা ফরম্যাটিং (তারিখ অনুযায়ী সাজানো) (Unchanged)
    const chartData = [...transactions]
        .reverse() // ওল্ড থেকে নিউ ক্রনোলজিতে সাজানোর জন্য
        .map(t => ({
            date: new Date(t.paymentDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
            amount: t.amount,
            title: t.ticketTitle
        }));

    // কাস্টম টুলটিপ যাতে চার্টের ওপরে হোভার করলে সুন্দর দেখায়
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-slate-950/95 border border-slate-800/80 p-3 rounded-2xl shadow-2xl backdrop-blur-md transition-all duration-200">
                    <p className="text-[10px] font-black text-[#FF6B35] uppercase tracking-widest">{payload[0].payload.date}</p>
                    <p className="text-xs font-bold text-slate-200 mt-1">{payload[0].payload.title}</p>
                    <div className="mt-2 pt-1.5 border-t border-slate-800 flex items-center justify-between gap-4">
                        <span className="text-[10px] text-slate-400 font-medium">Settlement:</span>
                        <span className="text-sm font-black text-white">৳{payload[0].value.toLocaleString()}</span>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-8">

            {/* 📊 PREMIUM ANALYTICS CHART BLOCK */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* 🔥 নতুন আল্ট্রা-প্রিমিয়াম এবং মডার্ন চার্ট বক্স */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/80 p-6 rounded-[32px] shadow-sm flex flex-col justify-between h-[340px] transition-all hover:shadow-md duration-200">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <span className="text-[10px] font-black text-[#FF6B35] uppercase tracking-widest block mb-0.5">Financial Metrics</span>
                            <span className="text-lg font-black text-[#1E293B] dark:text-slate-100 tracking-tight">Payment Velocity Stream</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-900 transition-colors">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">Live Pipeline</span>
                        </div>
                    </div>

                    {/* চার্ট রেন্ডারিং ইঞ্জিন */}
                    <div className="w-full h-56 mt-auto">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                                <defs>
                                    {/* আইস-ব্লু প্রিমিয়াম সফট গ্রেডিয়েন্ট (ডার্ক মোডে আরেকটু ভিজিবল করা হয়েছে) */}
                                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.25} />
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.00} />
                                    </linearGradient>
                                </defs>

                                {/* সূক্ষ্ম মিনিমাল ড্যাশড গ্রিডলাইন - ডার্ক মোডেও ম্যাচিং করা হয়েছে */}
                                <CartesianGrid strokeDasharray="4 4" stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeOpacity={0.6} vertical={false} />

                                <XAxis
                                    dataKey="date"
                                    stroke="#94A3B8"
                                    fontSize={10}
                                    fontWeight="700"
                                    tickLine={false}
                                    axisLine={false}
                                    dy={10}
                                />
                                <YAxis
                                    stroke="#94A3B8"
                                    fontSize={10}
                                    fontWeight="700"
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(v) => `৳${v}`}
                                    dx={5}
                                />

                                <Tooltip
                                    content={CustomTooltip}
                                    cursor={{ stroke: '#3B82F6', strokeWidth: 1, strokeDasharray: '4 4' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="amount"
                                    stroke="#3B82F6"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorAmount)"
                                    activeDot={{
                                        r: 6,
                                        stroke: '#FFF',
                                        strokeWidth: 2,
                                        fill: '#3B82F6',
                                        className: 'shadow-lg'
                                    }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Quick Summary Node Stats */}
                <div className="bg-slate-900 dark:bg-slate-950 border border-slate-800 dark:border-slate-900 p-6 rounded-[32px] text-white flex flex-col justify-between shadow-xl relative overflow-hidden group h-[340px] transition-colors duration-200">
                    <div className="absolute -right-6 -bottom-6 text-slate-800/30 dark:text-slate-900/40 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
                        <CreditCard className="h-48 w-48 stroke-[1]" />
                    </div>

                    <div>
                        <span className="text-[10px] font-black text-[#FF6B35] uppercase tracking-widest bg-zinc-800/60 px-2.5 py-1 rounded-md inline-block">
                            Operational Ledger
                        </span>
                        <h2 className="text-xl font-black mt-3 tracking-tight">Total Capital Spent</h2>
                        <p className="text-xs text-slate-400 font-medium mt-1">Aggregated value derived from all secure transactions.</p>
                    </div>

                    <div className="mt-8 z-10">
                        <span className="text-4xl font-black tracking-tight block">
                            ৳{transactions.reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
                        </span>
                        <span className="text-[11px] font-bold text-slate-400 block mt-1">
                            Based on {transactions.length} successful channels
                        </span>
                    </div>
                </div>

            </div>

            {/* 📋 TRANSACTION TABLE FORMAT SECTION */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-[24px] shadow-sm overflow-hidden transition-colors duration-200">
                <div className="p-5 border-b border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                    <h3 className="text-base font-black text-[#1E293B] dark:text-slate-200">Historical Settlement Records</h3>
                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-950 px-2.5 py-1 rounded-lg transition-colors">
                        {transactions.length} LOGS
                    </span>
                </div>

                {transactions.length === 0 ? (
                    <div className="p-12 text-center text-slate-400 dark:text-slate-500 text-sm font-medium">
                        No secure payment records mapped to this Node ID.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-950/60 text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800/60 transition-colors">
                                    <th className="py-4 px-6">Ticket Title</th>
                                    <th className="py-4 px-6">Transaction ID</th>
                                    <th className="py-4 px-6">Payment Date</th>
                                    <th className="py-4 px-6 text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-xs text-slate-600 dark:text-slate-400 font-semibold transition-colors">
                                {transactions.map((t) => {
                                    const dateObj = new Date(t.paymentDate);
                                    const formattedDate = dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
                                    const formattedTime = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

                                    return (
                                        <tr key={t._id} className="hover:bg-slate-50/80 dark:hover:bg-slate-950/40 transition-colors group">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center space-x-3">
                                                    <div className="h-8 w-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-[#1E3A8A] dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-all">
                                                        <Ticket className="h-4 w-4" />
                                                    </div>
                                                    <div>
                                                        <span className="font-black text-[#1E293B] dark:text-slate-200 block text-sm">{t.ticketTitle}</span>
                                                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Qty mapped securely</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 font-mono text-slate-400 dark:text-slate-500 text-[11px]">
                                                <div className="flex items-center space-x-1">
                                                    <span className="text-[#1E3A8A] dark:text-blue-400 font-bold">stripe</span>
                                                    <span>•</span>
                                                    <span>{t.transactionId}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center space-x-2">
                                                    <Calendar className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                                                    <div>
                                                        <span className="block text-[#1E3A8A] dark:text-blue-400 font-bold">{formattedDate}</span>
                                                        <span className="text-[10px] text-slate-400 dark:text-slate-500 block font-medium">{formattedTime}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <div className="inline-flex flex-col items-end">
                                                    <span className="text-sm font-black text-[#1E293B] dark:text-slate-200 flex items-center">
                                                        ৳{t.amount.toLocaleString()}
                                                        <ArrowUpRight className="h-3 w-3 text-emerald-500 ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </span>
                                                    <span className="text-[9px] font-black uppercase text-emerald-500 tracking-wider bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded-md mt-0.5">
                                                        Success
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        </div>
    );
}