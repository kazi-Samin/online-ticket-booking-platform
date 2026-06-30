'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  AlertTriangle, CheckCircle, XCircle, ArrowLeft, ArrowRight, 
  Search, Filter, Hourglass, Layers 
} from 'lucide-react';
import { updateTicketStatus } from '@/lib/actions/status';

export default function ManageTicketsTable({ initialTickets = [] }) {
  const router = useRouter();
  const [tickets, setTickets] = useState(Array.isArray(initialTickets) ? initialTickets : []);
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
  const totalPending = tickets.filter(t => t?.verificationStatus === 'pending').length;
  const totalApproved = tickets.filter(t => t?.verificationStatus === 'approved').length;
  const totalRejected = tickets.filter(t => t?.verificationStatus === 'rejected').length;

  // 🔍 সার্চ এবং ফিল্টারিং লজিক পাইপলাইন
  const filteredTickets = tickets.filter(ticket => {
    if (!ticket) return false;
    const title = ticket.title || '';
    const email = ticket.vendorEmail || '';
    const type = ticket.transportType || '';

    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || ticket.verificationStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate dynamic rows offset tracking boundaries
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage) || 1;
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
    if (!ticketId) return;

    try {
      const response = await updateTicketStatus(ticketId, { verificationStatus: targetStatus });

      if (response?.modifiedCount > 0 || response?.acknowledged) {
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
    <div className="space-y-6 max-w-7xl mx-auto p-1 text-left text-slate-800 dark:text-slate-200">

      {/* ==================== 📊 PREMIUM METRICS COUNTER CARDS ==================== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Pending Matrix */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-xs flex items-center justify-between transition-all hover:shadow-md">
          <div className="space-y-1">
            <p className="text-[10px] font-black tracking-widest uppercase text-amber-600 dark:text-amber-400">Awaiting Verification</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">{totalPending}</h3>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-2xl">
            <Hourglass className="h-5 w-5 animate-pulse" />
          </div>
        </div>

        {/* Approved Matrix */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-xs flex items-center justify-between transition-all hover:shadow-md">
          <div className="space-y-1">
            <p className="text-[10px] font-black tracking-widest uppercase text-emerald-600 dark:text-emerald-400">Active Fleet Assets</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">{totalApproved}</h3>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl">
            <CheckCircle className="h-5 w-5" />
          </div>
        </div>

        {/* Rejected Matrix */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-xs flex items-center justify-between transition-all hover:shadow-md">
          <div className="space-y-1">
            <p className="text-[10px] font-black tracking-widest uppercase text-red-500">Denied Nodes</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">{totalRejected}</h3>
          </div>
          <div className="p-3 bg-red-500/10 text-red-500 rounded-2xl">
            <XCircle className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* ==================== 🛠️ FILTER ENGINE & SEARCH CONTROLS ==================== */}
      <div className="bg-white dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Field */}
        <div className="relative flex-1 group">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 dark:text-slate-500">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            placeholder="Scan itinerary title, merchant node or transit mode..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-slate-800 pl-10 pr-4 py-2.5 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-teal-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
          />
        </div>

        {/* Status Dropdown Filter */}
        <div className="relative min-w-[180px] flex items-center group">
          <span className="absolute left-3.5 pointer-events-none text-slate-400"><Filter className="h-3.5 w-3.5" /></span>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-slate-800 pl-9 pr-10 py-2.5 rounded-xl text-xs font-black text-slate-700 dark:text-slate-300 focus:outline-none focus:border-teal-500 appearance-none cursor-pointer"
          >
            <option value="all">📊 All Matrix Pipelines</option>
            <option value="pending">⏳ Verification Pending</option>
            <option value="approved">✅ Authorized Inventory</option>
            <option value="rejected">❌ Denied Class Logs</option>
          </select>
          <div className="absolute right-3.5 pointer-events-none text-slate-400 text-[10px] font-bold">▼</div>
        </div>
      </div>

      {/* ==================== 📋 MATRIX DATA LAYOUT CONTAINER ==================== */}
      {filteredTickets.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center text-slate-400 font-bold text-xs uppercase tracking-widest">
          No records matching the current selection stream.
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">

          {/* Desktop Table: Hidden on Mobile streams */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-wider">
                  <th className="p-4 pl-6 w-[10%]">Fleet Visual</th>
                  <th className="p-4 w-[25%]">Route Designation</th>
                  <th className="p-4 w-[25%]">Merchant Identifier</th>
                  <th className="p-4 w-[15%]">Transit Node</th>
                  <th className="p-4 w-[12%]">Base Tariff</th>
                  <th className="p-4 text-center w-[13%]">Clearance</th>
                  <th className="p-4 pr-6 text-right w-[15%]">Operation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-xs font-bold text-slate-700 dark:text-slate-300">
                {currentItems.map((ticket) => (
                  <tr key={ticket._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="relative w-14 h-9">
                        <Image 
                          src={ticket?.image || "/fallback-transit.png"} 
                          alt="Fleet Hub Illustration"
                          fill
                          className="object-cover rounded-xl border border-slate-200 dark:border-slate-800"
                          unoptimized
                        />
                      </div>
                    </td>
                    <td className="p-4 font-black text-sm text-slate-900 dark:text-white max-w-[200px] truncate">{ticket.title}</td>
                    <td className="p-4 font-mono text-slate-400 dark:text-slate-500 text-[11px]">{ticket.vendorEmail}</td>
                    <td className="p-4 uppercase tracking-wider text-[10px] font-black text-teal-600 dark:text-teal-400">{ticket.transportType}</td>
                    <td className="p-4 font-black text-slate-900 dark:text-white text-sm">৳ {(ticket.pricePerUnit ?? 0).toLocaleString()}</td>
                    <td className="p-4 text-center">
                      <span className={`inline-block px-2.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider border ${
                        ticket.verificationStatus === 'approved' ? 'bg-emerald-100 border-emerald-200 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' :
                        ticket.verificationStatus === 'rejected' ? 'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20' :
                        'bg-slate-100 border-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                      }`}>
                        {ticket.verificationStatus}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right space-x-2">
                      <button
                        onClick={() => openActionModal(ticket._id, 'approved', ticket.title)}
                        disabled={ticket.verificationStatus === 'approved'}
                        className="inline-flex items-center justify-center p-2 rounded-xl border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50/50 text-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-500 hover:text-white dark:hover:text-white transition-all disabled:opacity-10 disabled:cursor-not-allowed cursor-pointer"
                        title="Authorize Listing"
                      >
                        <CheckCircle className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => openActionModal(ticket._id, 'rejected', ticket.title)}
                        disabled={ticket.verificationStatus === 'rejected'}
                        className="inline-flex items-center justify-center p-2 rounded-xl border border-red-200 dark:border-red-500/20 bg-red-50/50 text-red-600 hover:bg-red-600 dark:hover:bg-red-500 hover:text-white dark:hover:text-white transition-all disabled:opacity-10 disabled:cursor-not-allowed cursor-pointer"
                        title="Deny Listing"
                      >
                        <XCircle className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View Card Matrix Layout */}
          <div className="block md:hidden divide-y divide-slate-100 dark:divide-slate-800/40">
            {currentItems.map((ticket) => (
              <div key={ticket._id} className="p-5 space-y-4 bg-white dark:bg-slate-900 text-left">
                <div className="flex items-center space-x-3.5">
                  <div className="relative w-16 h-12 shrink-0">
                    <Image 
                      src={ticket?.image || "/fallback-transit.png"} 
                      alt="Fleet" 
                      fill
                      className="object-cover rounded-xl border dark:border-slate-800"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-black text-slate-900 dark:text-white truncate">{ticket.title}</h4>
                    <p className="text-[11px] text-slate-400 font-mono truncate">{ticket.vendorEmail}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] border-y border-slate-100 dark:border-slate-800/60 py-2.5">
                  <div>
                    <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">Classification</span>
                    <span className="font-bold uppercase text-teal-600 dark:text-teal-400">{ticket.transportType}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">Tariff Rate</span>
                    <span className="font-black text-slate-900 dark:text-white">৳ {(ticket.pricePerUnit ?? 0).toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className={`px-2.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider border ${
                    ticket.verificationStatus === 'approved' ? 'bg-emerald-100 border-emerald-200 text-emerald-700 dark:bg-emerald-500/10' :
                    ticket.verificationStatus === 'rejected' ? 'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10' :
                    'bg-slate-100 border-slate-200 text-slate-600 dark:bg-slate-800'
                  }`}>
                    {ticket.verificationStatus}
                  </span>
                  <div className="space-x-2">
                    <button
                      onClick={() => openActionModal(ticket._id, 'approved', ticket.title)}
                      disabled={ticket.verificationStatus === 'approved'}
                      className="px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white disabled:opacity-30 transition-all cursor-pointer"
                    >
                      Grant
                    </button>
                    <button
                      onClick={() => openActionModal(ticket._id, 'rejected', ticket.title)}
                      disabled={ticket.verificationStatus === 'rejected'}
                      className="px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider bg-red-600 text-white disabled:opacity-30 transition-all cursor-pointer"
                    >
                      Deny
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
        <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-3xl shadow-xs">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 transition-all cursor-pointer disabled:cursor-not-allowed text-slate-700 dark:text-slate-300"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Previous</span>
          </button>
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Page Matrix <span className="text-teal-600 dark:text-teal-400 font-black">{currentPage}</span> of <span className="text-slate-800 dark:text-white font-black">{totalPages}</span>
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 transition-all cursor-pointer disabled:cursor-not-allowed text-slate-700 dark:text-slate-300"
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
              className="w-full max-w-md bg-white dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-6 relative z-10"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-teal-50 dark:bg-teal-500/10 rounded-xl"><AlertTriangle className="h-5 w-5 text-teal-500" /></div>
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                  Confirm Clearance Alteration
                </h3>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                Are you sure you want to change the network distribution status to{" "}
                <span className={`font-black uppercase tracking-wider px-1.5 py-0.5 rounded ${
                  modalContext.targetStatus === 'approved' 
                    ? 'text-emerald-700 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-500/10' 
                    : 'text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-500/10'
                }`}>
                  {modalContext.targetStatus}
                </span>{" "}
                for the wrapper itinerary asset: <span className="font-bold text-slate-900 dark:text-white">{modalContext.ticketTitle}</span>?
              </p>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  onClick={closeActionModal}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-300 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStatusUpdateProcess}
                  className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-white shadow-lg transition-all active:scale-95 cursor-pointer ${
                    modalContext.targetStatus === 'approved'
                      ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/10'
                      : 'bg-red-600 hover:bg-red-500 shadow-rose-600/10'
                  }`}
                >
                  Commit Action
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}