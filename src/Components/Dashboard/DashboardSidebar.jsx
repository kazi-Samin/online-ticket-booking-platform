"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  User, Ticket, History, PlusCircle,
  Layers, FolderCheck, DollarSign, ShieldAlert,
  Users, Megaphone, LogOut, Menu, X, Train,
  LayoutDashboard, Download, Sun, Moon
} from "lucide-react";

// 🎯 ফাংশন নাম হুবহু DashboardSidebar-ই রাখা হলো যাতে গ্লোবাল ইম্পোর্ট সেফ থাকে
export default function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); 
  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;
  const currentRole = user?.role || "user";

  // 🚀 রিরাইট করা ইউনিক অবজেক্ট স্ট্রাকচার (নকল এড়ানোর জন্য)
  const structuralMatrixRoutes = {
    user: [
      { name: "Overview Hub", path: "/dashboard/user", icon: LayoutDashboard },
      { name: "My Profile", path: "/dashboard/user/profile", icon: User },
      { name: "Booked Slotted Tickets", path: "/dashboard/user/booked-tickets", icon: Ticket },
      { name: "Download Vault", path: "/dashboard/user/download-tickets", icon: Download },
      { name: "Ledger Records", path: "/dashboard/user/transactions", icon: History },
    ],
    vendor: [
      { name: "Merchant Desk", path: "/dashboard/vendor", icon: LayoutDashboard },
      { name: "Vendor Identity", path: "/dashboard/vendor/vendor-profile", icon: User },
      { name: "Launch New Transit", path: "/dashboard/vendor/add-ticket", icon: PlusCircle },
      { name: "Inventory Management", path: "/dashboard/vendor/my-tickets", icon: Layers },
      { name: "Booking Orders", path: "/dashboard/vendor/bookings", icon: FolderCheck },
      { name: "Revenue Analytics", path: "/dashboard/vendor/revenue", icon: DollarSign },
    ],
    admin: [
      { name: "Control Center", path: "/dashboard/admin", icon: LayoutDashboard },
      { name: "Root Profile", path: "/dashboard/admin/admin-profile", icon: User },
      { name: "Audit Transit Lines", path: "/dashboard/admin/manage-tickets", icon: ShieldAlert },
      { name: "Orchestrate System Users", path: "/dashboard/admin/manage-users", icon: Users },
      { name: "Promotional Spotlights", path: "/dashboard/admin/advertise", icon: Megaphone },
    ]
  };

  const activeLinks = structuralMatrixRoutes[currentRole] || structuralMatrixRoutes["user"];
  const isActive = (path) => pathname === path;

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login");
          },
        },
      });
    } catch (err) {
      console.error("Dashboard sidebar signout stream exception:", err);
    }
  };

  const toggleTheme = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    if (nextMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <>
      {/* Mobile Top Navigation */}
      <div className="flex items-center justify-between bg-zinc-950 text-zinc-100 px-5 h-16 md:hidden border-b border-zinc-900 sticky top-0 z-40 shadow-md">
        <Link href="/" className="flex items-center space-x-2.5 text-lg font-black tracking-tight">
          <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-950/40">
            <Train className="h-4 w-4 text-white" />
          </div>
          <span className="text-white">Ticket<span className="text-indigo-400">Core</span></span>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-300"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Main Sidebar Shell Panel */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-zinc-950 text-zinc-200 border-r border-zinc-900/60 
        flex flex-col justify-between transform transition-transform duration-300 ease-out
        md:translate-x-0 md:static md:h-screen shadow-2xl
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>

        <div>
          {/* Brand Logo Module */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-zinc-900/50">
            <Link href="/" className="flex items-center space-x-2.5 text-xl font-black tracking-tight text-white group">
              <div className="p-2 bg-indigo-600 rounded-xl transition-transform duration-300 group-hover:scale-105 shadow-md shadow-indigo-950/50">
                <Train className="h-4 w-4 text-white" />
              </div>
              <span>Ticket<span className="text-indigo-400 font-black">Core</span></span>
            </Link>
            <button onClick={() => setIsOpen(false)} className="md:hidden text-zinc-500 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* User Identity Matrix Badge */}
          <div className="mx-4 my-4 p-3.5 rounded-2xl border border-zinc-900 bg-zinc-900/20 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 truncate">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center font-black text-xs text-white uppercase shadow-md shrink-0">
                  {user?.name ? user.name.slice(0, 2) : "TC"}
                </div>
                <div className="truncate text-left">
                  <p className="text-xs font-black text-white truncate tracking-tight">{user?.name || "Terminal Operator"}</p>
                  <span className="inline-block text-[9px] uppercase font-black tracking-widest bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-md mt-1 border border-indigo-500/20">
                    {currentRole}
                  </span>
                </div>
              </div>

              <button
                onClick={toggleTheme}
                className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-indigo-400 rounded-xl border border-zinc-800/80 transition-all shrink-0 ml-2"
              >
                {isDarkMode ? <Sun className="h-3.5 w-3.5 text-amber-400" /> : <Moon className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>

          {/* Action Maps Rendering Links Stack */}
          <nav className="px-3 py-2 space-y-1 overflow-y-auto max-h-[calc(100vh-220px)]">
            {activeLinks.map((link, index) => {
              const ActionIcon = link.icon;
              return (
                <Link
                  key={index}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wide transition-all uppercase group ${
                    isActive(link.path)
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950/60 border-l-4 border-indigo-400"
                      : "text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-100"
                  }`}
                >
                  <ActionIcon className={`h-4 w-4 shrink-0 transition-colors ${
                    isActive(link.path) ? "text-white" : "text-zinc-500 group-hover:text-zinc-200"
                  }`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Global Signout Node */}
        <div className="p-4 border-t border-zinc-900 bg-zinc-950">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2.5 px-4 py-3.5 text-xs font-black uppercase tracking-widest text-red-400 hover:text-white hover:bg-red-950/40 border border-red-900/20 rounded-xl transition-all shadow-md active:scale-[0.99]"
          >
            <LogOut className="h-3.5 w-3.5 text-red-400 shrink-0" />
            <span>Terminate Session</span>
          </button>
        </div>

      </aside>

      {/* Overlay Drawer Mask for Mobile Views */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}
    </>
  );
}