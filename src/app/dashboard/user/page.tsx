"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
     LineChart,
     Line,
     XAxis,
     YAxis,
     Tooltip,
     ResponsiveContainer,
     CartesianGrid,
} from "recharts";
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



const chartData = [
     { month: "Jan", reports: 3 },
     { month: "Feb", reports: 5 },
     { month: "Mar", reports: 4 },
     { month: "Apr", reports: 7 },
     { month: "May", reports: 6 },
     { month: "Jun", reports: 9 },
];



const statusStyles: Record<string, string> = {
     Resolved: "bg-emerald-100 text-emerald-700",
     "In Progress": "bg-amber-100 text-amber-700",
     Pending: "bg-rose-100 text-rose-700",
};

const quickActions = [
     {
          label: "New Report",
          href: "/reports/new",
          color: "bg-linear-to-l from-[#fe8c00] to-[#f83600] text-white",
          icon: (
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M12 5v14M5 12h14" />
               </svg>
          ),
     },
     {
          label: "All Reports",
          href: "/reports",
          color: "bg-blue-50 text-blue-600 border border-blue-100",
          icon: (
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M4 19.5V6a2 2 0 0 1 2-2h9.5L20 8.5V19.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
               </svg>
          ),
     },
     {
          label: "Browse Problems",
          href: "/browse-problems",
          color: "bg-violet-50 text-violet-600 border border-violet-100",
          icon: (
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m21 21-4.3-4.3" />
               </svg>
          ),
     },
     {
          label: "Edit Profile",
          href: "/dashboard/user/profile",
          color: "bg-emerald-50 text-emerald-600 border border-emerald-100",
          icon: (
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
               </svg>
          ),
     },
];

