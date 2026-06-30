// "use client";

// import React, { useState } from "react";
// import { authClient } from "@/lib/auth-client";
// import { User, Mail, Shield, Calendar, Edit2, ShieldAlert, Loader2, AlertTriangle } from "lucide-react";
// import { AnimatePresence } from "framer-motion";
//  // পাথ ঠিকমতো মিলিয়ে নিস মামা
// import Image from "next/image";
// import EditProfileModal from "./EditProfileModal";

// export default function ProfilePage() {
//   const { data: session, isPending } = authClient.useSession();
//   const user = session?.user;

//   // মোডাল ওপেন/ক্লোজ স্টেট কন্ট্রোল
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const defaultAvatar = "https://i.ibb.co.com/S4p625c4/image.png";

//   if (isPending) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <Loader2 className="h-10 w-10 animate-spin text-[#1E3A8A] dark:text-blue-500" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 max-w-4xl mx-auto transition-colors duration-300 px-4 py-8">

//       {/* ⚠️ Fraud Alert Notification Banner */}
//       {user?.isFraud && (
//         <div className="flex items-center gap-3 p-4 rounded-2xl border border-red-500/20 bg-red-500/5 text-red-600 dark:bg-red-500/10 dark:text-red-400 shadow-sm animate-pulse">
//           <AlertTriangle className="h-5 w-5 shrink-0 text-red-500" />
//           <div className="text-xs sm:text-sm font-black uppercase tracking-wide">
//             Warning: Your account has been flagged for fraudulent activity.
//           </div>
//         </div>
//       )}

//       {/* 1. Premium Header Banner & Identity Segment */}
//       <div className="relative rounded-[32px] bg-white dark:bg-slate-900 shadow-sm border border-slate-200/80 dark:border-slate-800/80 overflow-hidden">
//         {/* Top Gradient Aesthetic Strip */}
//         <div className="h-32 sm:h-40 bg-gradient-to-r from-[#1E3A8A] to-teal-900 dark:from-slate-950 dark:to-teal-950 relative" />

//         {/* User Badge Grid Flex Info */}
//         <div className="p-6 sm:p-8 pt-0 flex flex-col sm:flex-row items-center sm:items-end justify-between relative -mt-16 sm:-mt-20 sm:space-x-6 space-y-4 sm:space-y-0 text-center sm:text-left">

//           {/* Bigger Profile Avatar Display */}
//           <div className="relative inline-block shrink-0">
//             <Image width={200} height={200}
//               src={user?.image || defaultAvatar}
//               alt="Profile Avatar"
//               className="h-28 w-28 sm:h-36 sm:w-36 rounded-2xl object-cover ring-4 ring-white dark:ring-slate-900 shadow-md bg-white dark:bg-slate-800"
//             />
//           </div>

//           {/* User Display Text Meta */}
//           <div className="flex-1 min-w-0">
//             <h1 className="text-xl sm:text-3xl font-black text-slate-950 dark:text-slate-100 tracking-tight truncate">
//               {user?.name || "Dashboard User"}
//             </h1>
//             <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2">
//               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-orange-100 dark:bg-orange-500/10 text-emerald-400">
//                 {user?.role || "user"} Mode
//               </span>
//               <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1">
//                 <ShieldAlert className="h-3.5 w-3.5 text-slate-400" /> UUID: {user?.id?.slice(0, 12) || "N/A"}...
//               </span>
//             </div>
//           </div>

//           {/* Edit Profile Button - অ্যাক্টিভেট করা হয়েছে মোডালের সাথে */}
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="inline-flex items-center space-x-2 px-5 py-3 bg-[#1E3A8A] hover:bg-teal-900 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-white font-black text-xs rounded-xl shadow-sm transition-all w-full sm:w-auto justify-center uppercase tracking-widest"
//           >
//             <Edit2 className="h-3.5 w-3.5" />
//             <span>Edit Profile</span>
//           </button>
//         </div>
//       </div>

