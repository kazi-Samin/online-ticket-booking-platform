// "use client";

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { Menu, X, Train, LogOut, User, Loader2, Sun, Moon } from "lucide-react";
// import { authClient, useSession } from "@/lib/auth-client";
// import { useTheme } from "next-themes";
// import Image from "next/image";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const pathname = usePathname();
//   const router = useRouter();

//   // 🌗 Next-Themes Setup
//   const { theme, setTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const { data: session, isPending } = authClient.useSession();
//   const user = session?.user;

//   const defaultAvatar = "https://i.ibb.co.com/S4p625c4/image.png";
//   const isActive = (path) => pathname === path;

//   // 🚀 Working Async Better-Auth Logout Configuration
//   const handleLogout = async () => {
//     try {
//       setIsDropdownOpen(false);
//       setIsOpen(false);

//       await authClient.signOut({
//         fetchOptions: {
//           onSuccess: () => {
//             router.push("/login");
//           },
//         },
//       });
//     } catch (err) {
//       console.error("Authentication execution failure:", err);
//     }
//   };

//   const navLinks = [
//     { name: "Home", path: "/" },
//     { name: "All Tickets", path: "/all-tickets" },
//     { name: "About", path: "/about" },
//     { name: "Support", path: "/support" },
//   ];

//   return (
//     <nav className="sticky top-0 z-50 w-full bg-[#1E3A8A] dark:bg-[#0F172A] text-white shadow-md border-b border-indigo-900/40 dark:border-slate-800/80 transition-colors duration-200">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">

//           {/* Left Block: Logo Brand Segment */}
//           <div className="flex-shrink-0 flex items-center">
//             <Link href="/" className="flex items-center space-x-2 text-2xl font-bold tracking-tight text-white group">
//               <span className="p-1.5 bg-[#FF6B35] rounded-lg transition-transform group-hover:scale-105">
//                 <Train className="h-6 w-6 text-white" />
//               </span>
//               <span className="font-extrabold">
//                 Ticket<span className="text-[#FF6B35]">Bari</span>
//               </span>
//             </Link>
//           </div>

//           {/* Desktop Central Menu Items Group */}
//           <div className="hidden md:flex items-center space-x-1">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.path}
//                 href={link.path}
//                 className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive(link.path)
//                     ? "bg-indigo-900/50 dark:bg-slate-800 text-[#FF6B35] font-semibold"
//                     : "text-indigo-100 dark:text-slate-300 hover:bg-indigo-900/30 dark:hover:bg-slate-800/50 hover:text-white"
//                   }`}
//               >
//                 {link.name}
//               </Link>
//             ))}

//             {/* Dashboard Link - Rendered strictly if user exists */}
//             {!isPending && user && (
//               <Link
//                 href={
//                   user.role === "admin"
//                     ? "/dashboard/admin"
//                     : user.role === "vendor"
//                       ? "/dashboard/vendor"
//                       : "/dashboard/user"
//                 }
//                 className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${pathname.startsWith("/dashboard")
//                     ? "bg-indigo-900/50 dark:bg-slate-800 text-[#FF6B35] font-semibold"
//                     : "text-indigo-100 dark:text-slate-300 hover:bg-indigo-900/30 dark:hover:bg-slate-800/50 hover:text-white"
//                   }`}
//               >
//                 Dashboard
//               </Link>
//             )}
//           </div>

//           {/* Right Side Control Section (Dynamic User State Handling & Dark Mode) */}
//           <div className="hidden md:flex items-center space-x-4">

//             {/* 🌗 Desktop Theme Toggle Button */}
//             {mounted && (
//               <button
//                 onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//                 className="p-2 rounded-xl bg-indigo-900/40 dark:bg-slate-800 text-indigo-200 dark:text-amber-400 border border-indigo-700/30 dark:border-slate-700 transition-all hover:text-white active:scale-95"
//                 aria-label="Toggle Theme"
//               >
//                 {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
//               </button>
//             )}

//             {isPending ? (
//               <div className="flex items-center justify-center w-8 h-8">
//                 <Loader2 className="h-4 w-4 animate-spin text-indigo-300" />
//               </div>
//             ) : user ? (
//               <div className="relative">
//                 {/* Profile Trigger Element */}
//                 <button
//                   onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                   className="flex items-center space-x-3 p-1.5 rounded-full hover:bg-indigo-900/40 dark:hover:bg-slate-800 focus:outline-none border border-transparent hover:border-indigo-700/50 dark:hover:border-slate-700 transition-all"
//                 >
//                   <Image width={30} height={30}
//                     className="h-8 w-8 rounded-full object-cover ring-2 ring-[#FF6B35]"
//                     src={user?.image || defaultAvatar}
//                     alt="User Avatar"
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = defaultAvatar;
//                     }}
//                   />
//                   <span className="text-sm font-medium text-indigo-50 dark:text-slate-200 max-w-30 truncate">
//                     {user?.name || "User"}
//                   </span>
//                 </button>

