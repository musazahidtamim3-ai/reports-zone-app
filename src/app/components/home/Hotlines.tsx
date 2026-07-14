import React from "react";

interface HotlineItem {
     id: number;
     number: string;
     title: string;
     description: string;
     color: {
          bg: string;
          border: string;
          iconBg: string;
          text: string;
     };
     icon: React.ReactNode;
}

export default function EmergencyHotlines() {
     const hotlines: HotlineItem[] = [
          {
               id: 1,
               number: "999",
               title: "National Emergency",
               description: "Ambulance, Fire Service, and Police help across the country instantly.",
               color: { bg: "bg-blue-50", border: "border-blue-100", iconBg: "bg-blue-500", text: "text-blue-600" },
               icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.72l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.72.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
               ),
          },
          {
               id: 2,
               number: "333",
               title: "National Info & Services",
               description: "Access government information, social problems, and counseling services.",
               color: { bg: "bg-emerald-50", border: "border-emerald-100", iconBg: "bg-emerald-500", text: "text-emerald-600" },
               icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
               ),
          },
          {
               id: 3,
               number: "109",
               title: "Child & Women Helpline",
               description: "Immediate response to prevent violence against children and women.",
               color: { bg: "bg-violet-50", border: "border-violet-100", iconBg: "bg-violet-500", text: "text-violet-600" },
               icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
               ),
          },
          {
               id: 4,
               number: "106",
               title: "Anti-Corruption (ACC)",
               description: "Directly report any corruption or institutional harassment to authorities.",
               color: { bg: "bg-rose-50", border: "border-rose-100", iconBg: "bg-rose-500", text: "text-rose-600" },
               icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
               ),
          },
     ];

     return (
          <section className="relative py-10 overflow-hidden">

               <div className="relative max-w-7xl mx-auto">

                    {/* Section Header */}
                    <div className="text-center mb-14">
                         <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-rose-600 bg-rose-100/60 px-3 py-1 rounded-full mb-4">
                              <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
                              Emergency Support
                         </span>
                         <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
                              Emergency Local Hotlines
                         </h2>
                         <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base text-neutral-500">
                              For urgent or life-threatening crises, immediately contact national services directly.
                         </p>
                    </div>

                    {/* Hotlines Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                         {hotlines.map((hotline) => (
                              <div
                                   key={hotline.id}
                                   className={`group relative overflow-hidden ${hotline.color.bg} border ${hotline.color.border} rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300`}
                              >
                                   {/* decorative corner blob */}
                                   <div className={`pointer-events-none absolute -right-8 -top-8 w-28 h-28 rounded-full ${hotline.color.iconBg} opacity-10 group-hover:scale-125 transition-transform duration-500`} />

                                   <div className="relative">
                                        <span className={`flex items-center justify-center w-11 h-11 rounded-xl text-white ${hotline.color.iconBg} shadow-md group-hover:rotate-6 transition-transform duration-300`}>
                                             {hotline.icon}
                                        </span>

                                        <div className="mt-5 flex items-baseline gap-2">
                                             <span className="text-3xl font-black text-neutral-900 tracking-tight">
                                                  {hotline.number}
                                             </span>
                                        </div>

                                        <h3 className="mt-2 text-sm font-bold text-neutral-900">
                                             {hotline.title}
                                        </h3>

                                        <p className="mt-2 text-xs text-neutral-500 leading-relaxed">
                                             {hotline.description}
                                        </p>
                                   </div>

                              </div>
                         ))}
               </div>

          </div>
          </section >
     );
}