"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowChevronDown, Bars, Xmark, ArrowRightFromSquare } from "@gravity-ui/icons";
import { authClient, useSession } from "@/lib/auth-client";
import Image from "next/image";


export default function Navbar() {
     const pathname = usePathname();
     const router = useRouter();

     const { data: session, isPending } = useSession();
     const user = session?.user;

     const navLinks = !user
          ? [
               { label: "Home", href: "/" },
               { label: "About", href: "/about" },
               { label: "Contact", href: "/contact" },
          ]
          : [
               { label: "Home", href: "/" },
               { label: "Browse Problems", href: "/browse-problems" },
               { label: "About", href: "/about" },
               { label: "How It Works", href: "/how-it-works" },
               { label: "Contact", href: "/contact" },
          ];

     const [isMenuOpen, setIsMenuOpen] = useState(false);
     const [isDropdownOpen, setIsDropdownOpen] = useState(false);

     const dropdownRef = useRef<HTMLDivElement>(null);

     useEffect(() => {
          const handleClickOutside = (e: MouseEvent) => {
               if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                    setIsDropdownOpen(false);
               }
          };
          document.addEventListener("mousedown", handleClickOutside);
          return () => document.removeEventListener("mousedown", handleClickOutside);
     }, []);

     const handleLogout = async () => {
          setIsDropdownOpen(false);
          setIsMenuOpen(false);
          await authClient.signOut({
               fetchOptions: {
                    onSuccess: () => {
                         router.push("/");
                         router.refresh();
                    },
               },
          });
     };
     const initials = user?.name
          ? user.name.trim().split(/\s+/).slice(0, 2).map((n) => n[0]).join("").toUpperCase()
          : "U";

     const dashboardHref = "/dashboard/user";

     return (
          <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md text-neutral-900">
               <div className="px-4 sm:px-6 lg:px-12">
                    <div className="flex h-20 items-center justify-between">

                         {/* Left: Mobile Hamburger + Brand */}
                         <div className="flex items-center gap-4">
                              <button
                                   type="button"
                                   onClick={() => setIsMenuOpen((v) => !v)}
                                   className="inline-flex items-center justify-center rounded-xl p-2 text-neutral-500 hover:bg-neutral-100 sm:hidden transition-colors"
                                   aria-expanded={isMenuOpen}
                                   aria-controls="mobile-menu"
                              >
                                   <span className="sr-only">Open main menu</span>
                                   {isMenuOpen ? <Xmark className="h-6 w-6" /> : <Bars className="h-6 w-6" />}
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

                         {/* Right: Auth */}
                         <div className="flex items-center gap-3">
                              <div className="hidden sm:flex items-center">
                                   {isPending ? (
                                        <div className="h-9 w-24 rounded-full bg-neutral-100 animate-pulse" />
                                   ) : user ? (
                                        <div className="relative" ref={dropdownRef}>
                                             <button
                                                  onClick={() => setIsDropdownOpen((v) => !v)}
                                                  className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 border border-neutral-200/70 hover:bg-neutral-100 transition-colors"
                                             >
                                                  {user.image ? (
                                                       <Image
                                                            src={user.image}
                                                                 alt={user.name || "User"}
                                                                 width={500}
                                                                 height={500}
                                                            className="h-8 w-8 rounded-full object-cover"
                                                       />
                                                  ) : (
                                                       <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#fe8c00] to-[#f83600] text-white text-[11px] font-bold">
                                                            {initials}
                                                       </span>
                                                  )}
                                                  <span className="text-xs font-semibold text-neutral-700 max-w-[100px] truncate">
                                                       {user.name || "Account"}
                                                  </span>
                                                  <ArrowChevronDown
                                                       className={`h-3.5 w-3.5 text-neutral-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""
                                                            }`}
                                                  />
                                             </button>

                                             {isDropdownOpen && (
                                                  <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-neutral-200/70 bg-white shadow-xl p-1.5 overflow-hidden">
                                                       <Link
                                                            href="/"
                                                            onClick={() => setIsDropdownOpen(false)}
                                                            className="block rounded-xl px-3 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
                                                       >
                                                            Home
                                                       </Link>
                                                       <Link
                                                            href={dashboardHref}
                                                            onClick={() => setIsDropdownOpen(false)}
                                                            className="block rounded-xl px-3 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
                                                       >
                                                            Dashboard
                                                       </Link>
                                                       <div className="my-1 border-t border-neutral-100" />
                                                       <button
                                                            onClick={handleLogout}
                                                            className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-red-500 hover:bg-red-50 transition-colors"
                                                       >
                                                            <ArrowRightFromSquare className="h-4 w-4" />
                                                            Logout
                                                       </button>
                                                  </div>
                                             )}
                                        </div>
                                   ) : (
                                        <div className="flex items-center gap-3">
                                             <Link
                                                  href="/auth/login"
                                                  className="border border-amber-600 px-4 text-sm text-amber-600 py-2 rounded-full hover:bg-amber-50 transition-colors"
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
                                   )}
                              </div>
                         </div>

                    </div>
               </div>

               {/* Mobile Menu */}
               {isMenuOpen && (
                    <div
                         id="mobile-menu"
                         className="sm:hidden border-t border-neutral-200 bg-white px-4 pt-4 pb-6 space-y-4"
                    >
                         <div className="space-y-1.5">
                              {navLinks.map((item, index) => {
                                   const isActive = item.href === pathname;
                                   return (
                                        <Link
                                             key={index}
                                             href={item.href}
                                             onClick={() => setIsMenuOpen(false)}
                                             className={`block rounded-xl px-4 py-3 text-sm font-semibold transition-all ${isActive
                                                       ? "text-amber-600 bg-amber-50 border border-amber-100"
                                                       : "text-neutral-600 hover:bg-neutral-100 border border-transparent"
                                                  }`}
                                        >
                                             {item.label}
                                        </Link>
                                   );
                              })}
                         </div>

                         <div className="border-t border-neutral-200 pt-4 space-y-2">
                              {isPending ? (
                                   <div className="h-10 w-full rounded-xl bg-neutral-100 animate-pulse" />
                              ) : user ? (
                                   <>
                                        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200">
                                             {user.image ? (
                                                  // eslint-disable-next-line @next/next/no-img-element
                                                  <img
                                                       src={user.image}
                                                       alt={user.name || "User"}
                                                       className="h-9 w-9 rounded-full object-cover"
                                                  />
                                             ) : (
                                                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-[#fe8c00] to-[#f83600] text-white text-xs font-bold">
                                                       {initials}
                                                  </span>
                                             )}
                                             <div className="min-w-0">
                                                  <p className="text-sm font-bold text-neutral-900 truncate">
                                                       {user.name || "Account"}
                                                  </p>
                                                  <p className="text-[11px] text-neutral-500 truncate">
                                                       {user.email}
                                                  </p>
                                             </div>
                                        </div>

                                        <Link
                                             href={dashboardHref}
                                             onClick={() => setIsMenuOpen(false)}
                                             className="block rounded-xl border border-neutral-200 px-4 py-3 text-sm font-bold text-neutral-800 hover:bg-neutral-50 transition-colors"
                                        >
                                             Dashboard
                                        </Link>

                                        <button
                                             onClick={handleLogout}
                                             className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-100 transition-colors"
                                        >
                                             <ArrowRightFromSquare className="h-4 w-4" />
                                             Logout
                                        </button>
                                   </>
                              ) : (
                                   <>
                                        <Link
                                             href="/auth/login"
                                             onClick={() => setIsMenuOpen(false)}
                                             className="block w-full text-center rounded-xl border border-amber-600 px-4 py-3 text-sm font-bold text-amber-600 hover:bg-amber-50 transition-colors"
                                        >
                                             Login
                                        </Link>
                                        <Link
                                             href="/auth/register"
                                             onClick={() => setIsMenuOpen(false)}
                                             className="block w-full text-center rounded-xl bg-linear-to-l from-[#fe8c00] to-[#f83600] px-4 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 shadow-md"
                                        >
                                             Sign Up
                                        </Link>
                                   </>
                              )}
                         </div>
                    </div>
               )}
          </nav>
     );
}