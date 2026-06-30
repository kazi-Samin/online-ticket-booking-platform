// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { TextField, Input, Button } from "@heroui/react";
// import { MapPin, Navigation, Bus } from "lucide-react";

// export default function SearchCard() {
//   const router = useRouter();
//   const [from, setFrom] = useState("");
//   const [to, setTo] = useState("");
//   const [transport, setTransport] = useState("all");

//   const handleSearch = (e) => {
//     e.preventDefault();

//     const params = new URLSearchParams();
//     if (from) params.append("from", from);
//     if (to) params.append("to", to);
//     if (transport && transport !== "all") params.append("transport", transport);

//     router.push(`/all-tickets?${params.toString()}`);
//   };

//   const transportTypes = [
//     { key: "all", label: "All Vehicles" },
//     { key: "bus", label: "Bus" },
//     { key: "train", label: "Train" },
//     { key: "plane", label: "Flight" },
//     { key: "launch", label: "Launch" },
//   ];

//   return (
//     <div className="w-full max-w-4xl bg-white/95 dark:bg-slate-900/90 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800/60 p-6 lg:p-8 text-slate-800 dark:text-slate-100 transition-colors duration-200">
//       <form onSubmit={handleSearch} className="flex flex-col gap-6">

//         {/* 🎛️ যানবাহন সিলেকশন ট্যাব গ্রুপ */}
//         <div className="flex flex-wrap gap-2 border-b border-slate-100 dark:border-slate-800/60 pb-4">
//           {transportTypes.map((type) => (
//             <button
//               key={type.key}
//               type="button"
//               onClick={() => setTransport(type.key)}
//               className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
//                 transport === type.key
//                   ? "bg-[#1E3A8A] dark:bg-blue-600 text-white shadow-md shadow-blue-900/20"
//                   : "bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/80 text-slate-600 dark:text-slate-300"
//               }`}
//             >
//               {type.label}
//             </button>
//           ))}
//         </div>

//         {/* 🔍 ইনপুট গ্রিড সেকশন */}
//         <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end text-left">

//           {/* From Location */}
//           <div className="md:col-span-4 relative flex flex-col gap-1 w-full">
//             <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider pl-1">From</label>
//             <div className="relative flex items-center">
//               <MapPin className="absolute left-3 h-4 w-4 text-slate-400 dark:text-slate-500 z-10" />
//               <Input
//                 name="from"
//                 value={from}
//                 onChange={(e) => setFrom(e.target.value)}
//                 placeholder="Where from?"
//                 className="w-full h-12 pl-8 pr-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm outline-none transition-colors focus:border-teal-500 dark:focus:border-blue-500"
//               />
//             </div>
//           </div>

//           {/* To Location */}
//           <div className="md:col-span-4 relative flex flex-col gap-1 w-full">
//             <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider pl-1">To</label>
//             <div className="relative flex items-center">
//               <Navigation className="absolute left-3 h-4 w-4 text-slate-400 dark:text-slate-500 z-10" />
//               <Input
//                 name="to"
//                 value={to}
//                 onChange={(e) => setTo(e.target.value)}
//                 placeholder="Where to?"
//                 className="w-full h-12 pl-8 pr-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm outline-none transition-colors focus:border-teal-500 dark:focus:border-blue-500"
//               />
//             </div>
//           </div>

//           {/* Search Button */}
//           <div className="md:col-span-4 w-full">
//             <Button
//               type="submit"
//               className="w-full h-12 bg-[#FF6B35] hover:bg-[#e05626] text-white font-extrabold rounded-xl shadow-lg shadow-orange-600/20 dark:shadow-orange-900/10 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
//             >
//               <Bus className="h-5 w-5" />
//               Find Best Tickets
//             </Button>
//           </div>
//         </div>

//       </form>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Button } from "@heroui/react";
import { MapPin, Navigation, Compass, Bus, Train, Plane, Ship } from "lucide-react";

export default function SearchCard() {
  const router = useRouter();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [transport, setTransport] = useState("all");

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (from) params.append("from", from);
    if (to) params.append("to", to);
    if (transport && transport !== "all") params.append("transport", transport);
    router.push(`/all-tickets?${params.toString()}`);
  };

  const transportTypes = [
    { key: "all", label: "All Vehicles", icon: Compass },
    { key: "bus", label: "Bus", icon: Bus },
    { key: "train", label: "Train", icon: Train },
    { key: "plane", label: "Flight", icon: Plane },
    { key: "launch", label: "Launch", icon: Ship },
  ];

  return (
    <div className="w-full max-w-4xl bg-slate-950/40 backdrop-blur-xl rounded-[32px] shadow-2xl border border-teal-500/10 p-6 lg:p-8 text-slate-100 transition-all duration-300">
      <form onSubmit={handleSearch} className="flex flex-col gap-8">
        
        <div className="flex flex-wrap gap-2.5 border-b border-slate-800/60 pb-5">
          {transportTypes.map((type) => {
            const IconComponent = type.icon;
            const isActive = transport === type.key;
            return (
              <button
                key={type.key}
                type="button"
                onClick={() => setTransport(type.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 border ${
                  isActive
                    ? "bg-teal-600 border-teal-500 text-white shadow-lg shadow-teal-600/30"
                    : "bg-slate-900/50 dark:bg-slate-900/30 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50 text-slate-400 hover:text-slate-200"
                }`}
              >
                <IconComponent className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-500"}`} />
                {type.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end text-left">
          
          <div className="md:col-span-4 flex flex-col gap-2 w-full">
            <label className="text-xs font-black text-teal-400 uppercase tracking-widest pl-1">From Location</label>
            <div className="relative flex items-center group">
              <MapPin className="absolute left-4 h-5 w-5 text-slate-500 group-focus-within:text-teal-400 transition-colors z-10" />
              <Input
                name="from"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="Where are you leaving from?"
                className="w-full h-14 pl-10 pr-4 rounded-2xl border border-slate-800 bg-slate-900/40 text-slate-200 text-sm outline-none transition-all focus:border-teal-500 placeholder:text-slate-600"
              />
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col gap-2 w-full">
            <label className="text-xs font-black text-teal-400 uppercase tracking-widest pl-1">To Destination</label>
            <div className="relative flex items-center group">
              <Navigation className="absolute left-4 h-5 w-5 text-slate-500 group-focus-within:text-teal-400 transition-colors z-10" />
              <Input
                name="to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Where is your destination?"
                className="w-full h-14 pl-10 pr-4 rounded-2xl border border-slate-800 bg-slate-900/40 text-slate-200 text-sm outline-none transition-all focus:border-teal-500 placeholder:text-slate-600"
              />
            </div>
          </div>

          <div className="md:col-span-4 w-full">
            <Button
              type="submit"
              className="w-full h-14 bg-teal-600 hover:bg-teal-500 text-white font-black text-sm rounded-2xl shadow-xl shadow-teal-600/20 transition-all duration-300 flex items-center justify-center gap-2.5 active:scale-[0.98]"
            >
              <Compass className="h-5 w-5 animate-spin-slow" />
              Find Premium Tickets
            </Button>
          </div>
          
        </div>

      </form>
    </div>
  );
}