//                 {/* Dropdown Menu Box */}
//                 {isDropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white dark:bg-slate-900 text-zinc-800 dark:text-slate-200 shadow-xl ring-1 ring-black/5 dark:ring-slate-800 divide-y divide-zinc-100 dark:divide-slate-800 focus:outline-none transition-all py-1">
//                     <div className="px-4 py-2.5">
//                       <p className="text-xs text-zinc-400 dark:text-slate-500 font-medium">Signed in as</p>
//                       <p className="text-sm font-semibold text-zinc-700 dark:text-slate-300 truncate">{user?.email}</p>
//                       <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-[#FF6B35] px-2 py-0.5 rounded-full">
//                         {user?.role || "user"}
//                       </span>
//                     </div>
//                     <div className="py-1">
//                       <Link
//                         href="/profile"
//                         onClick={() => setIsDropdownOpen(false)}
//                         className="flex items-center space-x-2.5 px-4 py-2.5 text-sm text-zinc-700 dark:text-slate-300 hover:bg-zinc-50 dark:hover:bg-slate-800 transition-colors"
//                       >
//                         <User className="h-4 w-4 text-zinc-400 dark:text-slate-500" />
//                         <span>My Profile</span>
//                       </Link>
//                     </div>
//                     <div className="py-1">
//                       <button
//                         onClick={handleLogout}
//                         className="w-full flex items-center space-x-2.5 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 font-medium transition-colors text-left"
//                       >
//                         <LogOut className="h-4 w-4 text-red-500 dark:text-red-400" />
//                         <span>Logout</span>
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="flex items-center space-x-3">
//                 <Link
//                   href="/login"
//                   className="text-sm font-medium text-indigo-100 dark:text-slate-300 hover:text-white px-3 py-2 transition-colors"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   href="/register"
//                   className="bg-[#FF6B35] hover:bg-[#ff571a] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md shadow-orange-900/20 active:scale-95 transition-all"
//                 >
//                   Register
//                 </Link>
//               </div>
//             )}
//           </div>

//           {/* Mobile View: Hamburger Controls & Theme Sync Panel */}
//           <div className="flex md:hidden items-center space-x-2">
//             {/* 🌗 Mobile Theme Toggle Button */}
//             {mounted && (
//               <button
//                 onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//                 className="p-2 rounded-lg bg-indigo-900/40 dark:bg-slate-800 text-indigo-200 dark:text-amber-400 transition-colors"
//                 aria-label="Toggle Theme"
//               >
//                 {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
//               </button>
//             )}

//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="inline-flex items-center justify-center p-2 rounded-lg text-indigo-200 dark:text-slate-300 hover:text-white hover:bg-indigo-900/40 dark:hover:bg-slate-800 focus:outline-none transition-colors"
//             >
//               {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>

//         </div>
//       </div>

//       {/* Mobile Drawer Slide Navigation Area Layout Panel */}
//       {isOpen && (
//         <div className="md:hidden bg-[#1a337a] dark:bg-[#0F172A] border-t border-indigo-900/50 dark:border-slate-800 px-2 pt-2 pb-4 space-y-1 shadow-inner animate-in slide-in-from-top duration-200">
//           {navLinks.map((link) => (
//             <Link
//               key={link.path}
//               href={link.path}
//               onClick={() => setIsOpen(false)}
//               className={`block px-3 py-2.5 rounded-lg text-base font-medium ${isActive(link.path)
//                   ? "bg-indigo-900/70 dark:bg-slate-800 text-[#FF6B35] font-bold"
//                   : "text-indigo-100 dark:text-slate-300 hover:bg-indigo-900/40 dark:hover:bg-slate-800/50 hover:text-white"
//                 }`}
//             >
//               {link.name}
//             </Link>
//           ))}

//           {!isPending && user && (
//             <Link
//               href={
//                 user.role === "admin"
//                   ? "/dashboard/admin"
//                   : user.role === "vendor"
//                     ? "/dashboard/vendor"
//                     : "/dashboard/user"
//               }
//               onClick={() => setIsOpen(false)}
//               className={`block px-3 py-2.5 rounded-lg text-base font-medium ${pathname.startsWith("/dashboard")
//                   ? "bg-indigo-900/70 dark:bg-slate-800 text-[#FF6B35] font-bold"
//                   : "text-indigo-100 dark:text-slate-300 hover:bg-indigo-900/40 dark:hover:bg-slate-800/50 hover:text-white"
//                 }`}
//             >
//               Dashboard
//             </Link>
//           )}

//           <hr className="border-indigo-900/40 dark:border-slate-800 my-2 mx-3" />

