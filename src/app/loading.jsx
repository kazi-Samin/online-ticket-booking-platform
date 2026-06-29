import React from 'react';

export default function Loading() {
  return (
    // 🎯 Fixed: Background matches the deep slate/dark setup and matches TicketCore theme
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#09090b] text-zinc-400 select-none transition-colors duration-300">

      {/* Absolute Background Custom Indigo/Violet Glow Matrix */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-violet-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Dynamic Keyframes Animation Core Styling */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes busDrive {
          0% { transform: translateX(-110%) scaleX(1); }
          48% { transform: translateX(110%) scaleX(1); }
          50% { transform: translateX(110%) scaleX(-1); }
          98% { transform: translateX(-110%) scaleX(-1); }
          100% { transform: translateX(-110%) scaleX(1); }
        }
        @keyframes roadDash {
          0% { background-position: 160px 0; }
          100% { background-position: 0 0; }
        }
        .animate-bus {
          animation: busDrive 3.5s infinite linear;
        }
        .animate-road {
          animation: roadDash 0.6s infinite linear;
          background-image: linear-gradient(to right, #27272a 50%, transparent 50%);
          background-size: 24px 100%;
        }
      `}} />

      {/* Main Animation Terminal Box */}
      <div className="w-full max-w-sm flex flex-col items-center space-y-6 px-6 relative z-10">

        {/* Transit Stage */}
        <div className="relative w-full h-16 overflow-hidden flex flex-col justify-end">

          {/* 🚀 Fixed: Color changed from orange to TicketCore brand Royal Indigo Blue */}
          <div className="animate-bus absolute bottom-2 left-0 text-indigo-500">
            <svg className="h-9 w-11 filter drop-shadow-[0_0_12px_rgba(79,70,229,0.4)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {/* Bus Outer Framework */}
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1 .4-1 1v10h1M14 17H9" />
              {/* Glass Windows */}
              <path d="M6 10h4v3H6zM12 10h3v3h-3z" strokeWidth="1.5" />
              {/* Spinning Wheel Traitors */}
              <circle cx="7" cy="17" r="2" fill="#09090b" />
              <circle cx="17" cy="17" r="2" fill="#09090b" />
            </svg>
          </div>

          {/* Dash Road Overlay */}
          <div className="animate-road w-full h-[2px] opacity-40" />
        </div>

        {/* 🏔️ Text Presentation Indicator */}
        <div className="text-center space-y-1.5">
          {/* 🚀 Fixed: Rebranded text dynamically to 'TicketCore Terminal' */}
          <h3 className="text-sm font-black tracking-[0.2em] text-zinc-100 uppercase animate-pulse">
            Ticket<span className="text-indigo-400">Core</span> Terminal
          </h3>
          <p className="text-xs font-bold text-zinc-500 tracking-wide">
            Syncing global schedules and transit assets...
          </p>
        </div>

      </div>
    </div>
  );
}