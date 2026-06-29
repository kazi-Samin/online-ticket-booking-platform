'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // 🖼️ Next.js Image Component যোগ করা হয়েছে
import {
  Search, Filter, ShieldCheck, UserCheck, AlertTriangle,
  Users, UserX, ArrowLeft, ArrowRight,
  Shield, Store, Ban, Unlock, Info
} from 'lucide-react';
import { updateUserRole } from '@/lib/actions/userRoleUpdate';
import { updateUserIsFraud } from '@/lib/actions/isFraud';

export default function ManageUsersClient({ initialUsers }) {
  const router = useRouter();
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  // 🔢 পেজিনেশন স্টেট
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // মোডাল হ্যান্ডলার স্টেট
  const [modalContext, setModalContext] = useState({
    isOpen: false,
    userId: null,
    userName: '',
    actionType: '', // 'changeRole' | 'toggleFraud'
    payload: {}
  });

  // 📊 ড্যাশবোর্ড কাউন্টারস
  const totalUsers = users.length;
  const totalAdmins = users.filter(u => u.role === 'admin').length;
  const totalVendors = users.filter(u => u.role === 'vendor' && !u.isFraud).length;
  const totalFrauds = users.filter(u => u.isFraud === true).length;

  // 🔍 সার্চ ও ফিল্টার লজিক
  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesFilter = true;
    if (roleFilter === 'admin') matchesFilter = user.role === 'admin';
    else if (roleFilter === 'vendor') matchesFilter = user.role === 'vendor' && !user.isFraud;
    else if (roleFilter === 'user') matchesFilter = user.role === 'user';
    else if (roleFilter === 'fraud') matchesFilter = user.isFraud === true;

    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const openActionModal = (id, name, type, payload = {}) => {
    setModalContext({ isOpen: true, userId: id, userName: name, actionType: type, payload: payload });
  };

  const closeActionModal = () => {
    setModalContext({ isOpen: false, userId: null, userName: '', actionType: '', payload: {} });
  };

 const handleMutationProcess = async () => {
  const { userId, actionType, payload } = modalContext;

  try {
    if (actionType === 'changeRole') {

      const response = await updateUserRole(userId, { role: payload.role });

      if (response?.modifiedCount > 0 || response?.acknowledged) {
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, role: payload.role, isFraud: payload.role === 'admin' ? false : u.isFraud } : u))
        );
        toast.success(`User role updated to ${payload.role} successfully.`);
      } else {
        toast.error("Failed to update role in database.");
      }
    } else if (actionType === 'toggleFraud') {

      const response = await updateUserIsFraud(userId, { isFraud: payload.isFraud });

      if (response?.message || response?.modifiedCount > 0) {
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, isFraud: payload.isFraud } : u))
        );

        if (payload.isFraud) {
          toast.warning("Vendor marked as FRAUD. All tickets hidden.");
        } else {
          toast.success("Fraud status successfully cleared.");
        }
      } else {
        toast.error("Failed to update fraud status.");
      }
    }

    // নেক্সট জেএস পেজ রিফ্রেশ করে লেটেস্ট ডাটা সার্ভার থেকে টানার জন্য
    router.refresh();
  } catch (err) {
    console.error("API Error:", err);
    toast.error("Database communication failure.");
  } finally {
    closeActionModal();
  }
};

  return (
    <div className="space-y-6">

      {/* ==================== 📊 COUNTER CARDS ==================== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black tracking-widest uppercase text-slate-400">Total Users</p>
            <h3 className="text-xl md:text-2xl font-black text-[#1E293B] dark:text-white mt-1">{totalUsers}</h3>
          </div>
          <div className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-xl"><Users className="h-4 w-4" /></div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black tracking-widest uppercase text-[#1E3A8A] dark:text-blue-400">Admins</p>
            <h3 className="text-xl md:text-2xl font-black text-[#1E293B] dark:text-white mt-1">{totalAdmins}</h3>
          </div>
          <div className="p-2.5 bg-[#1E3A8A]/10 text-[#1E3A8A] dark:text-blue-400 rounded-xl"><ShieldCheck className="h-4 w-4" /></div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black tracking-widest uppercase text-emerald-600 dark:text-emerald-400">Active Vendors</p>
            <h3 className="text-xl md:text-2xl font-black text-[#1E293B] dark:text-white mt-1">{totalVendors}</h3>
          </div>
          <div className="p-2.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl"><UserCheck className="h-4 w-4" /></div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black tracking-widest uppercase text-rose-500">Fraud Vendors</p>
            <h3 className="text-xl md:text-2xl font-black text-[#1E293B] dark:text-white mt-1">{totalFrauds}</h3>
          </div>
          <div className="p-2.5 bg-rose-500/10 text-rose-500 rounded-xl"><UserX className="h-4 w-4" /></div>
        </div>
      </div>

      {/* ==================== 🛠️ SEARCH & FILTER ==================== */}
      <div className="bg-white dark:bg-slate-900 p-4 border border-slate-100 dark:border-slate-800/60 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="w-full bg-[#F8FAFC] dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 pl-10 pr-4 py-2.5 rounded-xl text-xs font-bold focus:outline-none focus:border-[#1E3A8A] focus:bg-white dark:focus:bg-slate-900 transition-all text-[#1E293B] dark:text-slate-200"
          />
        </div>

        <div className="relative min-w-42.5 flex items-center">
          <span className="absolute left-3.5 text-slate-400"><Filter className="h-3.5 w-3.5" /></span>
          <select
            value={roleFilter}
            onChange={(e) => { setRoleFilter(e.target.value); setCurrentPage(1); }}
            className="w-full bg-[#F8FAFC] dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 pl-9 pr-10 py-2.5 rounded-xl text-xs font-black text-slate-700 dark:text-slate-300 focus:outline-none focus:border-[#1E3A8A] appearance-none cursor-pointer"
          >
            <option value="all">📊 All Users</option>
            <option value="user">👤 Standard Users</option>
            <option value="admin">🛡️ Admins</option>
            <option value="vendor">🏪 Active Vendors</option>
            <option value="fraud">🚨 Fraud Vendors</option>
          </select>
          <div className="absolute right-3.5 text-slate-400 text-[10px]">▼</div>
        </div>
      </div>

      {/* ==================== 🏷️ ICON LEGEND GUIDE ==================== */}
      <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80 rounded-xl p-2.5 px-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[11px] text-slate-500 font-bold">
        <span className="flex items-center gap-1 text-slate-400"><Info className="h-3.5 w-3.5" /> Control Guide:</span>
        <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-[#1E3A8A]" /> Admin Grant</span>
        <span className="flex items-center gap-1.5"><Store className="h-3.5 w-3.5 text-emerald-600" /> Vendor Grant</span>
        <span className="flex items-center gap-1.5"><Ban className="h-3.5 w-3.5 text-amber-500" /> Mark Fraud</span>
      </div>

      {/* ==================== 📋 DATA TABLE ==================== */}
      {filteredUsers.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-12 text-center text-slate-400 font-bold text-xs uppercase tracking-widest">
          No records found.
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/80 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left min-w-237.5">
              <thead>
                <tr className="bg-[#F8FAFC] dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-[11px] font-black uppercase tracking-wider">
                  <th className="p-4 pl-6 w-[8%]">Profile</th>
                  <th className="p-4 w-[24%]">Name</th>
                  <th className="p-4 w-[28%]">Email Address</th>
                  <th className="p-4 text-center w-[15%]">Status/Role</th>
                  <th className="p-4 pr-6 text-right w-[25%]">Actions Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-bold text-slate-700 dark:text-zinc-300">
                {currentItems.map((user) => (
                  <tr key={user._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20 transition-colors">
                    <td className="p-4 pl-6">
                      {/* 🖼️ Standard Image Component with defined width/height */}
                      {/* <img src={user.image} className="w-9 h-9 object-cover rounded-full ring-2 ring-slate-100 dark:ring-slate-800" alt="Avatar" /> */}
                      <div className="relative w-9 h-9">
                        <Image
                          src={user?.image || "/fallback-avatar.png"}
                          alt={`${user?.name || "User"}'s Avatar`}
                          width={40}
                          height={40}
                          className="w-9 h-9 object-cover rounded-full ring-2 ring-slate-100 dark:ring-slate-800"
                        />
                      </div>
                    </td>
                    <td className="p-4 font-black text-sm text-slate-900 dark:text-white">{user.name}</td>
                    <td className="p-4 font-mono text-slate-400 dark:text-slate-500">{user.email}</td>
                    <td className="p-4 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${user.isFraud ? 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-500/5' :
                          user.role === 'admin' ? 'bg-blue-50 border-blue-200 text-[#1E3A8A] dark:bg-blue-500/5 dark:text-blue-400' :
                            user.role === 'vendor' ? 'bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-500/5' :
                              'bg-slate-50 border-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                        }`}>
                        {user.isFraud ? 'FRAUD VENDOR' : user.role}
                      </span>
                    </td>

                    {/* 🛠️ অ্যাকশন বাটন কন্ট্রোল */}
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end space-x-2">

                        {/* 🛡️ Make Admin বাটন */}
                        <button
                          onClick={() => openActionModal(user._id, user.name, 'changeRole', { role: 'admin' })}
                          disabled={user.role === 'admin' || user.isFraud}
                          title="Make Admin"
                          className="p-2 rounded-xl border border-[#1E3A8A]/15 bg-[#1E3A8A]/5 text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white dark:border-blue-500/30 dark:bg-blue-500/5 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white transition-all disabled:opacity-10 disabled:cursor-not-allowed cursor-pointer"
                        >
                          <Shield className="h-4 w-4" />
                        </button>

                        {/* 🏪 Make Vendor বাটন */}
                        <button
                          onClick={() => openActionModal(user._id, user.name, 'changeRole', { role: 'vendor' })}
                          disabled={user.role === 'vendor' || user.isFraud}
                          title="Make Vendor"
                          className="p-2 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white dark:border-emerald-500/30 dark:bg-emerald-500/5 dark:text-emerald-400 dark:hover:bg-emerald-600 dark:hover:text-white transition-all disabled:opacity-10 disabled:cursor-not-allowed cursor-pointer"
                        >
                          <Store className="h-4 w-4" />
                        </button>

                        {/* ⚠️ Fraud বাটন লজিক [FIXED]: ইউজার ভেন্ডর হলেই কেবল বাটন রেন্ডার হবে */}
                        {user.role === 'vendor' && (
                          <button
                            onClick={() => openActionModal(user._id, user.name, 'toggleFraud', { isFraud: !user.isFraud })}
                            title={user.isFraud ? 'Unmark Fraud' : 'Mark as Fraud'}
                            className={`p-2 rounded-xl border transition-all cursor-pointer ${user.isFraud
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-600 hover:text-white'
                                : 'bg-amber-50 border-amber-300 text-amber-600 hover:bg-amber-500 hover:text-white'
                              }`}
                          >
                            {user.isFraud ? <Unlock className="h-4 w-4" /> : <Ban className="h-4 w-4" />}
                          </button>
                        )}

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==================== 🔢 PAGINATION CONTROLS ==================== */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2 pt-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-800 hover:bg-slate-50 disabled:opacity-30 transition-all cursor-pointer disabled:cursor-not-allowed text-slate-700 dark:text-slate-300"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Previous</span>
          </button>

          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Page <span className="text-[#1E3A8A] dark:text-blue-400 font-black">{currentPage}</span> of <span className="text-slate-800 dark:text-white font-black">{totalPages}</span>
          </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-800 hover:bg-slate-50 disabled:opacity-30 transition-all cursor-pointer disabled:cursor-not-allowed text-slate-700 dark:text-zinc-300"
          >
            <span>Next</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* ==================== 🪟 DYNAMIC CONFIRMATION MODAL ==================== */}
      <AnimatePresence>
        {modalContext.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeActionModal} className="absolute inset-0 bg-black/60 backdrop-blur-xs" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-2xl p-6 space-y-6 relative z-10 text-left">

              <div className="flex items-center space-x-3">
                {modalContext.actionType === 'toggleFraud' && modalContext.payload.isFraud ? (
                  <AlertTriangle className="h-6 w-6 text-amber-500 shrink-0 animate-pulse" />
                ) : (
                  <AlertTriangle className="h-6 w-6 text-blue-500 shrink-0" />
                )}
                <h3 className="text-base font-black tracking-tight text-slate-900 dark:text-white">
                  {modalContext.actionType === 'toggleFraud' && modalContext.payload.isFraud ? '🚨 Fraud Sanction Confirmation' : 'Confirm Access Modification'}
                </h3>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                {modalContext.actionType === 'toggleFraud' ? (
                  modalContext.payload.isFraud ? (
                    <>Are you sure you want to flag <span className="font-bold text-slate-900 dark:text-white">{modalContext.userName}</span> as fraud? <strong>All associated tickets will be instantly hidden</strong> and this vendor will lose ticket creation access.</>
                  ) : (
                    <>Are you sure you want to lift the fraud status from <span className="font-bold text-slate-900 dark:text-white">{modalContext.userName}</span>?</>
                  )
                ) : (
                  <>Are you sure you want to change the network access role for <span className="font-bold text-slate-900 dark:text-white">{modalContext.userName}</span> to <span className="text-[#1E3A8A] dark:text-blue-400 font-black uppercase">{modalContext.payload.role}</span>?</>
                )}
              </p>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button onClick={closeActionModal} className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-200 transition-colors cursor-pointer">Abort</button>
                <button
                  onClick={handleMutationProcess}
                  className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-white shadow-lg transition-all active:scale-95 cursor-pointer ${modalContext.actionType === 'toggleFraud' && modalContext.payload.isFraud ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/10' :
                      'bg-[#1E3A8A] hover:bg-blue-700 shadow-[#1E3A8A]/10'
                    }`}
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}