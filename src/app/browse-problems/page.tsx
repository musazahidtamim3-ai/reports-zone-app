"use client";

import Image from "next/image";
import { useState, useEffect, useMemo } from "react";

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

const categories = [
     "All Categories",
     "Road & Infrastructure",
     "Water Supply",
     "Electricity",
     "Other",
];

const statusFilters = ["All Status", "pending", "acknowledged", "resolved"] as const;

export default function BrowseProblemsPage() {
     const [reports, setReports] = useState<Report[]>([]);
     const [isLoading, setIsLoading] = useState(true);
     const [error, setError] = useState(false);

     const [search, setSearch] = useState("");
     const [categoryFilter, setCategoryFilter] = useState("All Categories");
     const [statusFilter, setStatusFilter] = useState<(typeof statusFilters)[number]>("All Status");

     useEffect(() => {
          const fetchReports = async () => {
               try {
                    setIsLoading(true);
                    const res = await fetch(`https://reports-zone-server.vercel.app/api/reports`);
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
     }, []);

     const filteredReports = useMemo(() => {
          return reports
               .filter((report) => {
                    const matchesSearch =
                         report.title.toLowerCase().includes(search.toLowerCase()) ||
                         report.landmark.toLowerCase().includes(search.toLowerCase()) ||
                         report.district.toLowerCase().includes(search.toLowerCase());

                    const matchesCategory =
                         categoryFilter === "All Categories" || report.category === categoryFilter;

                    const matchesStatus =
                         statusFilter === "All Status" || report.status === statusFilter;

                    return matchesSearch && matchesCategory && matchesStatus;
               });
     }, [reports, search, categoryFilter, statusFilter]);

     return (
          <div className="w-full min-h-screen bg-neutral-50 px-4 sm:px-6 lg:px-10 py-8">
               <div className="max-w-7xl mx-auto">

                    {/* Header */}
                    <div className="mb-8">
                         <span className="inline-block text-xs font-semibold tracking-wide text-amber-600 bg-amber-100/60 px-3 py-1 rounded-full mb-3">
                              Community Reports
                         </span>
                         <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
                              Browse Problems
                         </h1>
                         <p className="text-sm text-neutral-500 mt-1.5">
                              See what issues have been reported across your community.
                         </p>
                    </div>

                    {/* Search + Filters */}
                    <div className="bg-white border border-neutral-200/70 rounded-2xl p-4 sm:p-5 mb-8">
                         <div className="flex flex-col lg:flex-row gap-3">

                              {/* Search */}
                              <div className="relative flex-1">
                                   <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5">
                                             <circle cx="11" cy="11" r="7" />
                                             <path d="m21 21-4.3-4.3" />
                                        </svg>
                                   </span>
                                   <input
                                        type="text"
                                        placeholder="Search by title, landmark, or district..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 pl-11 pr-4 py-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 focus:bg-white transition-all"
                                   />
                              </div>

                              {/* Category filter */}
                              <select
                                   value={categoryFilter}
                                   onChange={(e) => setCategoryFilter(e.target.value)}
                                   className="rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-violet-400/40 focus:border-violet-400 focus:bg-white transition-all lg:w-56"
                              >
                                   {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                             {cat}
                                        </option>
                                   ))}
                              </select>

                              {/* Status filter */}
                              <select
                                   value={statusFilter}
                                   onChange={(e) => setStatusFilter(e.target.value as (typeof statusFilters)[number])}
                                   className="rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-blue-400 focus:bg-white transition-all lg:w-48"
                              >
                                   {statusFilters.map((s) => (
                                        <option key={s} value={s}>
                                             {s === "All Status" ? s : statusConfig[s].label}
                                        </option>
                                   ))}
                              </select>
                         </div>

                         {/* Status quick tabs */}
                         <div className="flex flex-wrap items-center gap-2 mt-4">
                              {statusFilters.map((s) => {
                                   const isActive = statusFilter === s;
                                   const config = s !== "All Status" ? statusConfig[s] : null;
                                   return (
                                        <button
                                             key={s}
                                             onClick={() => setStatusFilter(s)}
                                             className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${isActive
                                                       ? config
                                                            ? `${config.bg} ${config.text} border-transparent`
                                                            : "bg-neutral-900 text-white border-transparent"
                                                       : "bg-white text-neutral-500 border-neutral-200 hover:bg-neutral-50"
                                                  }`}
                                        >
                                             {config && <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />}
                                             {s === "All Status" ? "All" : config?.label}
                                        </button>
                                   );
                              })}
                         </div>
                    </div>

                    {/* Results count */}
                    <p className="text-xs text-neutral-500 mb-4">
                         {isLoading ? "Loading reports..." : `${filteredReports.length} report${filteredReports.length !== 1 ? "s" : ""} found`}
                    </p>

                    {/* Loading state */}
                    {isLoading && (
                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                              {[1, 2, 3, 4, 5, 6].map((i) => (
                                   <div key={i} className="rounded-2xl bg-white border border-neutral-200/70 overflow-hidden animate-pulse">
                                        <div className="h-40 bg-neutral-100" />
                                        <div className="p-5 space-y-3">
                                             <div className="h-4 bg-neutral-100 rounded w-3/4" />
                                             <div className="h-3 bg-neutral-100 rounded w-full" />
                                             <div className="h-3 bg-neutral-100 rounded w-1/2" />
                                        </div>
                                   </div>
                              ))}
                         </div>
                    )}

                    {/* Error state */}
                    {!isLoading && error && (
                         <div className="text-center py-20">
                              <p className="text-sm text-neutral-500">Couldn't load reports. Please try again later.</p>
                         </div>
                    )}

                    {/* Empty state */}
                    {!isLoading && !error && filteredReports.length === 0 && (
                         <div className="text-center py-20">
                              <p className="text-sm text-neutral-500">No reports match your search or filters.</p>
                         </div>
                    )}

                    {/* Reports Grid */}
                    {!isLoading && !error && filteredReports.length > 0 && (
                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                              {filteredReports.map((report) => {
                                   const status = statusConfig[report.status];
                                   const catColor = categoryColors[report.category] ?? "bg-neutral-500";

                                   return (
                                        <div
                                             key={report._id}
                                             className="group bg-white border border-neutral-200/70 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                        >
                                             {/* Image */}
                                             <div className="relative h-44 overflow-hidden bg-neutral-100">
                                                  <Image
                                                       src={report.imageUrl}
                                                       alt={report.title}
                                                       height={500}
                                                       width={1000}
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

                                             {/* Content */}
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
                                                       <div className="flex items-center gap-2">
                                                            {report.creatorPhoto ? (
                                                                 <Image
                                                                      src={report.creatorPhoto}
                                                                      alt={report.creatorName}
                                                                      height={500}
                                                                      width={500}
                                                                      className="h-7 w-7 rounded-full object-cover"
                                                                 />
                                                            ) : (
                                                                 <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-[#fe8c00] to-[#f83600] text-white text-[10px] font-bold">
                                                                      {report.creatorName?.[0]?.toUpperCase() ?? "U"}
                                                                 </span>
                                                            )}
                                                            <div className="flex flex-col leading-tight">
                                                                 <span className="text-xs font-medium text-neutral-600 truncate max-w-[100px]">
                                                                      {report.creatorName}

                                                                 </span>
                                                                 <span className="text-xs text-neutral-400">Id: {report.creatorId}</span>
                                                            </div>
                                                       </div>

                                                       <button className="text-xs font-semibold text-amber-600 hover:text-amber-700">
                                                            View →
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