//           {/* Mobile Session Actions Panel Box */}
//           {isPending ? (
//             <div className="flex justify-center py-2">
//               <Loader2 className="h-5 w-5 animate-spin text-indigo-300" />
//             </div>
//           ) : user ? (
//             <div className="pt-2 px-3">
//               <div className="flex items-center space-x-3 mb-3">
//                 <Image width={40} height={40}
//                   className="h-10 w-10 rounded-full object-cover ring-2 ring-[#FF6B35]"
//                   src={user?.image || defaultAvatar}
//                   alt="User"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = defaultAvatar;
//                   }}
//                 />
//                 <div>
//                   <h4 className="text-sm font-bold text-white leading-tight">{user?.name || "User"}</h4>
//                   <p className="text-xs text-indigo-200 dark:text-slate-400 truncate max-w-50">{user?.email}</p>
//                 </div>
//               </div>
//               <div className="space-y-1">
//                 <Link
//                   href="/profile"
//                   onClick={() => setIsOpen(false)}
//                   className="flex items-center space-x-2.5 w-full text-left px-3 py-2 text-sm text-indigo-100 dark:text-slate-300 hover:bg-indigo-900/40 dark:hover:bg-slate-800 rounded-lg transition-colors"
//                 >
//                   <User className="h-4 w-4" />
//                   <span>My Profile</span>
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center space-x-2.5 w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-950/20 rounded-lg transition-colors font-medium"
//                 >
//                   <LogOut className="h-4 w-4" />
//                   <span>Logout</span>
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="pt-2 pb-1 px-3 grid grid-cols-2 gap-3">
//               <Link
//                 href="/login"
//                 onClick={() => setIsOpen(false)}
//                 className="w-full text-center py-2.5 text-sm font-medium border border-indigo-700 dark:border-slate-700 rounded-xl text-indigo-100 dark:text-slate-300 hover:bg-indigo-900/30 dark:hover:bg-slate-800/50"
//               >
//                 Login
//               </Link>
//               <Link
//                 href="/register"
//                 onClick={() => setIsOpen(false)}
//                 className="w-full text-center py-2.5 text-sm font-bold bg-[#FF6B35] hover:bg-[#ff571a] rounded-xl text-white shadow-md shadow-orange-900/20"
//               >
//                 Register
//               </Link>
//             </div>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// }
// "use client";

// import React, { useState, useEffect, useRef } from 'react';
// import Link from 'next/link';
// import { useRouter, usePathname } from 'next/navigation';
// import { 
//   HiMenuAlt3, HiX, HiUserCircle, HiTicket, HiLogout, 
//   HiChevronDown, HiShieldCheck, HiLibrary, HiUser, HiCog
// } from 'react-icons/hi';

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
  
//   const dropdownRef = useRef(null);
//   const router = useRouter();
//   const pathname = usePathname();

