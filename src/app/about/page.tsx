"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Shield, Eye, TriangleUp } from "@gravity-ui/icons";
import Image from "next/image";

interface Developer {
     name: string;
     role: string;
     image: string;
     color: string;
}

export default function AboutPage() {
     const [mounted, setMounted] = useState(false);

     useEffect(() => {
          setMounted(true);
     }, []);

     const developers: Developer[] = [
          { name: "Jahidul Islam", role: "Lead Engineer & Project Architect", image: '/jahid.jpeg', color: "blue" },
          { name: "Nahil Ibna Jamal", role: "Project Manager", image: '/nahila.jpeg', color: "emerald" },
          { name: "Abdullah Al Kafi Shishir", role: "UI/UX Designer", image: '/shishira.jpeg', color: "violet" },
          { name: "Subrata Das", role: "Frontend Developer", image: '/subrat.jpeg', color: "amber" },
          { name: "Akib Hossein Mehedi", role: "Backend Developer", image: '/mehedi.jpeg', color: "rose" },
          {name: "Abdul Hannan", role: "Project Tester", image: '/hannan.jpeg', color: 'red'}
     ];

     const coreValues = [
          {
               tag: "REPORT",
               title: "Radical Transparency",
               description: "No hidden filters. Every reported civic hurdle or local cleanup request goes directly to the community board to ensure total public awareness.",
               icon: <Eye className="h-5 w-5" />,
               accent: "blue",
          },
          {
               tag: "VERIFY",
               title: "Verified Accountability",
               description: "Through geolocation mapping and community cross-verification bounds, we make sure each report is authenticated before reaching active zones.",
               icon: <Shield className="h-5 w-5" />,
               accent: "emerald",
          },
          {
               tag: "RESOLVE",
               title: "Data-Driven Action",
               description: "By structuring reports logically, we give local authorities and welfare groups the organized layout they need to initiate immediate resolution loops.",
               icon: <TriangleUp className="h-5 w-5" />,
               accent: "violet",
          }
     ];

     const accentMap = {
          blue: { bg: "bg-blue-50", border: "border-blue-100", iconBg: "bg-blue-500", text: "text-blue-600" },
          emerald: { bg: "bg-emerald-50", border: "border-emerald-100", iconBg: "bg-emerald-500", text: "text-emerald-600" },
          violet: { bg: "bg-violet-50", border: "border-violet-100", iconBg: "bg-violet-500", text: "text-violet-600" },
          rose: { bg: "bg-rose-50", border: "border-rose-100", iconBg: "bg-rose-500", text: "text-rose-600" },
          amber: { bg: "bg-amber-50", border: "border-amber-100", iconBg: "bg-amber-500", text: "text-amber-600" },
          red: { bg: "bg-red-50", border: "border-red-100", iconBg: "bg-red-500", text: "text-red-600" },
     };

     if (!mounted) return null;

     return (
          <div className="w-full min-h-screen bg-neutral-50 text-neutral-900 selection:bg-amber-500/30">

               <style jsx global>{`
                    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600&display=swap');
                    .font-stamp { font-family: 'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace; }
               `}</style>

               <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* 1. Hero / Purpose Statement */}
                    <section className="relative pt-20 sm:pt-28 pb-16 text-center overflow-hidden">
                         <div className="pointer-events-none absolute left-1/3 top-0 -translate-x-1/2 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
                         <div className="pointer-events-none absolute right-1/3 top-10 translate-x-1/2 h-64 w-64 rounded-full bg-rose-400/20 blur-3xl" />
                         <div className="pointer-events-none absolute left-1/2 top-24 -translate-x-1/2 h-56 w-56 rounded-full bg-amber-400/20 blur-3xl" />

                         <div className="relative inline-flex items-center gap-2 font-stamp text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-600 border border-amber-500/30 rounded-full px-3 py-1 bg-amber-500/5">
                              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                              Our Vision
                         </div>

                         <h1 className="relative text-4xl sm:text-6xl font-extrabold mt-6 text-gray-900 max-w-3xl mx-auto">
                              Bridging citizens with better living.
                         </h1>

                         <p className="relative text-sm sm:text-base text-neutral-600 font-medium max-w-xl mx-auto mt-5 leading-relaxed">
                              Reports Zone was born from a simple realization: local issues persist not because people don&apos;t care, but because their voices lack a central dashboard.
                         </p>
                    </section>

                    {/* 2. Pipeline / Core Values */}
                    <section className="py-10 sm:py-14">
                         <div className="text-center mb-10">
                              <span className="font-stamp text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                                   The Pipeline
                              </span>
                              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1.5">
                                   What happens to a report
                              </h2>
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                              {coreValues.map((value, index) => {
                                   const a = accentMap[value.accent as keyof typeof accentMap];
                                   return (
                                        <div
                                             key={index}
                                             className={`group relative overflow-hidden text-center flex flex-col items-center p-7 rounded-3xl border ${a.border} ${a.bg} transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl`}
                                        >
                                             <div className={`absolute -right-8 -top-8 w-28 h-28 rounded-full ${a.iconBg} opacity-10 group-hover:scale-125 transition-transform duration-500`} />

                                             <span className={`relative flex h-12 w-12 items-center justify-center rounded-2xl text-white ${a.iconBg} shadow-md group-hover:rotate-6 transition-transform duration-300`}>
                                                  {value.icon}
                                             </span>
                                             <span className={`relative font-stamp text-[10px] font-semibold uppercase tracking-[0.2em] ${a.text} mt-4`}>
                                                  {value.tag}
                                             </span>
                                             <h3 className="relative text-lg font-bold tracking-tight mt-1.5 mb-2">
                                                  {value.title}
                                             </h3>
                                             <p className="relative text-xs sm:text-sm text-neutral-500 font-medium leading-relaxed">
                                                  {value.description}
                                             </p>
                                        </div>
                                   );
                              })}
                         </div>
                    </section>

                    {/* 3. Meet the Creators */}
                    <section className="py-16 sm:py-20">
                         <div className="text-center mb-12">
                              <span className="font-stamp text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-600">
                                   Roster
                              </span>
                              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1.5">
                                   The minds behind the zone
                              </h2>
                              <p className="text-xs sm:text-sm text-neutral-500 font-medium max-w-md mx-auto mt-2.5">
                                   We are developers, creators, and civic-minded individuals working to build an organized community infrastructure.
                              </p>
                         </div>

                         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
                              {developers.map((member, index) => {
                                   const colorKey = (member.color || "blue") as keyof typeof accentMap;
                                   const a = accentMap[colorKey];

                                   return (
                                        <div
                                             key={member.name || index}
                                             className="group relative aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-200 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                                        >
                                             <Image
                                                  src={member.image}
                                                  alt={member.name}
                                                  fill
                                                  className="object-cover transition-all duration-700 group-hover:scale-110"
                                             />

                                             <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

                                             <span className={`absolute top-3 left-3 font-stamp text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-full text-white ${a.iconBg}`}>
                                                  {String(index + 1).padStart(2, "0")}
                                             </span>

                                             <div className={`absolute inset-0 ring-2 ring-inset ring-transparent group-hover:ring-white/40 rounded-3xl transition-all duration-500`} />

                                             <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                                                  <h4 className="text-white text-sm sm:text-base font-bold leading-tight drop-shadow-sm">
                                                       {member.name}
                                                  </h4>
                                                  <span className='font-stamp text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest mt-1 block leading-tight text-amber-400'>
                                                       {member.role}
                                                  </span>
                                             </div>
                                        </div>
                                   );
                              })}
                         </div>
                    </section>

                    {/* 4. Contact Redirection CTA */}
                    <section className="pb-24">
                         <div className="relative overflow-hidden w-full rounded-3xl p-10 sm:p-14 text-center border border-neutral-200/70 bg-white">
                              <div className="pointer-events-none absolute left-10 -top-10 h-40 w-40 rounded-full bg-blue-400/20 blur-3xl" />
                              <div className="pointer-events-none absolute right-10 -bottom-10 h-40 w-40 rounded-full bg-rose-400/20 blur-3xl" />
                              <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl" />

                              <div className="relative max-w-xl mx-auto space-y-4">
                                   <span className="font-stamp text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                                        Get In Touch
                                   </span>
                                   <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                                        Have any suggestions or partnerships in mind?
                                   </h3>
                                   <p className="text-xs sm:text-sm text-neutral-500 font-medium leading-relaxed">
                                        We&apos;re open to collaborating with local bodies, non-profits, and student volunteers. Shoot us an email and let&apos;s clean our zones together.
                                   </p>
                                   <div className="pt-2 flex justify-center">
                                        <Link
                                             href="/contact"
                                             className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-[#fe8c00] to-[#f83600] px-5 py-2.5 text-xs font-bold text-white hover:opacity-90 transition-all transform hover:-translate-y-0.5 shadow-md"
                                        >
                                             Get In Touch
                                             <TriangleUp className="h-3.5 w-3.5 rotate-90" />
                                        </Link>
                                   </div>
                              </div>
                         </div>
                    </section>

               </div>
          </div>
     );
}