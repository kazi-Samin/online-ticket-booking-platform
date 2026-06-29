// "use client";

// import React, { useState } from "react";
// import { Form, TextField, Label, Input, FieldError, Button } from "@heroui/react";
// import { User, Mail, Lock, Upload, Briefcase, Eye, EyeOff, Loader2 } from "lucide-react";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { authClient } from "@/lib/auth-client";
// import { toast } from "react-toastify";
// import { redirect } from "next/navigation";
// import Image from "next/image";

// export default function RegisterForm() {
//   const [role, setRole] = useState("user");
//   const [isVisible, setIsVisible] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadedImageUrl, setUploadedImageUrl] = useState("");

//   const toggleVisibility = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsVisible(!isVisible);
//   };

//   // ImgBB Image Upload Engine (Unchanged)
//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setIsUploading(true);
//     const formData = new FormData();
//     formData.append("image", file);

//     const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

//     try {
//       const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();

//       if (data.success) {
//         setUploadedImageUrl(data.data.display_url);
//       } else {
//         toast.error("ImgBB Upload Failed.");
//       }
//     } catch (error) {
//       console.error("Cloud storage upload error:", error);
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   // Better-Auth Core Registration Pipeline (Unchanged)
//   const handleRegisterSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);

//     if (!uploadedImageUrl) {
//       toast.warn("Please wait for image upload to complete!");
//       return;
//     }

//     const payload = {
//       name: formData.get("name"),
//       email: formData.get("email"),
//       password: formData.get("password"),
//       image: uploadedImageUrl,
//       role: role,
//       isFraud: false,
//       createdAt: new Date().toISOString()
//     };

//     const { data, error } = await authClient.signUp.email({
//         email: payload.email,
//         password: payload.password,
//         name: payload.name,
//         image: payload.image,
//         role: payload.role,
//         isFraud: payload.isFraud,
//         callbackURL: "/login"
//     });

//     if(data){
//         toast.success('Successfully Register')
//         setTimeout(() => {
//           window.location.href = "/";
//         }, 1000);
//     }
//     if(error){
//         toast.error(error.message)
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-slate-950 p-4 sm:p-6 lg:p-8 transition-colors duration-200">
//       <div className="grid grid-cols-1 lg:grid-cols-12 w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-zinc-100 dark:border-slate-800/60 min-h-[600px] transition-colors duration-200">

//         {/* Left Column: Indigo Theme Display Panel */}
//         <div className="lg:col-span-5 bg-[#1E3A8A] dark:bg-slate-950 p-8 lg:p-12 flex flex-col justify-between text-white relative overflow-hidden transition-colors duration-200">
//           <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-800 dark:bg-indigo-900 rounded-full blur-2xl opacity-40"></div>
//           <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-[#FF6B35] rounded-full blur-3xl opacity-20"></div>

//           <div>
//             <h2 className="text-3xl font-extrabold tracking-tight">
//               Ticket<span className="text-[#FF6B35]">Bari</span>
//             </h2>
//             <p className="text-indigo-200 dark:text-indigo-300 text-sm mt-2">Your Trusted Journey Companion</p>
//           </div>

//           <div className="my-8 lg:my-0 space-y-4">
//             <h3 className="text-2xl font-bold leading-snug">
//               Secure Your Seats <br />
//               In Few Quick Clicks!
//             </h3>
//             <p className="text-indigo-100 dark:text-slate-300 text-xs leading-relaxed max-w-xs">
//               Join thousands of daily travelers booking Bus, Train, Launch, and Flight tickets without any hassle.
//             </p>
//           </div>

//           <div className="text-xs text-indigo-300 dark:text-slate-500">
//             &copy; 2026 TicketBari. All rights reserved.
//           </div>
//         </div>

//         {/* Right Column: Account Form Container Area Layout */}
//         <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-center bg-white dark:bg-slate-900 transition-colors duration-200">
//           <div className="mb-6">
//             <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-slate-100">Create Account</h1>
//             <p className="text-sm text-zinc-500 dark:text-slate-400 mt-1">Get started with your choice of platform role</p>
//           </div>

