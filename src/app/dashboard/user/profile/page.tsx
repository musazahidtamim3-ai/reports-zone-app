"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { Pencil, CloudArrowUpIn } from "@gravity-ui/icons";
import { toast } from "react-toastify";
import Image from "next/image";

type Report = {
     _id: string;
     status: "pending" | "acknowledged" | "resolved";
     createdAt?: string;
};

export default function ProfilePage() {
     const [isSubmitting, setIsSubmitting] = useState(false);
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [tempName, setTempName] = useState("");
     const [tempAvatar, setTempAvatar] = useState("");

     const [reports, setReports] = useState<Report[]>([]);
     const [isStatsLoading, setIsStatsLoading] = useState(true);

     const { data: sessionData, isPending } = authClient.useSession();
     const user = sessionData?.user;

     useEffect(() => {
          if (user) {
               setTempName(user.name || "");
               setTempAvatar(user.image || "");
          }
     }, [user]);

     useEffect(() => {
          if (!user?.id) return;

          const fetchStats = async () => {
               try {
                    setIsStatsLoading(true);
                    const res = await fetch(`http://localhost:5000/api/reports/${user.id}`);
                    const data = await res.json();
                    setReports(Array.isArray(data) ? data : []);
               } catch (err) {
                    console.error(err);
               } finally {
                    setIsStatsLoading(false);
               }
          };

          fetchStats();
     }, [user?.id]);

     const handleSaveChanges = async () => {
          if (!tempName.trim()) {
               return toast.error("Display name cannot be empty.");
          }

          setIsSubmitting(true);
          try {
               await authClient.updateUser({
                    name: tempName,
                    image: tempAvatar || undefined,
               });
               toast.success("Profile updated successfully!");
               setIsModalOpen(false);
          } catch (error) {
               console.error(error);
               toast.error("Failed to update profile. Try again.");
          } finally {
               setIsSubmitting(false);
          }
     };

     if (isPending) {
          return (
               <div className="min-h-[60vh] flex items-center justify-center">
                    <span className="text-sm text-neutral-400 animate-pulse">Loading profile...</span>
               </div>
          );
     }

     if (!user) {
          return (
               <div className="min-h-[60vh] flex items-center justify-center">
                    <span className="text-sm text-rose-500">Please log in first.</span>
               </div>
          );
     }

     const initials = user.name
          ? user.name.trim().split(/\s+/).slice(0, 2).map((n) => n[0]).join("").toUpperCase()
          : "U";

     const stats = {
          total: reports.length,
          pending: reports.filter((r) => r.status === "pending").length,
          acknowledged: reports.filter((r) => r.status === "acknowledged").length,
          resolved: reports.filter((r) => r.status === "resolved").length,
     };

     const resolutionRate = stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0;

     const memberSince = user.createdAt
          ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
          : null;

     const statCards = [
          {
               label: "Total Reports",
               value: stats.total,
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
               label: "Pending",
               value: stats.pending,
               color: { bg: "bg-rose-50", border: "border-rose-100", iconBg: "bg-rose-500", text: "text-rose-600" },
               icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                         <circle cx="12" cy="12" r="9" />
                         <path d="M12 7v5l3.5 2" />
                    </svg>
               ),
          },
          {
               label: "Acknowledged",
               value: stats.acknowledged,
               color: { bg: "bg-amber-50", border: "border-amber-100", iconBg: "bg-amber-500", text: "text-amber-600" },
               icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                         <path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.5 1.5" />
                         <path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.5-1.5" />
                    </svg>
               ),
          },
          {
               label: "Resolved",
               value: stats.resolved,
               color: { bg: "bg-emerald-50", border: "border-emerald-100", iconBg: "bg-emerald-500", text: "text-emerald-600" },
               icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                         <path d="m5 13 4 4L19 7" />
                    </svg>
               ),
          },
     ];

     return (
          <div className="w-full min-h-screen bg-neutral-50 px-4 sm:px-6 lg:px-10 py-8">
               <div className="max-w-4xl mx-auto space-y-6">

                    {/* Profile Card */}
                    <div className="bg-white border border-neutral-200/70 rounded-2xl">
                         <div className=" h-32 rounded-t-2xl overflow-hidden bg-linear-to-l from-[#fe8c00] to-[#f83600]">
                              <div className=" h-40 w-40 rounded-full bg-white/10 blur-2xl" />
                              <div className=" left-1/3 -bottom-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
                         </div>

                         <div className="px-6 sm:px-8 pb-8">
                              <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-5 -mt-14 mb-2">
                                   <div className="flex flex-col gap-5 text-center sm:text-left">
                                        {user.image ? (
                                             <Image
                                                  src={user.image}
                                                  alt={user.name || "Profile"}
                                                  width={500}
                                                  height={500}
                                                  className="w-28 h-28 rounded-2xl border-4 border-white shadow-xl object-cover flex-shrink-0"
                                             />
                                        ) : (
                                             <span className="flex items-center justify-center w-28 h-28 rounded-2xl border-4 border-white shadow-xl bg-gradient-to-br from-amber-400 to-rose-500 text-white text-3xl font-bold flex-shrink-0">
                                                  {initials}
                                             </span>
                                        )}
                                        <div className="pb-2">
                                             <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900">{user.name}</h2>
                                             <p className="text-sm text-neutral-500 mt-1">{user.email}</p>
                                             {memberSince && (
                                                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-400 mt-2">
                                                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                                                            <rect x="3" y="4" width="18" height="18" rx="2" />
                                                            <path d="M16 2v4M8 2v4M3 10h18" />
                                                       </svg>
                                                       Member since {memberSince}
                                                  </span>
                                             )}
                                        </div>
                                   </div>

                                   <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 transition-all transform hover:-translate-y-0.5 shadow-md flex-shrink-0"
                                   >
                                        <Pencil className="w-4 h-4" />
                                        Edit Profile
                                   </button>
                              </div>
                         </div>
                    </div>

                    {/* Statistics */}
                    <div>
                         <div className="flex items-center justify-between mb-4">
                              <h3 className="text-base font-bold text-neutral-900">Your Impact</h3>
                              {!isStatsLoading && stats.total > 0 && (
                                   <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                                        {resolutionRate}% resolution rate
                                   </span>
                              )}
                         </div>

                         {isStatsLoading ? (
                              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                   {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="h-28 rounded-2xl bg-white border border-neutral-200/70 animate-pulse" />
                                   ))}
                              </div>
                         ) : (
                              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                   {statCards.map((stat) => (
                                        <div
                                             key={stat.label}
                                             className={`group relative overflow-hidden ${stat.color.bg} border ${stat.color.border} rounded-2xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
                                        >
                                             <div className={`pointer-events-none absolute -right-6 -top-6 w-20 h-20 rounded-full ${stat.color.iconBg} opacity-10 group-hover:scale-125 transition-transform duration-500`} />

                                             <span className={`relative flex items-center justify-center w-10 h-10 rounded-xl text-white ${stat.color.iconBg} shadow-sm mb-4`}>
                                                  {stat.icon}
                                             </span>
                                             <p className="relative text-2xl font-extrabold text-neutral-900">{stat.value}</p>
                                             <p className={`relative text-xs font-semibold mt-1 ${stat.color.text}`}>{stat.label}</p>
                                        </div>
                                   ))}
                              </div>
                         )}

                         {!isStatsLoading && stats.total === 0 && (
                              <p className="text-xs text-neutral-400 mt-4 text-center">
                                   You haven't reported anything yet — your stats will show up here once you do.
                              </p>
                         )}
                    </div>

               </div>

               {/* Edit Profile Modal */}
               {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                         <div
                              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                              onClick={() => !isSubmitting && setIsModalOpen(false)}
                         />

                         <div className="relative bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
                              <div className="pt-6 px-6 pb-2">
                                   <h3 className="text-lg font-bold text-neutral-900">Edit Profile</h3>
                              </div>

                              <div className="py-4 px-6 space-y-4">
                                   <div>
                                        <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                                             Display Name
                                        </label>
                                        <input
                                             type="text"
                                             value={tempName}
                                             disabled={isSubmitting}
                                             onChange={(e) => setTempName(e.target.value)}
                                             className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition-all disabled:opacity-50"
                                        />
                                   </div>

                                   <div>
                                        <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                                             Profile Photo URL
                                        </label>
                                        <div className="relative">
                                             <input
                                                  type="text"
                                                  placeholder="Paste image URL"
                                                  value={tempAvatar}
                                                  disabled={isSubmitting}
                                                  onChange={(e) => setTempAvatar(e.target.value)}
                                                  className="w-full rounded-xl border border-neutral-200 pl-4 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition-all disabled:opacity-50"
                                             />
                                             <CloudArrowUpIn className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                                        </div>
                                   </div>

                                   <div>
                                        <label className="block text-xs font-semibold text-neutral-400 mb-1.5">
                                             Email (Locked)
                                        </label>
                                        <input
                                             readOnly
                                             value={user.email || ""}
                                             className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-400 cursor-not-allowed"
                                        />
                                   </div>
                              </div>

                              <div className="border-t border-neutral-100 p-6 flex justify-end gap-3">
                                   <button
                                        onClick={() => setIsModalOpen(false)}
                                        disabled={isSubmitting}
                                        className="px-4 py-2.5 text-sm font-semibold text-neutral-500 hover:bg-neutral-100 rounded-xl transition-colors disabled:opacity-50"
                                   >
                                        Cancel
                                   </button>
                                   <button
                                        onClick={handleSaveChanges}
                                        disabled={isSubmitting}
                                        className="px-5 py-2.5 text-sm font-bold bg-linear-to-l from-[#fe8c00] to-[#f83600] text-white rounded-xl shadow-md hover:opacity-90 transition-all disabled:opacity-70"
                                   >
                                        {isSubmitting ? "Saving..." : "Save Changes"}
                                   </button>
                              </div>
                         </div>
                    </div>
               )}
          </div>
     );
}