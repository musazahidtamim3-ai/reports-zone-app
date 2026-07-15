import Link from "next/link";
import { ArrowLeft, TriangleExclamation } from "@gravity-ui/icons";

export default function NotFound() {
     return (
          <main className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-6 py-12">

               {/* Background Glows (Ambient Lighting) */}
               <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-gradient-to-tr from-amber-500/10 to-orange-500/10 rounded-full blur-[80px] pointer-events-none" />
               <div className="absolute bottom-1/4 left-1/3 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-gradient-to-br from-red-500/5 to-rose-500/5 rounded-full blur-[100px] pointer-events-none" />

               {/* Grid Pattern Background */}
               <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

               {/* Main Content Container */}
               <div className="relative z-10 max-w-md w-full text-center space-y-8">

                    {/* Glowing Icon Badge */}
                    <div className="inline-flex items-center justify-center">
                         <div className="relative flex items-center justify-center w-20 h-20 rounded-3xl bg-amber-50/50 border border-amber-100 shadow-xl shadow-amber-500/5">
                              <TriangleExclamation className="h-10 w-10 text-amber-500 animate-pulse" />
                              <div className="absolute inset-0 rounded-3xl bg-amber-400/10 blur-xl -z-10" />
                         </div>
                    </div>

                    {/* Bold Typography & Messages */}
                    <div className="space-y-3">
                         <span className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600 bg-amber-50 px-4 py-1.5 rounded-full border border-amber-100">
                              Error 404
                         </span>
                         <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight pt-3">
                              Lost in the Reports Zone?
                         </h1>
                         <p className="text-sm sm:text-base text-neutral-500 max-w-sm mx-auto leading-relaxed">
                              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                         </p>
                    </div>

                    {/* Interactive Action Button */}
                    <div className="pt-2">
                         <Link
                              href="/"
                              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-neutral-900 hover:bg-amber-600 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-neutral-900/10 hover:shadow-amber-500/20 active:scale-95 group"
                         >
                              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                              Back to Home Dashboard
                         </Link>
                    </div>

                    {/* Minimalist Footer Link */}
                    <p className="text-xs font-semibold text-neutral-400">
                         Need help? <Link href="/contact" className="text-amber-600 hover:underline">Contact Support</Link>
                    </p>

               </div>
          </main>
     );
}