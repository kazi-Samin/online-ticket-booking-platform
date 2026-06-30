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


export default function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); 
  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;
  const currentRole = user?.role || "user";

  const structuralMatrixRoutes = {
    user: [
      { name: "User Profile", path: "/dashboard/user/profile", icon: User },
      { name: "My Booked Tickets", path: "/dashboard/user/booked-tickets", icon: Ticket },
      { name: "Transaction History", path: "/dashboard/user/transactions", icon: History },
      { name: "Download Tickets", path: "/dashboard/user/download-tickets", icon: Download },
    ],
    vendor: [
      { name: "Vendor Profile", path: "/dashboard/vendor/vendor-profile", icon: User },
      { name: "Add Ticket", path: "/dashboard/vendor/add-ticket", icon: PlusCircle },
      { name: "My Added Tickets", path: "/dashboard/vendor/my-tickets", icon: Layers },
      { name: "Requested Bookings", path: "/dashboard/vendor/bookings", icon: FolderCheck },
      { name: "Revenue Overview", path: "/dashboard/vendor/revenue", icon: DollarSign },
    ],
    admin: [
      { name: "Admin Profile", path: "/dashboard/admin/admin-profile", icon: User },
      { name: "Manage Tickets", path: "/dashboard/admin/manage-tickets", icon: ShieldAlert },
      { name: "Manage Users", path: "/dashboard/admin/manage-users", icon: Users },
      { name: "Advertise Tickets", path: "/dashboard/admin/advertise", icon: Megaphone },
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
      <div className="flex items-center justify-between bg-slate-950 text-slate-100 px-5 h-16 md:hidden border-b border-slate-900 sticky top-0 z-40 shadow-md">
        <Link href="/" className="flex items-center space-x-2.5 text-lg font-black tracking-tight">
          <div className="p-2 bg-teal-600 rounded-xl shadow-lg shadow-teal-950/40">
            <Train className="h-4 w-4 text-white" />
          </div>
          <span className="text-white">Ticket<span className="text-teal-400">Core</span></span>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-300"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Main Sidebar Shell Panel */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-950 text-slate-200 border-r border-slate-900/60 
        flex flex-col justify-between transform transition-transform duration-300 ease-out
        md:translate-x-0 md:static md:h-screen shadow-2xl
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>

        <div>
          {/* Brand Logo Module */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-slate-900/50">
            <Link href="/" className="flex items-center space-x-2.5 text-xl font-black tracking-tight text-white group">
              <div className="p-2 bg-teal-600 rounded-xl transition-transform duration-300 group-hover:scale-105 shadow-md shadow-teal-950/50">
                <Train className="h-4 w-4 text-white" />
              </div>
              <span>Ticket<span className="text-teal-400 font-black">Core</span></span>
            </Link>
            <button onClick={() => setIsOpen(false)} className="md:hidden text-slate-500 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* User Identity Matrix Badge */}
          <div className="mx-4 my-4 p-3.5 rounded-2xl border border-slate-900 bg-slate-900/20 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 truncate">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-teal-600 to-purple-600 flex items-center justify-center font-black text-xs text-white uppercase shadow-md shrink-0">
                  {user?.name ? user.name.slice(0, 2) : "TC"}
                </div>
                <div className="truncate text-left">
                  <p className="text-xs font-black text-white truncate tracking-tight">{user?.name || "Terminal Operator"}</p>
                  <span className="inline-block text-[9px] uppercase font-black tracking-widest bg-teal-500/10 text-teal-400 px-2 py-0.5 rounded-md mt-1 border border-teal-500/20">
                    {currentRole}
                  </span>
                </div>
              </div>

              <button
                onClick={toggleTheme}
                className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-teal-400 rounded-xl border border-slate-800/80 transition-all shrink-0 ml-2"
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
                      ? "bg-teal-600 text-white shadow-lg shadow-teal-950/60 border-l-4 border-teal-400"
                      : "text-slate-400 hover:bg-slate-900/60 hover:text-slate-100"
                  }`}
                >
                  <ActionIcon className={`h-4 w-4 shrink-0 transition-colors ${
                    isActive(link.path) ? "text-white" : "text-slate-500 group-hover:text-slate-200"
                  }`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Global Signout Node */}
        <div className="p-4 border-t border-slate-900 bg-slate-950">
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