//   const isLoggedIn = true; 
//   const userRole = 'user'; 
//   const userSession = {
//     name: "Aritro Mazumdar",
//     email: "user@example.com",
//     avatar: null
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 20) {
//         setScrolled(true);
//       } else {
//         setScrolled(false);
//       }
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleLogout = async () => {
//     try {
//       setDropdownOpen(false);
//       setIsOpen(false);
//       router.push('/login');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const isActive = (path) => pathname === path;

//   return (
//     <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${
//       scrolled 
//         ? 'border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-sm dark:border-slate-800/80 dark:bg-slate-900/95' 
//         : 'border-b border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900'
//     }`}>
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="flex h-20 items-center justify-between">
          
//           <div className="flex items-center gap-10">
//             <Link href="/" className="flex items-center gap-2.5 font-extrabold tracking-tight text-indigo-600 dark:text-indigo-400 text-2xl transition-transform hover:scale-[1.02]">
//               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
//                 <HiTicket className="h-6 w-6 transform -rotate-12" />
//               </div>
//               <span>Ticket<span className="text-slate-900 dark:text-white font-medium">Core</span></span>
//             </Link>

//             <div className="hidden md:flex items-center gap-1">
//               <Link 
//                 href="/" 
//                 className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ${
//                   isActive('/') 
//                     ? 'bg-slate-100 text-indigo-600 dark:bg-slate-800 dark:text-indigo-400' 
//                     : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/50 dark:hover:text-white'
//                 }`}
//               >
//                 Home
//               </Link>
//               <Link 
//                 href="/tickets" 
//                 className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ${
//                   isActive('/tickets') 
//                     ? 'bg-slate-100 text-indigo-600 dark:bg-slate-800 dark:text-indigo-400' 
//                     : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/50 dark:hover:text-white'
//                 }`}
//               >
//                 Browse Tickets
//               </Link>
//             </div>
//           </div>

//           <div className="hidden md:flex items-center gap-4">
//             {isLoggedIn ? (
//               <div className="flex items-center gap-4">
                
//                 {userRole === 'admin' && (
//                   <Link href="/admin/dashboard" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50/60 border border-rose-200/80 px-3 py-1.5 rounded-lg dark:bg-rose-950/30 dark:border-rose-900 dark:text-rose-400">
//                     <HiShieldCheck className="h-4 w-4" />
//                     Admin System
//                   </Link>
//                 )}
//                 {userRole === 'vendor' && (
//                   <Link href="/vendor/dashboard" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50/60 border border-amber-200/80 px-3 py-1.5 rounded-lg dark:bg-amber-950/30 dark:border-amber-900 dark:text-amber-400">
//                     <HiLibrary className="h-4 w-4" />
//                     Vendor Terminal
//                   </Link>
//                 )}

//                 <div className="relative" ref={dropdownRef}>
//                   <button
//                     onClick={() => setDropdownOpen(!dropdownOpen)}
//                     className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/50 p-1.5 pr-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-200 dark:hover:bg-slate-800"
//                   >
//                     {userSession.avatar ? (
//                       <img src={userSession.avatar} alt="Avatar" className="h-7 w-7 rounded-lg object-cover" />
//                     ) : (
//                       <HiUserCircle className="h-7 w-7 text-slate-400 dark:text-slate-500" />
//                     )}
//                     <span className="max-w-[120px] truncate">{userSession.name}</span>
//                     <HiChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
//                   </button>

//                   {dropdownOpen && (
//                     <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none dark:border-slate-700 dark:bg-slate-800">
//                       <div className="px-3 py-2.5 border-b border-slate-100 dark:border-slate-700/60">
//                         <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Signed in as</p>
//                         <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">{userSession.email}</p>
//                       </div>
                      
//                       <div className="py-1">
//                         <Link
//                           href="/dashboard"
//                           onClick={() => setDropdownOpen(false)}
//                           className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700/50 dark:hover:text-white"
//                         >
//                           <HiUser className="h-4 w-4 text-slate-400" />
//                           Dashboard
//                         </Link>
//                         <Link
//                           href="/profile"
//                           onClick={() => setDropdownOpen(false)}
//                           className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700/50 dark:hover:text-white"
//                         >
//                           <HiCog className="h-4 w-4 text-slate-400" />
//                           Settings
//                         </Link>
//                       </div>

//                       <div className="border-t border-slate-100 pt-1 dark:border-slate-700/60">
//                         <button
//                           onClick={handleLogout}
//                           className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/30"
//                         >
//                           <HiLogout className="h-4 w-4" />
//                           Sign Out
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//               </div>
//             ) : (
//               <div className="flex items-center gap-4">
//                 <Link href="/login" className="text-sm font-bold text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
//                   Sign In
//                 </Link>
//                 <Link href="/register" className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-600/10 transition hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/20">
//                   Create Account
//                 </Link>
//               </div>
//             )}
//           </div>

//           <div className="flex md:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="inline-flex items-center justify-center rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-300"
//             >
//               {isOpen ? <HiX className="h-6 w-6" /> : <HiMenuAlt3 className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {isOpen && (
//         <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-inner dark:border-slate-800 dark:bg-slate-900 md:hidden">
//           <div className="space-y-1.5">
//             <Link 
//               href="/" 
//               onClick={() => setIsOpen(false)} 
//               className={`block rounded-xl px-4 py-2.5 text-base font-semibold ${
//                 isActive('/') 
//                   ? 'bg-slate-100 text-indigo-600 dark:bg-slate-800 dark:text-indigo-400' 
//                   : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
//               }`}
//             >
//               Home
//             </Link>
//             <Link 
//               href="/tickets" 
//               onClick={() => setIsOpen(false)} 
//               className={`block rounded-xl px-4 py-2.5 text-base font-semibold ${
//                 isActive('/tickets') 
//                   ? 'bg-slate-100 text-indigo-600 dark:bg-slate-800 dark:text-indigo-400' 
//                   : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
//               }`}
//             >
//               Browse Tickets
//             </Link>
            
//             <div className="my-3 border-t border-slate-200 dark:border-slate-800" />
            
//             {isLoggedIn ? (
//               <div className="space-y-2">
//                 <div className="flex items-center gap-3 px-4 py-2">
//                   <HiUserCircle className="h-10 w-10 text-slate-400" />
//                   <div>
//                     <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">{userSession.name}</h4>
//                     <p className="text-xs text-slate-400 dark:text-slate-500">{userSession.email}</p>
//                   </div>
//                 </div>

//                 {userRole === 'admin' && (
//                   <Link href="/admin/dashboard" onClick={() => setIsOpen(false)} className="block text-center rounded-xl bg-rose-50 border border-rose-200 py-2.5 text-sm font-bold text-rose-600 dark:bg-rose-950/30 dark:border-rose-900 dark:text-rose-400">
//                     Admin System Dashboard
//                   </Link>
//                 )}
//                 {userRole === 'vendor' && (
//                   <Link href="/vendor/dashboard" onClick={() => setIsOpen(false)} className="block text-center rounded-xl bg-amber-50 border border-amber-200 py-2.5 text-sm font-bold text-amber-600 dark:bg-amber-950/30 dark:border-amber-900 dark:text-amber-400">
//                     Vendor Console Hub
//                   </Link>
//                 )}

//                 <Link href="/dashboard" onClick={() => setIsOpen(false)} className="block rounded-xl px-4 py-2.5 text-base font-semibold text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800">
//                   Dashboard
//                 </Link>
//                 <Link href="/profile" onClick={() => setIsOpen(false)} className="block rounded-xl px-4 py-2.5 text-base font-semibold text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800">
//                   Settings Profile
//                 </Link>
//                 <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-xl px-4 py-2.5 text-base font-semibold text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/30">
//                   <HiLogout className="h-5 w-5" />
//                   Sign Out Account
//                 </button>
//               </div>
//             ) : (
//               <div className="grid grid-cols-2 gap-3 pt-2">
//                 <Link href="/login" onClick={() => setIsOpen(false)} className="text-center rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-700 dark:border-slate-700 dark:text-slate-300">
//                   Sign In
//                 </Link>
//                 <Link href="/register" onClick={() => setIsOpen(false)} className="text-center rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white">
//                   Register
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }
// "use client";

// import React, { useState, useEffect, useRef } from 'react';
// import Link from 'next/link';
// import { useRouter, usePathname } from 'next/navigation';
// import { 
//   HiMenuAlt3, HiX, HiUserCircle, HiTicket, HiLogout, 
//   HiChevronDown, HiShieldCheck, HiLibrary, HiUser, HiCog
// } from 'react-icons/hi';

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
  
//   const dropdownRef = useRef(null);
//   const router = useRouter();
//   const pathname = usePathname();

//   const isLoggedIn = true; 
//   const userRole = 'user'; 
//   const userSession = {
//     name: "Aritro Mazumdar",
//     email: "user@example.com",
//     avatar: null
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 20) {
//         setScrolled(true);
//       } else {
//         setScrolled(false);
//       }
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleLogout = async () => {
//     try {
//       setDropdownOpen(false);
//       setIsOpen(false);
//       router.push('/login');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const isActive = (path) => pathname === path;

//   return (
//     <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${
//       scrolled 
//         ? 'border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-sm dark:border-slate-800/80 dark:bg-slate-900/95' 
//         : 'border-b border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900'
//     }`}>
//       {/* এখানে max-w-7xl কেটে w-full এবং px-6 করা হয়েছে যেন সম্পূর্ণ স্ক্রিন জুড়ে থাকে */}
//       <div className="w-full px-4 sm:px-6 lg:px-8">
//         <div className="flex h-20 items-center justify-between w-full">
          
//           <div className="flex items-center gap-10">
//             <Link href="/" className="flex items-center gap-2.5 font-extrabold tracking-tight text-indigo-600 dark:text-indigo-400 text-2xl transition-transform hover:scale-[1.02]">
//               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
//                 <HiTicket className="h-6 w-6 transform -rotate-12" />
//               </div>
//               <span>Ticket<span className="text-slate-900 dark:text-white font-medium">Core</span></span>
//             </Link>

//             <div className="hidden md:flex items-center gap-1">
//               <Link 
//                 href="/" 
//                 className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ${
//                   isActive('/') 
//                     ? 'bg-slate-100 text-indigo-600 dark:bg-slate-800 dark:text-indigo-400' 
//                     : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/50 dark:hover:text-white'
//                 }`}
//               >
//                 Home
//               </Link>
//               <Link 
//                 href="/tickets" 
//                 className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ${
//                   isActive('/tickets') 
//                     ? 'bg-slate-100 text-indigo-600 dark:bg-slate-800 dark:text-indigo-400' 
//                     : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/50 dark:hover:text-white'
//                 }`}
//               >
//                 Browse Tickets
//               </Link>
//             </div>
//           </div>

//           <div className="hidden md:flex items-center gap-4">
//             {isLoggedIn ? (
//               <div className="flex items-center gap-4">
                
//                 {userRole === 'admin' && (
//                   <Link href="/admin/dashboard" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50/60 border border-rose-200/80 px-3 py-1.5 rounded-lg dark:bg-rose-950/30 dark:border-rose-900 dark:text-rose-400">
//                     <HiShieldCheck className="h-4 w-4" />
//                     Admin System
//                   </Link>
//                 )}
//                 {userRole === 'vendor' && (
//                   <Link href="/vendor/dashboard" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50/60 border border-amber-200/80 px-3 py-1.5 rounded-lg dark:bg-amber-950/30 dark:border-amber-900 dark:text-amber-400">
//                     <HiLibrary className="h-4 w-4" />
//                     Vendor Terminal
//                   </Link>
//                 )}

//                 <div className="relative" ref={dropdownRef}>
//                   <button
//                     onClick={() => setDropdownOpen(!dropdownOpen)}
//                     className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/50 p-1.5 pr-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-200 dark:hover:bg-slate-800"
//                   >
//                     {userSession.avatar ? (
//                       <img src={userSession.avatar} alt="Avatar" className="h-7 w-7 rounded-lg object-cover" />
//                     ) : (
//                       <HiUserCircle className="h-7 w-7 text-slate-400 dark:text-slate-500" />
//                     )}
//                     <span className="max-w-[120px] truncate">{userSession.name}</span>
//                     <HiChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
//                   </button>

//                   {dropdownOpen && (
//                     <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none dark:border-slate-700 dark:bg-slate-800">
//                       <div className="px-3 py-2.5 border-b border-slate-100 dark:border-slate-700/60">
//                         <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Signed in as</p>
//                         <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">{userSession.email}</p>
//                       </div>
                      
//                       <div className="py-1">
//                         <Link
//                           href="/dashboard"
//                           onClick={() => setDropdownOpen(false)}
//                           className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700/50 dark:hover:text-white"
//                         >
//                           <HiUser className="h-4 w-4 text-slate-400" />
//                           Dashboard
//                         </Link>
//                         <Link
//                           href="/profile"
//                           onClick={() => setDropdownOpen(false)}
//                           className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700/50 dark:hover:text-white"
//                         >
//                           <HiCog className="h-4 w-4 text-slate-400" />
//                           Settings
//                         </Link>
//                       </div>

//                       <div className="border-t border-slate-100 pt-1 dark:border-slate-700/60">
//                         <button
//                           onClick={handleLogout}
//                           className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/30"
//                         >
//                           <HiLogout className="h-4 w-4" />
//                           Sign Out
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//               </div>
//             ) : (
//               <div className="flex items-center gap-4">
//                 <Link href="/login" className="text-sm font-bold text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
//                   Sign In
//                 </Link>
//                 <Link href="/register" className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-600/10 transition hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/20">
//                   Create Account
//                 </Link>
//               </div>
//             )}
//           </div>

//           <div className="flex md:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="inline-flex items-center justify-center rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-300"
//             >
//               {isOpen ? <HiX className="h-6 w-6" /> : <HiMenuAlt3 className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {isOpen && (
//         <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-inner dark:border-slate-800 dark:bg-slate-900 md:hidden w-full">
//           <div className="space-y-1.5">
//             <Link 
//               href="/" 
//               onClick={() => setIsOpen(false)} 
//               className={`block rounded-xl px-4 py-2.5 text-base font-semibold ${
//                 isActive('/') 
//                   ? 'bg-slate-100 text-indigo-600 dark:bg-slate-800 dark:text-indigo-400' 
//                   : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
//               }`}
//             >
//               Home
//             </Link>
//             <Link 
//               href="/tickets" 
//               onClick={() => setIsOpen(false)} 
//               className={`block rounded-xl px-4 py-2.5 text-base font-semibold ${
//                 isActive('/tickets') 
//                   ? 'bg-slate-100 text-indigo-600 dark:bg-slate-800 dark:text-indigo-400' 
//                   : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
//               }`}
//             >
//               Browse Tickets
//             </Link>
            
//             <div className="my-3 border-t border-slate-200 dark:border-slate-800" />
            
//             {isLoggedIn ? (
//               <div className="space-y-2">
//                 <div className="flex items-center gap-3 px-4 py-2">
//                   <HiUserCircle className="h-10 w-10 text-slate-400" />
//                   <div>
//                     <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">{userSession.name}</h4>
//                     <p className="text-xs text-slate-400 dark:text-slate-500">{userSession.email}</p>
//                   </div>
//                 </div>

//                 {userRole === 'admin' && (
//                   <Link href="/admin/dashboard" onClick={() => setIsOpen(false)} className="block text-center rounded-xl bg-rose-50 border border-rose-200 py-2.5 text-sm font-bold text-rose-600 dark:bg-rose-950/30 dark:border-rose-900 dark:text-rose-400">
//                     Admin System Dashboard
//                   </Link>
//                 )}
//                 {userRole === 'vendor' && (
//                   <Link href="/vendor/dashboard" onClick={() => setIsOpen(false)} className="block text-center rounded-xl bg-amber-50 border border-amber-200 py-2.5 text-sm font-bold text-amber-600 dark:bg-amber-950/30 dark:border-amber-900 dark:text-amber-400">
//                     Vendor Console Hub
//                   </Link>
//                 )}

//                 <Link href="/dashboard" onClick={() => setIsOpen(false)} className="block rounded-xl px-4 py-2.5 text-base font-semibold text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800">
//                   Dashboard
//                 </Link>
//                 <Link href="/profile" onClick={() => setIsOpen(false)} className="block rounded-xl px-4 py-2.5 text-base font-semibold text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800">
//                   Settings Profile
//                 </Link>
//                 <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-xl px-4 py-2.5 text-base font-semibold text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/30">
//                   <HiLogout className="h-5 w-5" />
//                   Sign Out Account
//                 </button>
//               </div>
//             ) : (
//               <div className="grid grid-cols-2 gap-3 pt-2">
//                 <Link href="/login" onClick={() => setIsOpen(false)} className="text-center rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-700 dark:border-slate-700 dark:text-slate-300">
//                   Sign In
//                 </Link>
//                 <Link href="/register" onClick={() => setIsOpen(false)} className="text-center rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white">
//                   Register
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }
// "use client";

// import React, { useState, useEffect, useRef } from 'react';
// import Link from 'next/link';
// import { useRouter, usePathname } from 'next/navigation';
// import { 
//   HiMenuAlt3, HiX, HiUserCircle, HiTicket, HiLogout, 
//   HiChevronDown, HiShieldCheck, HiLibrary, HiUser, HiCog, HiMoon, HiSun
// } from 'react-icons/hi';

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(true); // Default-ই চমৎকার ডার্ক মোড
  
//   // 🛠️ ডাইনামিক সেশন ম্যানেজমেন্ট (লগইন স্টেট ডাইনামিকালি হ্যান্ডেল হবে)
//   const [isLoggedIn, setIsLoggedIn] = useState(false); 
//   const [userRole, setUserRole] = useState('user'); 
//   const [userSession, setUserSession] = useState({
//     name: "",
//     email: "",
//     avatar: null
//   });

//   const dropdownRef = useRef(null);
//   const router = useRouter();
//   const pathname = usePathname();

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const savedTheme = localStorage.getItem('theme');
//       if (savedTheme === 'light') {
//         setIsDarkMode(false);
//         document.documentElement.classList.remove('dark');
//       } else {
//         document.documentElement.classList.add('dark');
//       }
//     }

//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const toggleTheme = () => {
//     if (isDarkMode) {
//       document.documentElement.classList.remove('dark');
//       localStorage.setItem('theme', 'light');
//       setIsDarkMode(false);
//     } else {
//       document.documentElement.classList.add('dark');
//       localStorage.setItem('theme', 'dark');
//       setIsDarkMode(true);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       setDropdownOpen(false);
//       setIsOpen(false);
//       setIsLoggedIn(false);
//       router.push('/login');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const isActive = (path) => pathname === path;

//   const menuItems = [
//     { label: 'Home', path: '/' },
//     { label: 'All Tickets', path: '/tickets' },
//     { label: 'About', path: '/about' },
//     { label: 'Support', path: '/support' },
//   ];

//   return (
//     <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${
//       scrolled 
//         ? 'border-b border-zinc-200/80 bg-white/80 backdrop-blur-md shadow-sm dark:border-zinc-800/80 dark:bg-zinc-950/80' 
//         : 'border-b border-zinc-100 bg-white dark:border-zinc-900 dark:bg-zinc-950'
//     }`}>
//       <div className="w-full px-4 sm:px-6 lg:px-8">
//         <div className="flex h-16 items-center justify-between w-full">
          
//           {/* 🎫 আল্ট্রা-মিনিমালিস্ট লোগো */}
//           <div className="flex items-center gap-8">
//             <Link href="/" className="flex items-center gap-2.5 font-black tracking-tight text-zinc-900 dark:text-white text-xl group">
//               <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600/10 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 border border-indigo-500/20 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
//                 <HiTicket className="h-5 w-5 transform -rotate-12" />
//               </div>
//               <span>Ticket<span className="text-indigo-600 dark:text-indigo-400 font-medium">Core</span></span>
//             </Link>

//             {/* 🔗 মডার্ন স্লাইডিং স্টাইল লিংক */}
//             <div className="hidden md:flex items-center gap-1">
//               {menuItems.map((item) => (
//                 <Link 
//                   key={item.path}
//                   href={item.path} 
//                   className={`rounded-xl px-4 py-2 text-xs font-bold tracking-wide transition-all duration-200 ${
//                     isActive(item.path) 
//                       ? 'bg-zinc-900 text-white dark:bg-zinc-800 dark:text-white font-black shadow-inner border border-zinc-700/30' 
//                       : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50'
//                   }`}
//                 >
//                   {item.label}
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* ⚙️ প্রিমিয়াম রাইট কন্ট্রোলস */}
//           <div className="hidden md:flex items-center gap-4">
            
