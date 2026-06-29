import React from 'react';
import { headers } from "next/headers";
import { getAllUsers } from "@/lib/api/adminAllUsers";
import { auth } from '@/lib/auth';
import { Users } from 'lucide-react';
import ManageUsersClient from '@/Components/Dashboard/Admin/ManageUsersClient';

export const metadata = {
  title: "TicketCore || Manage-Users",
  description: "Online ticket booking platform",
};
const ManageUserPage = async () => {

  const session = await auth.api.getSession({
    headers: await headers()
  });

  const users = await getAllUsers() || [];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#000000] p-4 md:p-8 text-left transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ==================== 🏆 MODERN PREMIUM HEADER ==================== */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 p-6 md:p-8 rounded-3xl shadow-xl shadow-slate-200/30 dark:shadow-none flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br from-[#FF6B35]/10 to-[#1E3A8A]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-1.5 relative z-10">
            <div className="flex items-center space-x-2">
              <span className="p-1.5 bg-[#1E3A8A]/10 dark:bg-[#1E3A8A]/20 text-[#1E3A8A] dark:text-blue-400 rounded-lg">
                <Users className="h-4 w-4" />
              </span>
              <span className="text-[10px] font-black tracking-widest uppercase text-[#FF6B35]">
                Root Administration Node
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-[#1E293B] dark:text-white tracking-tight">
              Manage Access Users
            </h1>
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-relaxed">
              Mutate identity authorization states, deploy roles, and quarantine fraud metrics.
            </p>
          </div>
        </div>

        {/* ==================== ⚡ CLIENT ENGINE INJECTION ==================== */}
        <div className="relative z-10">
          <ManageUsersClient initialUsers={users} />
        </div>

      </div>
    </div>
  );
};

export default ManageUserPage;