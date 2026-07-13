import React from 'react';

interface StatItem {
     id: number;
     value: string;
     label: string;
     description: string;
     bgColor: string;
     textColor: string;
}

export default function PlatformImpact() {
     const stats: StatItem[] = [
          {
               id: 1,
               value: "15,420+",
               label: "Reports Filed",
               description: "Total infrastructure and community issues submitted by aware citizens.",
               bgColor: "bg-blue-50/70",
               textColor: "text-blue-600"
          },
          {
               id: 2,
               value: "89%",
               label: "Resolution Rate",
               description: "Issues successfully addressed and fixed by local authorities.",
               bgColor: "bg-emerald-50/70",
               textColor: "text-emerald-600"
          },
          {
               id: 3,
               value: "64",
               label: "Districts Active",
               description: "Our platform is actively footprints nationwide across all districts.",
               bgColor: "bg-purple-50/70",
               textColor: "text-purple-600"
          },
          {
               id: 4,
               value: "45K+",
               label: "Active Citizens",
               description: "A growing community working together for better neighborhoods.",
               bgColor: "bg-rose-50/70",
               textColor: "text-rose-600"
          }
     ];

     return (
          <section className="py-10">
               <div className="max-w-7xl mx-auto">

                    {/* Section Header */}
                    <div className="text-center mb-12">
                         <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                              Our Live Impact
                         </span>
                         <h2 className="mt-3 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                              Platform Impact in Numbers
                         </h2>
                         <p className="mt-3 max-w-2xl mx-auto text-base text-gray-500">
                              Real-time data showcasing how citizens and authorities are transforming communities together.
                         </p>
                    </div>

                    {/* Statistics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                         {stats.map((stat) => (
                              <div
                                   key={stat.id}
                                   className={`${stat.bgColor} p-6 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md`}
                              >
                                   <div className={`text-4xl font-black tracking-tight ${stat.textColor}`}>
                                        {stat.value}
                                   </div>

                                   <h3 className="mt-2 text-md font-bold text-gray-800">
                                        {stat.label}
                                   </h3>

                                   <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                                        {stat.description}
                                   </p>
                              </div>
                         ))}
                    </div>

               </div>
          </section>
     );
}