//           {/* Selector Segment Toggles */}
//           <div className="grid grid-cols-2 gap-3 p-1.5 bg-zinc-100 dark:bg-slate-800/60 rounded-2xl mb-6">
//             <button
//               type="button"
//               onClick={() => setRole("user")}
//               className={`flex items-center justify-center space-x-2 py-2.5 rounded-xl text-sm font-bold transition-all ${
//                 role === "user"
//                   ? "bg-white dark:bg-slate-700 text-[#1E3A8A] dark:text-white shadow-sm"
//                   : "text-zinc-600 dark:text-slate-400"
//               }`}
//             >
//               <User className="h-4 w-4" />
//               <span>Regular User</span>
//             </button>
//             <button
//               type="button"
//               onClick={() => setRole("vendor")}
//               className={`flex items-center justify-center space-x-2 py-2.5 rounded-xl text-sm font-bold transition-all ${
//                 role === "vendor"
//                   ? "bg-white dark:bg-slate-700 text-[#1E3A8A] dark:text-white shadow-sm"
//                   : "text-zinc-600 dark:text-slate-400"
//               }`}
//             >
//               <Briefcase className="h-4 w-4" />
//               <span>Ticket Vendor</span>
//             </button>
//           </div>

//           {/* Form Native Wrapper Integration using Correct HeroUI Props Structure */}
//           <Form className="flex flex-col gap-4 w-full" onSubmit={handleRegisterSubmit}>

//             {/* Field 1: Name */}
//             <TextField isRequired name="name" type="text" className="flex flex-col gap-1 w-full">
//               <Label className="text-sm font-semibold text-zinc-700 dark:text-slate-300">Full Name</Label>
//               <div className="relative flex items-center">
//                 <User className="absolute left-3 h-4 w-4 text-zinc-400 dark:text-slate-500 pointer-events-none" />
//                 <Input
//                   placeholder="Enter your full name"
//                   className="w-full h-11 pl-10 pr-3 rounded-xl border border-zinc-200 dark:border-slate-800 bg-transparent focus:border-indigo-500 dark:focus:border-blue-500 text-zinc-800 dark:text-slate-100 text-sm outline-none transition-colors"
//                 />
//               </div>
//               <FieldError className="text-xs text-red-500 mt-0.5" />
//             </TextField>

//             {/* Field 2: Email */}
//             <TextField
//               isRequired
//               name="email"
//               type="email"
//               className="flex flex-col gap-1 w-full"
//               validate={(value) => {
//                 if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
//                   return "Please enter a valid email address";
//                 }
//                 return null;
//               }}
//             >
//               <Label className="text-sm font-semibold text-zinc-700 dark:text-slate-300">Email Address</Label>
//               <div className="relative flex items-center">
//                 <Mail className="absolute left-3 h-4 w-4 text-zinc-400 dark:text-slate-500 pointer-events-none" />
//                 <Input
//                   placeholder="you@example.com"
//                   className="w-full h-11 pl-10 pr-3 rounded-xl border border-zinc-200 dark:border-slate-800 bg-transparent focus:border-indigo-500 dark:focus:border-blue-500 text-zinc-800 dark:text-slate-100 text-sm outline-none transition-colors"
//                 />
//               </div>
//               <FieldError className="text-xs text-red-500 mt-0.5" />
//             </TextField>

//             {/* Field 3: Password */}
//             <TextField
//               isRequired
//               name="password"
//               type={isVisible ? "text" : "password"}
//               className="flex flex-col gap-1 w-full"
//               validate={(value) => {
//                 if (value.length < 8) return "Password must be at least 8 characters";
//                 if (!/[A-Z]/.test(value)) return "Include at least one uppercase letter";
//                 if (!/[0-9]/.test(value)) return "Include at least one number";
//                 return null;
//               }}
//             >
//               <Label className="text-sm font-semibold text-zinc-700 dark:text-slate-300">Password</Label>
//               <div className="relative flex items-center">
//                 <Lock className="absolute left-3 h-4 w-4 text-zinc-400 dark:text-slate-500 pointer-events-none" />
//                 <Input
//                   placeholder="Enter secure password"
//                   className="w-full h-11 pl-10 pr-10 rounded-xl border border-zinc-200 dark:border-slate-800 bg-transparent focus:border-indigo-500 dark:focus:border-blue-500 text-zinc-800 dark:text-slate-100 text-sm outline-none transition-colors"
//                 />
//                 <button
//                   type="button"
//                   onClick={toggleVisibility}
//                   className="absolute right-3 p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-slate-800 transition-colors focus:outline-none z-20"
//                 >
//                   {isVisible ? <EyeOff className="h-4 w-4 text-zinc-400 dark:text-slate-500" /> : <Eye className="h-4 w-4 text-zinc-400 dark:text-slate-500" />}
//                 </button>
//               </div>
//               <FieldError className="text-xs text-red-500 mt-0.5" />
//             </TextField>