//             {/* 🌙 থিম বাটন */}
//             <button 
//               onClick={toggleTheme}
//               className="p-2 rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-600 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400 dark:hover:text-zinc-200 text-base transition-all"
//               title="Toggle Theme"
//             >
//               {isDarkMode ? <HiSun className="h-4 w-4" /> : <HiMoon className="h-4 w-4" />}
//             </button>

//             {isLoggedIn ? (
//               <div className="flex items-center gap-4">
//                 {userRole === 'admin' && (
//                   <Link href="/admin/dashboard" className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-rose-500 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1.5 rounded-lg">
//                     <HiShieldCheck className="h-3.5 w-3.5" />
//                     Admin System
//                   </Link>
//                 )}
//                 {userRole === 'vendor' && (
//                   <Link href="/vendor/dashboard" className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1.5 rounded-lg">
//                     <HiLibrary className="h-3.5 w-3.5" />
//                     Vendor Terminal
//                   </Link>
//                 )}

//                 {/* 👤 স্মুথ ড্রপডাউন বাটন */}
//                 <div className="relative" ref={dropdownRef}>
//                   <button
//                     onClick={() => setDropdownOpen(!dropdownOpen)}
//                     className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50/50 p-1.5 pr-3 text-xs font-bold text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-300 dark:hover:bg-zinc-900"
//                   >
//                     {userSession.avatar ? (
//                       <img src={userSession.avatar} alt="Avatar" className="h-6 w-6 rounded-lg object-cover" />
//                     ) : (
//                       <HiUserCircle className="h-6 w-6 text-zinc-400 dark:text-zinc-500" />
//                     )}
//                     <span className="max-w-[100px] truncate">{userSession.name}</span>
//                     <HiChevronDown className={`h-3 w-3 text-zinc-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
//                   </button>