//       {/* 2. Account Specifications Display Box */}
//       <div className="bg-white dark:bg-slate-900 rounded-[32px] shadow-sm border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 space-y-5">
//         <h2 className="text-sm font-black text-slate-950 dark:text-slate-200 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4 uppercase tracking-wide">
//           <User className="h-4 w-4 text-[#1E3A8A] dark:text-blue-400" />
//           Account Specifications
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

//           {/* Display Meta Item: Full Name */}
//           <div className="space-y-1.5">
//             <label className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide block pl-0.5">Full Name</label>
//             <div className="relative">
//               <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                 <User className="h-4 w-4 text-slate-400 dark:text-slate-600" />
//               </span>
//               <div className="w-full pl-11 pr-4 py-3 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-slate-900 dark:text-slate-100 select-all">
//                 {user?.name || "Not Specified"}
//               </div>
//             </div>
//           </div>

//           {/* Display Meta Item: Email Address */}
//           <div className="space-y-1.5">
//             <label className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide block pl-0.5">Email Address</label>
//             <div className="relative">
//               <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                 <Mail className="h-4 w-4 text-slate-400 dark:text-slate-600" />
//               </span>
//               <div className="w-full pl-11 pr-4 py-3 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-slate-900 dark:text-slate-100 select-all">
//                 {user?.email || "Not Specified"}
//               </div>
//             </div>
//           </div>

//           {/* Display Meta Item: System Role */}
//           <div className="space-y-1.5">
//             <label className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide block pl-0.5">Role Authorization</label>
//             <div className="relative">
//               <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                 <Shield className="h-4 w-4 text-slate-400 dark:text-slate-600" />
//               </span>
//               <div className="w-full pl-11 pr-4 py-3 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-slate-700 dark:text-slate-400 capitalize">
//                 {user?.role || "user"}
//               </div>
//             </div>
//           </div>

//           {/* Display Meta Item: Account Verification */}
//           <div className="space-y-1.5">
//             <label className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide block pl-0.5">Verification Status</label>
//             <div className="relative">
//               <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                 <Calendar className="h-4 w-4 text-slate-400 dark:text-slate-600" />
//               </span>
//               <div className={`w-full pl-11 pr-4 py-3 text-xs sm:text-sm font-black rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 ${
//                 user?.emailVerified ? "text-emerald-600 dark:text-emerald-500" : "text-amber-500"
//               }`}>
//                 {user?.emailVerified ? "Verified Account" : "Pending Verification"}
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* মোডাল রেন্ডারিং (AnimatePresence দিয়ে এক্সিট অ্যানিমেশন হ্যান্ডেল হবে) */}
//       <AnimatePresence>
//         {isModalOpen && (
//           <EditProfileModal
//             isOpen={isModalOpen}
//             onClose={() => setIsModalOpen(false)}
//             currentUser={user}
//           />
//         )}
//       </AnimatePresence>

