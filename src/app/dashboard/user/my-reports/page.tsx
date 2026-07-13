"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Report = {
     _id: string;
     title: string;
     description: string;
     category: string;
     imageUrl: string;
     division: string;
     district: string;
     upazila: string;
     landmark: string;
     status: "pending" | "acknowledged" | "resolved";
     creatorId: string;
     creatorName: string;
     creatorPhoto: string | null;
     createdAt?: string;
};

const statusConfig: Record<Report["status"], { label: string; bg: string; text: string; dot: string }> = {
     pending: { label: "Pending", bg: "bg-rose-100", text: "text-rose-700", dot: "bg-rose-500" },
     acknowledged: { label: "Acknowledged", bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500" },
     resolved: { label: "Resolved", bg: "bg-emerald-100", text: "text-emerald-700", dot: "bg-emerald-500" },
};

const categoryColors: Record<string, string> = {
     "Road & Infrastructure": "bg-amber-500",
     "Water Supply": "bg-blue-500",
     "Electricity": "bg-violet-500",
     "Other": "bg-neutral-500",
};

export default function MyReportsPage() {
     const [reports, setReports] = useState<Report[]>([]);
     const [isLoading, setIsLoading] = useState(true);
     const [error, setError] = useState(false);

     const { data: session, isPending: isSessionPending } = authClient.useSession();
     const userId = session?.user?.id;

     useEffect(() => {
          if (isSessionPending) return;

          if (!userId) {
               setIsLoading(false);
               return;
          }

          const fetchReports = async () => {
               try {
                    setIsLoading(true);
                    setError(false);
                    const res = await fetch(`http://localhost:5000/api/reports/${userId}`);
                    if (!res.ok) throw new Error("Failed to fetch");
                    const data = await res.json();
                    setReports(data);
               } catch (err) {
                    console.error(err);
                    setError(true);
               } finally {
                    setIsLoading(false);
               }
          };

          fetchReports();
     }, [userId, isSessionPending]);

     const summary = {
          total: reports.length,
          pending: reports.filter((r) => r.status === "pending").length,
          acknowledged: reports.filter((r) => r.status === "acknowledged").length,
          resolved: reports.filter((r) => r.status === "resolved").length,
     };

     return (
          <div className="w-full min-h-screen bg-neutral-50 px-4 sm:px-6 lg:px-10 py-8">
               <div className="max-w-6xl mx-auto">

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                         <div>
                              <span className="inline-block text-xs font-semibold tracking-wide text-amber-600 bg-amber-100/60 px-3 py-1 rounded-full mb-3">
                                   Your Activity
                              </span>
                              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
                                   My Reports
                              </h1>
                              <p className="text-sm text-neutral-500 mt-1.5">
                                   Track the status of every problem you've reported.
                              </p>
                         </div>

                         <Link
                              href="/dashboard/user/add-report"
                              className="inline-flex items-center gap-2 rounded-xl bg-linear-to-l from-[#fe8c00] to-[#f83600] px-5 py-3 text-sm font-bold text-white hover:opacity-90 transition-all transform hover:-translate-y-0.5 shadow-md flex-shrink-0"
                         >
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                   <path d="M12 5v14M5 12h14" />
                              </svg>
                              New Report
                         </Link>
                    </div>

                    {/* Summary strip */}
                    {!isLoading && !error && reports.length > 0 && (
                         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                              <div className="bg-white border border-neutral-200/70 rounded-2xl p-4">
                                   <p className="text-2xl font-extrabold text-neutral-900">{summary.total}</p>
                                   <p className="text-xs text-neutral-500 mt-0.5">Total Reports</p>
                              </div>
                              <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4">
                                   <p className="text-2xl font-extrabold text-rose-600">{summary.pending}</p>
                                   <p className="text-xs text-rose-600/80 mt-0.5">Pending</p>
                              </div>
                              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                                   <p className="text-2xl font-extrabold text-blue-600">{summary.acknowledged}</p>
                                   <p className="text-xs text-blue-600/80 mt-0.5">Acknowledged</p>
                              </div>
                              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
                                   <p className="text-2xl font-extrabold text-emerald-600">{summary.resolved}</p>
                                   <p className="text-xs text-emerald-600/80 mt-0.5">Resolved</p>
                              </div>
                         </div>
                    )}

                    {/* Loading skeleton */}
                    {(isLoading || isSessionPending) && (
                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                              {[1, 2, 3].map((i) => (
                                   <div key={i} className="rounded-2xl bg-white border border-neutral-200/70 overflow-hidden animate-pulse">
                                        <div className="h-40 bg-neutral-100" />
                                        <div className="p-5 space-y-3">
                                             <div className="h-4 bg-neutral-100 rounded w-3/4" />
                                             <div className="h-3 bg-neutral-100 rounded w-full" />
                                        </div>
                                   </div>
                              ))}
                         </div>
                    )}

                    {/* Error state */}
                    {!isLoading && !isSessionPending && error && (
                         <div className="text-center py-20 bg-white rounded-2xl border border-neutral-200/70">
                              <p className="text-sm text-neutral-500">Couldn't load your reports. Please try again later.</p>
                         </div>
                    )}

                    {/* Empty state */}
                    {!isLoading && !isSessionPending && !error && reports.length === 0 && (
                         <div className="flex flex-col items-center text-center py-20 bg-white rounded-2xl border border-neutral-200/70">
                              <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 mb-4">
                                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
                                        <path d="M4 19.5V6a2 2 0 0 1 2-2h9.5L20 8.5V19.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
                                        <path d="M8 10h6" />
                                        <path d="M8 14h8" />
                                   </svg>
                              </span>
                              <p className="text-sm font-semibold text-neutral-700 mb-1">No reports yet</p>
                              <p className="text-xs text-neutral-500 mb-5">You haven't reported any problems so far.</p>
                              <Link
                                   href="/reports/new"
                                   className="inline-flex items-center gap-2 rounded-xl bg-linear-to-l from-[#fe8c00] to-[#f83600] px-5 py-2.5 text-xs font-bold text-white hover:opacity-90 transition-all"
                              >
                                   Report your first issue
                              </Link>
                         </div>
                    )}

                    {/* Reports Grid */}
                    {!isLoading && !isSessionPending && !error && reports.length > 0 && (
                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                              {reports.map((report) => {
                                   const status = statusConfig[report.status];
                                   const catColor = categoryColors[report.category] ?? "bg-neutral-500";

                                   return (
                                        <div
                                             key={report._id}
                                             className="group bg-white border border-neutral-200/70 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                        >
                                             <div className="relative h-40 overflow-hidden bg-neutral-100">
                                                  <img
                                                       src={report.imageUrl}
                                                       alt={report.title}
                                                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                  />
                                                  <span className={`absolute top-3 left-3 flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${status.bg} ${status.text}`}>
                                                       <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                                                       {status.label}
                                                  </span>
                                                  <span className={`absolute top-3 right-3 text-[10px] font-bold text-white px-2.5 py-1 rounded-full ${catColor}`}>
                                                       {report.category}
                                                  </span>
                                             </div>

                                             <div className="p-5">
                                                  <h3 className="text-sm font-bold text-neutral-900 leading-snug line-clamp-2 mb-2">
                                                       {report.title}
                                                  </h3>
                                                  <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2 mb-4">
                                                       {report.description}
                                                  </p>

                                                  <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-4">
                                                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 flex-shrink-0">
                                                            <path d="M12 21s-7-6.2-7-11.2A7 7 0 0 1 19 9.8C19 14.8 12 21 12 21Z" />
                                                            <circle cx="12" cy="9.5" r="2.3" />
                                                       </svg>
                                                       <span className="truncate">
                                                            {report.landmark}, {report.upazila}, {report.district}
                                                       </span>
                                                  </div>

                                                  <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                                                       <span className="text-[11px] text-neutral-400">
                                                            {report.createdAt
                                                                 ? new Date(report.createdAt).toLocaleDateString("en-US", {
                                                                      day: "numeric",
                                                                      month: "short",
                                                                      year: "numeric",
                                                                 })
                                                                 : ""}
                                                       </span>
                                                       <button className="text-xs font-semibold text-amber-600 hover:text-amber-700">
                                                            View details →
                                                       </button>
                                                  </div>
                                             </div>
                                        </div>
                                   );
                              })}
                         </div>
                    )}

               </div>
          </div>
     );
}