//                   {dropdownOpen && (
//                     <div className="absolute right-0 mt-2 w-52 origin-top-right rounded-xl border border-zinc-200 bg-white p-1.5 shadow-xl dark:border-zinc-800 dark:bg-zinc-950 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
//                       <div className="px-3 py-2 border-b border-zinc-100 dark:border-zinc-900 text-[10px] text-zinc-400 font-semibold truncate">
//                         Signed in as <br /><span className="text-zinc-800 dark:text-zinc-200 font-bold">{userSession.email}</span>
//                       </div>
                      
//                       <div className="py-1">
//                         <Link
//                           href="/dashboard"
//                           onClick={() => setDropdownOpen(false)}
//                           className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:text-zinc-900 dark:hover:text-zinc-200"
//                         >
//                           <HiUser className="h-4 w-4" />
//                           Dashboard
//                         </Link>
//                         <Link
//                           href="/profile"
//                           onClick={() => setDropdownOpen(false)}
//                           className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:text-zinc-900 dark:hover:text-zinc-200"
//                         >
//                           <HiCog className="h-4 w-4" />
//                           Settings
//                         </Link>
//                       </div>

//                       <div className="border-t border-zinc-100 dark:border-zinc-900 pt-1">
//                         <button
//                           onClick={handleLogout}
//                           className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold text-rose-500 hover:bg-rose-500/10 transition"
//                         >
//                           <HiLogout className="h-4 w-4" />
//                           Sign Out
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ) : (
//               /* ✨ হাই-এন্ড প্রফেশনাল বাটন স্টাইল */
//               <div className="flex items-center gap-3">
//                 <Link href="/login" className="text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-all">
//                   Sign In
//                 </Link>
//                 <Link href="/register" className="rounded-xl bg-zinc-950 px-4 py-2 text-xs font-black text-white hover:bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200 shadow-sm transition-all">
//                   Get Started
//                 </Link>
//               </div>
//             )}
//           </div>

//           {/* 📱 মোবাইল বাটন */}
//           <div className="flex md:hidden items-center gap-2">
//             <button 
//               onClick={toggleTheme}
//               className="p-2 rounded-xl text-zinc-500 dark:text-zinc-400 text-base"
//             >
//               {isDarkMode ? <HiSun /> : <HiMoon />}
//             </button>
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="inline-flex items-center justify-center rounded-xl p-2 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
//             >
//               {isOpen ? <HiX className="h-5 w-5" /> : <HiMenuAlt3 className="h-5 w-5" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* 📱 মোবাইল ড্রপডাউন */}
//       {isOpen && (
//         <div className="border-t border-zinc-200 bg-white px-4 py-4 dark:border-zinc-900 dark:bg-zinc-950 md:hidden w-full space-y-3">
//           <div className="space-y-1">
//             {menuItems.map((item) => (
//               <Link 
//                 key={item.path}
//                 href={item.path} 
//                 onClick={() => setIsOpen(false)} 
//                 className={`block rounded-xl px-4 py-2.5 text-sm font-bold ${
//                   isActive(item.path) 
//                     ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-white font-black' 
//                     : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/50'
//                 }`}
//               >
//                 {item.label}
//               </Link>
//             ))}
//           </div>
          
//           <div className="border-t border-zinc-100 dark:border-zinc-900 pt-2">
//             {isLoggedIn ? (
//               <div className="space-y-2">
//                 <div className="flex items-center gap-3 px-3 py-1.5">
//                   <HiUserCircle className="h-9 w-9 text-zinc-400" />
//                   <div>
//                     <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{userSession.name}</h4>
//                     <p className="text-[11px] text-zinc-400">{userSession.email}</p>
//                   </div>
//                 </div>
//                 <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-rose-500 bg-rose-500/5">
//                   <HiLogout className="h-4 w-4" />
//                   Sign Out
//                 </button>
//               </div>
//             ) : (
//               <div className="grid grid-cols-2 gap-2">
//                 <Link href="/login" onClick={() => setIsOpen(false)} className="text-center rounded-xl border border-zinc-200 dark:border-zinc-800 py-2 text-xs font-bold text-zinc-700 dark:text-zinc-300">
//                   Sign In
//                 </Link>
//                 <Link href="/register" onClick={() => setIsOpen(false)} className="text-center rounded-xl bg-zinc-950 dark:bg-zinc-100 dark:text-zinc-950 py-2 text-xs font-black text-white">
//                   Get Started
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }
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