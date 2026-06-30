'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Search, Filter, ShieldCheck, UserCheck, AlertTriangle,
  Users, UserX, ArrowLeft, ArrowRight,
  Shield, Store, Ban, Unlock, Info
} from 'lucide-react';
import { updateUserRole } from '@/lib/actions/userRoleUpdate';
import { updateUserIsFraud } from '@/lib/actions/isFraud';

export default function ManageUsersClient({ initialUsers = [] }) {
  const router = useRouter();
  const [users, setUsers] = useState(Array.isArray(initialUsers) ? initialUsers : []);
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

  // 📊 ড্যাশবোর্ড কাউন্টারস safely calculated
  const totalUsers = users.length;
  const totalAdmins = users.filter(u => u?.role === 'admin').length;
  const totalVendors = users.filter(u => u?.role === 'vendor' && !u?.isFraud).length;
  const totalFrauds = users.filter(u => u?.isFraud === true || u?.isFraud === 'true').length;

  // 🔍 সার্চ ও ফিল্টার লজিক
  const filteredUsers = users.filter(user => {
    if (!user) return false;
    const name = user.name || '';
    const email = user.email || '';
    
    const matchesSearch =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesFilter = true;
    if (roleFilter === 'admin') matchesFilter = user.role === 'admin';
    else if (roleFilter === 'vendor') matchesFilter = user.role === 'vendor' && !user.isFraud;
    else if (roleFilter === 'user') matchesFilter = user.role === 'user';
    else if (roleFilter === 'fraud') matchesFilter = user.isFraud === true || user.isFraud === 'true';

    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
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
    if (!userId) return;

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
      router.refresh();
    } catch (err) {
      console.error("API Error:", err);
      toast.error("Database communication failure.");
    } finally {
      closeActionModal();
    }
  };

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-200">

      {/* ==================== 📊 UNIQUE METRICS GRID ==================== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[10px] font-black tracking-widest uppercase text-slate-400">Total Directory</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{totalUsers}</h3>
          </div>
          <div className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-2xl"><Users className="h-5 w-5" /></div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[10px] font-black tracking-widest uppercase text-blue-600 dark:text-blue-400">System Admins</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{totalAdmins}</h3>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl"><ShieldCheck className="h-5 w-5" /></div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[10px] font-black tracking-widest uppercase text-emerald-600 dark:text-emerald-400">Verified Vendors</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{totalVendors}</h3>
          </div>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl"><UserCheck className="h-5 w-5" /></div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[10px] font-black tracking-widest uppercase text-red-500">Fraud Alerts</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{totalFrauds}</h3>
          </div>
          <div className="p-3 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-2xl"><UserX className="h-5 w-5" /></div>
        </div>
      </div>

      {/* ==================== 🛠️ SEARCH & FILTER PANEL ==================== */}
      <div className="bg-white dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 dark:text-slate-500">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            placeholder="Filter database accounts by identity..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-slate-800 pl-10 pr-4 py-2.5 rounded-xl text-xs font-bold focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-all text-slate-800 dark:text-slate-200"
          />
        </div>

        <div className="relative min-w-[200px] flex items-center">
          <span className="absolute left-3.5 text-slate-400"><Filter className="h-3.5 w-3.5" /></span>
          <select
            value={roleFilter}
            onChange={(e) => { setRoleFilter(e.target.value); setCurrentPage(1); }}
            className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-slate-800 pl-9 pr-10 py-2.5 rounded-xl text-xs font-black text-slate-700 dark:text-slate-300 focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
          >
            <option value="all">📊 All Matrix Logs</option>
            <option value="user">👤 Standard Users</option>
            <option value="admin">🛡️ Master Admins</option>
            <option value="vendor">🏪 Active Operators</option>
            <option value="fraud">🚨 Terminated/Fraud</option>
          </select>
          <div className="absolute right-3.5 text-slate-400 text-[10px] pointer-events-none">▼</div>
        </div>
      </div>

      {/* ==================== 🏷️ SYSTEM INFRASTRUCTURE GUIDE ==================== */}
      <div className="bg-slate-100/60 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 rounded-2xl p-3 px-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-bold">
        <span className="flex items-center gap-1 text-slate-400 dark:text-slate-500"><Info className="h-3.5 w-3.5" /> Command Console Matrix:</span>
        <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-blue-600" /> Administrative Provision</span>
        <span className="flex items-center gap-1.5"><Store className="h-3.5 w-3.5 text-emerald-600" /> Merchant Authority</span>
        <span className="flex items-center gap-1.5"><Ban className="h-3.5 w-3.5 text-orange-500" /> Flag Fraud Log</span>
      </div>

      {/* ==================== 📋 MATRIX DATA SHEET ==================== */}
      {filteredUsers.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center text-slate-400 font-bold text-xs uppercase tracking-widest">
          No records matched the system lookup query.
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left min-w-[900px]">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-wider">
                  <th className="p-4 pl-6 w-[8%]">Profile</th>
                  <th className="p-4 w-[24%]">Name</th>
                  <th className="p-4 w-[28%]">Email Reference</th>
                  <th className="p-4 text-center w-[15%]">Network Status</th>
                  <th className="p-4 pr-6 text-right w-[25%]">System Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-xs font-bold text-slate-700 dark:text-slate-300">
                {currentItems.map((user) => (
                  <tr key={user._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="relative w-9 h-9">
                        <Image
                          src={user?.image || "/fallback-avatar.png"}
                          alt={`${user?.name || "User"}'s Avatar`}
                          width={36}
                          height={36}
                          className="w-9 h-9 object-cover rounded-full ring-2 ring-slate-200 dark:ring-slate-800"
                        />
                      </div>
                    </td>
                    <td className="p-4 font-black text-xs text-slate-900 dark:text-white">{user.name}</td>
                    <td className="p-4 font-mono text-slate-400 dark:text-slate-500 text-[11px]">{user.email}</td>
                    <td className="p-4 text-center">
                      <span className={`inline-block px-2.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider border ${
                        user.isFraud 
                          ? 'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20' 
                          : user.role === 'admin' 
                          ? 'bg-blue-100 border-blue-200 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20' 
                          : user.role === 'vendor' 
                          ? 'bg-emerald-100 border-emerald-200 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' 
                          : 'bg-slate-100 border-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                      }`}>
                        {user.isFraud ? 'FRAUD ACTIVE' : user.role}
                      </span>
                    </td>

                    {/* 🛠️ CONTROL OPERATIONS */}
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => openActionModal(user._id, user.name, 'changeRole', { role: 'admin' })}
                          disabled={user.role === 'admin' || user.isFraud}
                          title="Grant Admin Privileges"
                          className="p-2 rounded-xl border border-blue-200 dark:border-blue-500/20 bg-blue-50/50 text-blue-600 dark:bg-blue-500/5 dark:text-blue-400 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-white transition-all disabled:opacity-10 disabled:cursor-not-allowed cursor-pointer"
                        >
                          <Shield className="h-3.5 w-3.5" />
                        </button>

                        <button
                          onClick={() => openActionModal(user._id, user.name, 'changeRole', { role: 'vendor' })}
                          disabled={user.role === 'vendor' || user.isFraud}
                          title="Authorize Vendor Node"
                          className="p-2 rounded-xl border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50/50 text-emerald-600 dark:bg-emerald-500/5 dark:text-emerald-400 hover:bg-emerald-600 dark:hover:bg-emerald-500 hover:text-white dark:hover:text-white transition-all disabled:opacity-10 disabled:cursor-not-allowed cursor-pointer"
                        >
                          <Store className="h-3.5 w-3.5" />
                        </button>

                        {user.role === 'vendor' && (
                          <button
                            onClick={() => openActionModal(user._id, user.name, 'toggleFraud', { isFraud: !user.isFraud })}
                            title={user.isFraud ? 'Re-authorize Node' : 'Impose Sanction Log'}
                            className={`p-2 rounded-xl border transition-all cursor-pointer ${
                              user.isFraud
                                ? 'bg-emerald-50 dark:bg-emerald-500/5 border-emerald-200 dark:border-emerald-500/20 text-emerald-600 hover:bg-emerald-600 hover:text-white'
                                : 'bg-orange-50 dark:bg-orange-500/5 border-orange-200 dark:border-orange-500/20 text-orange-600 hover:bg-orange-500 hover:text-white'
                            }`}
                          >
                            {user.isFraud ? <Unlock className="h-3.5 w-3.5" /> : <Ban className="h-3.5 w-3.5" />}
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

      {/* ==================== 🔢 PAGINATION MATRIX ==================== */}
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
            Log Node <span className="text-blue-600 dark:text-blue-400 font-black">{currentPage}</span> of <span className="text-slate-800 dark:text-white font-black">{totalPages}</span>
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

      {/* ==================== 🪟 GLASS CONFIRMATION MODAL ==================== */}
      <AnimatePresence>
        {modalContext.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeActionModal} className="absolute inset-0 bg-black/60 backdrop-blur-xs" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="w-full max-w-md bg-white dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-6 relative z-10 text-left">

              <div className="flex items-center space-x-3">
                {modalContext.actionType === 'toggleFraud' && modalContext.payload.isFraud ? (
                  <div className="p-2 bg-red-50 dark:bg-red-500/10 rounded-xl"><AlertTriangle className="h-5 w-5 text-red-500 animate-pulse" /></div>
                ) : (
                  <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-xl"><Shield className="h-5 w-5 text-blue-500" /></div>
                )}
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                  {modalContext.actionType === 'toggleFraud' && modalContext.payload.isFraud ? 'Security Sanction Alert' : 'System Role Access Mutation'}
                </h3>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                {modalContext.actionType === 'toggleFraud' ? (
                  modalContext.payload.isFraud ? (
                    <>Are you absolutely certain you want to blacklist <span className="font-bold text-slate-900 dark:text-white">{modalContext.userName}</span> from the network? <span className="text-red-500 font-bold">This immediately hides all system itineraries</span> generated by this node.</>
                  ) : (
                    <>Do you request to lift the restriction ledger from <span className="font-bold text-slate-900 dark:text-white">{modalContext.userName}</span> and restore operator privileges?</>
                  )
                ) : (
                  <>Authorize security level alteration for <span className="font-bold text-slate-900 dark:text-white">{modalContext.userName}</span>. Inherit new privileges as <span className="text-blue-500 dark:text-blue-400 font-black uppercase">{modalContext.payload.role}</span>?</>
                )}
              </p>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button onClick={closeActionModal} className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-300 transition-colors cursor-pointer">Abort Command</button>
                <button
                  onClick={handleMutationProcess}
                  className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-white shadow-lg transition-all active:scale-95 cursor-pointer ${
                    modalContext.actionType === 'toggleFraud' && modalContext.payload.isFraud 
                      ? 'bg-red-600 hover:bg-red-500 shadow-red-500/10' 
                      : 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/10'
                  }`}
                >
                  Execute Confirm
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}