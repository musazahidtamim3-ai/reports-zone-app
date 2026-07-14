"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { Delete } from "@gravity-ui/icons";

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

const statusStyles: Record<Report["status"], string> = {
     pending: "bg-rose-100 text-rose-700",
     acknowledged: "bg-blue-100 text-blue-700",
     resolved: "bg-emerald-100 text-emerald-700",
};

export default function MyReportsPage() {
     const [reports, setReports] = useState<Report[]>([]);
     const [isLoading, setIsLoading] = useState(true);
     const [error, setError] = useState(false);

     const [reportToDelete, setReportToDelete] = useState<Report | null>(null);
     const [isDeleting, setIsDeleting] = useState(false);

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

     const handleDeleteConfirm = async () => {
          if (!reportToDelete) return;

          setIsDeleting(true);
          try {
               const res = await fetch(`http://localhost:5000/api/reports/${reportToDelete._id}`, {
                    method: "DELETE",
               });

               if (!res.ok) throw new Error("Failed to delete");

               setReports((prev) => prev.filter((r) => r._id !== reportToDelete._id));
               toast.success("Report deleted successfully");
               setReportToDelete(null);
          } catch (err) {
               console.error(err);
               toast.error("Failed to delete report. Try again.");
          } finally {
               setIsDeleting(false);
          }
     };

     return (
          <div className="w-full min-h-screen">
               <div className="max-w-7xl mx-auto">

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

                    {/* Reports Table */}
                    <div className="bg-white border border-neutral-200/70 rounded-2xl p-6">

                         {(isLoading || isSessionPending) && (
                              <div className="space-y-3">
                                   {[1, 2, 3].map((i) => (
                                        <div key={i} className="h-14 bg-neutral-100 rounded-xl animate-pulse" />
                                   ))}
                              </div>
                         )}

                         {!isLoading && !isSessionPending && error && (
                              <p className="text-center text-sm text-neutral-500 py-10">
                                   Couldn't load your reports. Please try again later.
                              </p>
                         )}

                         {!isLoading && !isSessionPending && !error && reports.length === 0 && (
                              <p className="text-center text-sm text-neutral-500 py-10">
                                   You haven't reported anything yet.
                              </p>
                         )}

                         {!isLoading && !isSessionPending && !error && reports.length > 0 && (
                              <div className="overflow-x-auto">
                                   <table className="w-full text-left">
                                        <thead>
                                             <tr className="border-b border-neutral-100">
                                                  <th className="pb-3 text-xs font-semibold text-neutral-400 uppercase tracking-wide">Report</th>
                                                  <th className="pb-3 text-xs font-semibold text-neutral-400 uppercase tracking-wide">Location</th>
                                                  <th className="pb-3 text-xs font-semibold text-neutral-400 uppercase tracking-wide">Status</th>
                                                  <th className="pb-3 text-xs font-semibold text-neutral-400 uppercase tracking-wide text-right">Action</th>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             {reports.map((report) => (
                                                  <tr
                                                       key={report._id}
                                                       className="border-b border-neutral-50 last:border-0 hover:bg-neutral-50 transition-colors"
                                                  >
                                                       <td className="py-3.5 pr-4">
                                                            <div className="flex items-center gap-3">
                                                                 <img
                                                                      src={report.imageUrl}
                                                                      alt={report.title}
                                                                      className="w-15 h-10 rounded-lg object-cover flex-shrink-0"
                                                                 />
                                                                 <div className="min-w-0">
                                                                      <p className="text-sm font-semibold text-neutral-900 truncate max-w-[220px]">
                                                                           {report.title}
                                                                      </p>
                                                                      <p className="text-xs text-neutral-400 mt-0.5">{report.category}</p>
                                                                 </div>
                                                            </div>
                                                       </td>
                                                       <td className="py-3.5 pr-4">
                                                            <p className="text-sm text-neutral-600 truncate max-w-[180px]">
                                                                 {report.landmark}, {report.district}
                                                            </p>
                                                       </td>
                                                       <td className="py-3.5 pr-4">
                                                            <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusStyles[report.status]}`}>
                                                                 {report.status}
                                                            </span>
                                                       </td>
                                                       <td className="py-3.5 text-right">
                                                            <button
                                                                 onClick={() => setReportToDelete(report)}
                                                                 className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-500 hover:text-rose-600 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition-colors"
                                                            >
                                                                 <Delete className="w-4 h-4" />
                                                                 Delete
                                                            </button>
                                                       </td>
                                                  </tr>
                                             ))}
                                        </tbody>
                                   </table>
                              </div>
                         )}
                    </div>

               </div>

               {reportToDelete && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                         <div
                              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                              onClick={() => !isDeleting && setReportToDelete(null)}
                         />

                         <div className="relative bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl p-6">
                              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 text-rose-500 mx-auto mb-4">
                                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                        <path d="M4 7h16M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3m2 0-.867 12.142A2 2 0 0 1 14.138 21H9.862a2 2 0 0 1-1.995-1.858L7 7" />
                                   </svg>
                              </div>

                              <h3 className="text-base font-bold text-neutral-900 text-center">
                                   Delete this report?
                              </h3>
                              <p className="text-sm text-neutral-500 text-center mt-2 mb-6">
                                   "<span className="font-medium text-neutral-700">{reportToDelete.title}</span>" will be permanently removed. This action can't be undone.
                              </p>

                              <div className="flex gap-3">
                                   <button
                                        onClick={() => setReportToDelete(null)}
                                        disabled={isDeleting}
                                        className="flex-1 px-4 py-2.5 text-sm font-semibold text-neutral-600 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors disabled:opacity-50"
                                   >
                                        Cancel
                                   </button>
                                   <button
                                        onClick={handleDeleteConfirm}
                                        disabled={isDeleting}
                                        className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-rose-500 rounded-xl hover:bg-rose-600 transition-colors disabled:opacity-60"
                                   >
                                        {isDeleting ? "Deleting..." : "Delete"}
                                   </button>
                              </div>
                         </div>
                    </div>
               )}
          </div>
     );
}