//             {/* Cloud Upload Block */}
//             <div className="flex flex-col gap-1.5 w-full">
//               <label className="text-zinc-700 dark:text-slate-300 text-sm font-semibold">Profile Picture</label>
//               <div className="flex items-center space-x-4 border-2 border-dashed border-zinc-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-blue-500 rounded-xl p-3 bg-zinc-50 dark:bg-slate-950 relative">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
//                   disabled={isUploading}
//                 />
//                 <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-zinc-100 dark:border-slate-800 shadow-sm">
//                   {isUploading ? (
//                     <Loader2 className="h-5 w-5 text-indigo-600 dark:text-blue-500 animate-spin" />
//                   ) : (
//                     <Upload className="h-5 w-5 text-zinc-500 dark:text-slate-400" />
//                   )}
//                 </div>
//                 <div className="flex-1 truncate">
//                   {isUploading ? (
//                     <span className="text-xs font-semibold text-indigo-600 dark:text-blue-400">Uploading to ImgBB...</span>
//                   ) : uploadedImageUrl ? (
//                     <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block">✓ Uploaded Successfully!</span>
//                   ) : (
//                     <span className="text-xs text-zinc-500 dark:text-slate-400 block">Click to browse photo</span>
//                   )}
//                 </div>

//                 {uploadedImageUrl && (
//                   <Image width={20} height={20}
//                     src={uploadedImageUrl}
//                     alt="Preview avatar"
//                     className="w-10 h-10 rounded-full object-cover ring-2 ring-[#FF6B35] z-20"
//                   />
//                 )}
//               </div>
//             </div>

//             {/* Submit & Navigation Link Block */}
//             <div className="flex flex-col gap-3 mt-2">
//               <Button
//                 type="submit"
//                 disabled={isUploading || !uploadedImageUrl}
//                 className="w-full bg-[#FF6B35] disabled:bg-zinc-400 dark:disabled:bg-slate-800 disabled:text-zinc-500 text-white font-bold h-11 rounded-xl shadow-md active:scale-[0.98] transition-all"
//               >
//                 Register as {role === "user" ? "User" : "Vendor"}
//               </Button>

//               {/* ✨ Framer Motion Animated "Already have an account?" Text Wrapper */}
//               <motion.p
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2, duration: 0.4 }}
//                 className="text-xs text-center text-zinc-500 dark:text-slate-400 mt-2"
//               >
//                 Already have an account?{" "}
//                 <motion.span
//                   className="inline-block"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <Link href="/login" className="text-[#1E3A8A] dark:text-blue-400 font-bold hover:underline">
//                     Sign In
//                   </Link>
//                 </motion.span>
//               </motion.p>
//             </div>