//     </div>
//   );
// }
"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { User, Mail, Shield, Calendar, Edit2, ShieldAlert, Loader2, AlertTriangle, Cpu } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import EditProfileModal from "./EditProfileModal";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const defaultAvatar = "https://i.ibb.co.com/S4p625c4/image.png";

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="relative flex items-center justify-center">
          <div className="h-16 w-16 rounded-full border-t-2 border-b-2 border-teal-500 animate-spin" />
          <Loader2 className="h-6 w-6 animate-spin text-teal-400 absolute" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto px-4 py-8 text-slate-100">

      {user?.isFraud && (
        <div className="flex items-center gap-4 p-5 rounded-2xl border border-red-500/20 bg-red-950/20 text-red-400 shadow-xl shadow-red-950/10 animate-pulse backdrop-blur-md">
          <div className="p-3 rounded-xl bg-red-500/10 text-red-400">
            <AlertTriangle className="h-6 w-6 shrink-0" />
          </div>
          <div>
            <div className="text-sm font-black uppercase tracking-widest text-red-500">Security Access Revoked</div>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">Warning: Your account has been flagged for fraudulent activity by the central governance panel.</p>
          </div>
        </div>
      )}

      <div className="relative rounded-[32px] bg-slate-950/40 backdrop-blur-xl shadow-2xl border border-teal-500/10 overflow-hidden transition-all duration-300">
        <div className="h-40 sm:h-48 bg-gradient-to-r from-slate-950 via-teal-950/60 to-slate-950 relative border-b border-slate-800/50">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent" />
        </div>

        <div className="p-6 sm:p-8 pt-0 flex flex-col sm:flex-row items-center sm:items-end justify-between relative -mt-20 sm:-mt-24 sm:space-x-6 space-y-6 sm:space-y-0 text-center sm:text-left">
          
          <div className="relative inline-block shrink-0 group">
            <div className="absolute inset-0 bg-teal-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all opacity-70" />
            <Image 
              width={200} 
              height={200}
              src={user?.image || defaultAvatar}
              alt="Profile Avatar"
              className="h-32 w-32 sm:h-40 sm:w-40 rounded-3xl object-cover ring-4 ring-slate-900/80 shadow-2xl bg-slate-900 relative z-10 border border-slate-800"
            />
          </div>

          <div className="flex-1 min-w-0 z-10">
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight truncate">
              {user?.name || "Dashboard User"}
            </h1>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mt-3">
              <span className="inline-flex items-center px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest bg-teal-600/20 border border-teal-500/30 text-teal-400">
                {user?.role || "user"} Mode
              </span>
              <span className="text-xs text-slate-500 font-bold flex items-center gap-1.5 bg-slate-900/60 px-2.5 py-1 rounded-xl border border-slate-800/40">
                <Cpu className="h-3.5 w-3.5 text-slate-600" /> ID: {user?.id?.slice(0, 12) || "N/A"}...
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center space-x-2 px-6 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-black text-xs rounded-2xl shadow-lg shadow-teal-600/10 transition-all duration-300 w-full sm:w-auto justify-center uppercase tracking-widest active:scale-[0.98] border border-teal-500/20"
          >
            <Edit2 className="h-3.5 w-3.5" />
            <span>Edit Identity</span>
          </button>
        </div>
      </div>

      <div className="bg-slate-950/40 backdrop-blur-xl rounded-[32px] shadow-2xl border border-teal-500/10 p-6 sm:p-8 space-y-6">
        <h2 className="text-xs font-black text-teal-400 flex items-center gap-2 border-b border-slate-800/60 pb-4 uppercase tracking-widest">
          <Shield className="h-4 w-4 text-teal-500" />
          Identity Core Metadata
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">Legal Name</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 flex items-center pointer-events-none z-10">
                <User className="h-4 w-4 text-slate-600" />
              </span>
              <div className="w-full pl-12 pr-4 py-4 text-xs sm:text-sm font-semibold rounded-2xl border border-slate-800 bg-slate-900/30 text-slate-300 select-all tracking-wide">
                {user?.name || "Not Specified"}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">Communications Relay</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 flex items-center pointer-events-none z-10">
                <Mail className="h-4 w-4 text-slate-600" />
              </span>
              <div className="w-full pl-12 pr-4 py-4 text-xs sm:text-sm font-semibold rounded-2xl border border-slate-800 bg-slate-900/30 text-slate-300 select-all tracking-wide">
                {user?.email || "Not Specified"}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">Scope Privilege</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 flex items-center pointer-events-none z-10">
                <ShieldAlert className="h-4 w-4 text-slate-600" />
              </span>
              <div className="w-full pl-12 pr-4 py-4 text-xs sm:text-sm font-semibold rounded-2xl border border-slate-800 bg-slate-900/30 text-slate-400 capitalize tracking-wide">
                {user?.role || "user"}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">Verification Status</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 flex items-center pointer-events-none z-10">
                <Calendar className="h-4 w-4 text-slate-600" />
              </span>
              <div className={`w-full pl-12 pr-4 py-4 text-xs sm:text-sm font-black rounded-2xl border border-slate-800 bg-slate-900/30 tracking-wide ${
                user?.emailVerified ? "text-emerald-400" : "text-amber-500"
              }`}>
                {user?.emailVerified ? "Verified Account" : "Pending Verification"}
              </div>
            </div>
          </div>

        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <EditProfileModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            currentUser={user}
          />
        )}
      </AnimatePresence>

    </div>
  );
}