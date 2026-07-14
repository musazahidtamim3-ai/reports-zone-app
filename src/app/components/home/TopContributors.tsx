"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Contributor = {
     _id: string;
     name: string;
     image: string | null;
     reportCount: number;
};

const rankStyles = [
     {
          badge: "bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-lg shadow-amber-500/30",
          ring: "border-amber-300",
          statBg: "bg-amber-50",
          statBorder: "border-amber-100",
          statText: "text-amber-600",
          statLabel: "text-amber-500",
          glow: "bg-amber-400",
          crown: true,
     },
     {
          badge: "bg-gradient-to-br from-slate-300 to-slate-500 text-white shadow-lg shadow-slate-400/30",
          ring: "border-slate-300",
          statBg: "bg-slate-50",
          statBorder: "border-slate-100",
          statText: "text-slate-600",
          statLabel: "text-slate-500",
          glow: "bg-slate-400",
          crown: false,
     },
     {
          badge: "bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg shadow-orange-500/30",
          ring: "border-orange-300",
          statBg: "bg-orange-50",
          statBorder: "border-orange-100",
          statText: "text-orange-600",
          statLabel: "text-orange-500",
          glow: "bg-orange-400",
          crown: false,
     },
     {
          badge: "bg-gradient-to-br from-neutral-300 to-neutral-400 text-white shadow-md",
          ring: "border-neutral-200",
          statBg: "bg-neutral-50",
          statBorder: "border-neutral-100",
          statText: "text-neutral-600",
          statLabel: "text-neutral-400",
          glow: "bg-neutral-300",
          crown: false,
     },
];

export default function TopContributors() {
     const [contributors, setContributors] = useState<Contributor[]>([]);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          const fetchTopContributors = async () => {
               try {
                    const res = await fetch(`http://localhost:5000/api/reports/top-contributors`);
                    if (!res.ok) throw new Error("Failed to fetch");
                    const data = await res.json();
                    setContributors(data);
               } catch (error) {
                    console.error(error);
                    toast.error("Failed to fetch contributors.");
               } finally {
                    setLoading(false);
               }
          };

          fetchTopContributors();
     }, []);

     return (
          <section className="relative py-10 overflow-hidden">
               <div className="relative max-w-7xl mx-auto px-4 lg:px-0">

                    {/* Section Header */}
                    <div className="text-center mb-14">
                         <span className="inline-block text-xs font-semibold tracking-wide text-amber-600 bg-amber-100/60 px-3 py-1 rounded-full mb-4">
                              Community Heroes
                         </span>
                         <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
                              Top Active Contributors
                         </h2>
                         <p className="text-sm text-neutral-500 mt-3 max-w-md mx-auto">
                              Citizens who've reported the most issues and helped make their neighborhood better.
                         </p>
                    </div>

                    {/* Loading skeleton */}
                    {loading && (
                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                              {[1, 2, 3, 4].map((i) => (
                                   <div key={i} className="rounded-2xl border border-neutral-100 p-6 animate-pulse">
                                        <div className="h-20 w-20 rounded-full bg-neutral-100 mx-auto" />
                                        <div className="h-4 bg-neutral-100 rounded w-2/3 mx-auto mt-4" />
                                        <div className="h-16 bg-neutral-100 rounded-xl mt-6" />
                                   </div>
                              ))}
                         </div>
                    )}

                    {!loading && contributors.length === 0 && (
                         <p className="text-center text-sm text-neutral-400">No contributors yet.</p>
                    )}

                    {!loading && contributors.length > 0 && (
                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                              {contributors.map((user, index) => {
                                   const style = rankStyles[index] ?? rankStyles[3];
                                   return (
                                        <div
                                             key={user._id || index}
                                             className="group relative bg-white border border-neutral-200/70 rounded-2xl pt-8 pb-6 px-6 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
                                        >
                                             <div className={`pointer-events-none absolute -right-8 -top-8 w-28 h-28 rounded-full ${style.glow} opacity-[0.08] group-hover:scale-125 transition-transform duration-500`} />

                                             <span
                                                  className={`absolute top-4 left-4 w-8 h-8 rounded-xl text-xs font-black flex items-center justify-center ${style.badge}`}
                                             >
                                                  {index + 1}
                                             </span>

                                             {/* Crown for #1 */}
                                             {style.crown && (
                                                  <span className="absolute top-3 right-4 text-lg" title="Top contributor">
                                                       👑
                                                  </span>
                                             )}

                                             {/* Avatar */}
                                             <div className={`relative h-20 w-20 rounded-full p-1 border-2 ${style.ring} group-hover:scale-105 transition-transform duration-300`}>
                                                  {user.image ? (
                                                       <img
                                                            src={user.image}
                                                            alt={user.name}
                                                            className="w-full h-full object-cover rounded-full"
                                                       />
                                                  ) : (
                                                       <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center text-white text-lg font-bold">
                                                            {user.name?.[0]?.toUpperCase() ?? "U"}
                                                       </div>
                                                  )}
                                             </div>

                                             <h3 className="relative mt-4 text-base font-extrabold text-neutral-900 line-clamp-1">
                                                  {user.name}
                                             </h3>

                                             <hr className="relative my-4 w-full border-neutral-100" />

                                             {/* Report count */}
                                             <div className={`relative w-full rounded-xl p-3 border ${style.statBg} ${style.statBorder}`}>
                                                  <span className={`block text-2xl font-black tracking-tight ${style.statText}`}>
                                                       {user.reportCount}
                                                  </span>
                                                  <span className={`text-[10px] uppercase font-bold tracking-widest mt-0.5 block ${style.statLabel}`}>
                                                       Reports Submitted
                                                  </span>
                                             </div>
                                        </div>
                                   );
                              })}
                         </div>
                    )}

               </div>
          </section>
     );
}