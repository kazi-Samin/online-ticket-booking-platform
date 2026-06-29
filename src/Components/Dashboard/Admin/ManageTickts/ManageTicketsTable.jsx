'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, XCircle, ArrowLeft, ArrowRight, Search, Filter, Hourglass, Layers } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { updateTicketStatus } from '@/lib/actions/status';

export default function ManageTicketsTable({ initialTickets }) {
  const router = useRouter();
  const [tickets, setTickets] = useState(initialTickets);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Client Side Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Confirmation Modal Object States
  const [modalContext, setModalContext] = useState({
    isOpen: false,
    ticketId: null,
    targetStatus: '',
    ticketTitle: ''
  });

  // 📊 ডাইনামিক কাউন্টার ক্যালকুলেশন (রিয়েল-টাইম ডাটা ট্র্যাকিং)
  const totalPending = tickets.filter(t => t.verificationStatus === 'pending').length;
  const totalApproved = tickets.filter(t => t.verificationStatus === 'approved').length;
  const totalRejected = tickets.filter(t => t.verificationStatus === 'rejected').length;

  // 🔍 সার্চ এবং ফিল্টারিং লজিক পাইপলাইন
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch =
      ticket.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.vendorEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.transportType?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || ticket.verificationStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate dynamic rows offset tracking boundaries
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredTickets.slice(startIndex, startIndex + itemsPerPage);

  const openActionModal = (id, status, title) => {
    setModalContext({
      isOpen: true,
      ticketId: id,
      targetStatus: status,
      ticketTitle: title
    });
  };

  const closeActionModal = () => {
    setModalContext({ isOpen: false, ticketId: null, targetStatus: '', ticketTitle: '' });
  };

  const handleStatusUpdateProcess = async () => {
    const { ticketId, targetStatus } = modalContext;

    try {
      const response = await updateTicketStatus(ticketId, { verificationStatus: targetStatus });

      if (response.modifiedCount > 0) {
        setTickets((prev) =>
          prev.map((t) => (t._id === ticketId ? { ...t, verificationStatus: targetStatus } : t))
        );
        toast.success(`Pipeline mutation successful: state declared as ${targetStatus}`);
        router.refresh();
      } else {
        toast.error("Failed to mutate ticket authority node.");
      }
    } catch (err) {
      console.error(err);
      toast.error("API network layer execution stream crash.");
    } finally {
      closeActionModal();
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-1 text-left">

      {/* ==================== 📊 PREMIUM METRICS COUNTER CARDS ==================== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Pending Matrix */}
        <div className="bg-gradient-to-br from-amber-50/60 to-white dark:from-amber-500/5 dark:to-zinc-900 border border-amber-200/50 dark:border-amber-500/10 p-4 rounded-2xl shadow-xs flex items-center justify-between transition-all hover:shadow-md">
          <div className="space-y-1">
            <p className="text-[10px] font-black tracking-widest uppercase text-amber-600 dark:text-amber-400">Pending Assets</p>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white">{totalPending}</h3>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl">
            <Hourglass className="h-5 w-5 animate-pulse" />
          </div>
        </div>

        {/* Approved Matrix */}
        <div className="bg-gradient-to-br from-emerald-50/60 to-white dark:from-emerald-500/5 dark:to-zinc-900 border border-emerald-200/50 dark:border-emerald-500/10 p-4 rounded-2xl shadow-xs flex items-center justify-between transition-all hover:shadow-md">
          <div className="space-y-1">
            <p className="text-[10px] font-black tracking-widest uppercase text-emerald-600 dark:text-emerald-400">Approved Distribution</p>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white">{totalApproved}</h3>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
            <CheckCircle className="h-5 w-5" />
          </div>
        </div>

        {/* Rejected Matrix */}
        <div className="bg-gradient-to-br from-rose-50/60 to-white dark:from-rose-500/5 dark:to-zinc-900 border border-rose-200/50 dark:border-rose-500/10 p-4 rounded-2xl shadow-xs flex items-center justify-between transition-all hover:shadow-md">
          <div className="space-y-1">
            <p className="text-[10px] font-black tracking-widest uppercase text-rose-500 dark:text-rose-400">Rejected Nodes</p>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white">{totalRejected}</h3>
          </div>
          <div className="p-3 bg-rose-500/10 text-rose-500 dark:text-rose-400 rounded-xl">
            <XCircle className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* ==================== 🛠️ FILTER ENGINE & SEARCH CONTROLS ==================== */}
      <div className="bg-white dark:bg-zinc-900 p-4 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
        {/* Search Field */}
        <div className="relative flex-1 group">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-white transition-colors">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            placeholder="Search by label/route title, vendor mail, or vehicle class..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 pl-10 pr-4 py-2.5 rounded-xl text-xs font-bold text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-500 focus:bg-white dark:focus:bg-zinc-900 focus:ring-4 focus:ring-zinc-100 dark:focus:ring-zinc-800/40 transition-all"
          />
        </div>

        {/* Status Dropdown Filter */}
        <div className="relative min-w-[160px] flex items-center group">
          <span className="absolute left-3.5 pointer-events-none text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-white transition-colors">
            <Filter className="h-3.5 w-3.5" />
          </span>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 pl-9 pr-10 py-2.5 rounded-xl text-xs font-black text-zinc-700 dark:text-zinc-300 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-500 focus:bg-white dark:focus:bg-zinc-900 focus:ring-4 focus:ring-zinc-100 dark:focus:ring-zinc-800/40 transition-all appearance-none cursor-pointer"
          >
            <option value="all">📊 All Pipeline States</option>
            <option value="pending">⏳ Pending Verification</option>
            <option value="approved">✅ Approved Assets</option>
            <option value="rejected">❌ Rejected Nodes</option>
          </select>
          <div className="absolute right-3.5 pointer-events-none text-zinc-400 text-[10px] font-bold group-hover:text-zinc-600 dark:group-hover:text-zinc-200 transition-colors">▼</div>
        </div>
      </div>

      {/* ==================== 📋 MATRIX DATA LAYOUT CONTAINER ==================== */}
      {filteredTickets.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-12 text-center text-zinc-400 font-bold text-xs uppercase tracking-widest">
          No records matching the current selection stream.
        </div>
      ) : (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl shadow-zinc-200/40 dark:shadow-none border border-zinc-100 dark:border-zinc-800/80 overflow-hidden">

          {/* Desktop Table: Hidden on Mobile streams */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-950/40 border-b border-zinc-100 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider">
                  <th className="p-4 pl-6">Fleet Visual</th>
                  <th className="p-4">Label/Route Target</th>
                  <th className="p-4">Vendor Mail Node</th>
                  <th className="p-4">Classification</th>
                  <th className="p-4">Price Tariff</th>
                  <th className="p-4 text-center">Network State</th>
                  <th className="p-4 pr-6 text-right">Action Key</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                {currentItems.map((ticket) => (
                  <tr key={ticket._id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-950/20 transition-colors">
                    <td className="p-4 pl-6">
                      <img src={ticket.image} className="w-14 h-10 object-cover rounded-xl border border-zinc-100 dark:border-zinc-800" alt="Fleet" />
                    </td>
                    <td className="p-4 font-bold text-zinc-900 dark:text-white max-w-[180px] truncate">{ticket.title}</td>
                    <td className="p-4 font-mono text-xs text-zinc-400 dark:text-zinc-500">{ticket.vendorEmail}</td>
                    <td className="p-4 uppercase tracking-wider text-xs font-black text-[#1E3A8A] dark:text-blue-400">{ticket.transportType}</td>
                    <td className="p-4 font-black text-zinc-900 dark:text-white">৳ {ticket.pricePerUnit.toLocaleString()}</td>
                    <td className="p-4 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${
                        ticket.verificationStatus === 'approved' ? 'bg-emerald-50/60 border-emerald-200 text-emerald-600 dark:bg-emerald-500/5 dark:border-emerald-500/20' :
                        ticket.verificationStatus === 'rejected' ? 'bg-rose-50/60 border-rose-200 text-rose-600 dark:bg-rose-500/5 dark:border-rose-500/20' :
                        'bg-amber-50/60 border-amber-200 text-amber-600 dark:bg-amber-500/5 dark:border-amber-500/20'
                      }`}>
                        {ticket.verificationStatus}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right space-x-2">
                      <button
                        onClick={() => openActionModal(ticket._id, 'approved', ticket.title)}
                        disabled={ticket.verificationStatus === 'approved'}
                        className="inline-flex items-center justify-center p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 disabled:opacity-30 transition-all cursor-pointer disabled:cursor-not-allowed"
                        title="Approve Asset"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => openActionModal(ticket._id, 'rejected', ticket.title)}
                        disabled={ticket.verificationStatus === 'rejected'}
                        className="inline-flex items-center justify-center p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 disabled:opacity-30 transition-all cursor-pointer disabled:cursor-not-allowed"
                        title="Reject Asset"
                      >
                        <XCircle className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View Card Matrix Layout */}
          <div className="block md:hidden divide-y divide-zinc-100 dark:divide-zinc-800">
            {currentItems.map((ticket) => (
              <div key={ticket._id} className="p-5 space-y-4 bg-white dark:bg-zinc-900 text-left">
                <div className="flex items-center space-x-3.5">
                  <img src={ticket.image} className="w-16 h-12 object-cover rounded-xl border dark:border-zinc-800" alt="Fleet" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-black text-zinc-900 dark:text-white truncate">{ticket.title}</h4>
                    <p className="text-xs text-zinc-400 font-mono truncate">{ticket.vendorEmail}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs border-y border-zinc-50 dark:border-zinc-800/60 py-2.5">
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold tracking-wider">Transport</span>
                    <span className="font-bold uppercase text-[#1E3A8A] dark:text-blue-400">{ticket.transportType}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold tracking-wider">Price Tariff</span>
                    <span className="font-black text-zinc-900 dark:text-white">৳ {ticket.pricePerUnit.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${
                    ticket.verificationStatus === 'approved' ? 'bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-500/5' :
                    ticket.verificationStatus === 'rejected' ? 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-500/5' :
                    'bg-amber-50 border-amber-200 text-amber-600 dark:bg-amber-500/5'
                  }`}>
                    {ticket.verificationStatus}
                  </span>
                  <div className="space-x-2">
                    <button
                      onClick={() => openActionModal(ticket._id, 'approved', ticket.title)}
                      disabled={ticket.verificationStatus === 'approved'}
                      className="px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider bg-emerald-600 text-white disabled:opacity-40"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => openActionModal(ticket._id, 'rejected', ticket.title)}
                      disabled={ticket.verificationStatus === 'rejected'}
                      className="px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider bg-rose-600 text-white disabled:opacity-40"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ==================== 🔢 PAGINATION SYSTEMS ENGINE ==================== */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2 pt-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 disabled:opacity-40 transition-colors cursor-pointer text-zinc-700 dark:text-zinc-300"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Previous</span>
          </button>
          <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
            Page <span className="text-zinc-800 dark:text-white">{currentPage}</span> of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 disabled:opacity-40 transition-colors cursor-pointer text-zinc-700 dark:text-zinc-300"
          >
            <span>Next</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* ==================== 🪟 MUTATION HANDSHAKE CONFIRMATION MODAL ==================== */}
      <AnimatePresence>
        {modalContext.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeActionModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-2xl p-6 space-y-6 relative z-10"
            >
              <div className="flex items-center space-x-3 text-amber-500">
                <AlertTriangle className="h-6 w-6 shrink-0" />
                <h3 className="text-base font-black tracking-tight text-zinc-900 dark:text-white">
                  Confirm Pipeline Authentication Mutation
                </h3>
              </div>

              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                Are you sure you want to change the distribution clearance status to{" "}
                <span className={`font-black uppercase tracking-wider px-1.5 py-0.5 rounded ${
                  modalContext.targetStatus === 'approved' ? 'text-emerald-500 bg-emerald-500/5' : 'text-rose-500 bg-rose-500/5'
                }`}>
                  {modalContext.targetStatus}
                </span>{" "}
                for the route wrapper node: <span className="font-bold text-zinc-800 dark:text-zinc-200">{modalContext.ticketTitle}</span>?
              </p>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  onClick={closeActionModal}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-zinc-100 hover:bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-200 transition-colors cursor-pointer"
                >
                  Abort
                </button>
                <button
                  onClick={handleStatusUpdateProcess}
                  className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-white shadow-lg transition-all active:scale-95 cursor-pointer ${
                    modalContext.targetStatus === 'approved'
                      ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/10'
                      : 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/10'
                  }`}
                >
                  Confirm Mutation
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}