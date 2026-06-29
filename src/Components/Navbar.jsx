
"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { 
  HiMenuAlt3, HiX, HiUserCircle, HiTicket, HiLogout, 
  HiChevronDown, HiShieldCheck, HiLibrary, HiUser, HiCog, HiMoon, HiSun
} from 'react-icons/hi';
import { authClient } from "@/lib/auth-client"; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); 
  
  // 🚀 Better Auth রিয়েল-টাইম সেশন হুক
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const dropdownRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light') {
        setIsDarkMode(false);
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
      }
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  // 🚪 Working Async Better-Auth Logout Configuration
  const handleLogout = async () => {
    try {
      setDropdownOpen(false);
      setIsOpen(false);
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login");
            router.refresh();
          },
        },
      });
    } catch (error) {
      console.error("Authentication execution failure:", error);
    }
  };

  const isActive = (path) => pathname === path;

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'All Tickets', path: '/all-tickets' }, 
    { label: 'About', path: '/about' },
    { label: 'Support', path: '/support' },
  ];

  // 🛡️ রোল নির্ধারণী হেল্পার ফাংশন
  const getDashboardPath = () => {
    if (user?.role === "admin") return "/dashboard/admin";
    if (user?.role === "vendor") return "/dashboard/vendor";
    return "/dashboard/user";
  };

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled 
        ? 'border-b border-slate-200/80 bg-white/80 backdrop-blur-md shadow-sm dark:border-slate-900/80 dark:bg-slate-950/75' 
        : 'border-b border-slate-100 bg-white dark:border-slate-900 dark:bg-slate-950'
    }`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between w-full">
          
          {/* 🎫 লোগো সেকশন */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 font-black tracking-tight text-slate-900 dark:text-white text-xl group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600/10 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 border border-indigo-500/20 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                <HiTicket className="h-5 w-5 transform -rotate-12" />
              </div>
              <span>Ticket<span className="text-indigo-600 dark:text-indigo-400 font-medium">Core</span></span>
            </Link>

            {/* 🔗 মেনু লিংকসমূহ */}
            <div className="hidden md:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-900/50 p-1 rounded-xl border border-slate-200/40 dark:border-slate-800/40">
              {menuItems.map((item) => (
                <button 
                  key={item.path}
                  onClick={() => {
                    router.push(item.path);
                    setIsOpen(false);
                  }} 
                  className={`rounded-lg px-4 py-2 text-xs font-bold tracking-wide transition-all duration-200 ${
                    isActive(item.path) 
                      ? 'bg-white text-slate-900 dark:bg-slate-800 dark:text-white font-black shadow-sm' 
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              {/* ✨ Dashboard Link - Rendered strictly beside Support if user is logged in */}
              {!isPending && user && (
                <button
                  onClick={() => {
                    router.push(getDashboardPath());
                    setIsOpen(false);
                  }}
                  className={`rounded-lg px-4 py-2 text-xs font-bold tracking-wide transition-all duration-200 ${
                    pathname.startsWith("/dashboard")
                      ? 'bg-white text-indigo-600 dark:bg-slate-800 dark:text-indigo-400 font-black shadow-sm' 
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  Dashboard
                </button>
              )}
            </div>
          </div>

          {/* ⚙️ রাইট কন্ট্রোলস */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* 🌙 থিম বাটন */}
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400 dark:hover:text-slate-200 text-base transition-all"
              title="Toggle Theme"
            >
              {isDarkMode ? <HiSun className="h-4 w-4" /> : <HiMoon className="h-4 w-4" />}
            </button>

            {isPending ? (
              <span className="text-xs font-bold text-slate-400 animate-pulse">Loading...</span>
            ) : user ? (
              <div className="flex items-center gap-4">
                {/* 🛡️ কন্ডিশনাল রোল রেন্ডারিং */}
                {user.role === 'admin' && (
                  <button onClick={() => router.push("/dashboard/admin")} className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-rose-500 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1.5 rounded-lg">
                    <HiShieldCheck className="h-3.5 w-3.5" />
                    Admin System
                  </button>
                )}
                {user.role === 'vendor' && (
                  <button onClick={() => router.push("/dashboard/vendor")} className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1.5 rounded-lg">
                    <HiLibrary className="h-3.5 w-3.5" />
                    Vendor Terminal
                  </button>
                )}

                {/* 👤 ড্রপডাউন বাটন */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/50 p-1.5 pr-3 text-xs font-bold text-slate-700 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:bg-slate-900"
                  >
                    {user.image ? (
                      <img src={user.image} alt="Avatar" className="h-6 w-6 rounded-lg object-cover" />
                    ) : (
                      <HiUserCircle className="h-6 w-6 text-slate-400 dark:text-slate-500" />
                    )}
                    <span className="max-w-[100px] truncate">{user.name}</span>
                    <HiChevronDown className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 origin-top-right rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl dark:border-slate-800 dark:bg-slate-950 z-50">
                      <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-900 text-[10px] text-slate-400 font-semibold truncate">
                        Signed in as <br /><span className="text-slate-800 dark:text-slate-200 font-bold">{user.email}</span>
                      </div>
                      
                      <div className="py-1">
                        {/* 🚀 Fixed: Dashboard link customized with real-time roles */}
                        <button
                          onClick={() => { setDropdownOpen(false); router.push(getDashboardPath()); }}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-slate-200"
                        >
                          <HiUser className="h-4 w-4" />
                          Dashboard
                        </button>
                        <button
                          onClick={() => { setDropdownOpen(false); router.push("/profile"); }}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-slate-200"
                        >
                          <HiCog className="h-4 w-4" />
                          Settings
                        </button>
                      </div>

                      <div className="border-t border-slate-100 dark:border-slate-900 pt-1">
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold text-rose-500 hover:bg-rose-500/10 transition"
                        >
                          <HiLogout className="h-4 w-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <button onClick={() => router.push("/login")} className="text-sm font-bold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-all">
                  Sign In
                </button>
                <button onClick={() => router.push("/register")} className="rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-extrabold text-white hover:bg-slate-900 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 shadow-sm transition-all">
                  Get Started
                </button>
              </div>
            )}
          </div>

          {/* 📱 মোবাইল টগল বাটন */}
          <div className="flex md:hidden items-center gap-2">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 text-base"
            >
              {isDarkMode ? <HiSun /> : <HiMoon />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-xl p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              {isOpen ? <HiX className="h-5 w-5" /> : <HiMenuAlt3 className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 📱 মোবাইল রেস্পন্সিভ মেনু */}
      {isOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-900 dark:bg-slate-950 md:hidden w-full space-y-3">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button 
                key={item.path}
                onClick={() => {
                  router.push(item.path);
                  setIsOpen(false);
                }} 
                className={`block w-full text-left rounded-xl px-4 py-2.5 text-sm font-bold ${
                  isActive(item.path) 
                    ? 'bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-white font-black' 
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* 📱 মোবাইল ভিউতেও ড্যাশবোর্ড বাটন সিঙ্ক করা হলো */}
            {!isPending && user && (
              <button 
                onClick={() => {
                  router.push(getDashboardPath());
                  setIsOpen(false);
                }} 
                className={`block w-full text-left rounded-xl px-4 py-2.5 text-sm font-bold ${
                  pathname.startsWith("/dashboard")
                    ? 'bg-slate-100 text-indigo-600 dark:bg-slate-900 dark:text-indigo-400 font-black' 
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50'
                }`}
              >
                Dashboard
              </button>
            )}
          </div>
          
          <div className="border-t border-slate-100 dark:border-slate-900 pt-2">
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-3 py-1.5">
                  {user.image ? (
                    <img src={user.image} alt="Avatar" className="h-9 w-9 rounded-xl object-cover" />
                  ) : (
                    <HiUserCircle className="h-9 w-9 text-slate-400" />
                  )}
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{user.name}</h4>
                    <p className="text-[11px] text-slate-400">{user.email}</p>
                  </div>
                </div>
                <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-rose-500 bg-rose-500/5">
                  <HiLogout className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => { setIsOpen(false); router.push("/login"); }} className="text-center rounded-xl border border-slate-200 dark:border-slate-800 py-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                  Sign In
                </button>
                <button onClick={() => { setIsOpen(false); router.push("/register"); }} className="text-center rounded-xl bg-slate-950 dark:bg-white dark:text-slate-950 py-2 text-xs font-black text-white">
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}