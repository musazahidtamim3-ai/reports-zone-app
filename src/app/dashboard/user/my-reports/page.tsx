"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import Link from "next/link";


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

                    

               </div>
          </div>
     );
}