export default function UserDashboardHome() {
     const [reports, setReports] = useState<Report[]>([]);
     const [isLoading, setIsLoading] = useState(true);

     const { data: session, isPending } = authClient.useSession();
     const user = session?.user;
     const userId = session?.user?.id;

     useEffect(() => {     
               if (!userId) {
                    setIsLoading(false);
                    return;
               }
     
               const fetchReports = async () => {
                    try {
                         setIsLoading(true);
                         const res = await fetch(`http://localhost:5000/api/reports/${userId}`);
                         if (!res.ok) throw new Error("Failed to fetch");
                         const data = await res.json();
                         setReports(data);
                    } catch (err) {
                         console.error(err);
                    } finally {
                         setIsLoading(false);
                    }
               };
     
               fetchReports();
          }, [userId]);
     
          const summary = {
               total: reports.length,
               pending: reports.filter((r) => r.status === "pending").length,
               acknowledged: reports.filter((r) => r.status === "acknowledged").length,
               resolved: reports.filter((r) => r.status === "resolved").length,
     };
     const stats = [
          {
               label: "Total Reports",
               value: summary.total,
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
               label: "In Progress",
               value: summary.acknowledged,
               color: { bg: "bg-amber-50", border: "border-amber-100", iconBg: "bg-amber-500", text: "text-amber-600" },
               icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                         <circle cx="12" cy="12" r="9" />
                         <path d="M12 7v5l3.5 2" />
                    </svg>
               ),
          },
          {
               label: "Resolved",
               value: summary.resolved,
               color: { bg: "bg-emerald-50", border: "border-emerald-100", iconBg: "bg-emerald-500", text: "text-emerald-600" },
               icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                         <path d="m5 13 4 4L19 7" />
                    </svg>
               ),
          },
          {
               label: "Pending",
               value: summary.pending,
               color: { bg: "bg-rose-50", border: "border-rose-100", iconBg: "bg-rose-500", text: "text-rose-600" },
               icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                         <path d="M12 9v4" />
                         <path d="M12 17h.01" />
                         <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
                    </svg>
               ),
          },
     ];
     return (
          <div>
               {
                    isPending ? (
                         <div className="min-h-[60vh] flex items-center justify-center">
                              <span className="text-sm font-mono text-neutral-500 animate-pulse">Loading Profile...</span>
                         </div>
                    ) : (
                         <div className="w-full min-h-screen bg-neutral-50 px-4 sm:px-6 lg:px-10 py-8 space-y-6">

                              {/* Welcome Card */}
                              <div className="relative overflow-hidden rounded-3xl bg-linear-to-l from-[#fe8c00] to-[#f83600] p-8 sm:p-10 text-white">
                                   <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
                                   <div className="pointer-events-none absolute right-20 bottom-0 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

                                   <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                                        <div>
                                             <p className="text-sm font-medium text-white/80 mb-1">Welcome back,</p>
                                             <h1 className="text-2xl sm:text-3xl font-extrabold">{user?.name} 👋</h1>
                                             <p className="text-sm text-white/80 mt-2 max-w-md">
                                                  You've helped resolve 15 issues in your neighborhood so far. Keep it up!
                                             </p>
                                        </div>
                                        <Link
                                             href="/dashboard/user/add-report"
                                             className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-orange-600 hover:bg-white/90 transition-all transform hover:-translate-y-0.5 shadow-md flex-shrink-0"
                                        >
                                             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                                  <path d="M12 5v14M5 12h14" />
                                             </svg>
                                             Report an Issue
                                        </Link>
                                   </div>
                              </div>

                              {/* Stat Cards */}
                              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                                   {stats.map((stat) => (
                                        <div
                                             key={stat.label}
                                             className={`group relative overflow-hidden ${stat.color.bg} border ${stat.color.border} rounded-2xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
                                        >
                                             <div className={`absolute -right-6 -top-6 w-20 h-20 rounded-full ${stat.color.iconBg} opacity-10 group-hover:scale-125 transition-transform duration-500`} />

                                             <div className={`relative flex items-center justify-center w-10 h-10 rounded-xl ${stat.color.iconBg} text-white mb-4 shadow-sm`}>
                                                  {stat.icon}
                                             </div>
                                             <p className="relative text-2xl font-extrabold text-neutral-900">{stat.value}</p>
                                             <p className={`relative text-xs font-semibold ${stat.color.text} mt-1`}>{stat.label}</p>
                                        </div>
                                   ))}
                              </div>

                              {/* Chart + Quick Actions */}
                              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                                   {/* Chart */}
                                   <div className="lg:col-span-2 bg-white border border-neutral-200/70 rounded-2xl p-6">
                                        <div className="flex items-center justify-between mb-6">
                                             <div>
                                                  <h3 className="text-base font-bold text-neutral-900">Reports Over Time</h3>
                                                  <p className="text-xs text-neutral-500 mt-0.5">Your submitted reports, last 6 months</p>
                                             </div>
                                             <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                                                  +50% this month
                                             </span>
                                        </div>

                                        <div className="h-64">
                                             <ResponsiveContainer width="100%" height="100%">
                                                  <LineChart data={chartData}>
                                                       <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                                       <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#737373" }} axisLine={false} tickLine={false} />
                                                       <YAxis tick={{ fontSize: 12, fill: "#737373" }} axisLine={false} tickLine={false} />
                                                       <Tooltip
                                                            contentStyle={{ borderRadius: "12px", border: "1px solid #e5e5e5", fontSize: "12px" }}
                                                       />
                                                       <Line
                                                            type="monotone"
                                                            dataKey="reports"
                                                            stroke="#f83600"
                                                            strokeWidth={3}
                                                            dot={{ fill: "#f83600", r: 4 }}
                                                            activeDot={{ r: 6 }}
                                                       />
                                                  </LineChart>
                                             </ResponsiveContainer>
                                        </div>
                                   </div>

                                   {/* Quick Actions */}
                                   <div className="bg-white border border-neutral-200/70 rounded-2xl p-6">
                                        <h3 className="text-base font-bold text-neutral-900 mb-4">Quick Actions</h3>
                                        <div className="space-y-3">
                                             {quickActions.map((action) => (
                                                  <Link
                                                       key={action.label}
                                                       href={action.href}
                                                       className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 ${action.color}`}
                                                  >
                                                       {action.icon}
                                                       {action.label}
                                                  </Link>
                                             ))}
                                        </div>
                                   </div>
                              </div>
                         </div>)
               }
          </div>
          
     );
}