//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import { Form, TextField, Label, Input, FieldError, Button } from "@heroui/react";
import { User, Mail, Lock, Upload, Briefcase, Eye, EyeOff, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Image from "next/image";

export default function RegisterForm() {
  const [role, setRole] = useState("user");
  const [isVisible, setIsVisible] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const toggleVisibility = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(!isVisible);
  };

  // ImgBB Image Upload Engine
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setUploadedImageUrl(data.data.display_url);
      } else {
        toast.error("ImgBB Upload Failed.");
      }
    } catch (error) {
      console.error("Cloud storage upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  // Better-Auth Core Registration Pipeline
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!uploadedImageUrl) {
      toast.warn("Please wait for image upload to complete!");
      return;
    }

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    // 🚀 Fixed: ক্লায়েন্ট সাইড থেকে অতিরিক্ত role/isFraud এবং ভুল callbackURL সরানো হয়েছে। 
    // এগুলো এখন সরাসরি ব্যাকএন্ড ডাটাবেজ মডেল বা হুক দিয়ে হ্যান্ডেল হবে।
    const { data, error } = await authClient.signUp.email({
        email: payload.email,
        password: payload.password,
        name: payload.name,
        image: uploadedImageUrl,
        callbackUrl: "/login" 
    });

    if (data) {
        toast.success('Successfully Registered! Redirecting...');
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
    }
    if (error) {
        toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-slate-950 p-4 sm:p-6 lg:p-8 transition-colors duration-200">
      <div className="grid grid-cols-1 lg:grid-cols-12 w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-zinc-100 dark:border-slate-800/60 min-h-[600px] transition-colors duration-200">

        {/* Left Column: Indigo Theme Display Panel */}
        <div className="lg:col-span-5 bg-[#1E3A8A] dark:bg-slate-950 p-8 lg:p-12 flex flex-col justify-between text-white relative overflow-hidden transition-colors duration-200">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-800 dark:bg-indigo-900 rounded-full blur-2xl opacity-40"></div>
          <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-[#FF6B35] rounded-full blur-3xl opacity-20"></div>

          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Ticket<span className="text-[#FF6B35]">Bari</span>
            </h2>
            <p className="text-indigo-200 dark:text-indigo-300 text-sm mt-2">Your Trusted Journey Companion</p>
          </div>

          <div className="my-8 lg:my-0 space-y-4">
            <h3 className="text-2xl font-bold leading-snug">
              Secure Your Seats <br />
              In Few Quick Clicks!
            </h3>
            <p className="text-indigo-100 dark:text-slate-300 text-xs leading-relaxed max-w-xs">
              Join thousands of daily travelers booking Bus, Train, Launch, and Flight tickets without any hassle.
            </p>
          </div>

          <div className="text-xs text-indigo-300 dark:text-slate-500">
            &copy; 2026 TicketBari. All rights reserved.
          </div>
        </div>

        {/* Right Column: Account Form Container */}
        <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-center bg-white dark:bg-slate-900 transition-colors duration-200">
          <div className="mb-6">
            <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-slate-100">Create Account</h1>
            <p className="text-sm text-zinc-500 dark:text-slate-400 mt-1">Get started with your choice of platform role</p>
          </div>

          {/* Selector Segment Toggles */}
          <div className="grid grid-cols-2 gap-3 p-1.5 bg-zinc-100 dark:bg-slate-800/60 rounded-2xl mb-6">
            <button
              type="button"
              onClick={() => setRole("user")}
              className={`flex items-center justify-center space-x-2 py-2.5 rounded-xl text-sm font-bold transition-all ${
                role === "user"
                  ? "bg-white dark:bg-slate-700 text-[#1E3A8A] dark:text-white shadow-sm"
                  : "text-zinc-600 dark:text-slate-400"
              }`}
            >
              <User className="h-4 w-4" />
              <span>Regular User</span>
            </button>
            <button
              type="button"
              onClick={() => setRole("vendor")}
              className={`flex items-center justify-center space-x-2 py-2.5 rounded-xl text-sm font-bold transition-all ${
                role === "vendor"
                  ? "bg-white dark:bg-slate-700 text-[#1E3A8A] dark:text-white shadow-sm"
                  : "text-zinc-600 dark:text-slate-400"
              }`}
            >
              <Briefcase className="h-4 w-4" />
              <span>Ticket Vendor</span>
            </button>
          </div>

          <Form className="flex flex-col gap-4 w-full" onSubmit={handleRegisterSubmit}>
            {/* Name */}
            <TextField isRequired name="name" type="text" className="flex flex-col gap-1 w-full">
              <Label className="text-sm font-semibold text-zinc-700 dark:text-slate-300">Full Name</Label>
              <div className="relative flex items-center">
                <User className="absolute left-3 h-4 w-4 text-zinc-400 dark:text-slate-500 pointer-events-none" />
                <Input placeholder="Enter your full name" className="w-full h-11 pl-10 pr-3 rounded-xl border border-zinc-200 dark:border-slate-800 bg-transparent text-zinc-800 dark:text-slate-100 text-sm outline-none" />
              </div>
              <FieldError className="text-xs text-red-500 mt-0.5" />
            </TextField>

            {/* Email */}
            <TextField
              isRequired
              name="email"
              type="email"
              className="flex flex-col gap-1 w-full"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
            >
              <Label className="text-sm font-semibold text-zinc-700 dark:text-slate-300">Email Address</Label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 h-4 w-4 text-zinc-400 dark:text-slate-500 pointer-events-none" />
                <Input placeholder="you@example.com" className="w-full h-11 pl-10 pr-3 rounded-xl border border-zinc-200 dark:border-slate-800 bg-transparent text-zinc-800 dark:text-slate-100 text-sm outline-none" />
              </div>
              <FieldError className="text-xs text-red-500 mt-0.5" />
            </TextField>

            {/* Password */}
            <TextField
              isRequired
              name="password"
              type={isVisible ? "text" : "password"}
              className="flex flex-col gap-1 w-full"
              validate={(value) => {
                if (value.length < 8) return "Password must be at least 8 characters";
                if (!/[A-Z]/.test(value)) return "Include at least one uppercase letter";
                if (!/[0-9]/.test(value)) return "Include at least one number";
                return null;
              }}
            >
              <Label className="text-sm font-semibold text-zinc-700 dark:text-slate-300">Password</Label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3 h-4 w-4 text-zinc-400 dark:text-slate-500 pointer-events-none" />
                <Input placeholder="Enter secure password" className="w-full h-11 pl-10 pr-10 rounded-xl border border-zinc-200 dark:border-slate-800 bg-transparent text-zinc-800 dark:text-slate-100 text-sm outline-none" />
                <button
                  type="button"
                  onClick={toggleVisibility}
                  className="absolute right-3 p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-slate-800 transition-colors focus:outline-none z-20"
                >
                  {isVisible ? <EyeOff className="h-4 w-4 text-zinc-400 dark:text-slate-500" /> : <Eye className="h-4 w-4 text-zinc-400 dark:text-slate-500" />}
                </button>
              </div>
              <FieldError className="text-xs text-red-500 mt-0.5" />
            </TextField>

            {/* Profile Picture (ImgBB) */}
            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-zinc-700 dark:text-slate-300 text-sm font-semibold">Profile Picture</label>
              <div className="flex items-center space-x-4 border-2 border-dashed border-zinc-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-blue-500 rounded-xl p-3 bg-zinc-50 dark:bg-slate-950 relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                  disabled={isUploading}
                />
                <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-zinc-100 dark:border-slate-800 shadow-sm">
                  {isUploading ? (
                    <Loader2 className="h-5 w-5 text-indigo-600 dark:text-blue-500 animate-spin" />
                  ) : (
                    <Upload className="h-5 w-5 text-zinc-500 dark:text-slate-400" />
                  )}
                </div>
                <div className="flex-1 truncate">
                  {isUploading ? (
                    <span className="text-xs font-semibold text-indigo-600 dark:text-blue-400">Uploading to ImgBB...</span>
                  ) : uploadedImageUrl ? (
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block">✓ Uploaded Successfully!</span>
                  ) : (
                    <span className="text-xs text-zinc-500 dark:text-slate-400 block">Click to browse photo</span>
                  )}
                </div>

                {uploadedImageUrl && (
                  <Image
                    width={40}
                    height={40}
                    src={uploadedImageUrl}
                    alt="Preview avatar"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-[#FF6B35] z-20"
                  />
                )}
              </div>
            </div>

            {/* Submit Block */}
            <div className="flex flex-col gap-3 mt-2">
              <Button
                type="submit"
                disabled={isUploading || !uploadedImageUrl}
                className="w-full bg-[#FF6B35] disabled:bg-zinc-400 dark:disabled:bg-slate-800 disabled:text-zinc-500 text-white font-bold h-11 rounded-xl shadow-md active:scale-[0.98] transition-all"
              >
                Register as {role === "user" ? "User" : "Vendor"}
              </Button>

              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }} className="text-xs text-center text-zinc-500 dark:text-slate-400 mt-2">
                Already have an account?{" "}
                <motion.span className="inline-block" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/login" className="text-[#1E3A8A] dark:text-blue-400 font-bold hover:underline">
                    Sign In
                  </Link>
                </motion.span>
              </motion.p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}