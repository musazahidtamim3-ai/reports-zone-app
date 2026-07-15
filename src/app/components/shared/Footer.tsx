"use client";

import Link from "next/link";
import { Envelope, Handset, LocationArrow} from "@gravity-ui/icons";

export default function Footer() {

     return (
          <footer className="w-full mt-16">

               {/* Container Box with Glassmorphism */}
               <div className="w-full p-8 sm:p-12 backdrop-blur-md transition-all duration-300 bg-neutral-50/60 border border-neutral-200/50 shadow-[0_-10px_40px_rgba(0,0,0,0.01)]"
               >

                    {/* 4-Column Responsive Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 pb-8">

                         {/* Column 1: Logo & Description */}
                         <div className="space-y-3 sm:col-span-1 md:col-span-1">
                              <div className="flex items-center gap-2">
                                   <p className="text-lg text-gray-800  font-semibold">Reports <span className="text-amber-600">Zone</span></p>
                              </div>
                              <p className="text-xs font-medium text-neutral-500  leading-relaxed max-w-[220px]">
                                   An interactive civic platform empowering citizens to report local issues and track real-time resolutions.
                              </p>
                         </div>

                         {/* Column 2: Quick Links */}
                         <div className="space-y-3">
                              <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-900 ">
                                   Platform
                              </h4>
                              <ul className="space-y-2">
                                   <Link href={'/'}>Home</Link>
                                   <Link href={'/browse-problems'}>Browse Problems</Link>
                                   <Link href={'/about'}>About</Link>
                                   <Link href={'/how-it-works'}>How it works</Link>
                              </ul>
                         </div>

                         {/* Column 3: Legal & Support */}
                         <div className="space-y-3">
                              <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-900 ">
                                   Trust & Legal
                              </h4>
                              <ul className="space-y-2">
                                   {["Privacy Policy", "Terms of Service", "Safety Guidelines", "FAQ"].map((item, i) => (
                                        <li key={i}>
                                             <Link href={`/${item.toLowerCase().replace(/ /g, "-")}`} className="text-xs font-medium text-neutral-500  hover:text-purple-600 transition-colors">
                                                  {item}
                                             </Link>
                                        </li>
                                   ))}
                              </ul>
                         </div>

                         {/* Column 4: Contact & Help */}
                         <div className="space-y-3">
                              <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-900 ">
                                   Contact Us
                              </h4>
                              <ul className="space-y-2 text-xs font-medium text-neutral-500 ">
                                   <li className="flex items-center gap-2">
                                        <LocationArrow className="text-[#fe8c00]"/> Feni, Bangladesh
                                   </li>
                                   <li className="flex items-center gap-2">
                                        <Envelope className="text-[#fe8c00]" /> support@reportszone.com
                                   </li>
                                   <li className="flex items-center gap-2">
                                        <Handset className="text-[#fe8c00]" /> +880 1234-567890
                                   </li>
                              </ul>
                         </div>

                    </div>

                    {/* Dynamic Inner Subtle Divider Line */}
                    <div className="w-full h-[1px] bg-neutral-200/60  my-4" />

                    {/* Bottom Bar (Copyright & Micro Text) */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                         <p className="text-[11px] font-medium text-neutral-400  text-center sm:text-left">
                              © 2026 Reports Zone. Built for a better tomorrow.
                         </p>
                         <div className="flex items-center gap-4 text-[11px] font-medium text-neutral-400 ">
                              <span>Status: <span className="text-emerald-500 font-bold animate-pulse">● All Systems Operational</span></span>
                         </div>
                    </div>

               </div>
          </footer>
     );
}