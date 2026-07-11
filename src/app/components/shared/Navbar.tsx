"use client"
import Link from "next/link";
import { Bars} from "@gravity-ui/icons";
import { usePathname } from "next/navigation";

const navLinks = [
     { label: "Home", href: "/" },
     { label: "Browse Problems", href: "/browse-problems" },
     { label: "About", href: "/about" },
     { label: "How It Works", href: "/how-it-works" },
     { label: "Contact", href: "/contact" },
];

export default function Navbar() {
     const pathname = usePathname();
     return (
          <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md text-neutral-900">
               <div className="px-4 sm:px-6 lg:px-12">
                    <div className="flex h-20 items-center justify-between">

                         {/* Left: Mobile Hamburger + Brand */}
                         <div className="flex items-center gap-4">
                              <button
                                   type="button"
                                   className="inline-flex items-center justify-center rounded-xl p-2 text-neutral-500 hover:bg-neutral-100 sm:hidden transition-colors"
                              >
                                   <Bars className="h-6 w-6" />
                              </button>

                              <div className="flex items-center gap-2">
                                   <p className="text-lg text-gray-800 font-bold">
                                        Reports <span className="text-amber-600">Zone</span>
                                   </p>
                              </div>
                         </div>

                         {/* Center: Desktop Nav Links */}
                         <div className="hidden sm:flex sm:items-center sm:gap-1 bg-neutral-100/80 p-1.5 rounded-full border border-neutral-200/50">
                              {navLinks.map((item, index) => {
                                   const isActive = item.href === pathname;
                                   return (
                                        <Link
                                             key={index}
                                             href={item.href}
                                             className={`text-xs font-semibold px-4 py-2 rounded-full transition-all duration-300 ${isActive
                                                       ? "bg-white text-amber-600 shadow-sm"
                                                       : "text-neutral-600 hover:text-neutral-900"
                                                  }`}
                                        >
                                             {item.label}
                                        </Link>
                                   );
                              })}
                         </div>

                         {/* Right: Theme Icon + Auth */}
                         <div className="flex items-center gap-3">
                              

                              <div className="hidden sm:flex items-center">
                                   {/* Logged-out state */}
                                   <div className="flex items-center gap-3">
                                        <Link className='border border-amber-600 px-4  text-sm text-amber-600 py-2 rounded-full' 
                                             href="/auth/login"
                                        >
                                             Login
                                        </Link>
                                        <Link
                                             href="/auth/register"
                                             className="rounded-full bg-linear-to-l from-[#fe8c00] to-[#f83600] font-semibold px-4 py-2 text-sm text-white hover:opacity-90 transition-all transform hover:-translate-y-0.5"
                                        >
                                             Sign Up
                                        </Link>
                                   </div>

                                   {/* Logged-in state (dropdown), swap in for the block above when needed */}
                                   {/*
                                   <div className="relative">
                                        <button className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 border border-neutral-200/70 hover:bg-neutral-100 transition-colors">
                                             <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#fe8c00] to-[#f83600] text-white text-[11px] font-bold">
                                                  JS
                                             </span>
                                             <span className="text-xs font-semibold text-neutral-700 max-w-[100px] truncate">
                                                  John Smith
                                             </span>
                                             <ArrowChevronDown className="h-3.5 w-3.5 text-neutral-400" />
                                        </button>
                                   </div>
                                   */}
                              </div>
                         </div>

                    </div>
               </div>
          </nav>
     );
}