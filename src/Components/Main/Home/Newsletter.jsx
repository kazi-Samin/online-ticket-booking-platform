// 'use client'
// import { Send } from 'lucide-react';

// export function Newsletter() {
//   return (
//     <section className="py-12 bg-white dark:bg-black px-4 max-w-7xl mx-auto">
//       <div className="w-full bg-gradient-to-r from-[#1E3A8A] via-indigo-950 to-zinc-950 rounded-[32px] p-8 sm:p-12 text-center relative overflow-hidden shadow-xl">
//         {/* ব্যাকগ্রাউন্ড ডেকোরেশন */}
//         <div className="absolute -top-10 -left-10 h-40 w-40 bg-blue-500/10 rounded-full blur-3xl"></div>
//         <div className="absolute -bottom-10 -right-10 h-40 w-40 bg-orange-500/10 rounded-full blur-3xl"></div>

//         <div className="relative z-10 max-w-xl mx-auto">
//           <span className="text-xs font-black uppercase tracking-widest text-[#FF6B35]">Get 10% Off Your First Trip</span>
//           <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Subscribe To Our Newsletter</h2>
//           <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed">
//             Join our mailing list and receive elite discount coupons, travel insights, and seasonal trending package updates.
//           </p>

//           <form onSubmit={(e) => e.preventDefault()} className="mt-8 flex flex-col sm:flex-row gap-3 bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur-md">
//             <input
//               type="email"
//               placeholder="Enter your personal email..."
//               className="flex-grow bg-transparent px-4 py-3 text-sm text-white outline-none placeholder-zinc-400 focus:placeholder-transparent"
//               required
//             />
//             <button
//               type="submit"
//               className="bg-[#FF6B35] hover:bg-orange-600 active:scale-95 text-white font-bold text-sm px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
//             >
//               Subscribe
//               <Send className="h-4 w-4" />
//             </button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }
'use client'
import { Send, Sparkles } from 'lucide-react';

export function Newsletter() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 px-4 flex justify-center items-center relative overflow-hidden transition-colors duration-300">
      <div className="w-full max-w-7xl mx-auto relative z-10">
        <div className="w-full bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/50 backdrop-blur-xl rounded-[32px] p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden shadow-md dark:shadow-[0_0_40px_rgba(0,0,0,0.5)] group hover:border-indigo-500/30 transition-all duration-700">
          
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none transition-opacity duration-700 group-hover:opacity-100 opacity-50" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-violet-600/20 rounded-full blur-[100px] pointer-events-none transition-opacity duration-700 group-hover:opacity-100 opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-widest mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Get 10% Off Your First Trip
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tighter text-slate-900 dark:text-zinc-100">
              Subscribe To Our Newsletter
            </h2>
            
            <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 mt-4 leading-relaxed font-medium">
              Join our elite mailing list and receive exclusive discount coupons, premium travel insights, and seasonal package updates.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="mt-10 w-full flex flex-col sm:flex-row gap-3 bg-white dark:bg-slate-950/80 p-2 rounded-2xl border border-slate-200 dark:border-slate-800/50 backdrop-blur-md focus-within:border-indigo-500/50 transition-colors shadow-sm dark:shadow-inner relative z-20">
              <input
                type="email"
                placeholder="Enter your personal email..."
                className="flex-grow bg-transparent px-5 py-3 text-sm font-medium text-slate-900 dark:text-zinc-100 outline-none placeholder-slate-400 dark:placeholder-zinc-500 focus:placeholder-slate-500 dark:focus:placeholder-zinc-600 transition-colors w-full"
                required
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-bold text-sm px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-indigo-500/25 shrink-0"
              >
                Subscribe
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}