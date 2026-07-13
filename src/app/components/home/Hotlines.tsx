import React from 'react';

interface HotlineItem {
     id: number;
     number: string;
     title: string;
     description: string;
     bgColor: string;
     iconColor: string; 
     icon: React.ReactNode;
}

export default function EmergencyHotlines() {
     const hotlines: HotlineItem[] = [
          {
               id: 1,
               number: "999",
               title: "National Emergency",
               description: "Ambulance, Fire Service, and Police help across the country instantly.",
               bgColor: "bg-blue-50/70 border-blue-100",
               iconColor: "bg-blue-500",
               icon: (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.72l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.72.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
               )
          },
          {
               id: 2,
               number: "333",
               title: "National Info & Services",
               description: "Access government information, social problems, and counseling services.",
               bgColor: "bg-emerald-50/70 border-emerald-100",
               iconColor: "bg-emerald-500",
               icon: (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
               )
          },
          {
               id: 3,
               number: "109",
               title: "Child & Women Helpline",
               description: "Immediate response to prevent violence against children and women.",
               bgColor: "bg-purple-50/70 border-purple-100",
               iconColor: "bg-purple-500",
               icon: (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
               )
          },
          {
               id: 4,
               number: "106",
               title: "Anti-Corruption (ACC)",
               description: "Directly report any corruption or institutional harassment to authorities.",
               bgColor: "bg-rose-50/70 border-rose-100",
               iconColor: "bg-rose-500",
               icon: (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
               )
          }
     ];

     return (
          <section className="py-16 bg-white">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Section Header */}
                    <div className="text-center mb-12">
                         <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                              Emergency Support
                         </span>
                         <h2 className="mt-3 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                              Emergency Local Hotlines
                         </h2>
                         <p className="mt-3 max-w-2xl mx-auto text-base text-gray-500">
                              For urgent or life-threatening crises, immediately contact national services directly.
                         </p>
                    </div>

                    {/* Hotlines Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                         {hotlines.map((hotline) => (
                              <div
                                   key={hotline.id}
                                   className={`relative overflow-hidden rounded-2xl border p-6 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 hover:shadow-sm ${hotline.bgColor}`}
                              >
                                   <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-white/40 pointer-events-none" />

                                   <div>
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${hotline.iconColor}`}>
                                             {hotline.icon}
                                        </div>

                                        <div className="mt-4 flex items-baseline gap-2">
                                             <span className="text-3xl font-black text-gray-900 tracking-tight">
                                                  {hotline.number}
                                             </span>
                                        </div>

                                        <h3 className="mt-2 text-md font-bold text-gray-800">
                                             {hotline.title}
                                        </h3>

                                        <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                                             {hotline.description}
                                        </p>
                                   </div>

                              </div>
                         ))}
                    </div>

               </div>
          </section>
     );
}