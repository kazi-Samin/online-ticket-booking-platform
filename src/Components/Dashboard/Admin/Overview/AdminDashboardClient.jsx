'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ShieldAlert, Users, Megaphone, CheckCircle2,
  Clock, XCircle, Layers, UserCheck, UserX, UserMinus,
  ChevronLeft, ChevronRight, BarChart3, PieChart as PieIcon, PlayCircle
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import Image from 'next/image';

export default function AdminDashboardClient({ tickets = [], allUsers = [], advertiseTickets = [] }) {
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);
  const [ticketPage, setTicketPage] = useState(1);
  const [adPage, setAdPage] = useState(1);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const itemsPerPage = 4;
  const adsPerPage = 3;

  // ==================== ১. টিকিট ডাটা প্রসেসিং ====================
  const ticketStats = useMemo(() => {
    const safeTickets = Array.isArray(tickets) ? tickets : [];
    const total = safeTickets.length;
    const approved = safeTickets.filter(t => t?.verificationStatus === 'approved').length;
    const pending = safeTickets.filter(t => t?.verificationStatus === 'pending').length;
    const rejected = safeTickets.filter(t => t?.verificationStatus === 'rejected').length;
    return { total, approved, pending, rejected };
  }, [tickets]);

  const ticketChartData = useMemo(() => [
    { name: 'Total', count: ticketStats.total, fill: '#3B82F6' },
    { name: 'Approved', count: ticketStats.approved, fill: '#10B981' },
    { name: 'Pending', count: ticketStats.pending, fill: '#F59E0B' },
    { name: 'Rejected', count: ticketStats.rejected, fill: '#EF4444' },
  ], [ticketStats]);

  const paginatedTickets = useMemo(() => {
    const safeTickets = Array.isArray(tickets) ? tickets : [];
    const start = (ticketPage - 1) * itemsPerPage;
    return safeTickets.slice(start, start + itemsPerPage);
  }, [tickets, ticketPage]);

  const totalTicketPages = Math.ceil((Array.isArray(tickets) ? tickets.length : 0) / itemsPerPage) || 1;

  // ==================== ২. ইউজার ডাটা প্রসেসিং ====================
  const userStats = useMemo(() => {
    const safeUsers = Array.isArray(allUsers) ? allUsers : [];
    const total = safeUsers.length;
    const fraud = safeUsers.filter(u => u?.isFraud === true || u?.isFraud === 'true').length;
    const admins = safeUsers.filter(u => u?.role === 'admin').length;
    const vendors = safeUsers.filter(u => u?.role === 'vendor').length;
    const regularUsers = safeUsers.filter(u => u?.role === 'user' && !u?.isFraud).length;
    return { total, fraud, admins, vendors, regularUsers };
  }, [allUsers]);

  const userChartData = useMemo(() => [
    { name: 'Regular Users', value: userStats.regularUsers, color: '#3B82F6' },
    { name: 'Vendors', value: userStats.vendors, color: '#F59E0B' },
    { name: 'Admins', value: userStats.admins, color: '#8B5CF6' },
    { name: 'Fraud Alerts', value: userStats.fraud, color: '#EF4444' },
  ], [userStats]);

  // ==================== ৩. এডভারটাইজ ডাটা ফিল্টারিং ও পেজিনেশন ====================
  const allActiveAds = useMemo(() => {
    const safeAds = Array.isArray(advertiseTickets) ? advertiseTickets : [];
    return safeAds.filter(t => t?.isAdvertised === true || t?.isAdvertised === 'true');
  }, [advertiseTickets]);

  const paginatedAds = useMemo(() => {
    const startIdx = (adPage - 1) * adsPerPage;
    return allActiveAds.slice(startIdx, startIdx + adsPerPage);
  }, [allActiveAds, adPage]);

  const totalAdPages = Math.ceil(allActiveAds.length / adsPerPage) || 1;
  const startIdx = (adPage - 1) * adsPerPage;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black p-4 sm:p-6 lg:p-8 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* 🌟 ড্যাশবোর্ড হেডার */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            System Administration <span className="text-teal-600 dark:text-teal-400">Overview</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">
            Real-time analytics engine • Live system control matrix & database logs.
          </p>
        </div>

        {/* ==================== 🎫 সেকশন ১: টিকিট কন্ট্রোল এবং এনালিটিক্স ==================== */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-teal-600 dark:text-teal-400" />
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-slate-100">Ticket Management Matrix</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ৪টি কার্ড */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
              <div
                onClick={() => router.push('/dashboard/admin/manage-tickets')}
                className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm hover:border-teal-500 dark:hover:border-teal-500 cursor-pointer transition-all group flex flex-col justify-between"
              >
                <div className="p-3 bg-slate-100 dark:bg-slate-800 w-fit rounded-2xl"><Layers className="h-5 w-5 text-teal-600 dark:text-teal-400" /></div>
                <div className="mt-4">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 dark:text-slate-400">Total System Tickets</p>
                  <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white group-hover:text-teal-500 transition-colors">{ticketStats.total}</h3>
                </div>
              </div>

              <div
                onClick={() => router.push('/dashboard/admin/manage-tickets')}
                className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm hover:border-emerald-500 cursor-pointer transition-all group flex flex-col justify-between"
              >
                <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 w-fit rounded-2xl"><CheckCircle2 className="h-5 w-5 text-emerald-500" /></div>
                <div className="mt-4">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 dark:text-slate-400">Approved Tickets</p>
                  <h3 className="text-3xl font-black mt-1 text-emerald-500">{ticketStats.approved}</h3>
                </div>
              </div>

              <div
                onClick={() => router.push('/dashboard/admin/manage-tickets')}
                className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm hover:border-amber-500 cursor-pointer transition-all group flex flex-col justify-between"
              >
                <div className="p-3 bg-amber-50 dark:bg-amber-500/10 w-fit rounded-2xl"><Clock className="h-5 w-5 text-amber-500" /></div>
                <div className="mt-4">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 dark:text-slate-400">Pending Verification</p>
                  <h3 className="text-3xl font-black mt-1 text-amber-500">{ticketStats.pending}</h3>
                </div>
              </div>

              <div
                onClick={() => router.push('/dashboard/admin/manage-tickets')}
                className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm hover:border-red-500 cursor-pointer transition-all group flex flex-col justify-between"
              >
                <div className="p-3 bg-red-50 dark:bg-red-500/10 w-fit rounded-2xl"><XCircle className="h-5 w-5 text-red-500" /></div>
                <div className="mt-4">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 dark:text-slate-400">Rejected Logs</p>
                  <h3 className="text-3xl font-black mt-1 text-red-500">{ticketStats.rejected}</h3>
                </div>
              </div>
            </div>

            {/* 📊 টিকিট বার চার্ট */}
            <div
              onClick={() => router.push('/dashboard/admin/manage-tickets')}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm flex flex-col justify-between cursor-pointer hover:shadow-md transition-all min-w-0"
            >
              <div className="flex items-center gap-1.5 mb-4">
                <BarChart3 className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-400">Ticket Metrics Chart</span>
              </div>
              <div className="w-full h-[180px] relative min-h-[180px]">
                {isMounted && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ticketChartData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-slate-100 dark:stroke-slate-800" />
                      <XAxis dataKey="name" className="text-[10px] font-bold fill-slate-500 dark:fill-slate-400" tickLine={false} />
                      <YAxis className="text-[10px] font-bold fill-slate-500 dark:fill-slate-400" tickLine={false} />
                      <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '8px', color: '#fff' }} />
                      <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                        {ticketChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>

          {/* টিকিট মিনি টেবিল */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    <th className="py-3 px-5">Transport / Vendor</th>
                    <th className="py-3 px-5">Route</th>
                    <th className="py-3 px-5 text-center">Gross Units</th>
                    <th className="py-3 px-5">Price</th>
                    <th className="py-3 px-5 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
                  {paginatedTickets.map((ticket) => (
                    <tr
                      key={ticket._id}
                      onClick={() => router.push('/dashboard/admin/manage-tickets')}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-950/40 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-5 flex items-center gap-3">
                        <div className="relative h-8 w-8 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 flex-shrink-0">
                          {ticket?.image ? (
                            <Image
                              fill
                              src={ticket.image}
                              alt={ticket.title || 'Ticket'}
                              className="object-cover"
                              unoptimized
                              sizes="32px"
                            />
                          ) : (
                            <div className="bg-slate-200 dark:bg-slate-800 w-full h-full" />
                          )}
                        </div>
                        <div>
                          <div className="font-black text-xs text-slate-900 dark:text-white">{ticket?.title || 'Untitled'}</div>
                          <div className="text-[10px] text-slate-400 font-medium">{ticket?.vendorName || 'Unknown Vendor'}</div>
                        </div>
                      </td>
                      <td className="py-3 px-5 text-xs font-bold">
                        {ticket?.from || 'N/A'} ➔ {ticket?.to || 'N/A'}
                      </td>
                      <td className="py-3 px-5 text-xs font-black text-center text-slate-900 dark:text-white">{ticket?.quantity ?? 0}</td>
                      <td className="py-3 px-5 text-xs font-black text-teal-600 dark:text-teal-400">৳{(ticket?.pricePerUnit ?? 0).toLocaleString()}</td>
                      <td className="py-3 px-5 text-center">
                        <span className={`inline-flex items-center text-[9px] font-black uppercase tracking-wide px-2 py-0.5 rounded-md ${
                          ticket?.verificationStatus === 'approved' ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' :
                          ticket?.verificationStatus === 'pending' ? 'bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400' :
                          'bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400'
                        }`}>
                          {ticket?.verificationStatus || 'pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* টিকিট টেবিল পেজিনেশন */}
            {totalTicketPages > 1 && (
              <div className="p-3 bg-slate-50 dark:bg-slate-950/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
                <span>Page {ticketPage} of {totalTicketPages}</span>
                <div className="flex items-center gap-1">
                  <button disabled={ticketPage === 1} onClick={() => setTicketPage(p => p - 1)} className="p-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg disabled:opacity-40"><ChevronLeft className="h-3.5 w-3.5" /></button>
                  <button disabled={ticketPage === totalTicketPages} onClick={() => setTicketPage(p => p + 1)} className="p-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg disabled:opacity-40"><ChevronRight className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ==================== 👥 সেকশন ২: ইউজার কন্ট্রোল এবং ডিস্ট্রিবিউশন চার্ট ==================== */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-teal-600 dark:text-teal-400" />
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">User Matrix Management</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ইউজার CARD গ্রিড */}
            <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div onClick={() => router.push('/dashboard/admin/manage-users')} className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl cursor-pointer hover:border-teal-500 transition-all flex flex-col justify-between shadow-sm">
                <div className="p-2.5 bg-slate-100 dark:bg-slate-800 w-fit rounded-xl"><Users className="h-4 w-4 text-teal-600 dark:text-teal-400" /></div>
                <div className="mt-4">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Total Users</p>
                  <h4 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{userStats.total}</h4>
                </div>
              </div>

              <div onClick={() => router.push('/dashboard/admin/manage-users')} className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl cursor-pointer hover:border-teal-500 transition-all flex flex-col justify-between shadow-sm">
                <div className="p-2.5 bg-teal-50 dark:bg-teal-500/10 w-fit rounded-xl"><UserCheck className="h-4 w-4 text-teal-500" /></div>
                <div className="mt-4">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Active Members</p>
                  <h4 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{userStats.regularUsers}</h4>
                </div>
              </div>

              <div onClick={() => router.push('/dashboard/admin/manage-users')} className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl cursor-pointer hover:border-amber-500 transition-all flex flex-col justify-between shadow-sm">
                <div className="p-2.5 bg-amber-50 dark:bg-amber-500/10 w-fit rounded-xl"><UserMinus className="h-4 w-4 text-amber-500" /></div>
                <div className="mt-4">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Total Vendors</p>
                  <h4 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{userStats.vendors}</h4>
                </div>
              </div>

              <div onClick={() => router.push('/dashboard/admin/manage-users')} className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl cursor-pointer hover:border-purple-500 transition-all flex flex-col justify-between shadow-sm">
                <div className="p-2.5 bg-purple-50 dark:bg-purple-500/10 w-fit rounded-xl"><UserCheck className="h-4 w-4 text-purple-500" /></div>
                <div className="mt-4">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Admins Count</p>
                  <h4 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{userStats.admins}</h4>
                </div>
              </div>

              <div onClick={() => router.push('/dashboard/admin/manage-users')} className="col-span-2 sm:col-span-1 p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl cursor-pointer hover:border-red-500 transition-all flex flex-col justify-between shadow-sm">
                <div className="p-2.5 bg-red-50 dark:bg-red-500/10 w-fit rounded-xl"><UserX className="h-4 w-4 text-red-500" /></div>
                <div className="mt-4">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Fraud Alerts</p>
                  <h4 className="text-2xl font-black text-red-500 mt-0.5">{userStats.fraud}</h4>
                </div>
              </div>
            </div>

            {/* 📊 ইউজার ডোনাট পাই চার্ট */}
            <div
              onClick={() => router.push('/dashboard/admin/manage-users')}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm flex flex-col justify-between cursor-pointer hover:shadow-md transition-all min-w-0"
            >
              <div className="flex items-center gap-1.5 mb-2">
                <PieIcon className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-400">User Distribution Roles</span>
              </div>
              <div className="w-full h-[180px] min-h-[180px] flex items-center justify-center relative">
                {isMounted && userChartData.length > 0 && (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={userChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {userChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                )}
                {/* সেন্ট্রাল টোটাল টেক্সট লেয়ার */}
                <div className="absolute text-center pointer-events-none">
                  <span className="text-xs font-bold text-slate-400 block uppercase tracking-tighter">Total</span>
                  <span className="text-xl font-black text-slate-900 dark:text-white">{userStats.total}</span>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase mt-2">
                {userChartData.map((d, i) => (
                  <span key={i} className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: d.color }}></span>
                    {d.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ==================== 📣 সেকশন ৩: এডভারটাইজ টিকিট প্রোমোশন ট্র্যাকিং ==================== */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-orange-500" />
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">Marketing & Advertisement Core</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* ক্যাম্পেইন সামারি কার্ড */}
            <div
              onClick={() => router.push('/dashboard/admin/advertise')}
              className="p-6 bg-slate-950 border border-slate-800 rounded-3xl text-white flex flex-col justify-between cursor-pointer hover:border-orange-500 transition-all shadow-sm"
            >
              <div className="p-3 bg-white/10 w-fit rounded-2xl"><Megaphone className="h-5 w-5 text-orange-500" /></div>
              <div className="mt-8">
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Total Sponsored Campaign</p>
                <h3 className="text-3xl font-black tracking-tight mt-1 text-white">{(Array.isArray(advertiseTickets) ? advertiseTickets.length : 0)}</h3>
                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 mt-2">
                  <PlayCircle className="h-3.5 w-3.5" /> <span>{allActiveAds.length} Streams Active Now</span>
                </div>
              </div>
            </div>

            {/* রানিং প্রোমোশন টেবিল ট্র্যাকিং + পেজিনেশন */}
            <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/20">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">Live Active Promotions Matrix</span>
                  <span className="text-[9px] font-black px-2 py-0.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400 rounded-md">LIVE MONITOR</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        <th className="py-2.5 px-5">Campaign Transport</th>
                        <th className="py-2.5 px-5">Route Terminal</th>
                        <th className="py-2.5 px-5 text-center">Price Index</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-slate-700 dark:text-slate-300">
                      {paginatedAds.length > 0 ? (
                        paginatedAds.map((ad) => (
                          <tr
                            key={ad._id}
                            onClick={() => router.push('/dashboard/admin/advertise')}
                            className="hover:bg-slate-50/50 dark:hover:bg-slate-950/40 cursor-pointer transition-colors"
                          >
                            <td className="py-2.5 px-5 font-black text-xs text-slate-900 dark:text-white flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse flex-shrink-0"></span>
                              {ad?.title || 'Sponsored Unit'}
                            </td>
                            <td className="py-2.5 px-5 text-xs font-bold text-slate-500 dark:text-slate-400">{ad?.from || 'N/A'} ➔ {ad?.to || 'N/A'}</td>
                            <td className="py-2.5 px-5 text-xs font-black text-center text-orange-500">৳{(ad?.pricePerUnit ?? 0).toLocaleString()}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="py-8 text-center text-xs font-bold text-slate-400">No active system campaigns recorded.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* অ্যাডভারটাইজ টেবিল পেজিনেশন কন্ট্রোল */}
              {totalAdPages > 1 && (
                <div className="p-3 bg-slate-50 dark:bg-slate-950/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
                  <span>Showing {startIdx + 1}-{Math.min(startIdx + adsPerPage, allActiveAds.length)} of {allActiveAds.length} Campaigns</span>
                  <div className="flex items-center gap-1">
                    <button
                      disabled={adPage === 1}
                      onClick={(e) => { e.stopPropagation(); setAdPage(p => p - 1); }}
                      className="p-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg disabled:opacity-40"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                    </button>
                    <button
                      disabled={adPage === totalAdPages}
                      onClick={(e) => { e.stopPropagation(); setAdPage(p => p + 1); }}
                      className="p-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg disabled:opacity-40"
                    >
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}