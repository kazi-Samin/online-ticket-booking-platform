
import { Inter } from "next/font/google";
import "../globals.css";
import { ToastContainer } from "react-toastify";
import DashboardSidebar from "@/Components/Dashboard/DashboardSidebar";

const coreBodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata = {
  title: "TicketCore || Workspace-Dashboard",
  description: "Secure ticket orchestration and management terminal",
};

// 🎯 ফাংশন নাম হুবহু DashboardLayout-ই রাখা হলো যাতে ইম্পোর্ট না ভাঙে
export default function DashboardLayout({ children }) {
  return (
    <div className={`${coreBodyFont.className} antialiased w-full min-h-screen bg-[#09090b] text-zinc-100 selection:bg-indigo-500/30`}>
      
      <div className="h-screen bg-[#09090b] flex flex-col md:flex-row overflow-hidden relative">
        {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
        <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Sidebar Panel Component */}
        <DashboardSidebar />

        {/* Main Body Area */}
        <main className="flex-1 w-full h-full p-4 md:p-6 lg:p-8 overflow-y-auto overflow-x-hidden relative z-10 bg-zinc-950/20">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        <ToastContainer 
          position="bottom-right" 
          theme="dark"
          toastClassName="bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-xl"
        />
      </div>

    </div>
  );
}