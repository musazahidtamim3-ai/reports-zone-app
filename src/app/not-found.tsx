"use client";

import Link from "next/link";
import { TriangleUp } from "@gravity-ui/icons";

export default function NotFound() {
     return (
          <div className="w-full min-h-screen bg-neutral-50 text-neutral-900 selection:bg-amber-500/30 flex items-center justify-center relative overflow-hidden">

               {/* Global Font Style (If not already included in your layout) */}
               <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600&display=swap');
        .font-stamp { font-family: 'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace; }
      `}</style>

               {/* Background Blur Effects */}
               <div className="pointer-events-none absolute left-1/3 top-1/4 h-72 w-72 rounded-full bg-blue-400/15 blur-3xl" />
               <div className="pointer-events-none absolute right-1/3 bottom-1/4 h-72 w-72 rounded-full bg-rose-400/15 blur-3xl" />
               <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />

               <div className="relative max-w-md mx-auto px-4 text-center space-y-6">

                    {/* Error Badge */}
                    <div className="relative inline-flex items-center gap-2 font-stamp text-[12px] font-semibold uppercase tracking-[0.2em] text-rose-600 border border-rose-500/30 rounded-full px-3 py-1 bg-rose-500/5">
                         <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
                         Error 404
                    </div>

                    {/* Big 404 Header */}
                    <h1 className="text-8xl sm:text-9xl font-extrabold tracking-tighter text-neutral-200 select-none drop-shadow-sm">
                         404
                    </h1>

                    {/* Message */}
                    <div className="space-y-2">
                         <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                              Lost in the Reports Zone?
                         </h2>
                         <p className="text-xs sm:text-sm text-neutral-500 font-medium leading-relaxed max-w-sm mx-auto">
                              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                         </p>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-4 flex justify-center">
                         <Link
                              href="/"
                              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-[#fe8c00] to-[#f83600] px-6 py-3 text-xs font-bold text-white hover:opacity-90 transition-all transform hover:-translate-y-0.5 shadow-md"
                         >
                              Back to Home Dashboard
                              <TriangleUp className="h-3.5 w-3.5 rotate-90" />
                         </Link>
                    </div>

               </div>
          </div>
     );
}