import React from "react";

interface StatItem {
     id: number;
     value: string;
     label: string;
     description: string;
     color: {
          bg: string;
          border: string;
          iconBg: string;
          text: string;
     };
     icon: React.ReactNode;
}

export default function PlatformImpact() {
     const stats: StatItem[] = [
          {
               id: 1,
               value: "15,420+",
               label: "Reports Filed",
               description: "Total infrastructure and community issues submitted by aware citizens.",
               color: { bg: "bg-blue-50", border: "border-blue-100", iconBg: "bg-blue-500", text: "text-blue-600" },
               icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                         <path d="M4 19.5V6a2 2 0 0 1 2-2h9.5L20 8.5V19.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
                         <path d="M8 10h6" />
                         <path d="M8 14h8" />
                    </svg>
               ),
          },
          {
               id: 2,
               value: "89%",
               label: "Resolution Rate",
               description: "Issues successfully addressed and fixed by local authorities.",
               color: { bg: "bg-emerald-50", border: "border-emerald-100", iconBg: "bg-emerald-500", text: "text-emerald-600" },
               icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                         <path d="m5 13 4 4L19 7" />
                    </svg>
               ),
          },
          {
               id: 3,
               value: "64",
               label: "Districts Active",
               description: "Our platform is actively present nationwide across all districts.",
               color: { bg: "bg-violet-50", border: "border-violet-100", iconBg: "bg-violet-500", text: "text-violet-600" },
               icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                         <path d="M12 21s-7-6.2-7-11.2A7 7 0 0 1 19 9.8C19 14.8 12 21 12 21Z" />
                         <circle cx="12" cy="9.5" r="2.3" />
                    </svg>
               ),
          },
          {
               id: 4,
               value: "45K+",
               label: "Active Citizens",
               description: "A growing community working together for better neighborhoods.",
               color: { bg: "bg-rose-50", border: "border-rose-100", iconBg: "bg-rose-500", text: "text-rose-600" },
               icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                         <path d="M17 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1" />
                         <circle cx="9" cy="7" r="3.5" />
                         <path d="M22 20v-1a4 4 0 0 0-3-3.87" />
                         <path d="M16.5 3.6a3.5 3.5 0 0 1 0 6.8" />
                    </svg>
               ),
          },
     ];

     return (
          <section className="relative py-10 overflow-hidden">

               <div className="relative max-w-7xl mx-auto px-4 lg:px-0">

                    {/* Section Header */}
                    <div className="text-center mb-14">
                         <span className="inline-block text-xs font-semibold tracking-wide text-amber-600 bg-amber-100/60 px-3 py-1 rounded-full mb-4">
                              Our Live Impact
                         </span>
                         <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
                              Platform Impact in Numbers
                         </h2>
                         <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base text-neutral-500">
                              Real-time data showcasing how citizens and authorities are transforming communities together.
                         </p>
                    </div>

                    {/* Statistics Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                         {stats.map((stat) => (
                              <div
                                   key={stat.id}
                                   className={`group relative overflow-hidden ${stat.color.bg} border ${stat.color.border} rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300`}
                              >
                                   {/* decorative corner blob */}
                                   <div className={`pointer-events-none absolute -right-8 -top-8 w-28 h-28 rounded-full ${stat.color.iconBg} opacity-10 group-hover:scale-125 transition-transform duration-500`} />

                                   {/* Icon badge */}
                                   <span className={`relative flex items-center justify-center w-11 h-11 rounded-xl text-white ${stat.color.iconBg} shadow-md mb-5 group-hover:rotate-6 transition-transform duration-300`}>
                                        {stat.icon}
                                   </span>

                                   <div className={`relative text-4xl font-black tracking-tight ${stat.color.text}`}>
                                        {stat.value}
                                   </div>

                                   <h3 className="relative mt-2 text-sm font-bold text-neutral-900">
                                        {stat.label}
                                   </h3>

                                   <p className="relative mt-2 text-xs text-neutral-500 leading-relaxed">
                                        {stat.description}
                                   </p>
                              </div>
                         ))}
                    </div>

               </div>
          </section>
     );
}