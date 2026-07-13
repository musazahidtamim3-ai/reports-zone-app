"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { Pencil, CloudArrowUpIn } from "@gravity-ui/icons";
import { toast } from "react-toastify";

type Report = {
     _id: string;
     title: string;
     description: string;
     category: string;
     imageUrl: string;
     district: string;
     upazila: string;
     landmark: string;
     status: "pending" | "acknowledged" | "resolved";
     createdAt?: string;
};

const statusConfig: Record<Report["status"], { label: string; bg: string; text: string; dot: string }> = {
     pending: { label: "Pending", bg: "bg-rose-100", text: "text-rose-700", dot: "bg-rose-500" },
     acknowledged: { label: "Acknowledged", bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500" },
     resolved: { label: "Resolved", bg: "bg-emerald-100", text: "text-emerald-700", dot: "bg-emerald-500" },
};

export default function ProfilePage() {
     const [isSubmitting, setIsSubmitting] = useState(false);
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [tempName, setTempName] = useState("");
     const [tempAvatar, setTempAvatar] = useState("");

     const [reports, setReports] = useState<Report[]>([]);
     const [isReportsLoading, setIsReportsLoading] = useState(true);

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

          const fetchMyReports = async () => {
               try {
                    setIsReportsLoading(true);
                    const res = await fetch(`http://localhost:5000/api/reports/${user.id}`);
                    const data = await res.json();
                    setReports(data);
               } catch (err) {
                    console.error(err);
               } finally {
                    setIsReportsLoading(false);
               }
          };

          fetchMyReports();
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

     return (
          <div className="w-full min-h-screen bg-neutral-50 px-4 sm:px-6 lg:px-10 py-8">
               <div className="max-w-4xl mx-auto space-y-6">

                    {/* Profile Card */}
                    <div className="bg-white border border-neutral-200/70 rounded-2xl overflow-hidden">
                         <div className="h-28 bg-linear-to-l from-[#fe8c00] to-[#f83600] overflow-hidden">
                              <div className="-right-6 -top-6 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
                         </div>

                         <div className="px-6 sm:px-8 pb-6">
                              <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-5 -mt-12 mb-2">
                                   <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
                                        {user.image ? (
                                             <img
                                                  src={user.image}
                                                  alt={user.name || "Profile"}
                                                  className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg object-cover"
                                             />
                                        ) : (
                                             <span className="flex items-center justify-center w-24 h-24 rounded-2xl border-4 border-white shadow-lg bg-gradient-to-br from-amber-400 to-rose-500 text-white text-2xl font-bold">
                                                  {initials}
                                             </span>
                                        )}
                                        <div className="pb-1">
                                             <h2 className="text-xl font-extrabold text-neutral-900">{user.name}</h2>
                                             <p className="text-sm text-neutral-500 mt-0.5">{user.email}</p>
                                        </div>
                                   </div>

                                   <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl bg-linear-to-l from-[#fe8c00] to-[#f83600] text-white hover:opacity-90 transition-all transform hover:-translate-y-0.5 shadow-md flex-shrink-0"
                                   >
                                        <Pencil className="w-4 h-4" />
                                        Edit Profile
                                   </button>
                              </div>
                         </div>
                    </div>

                    {/* My Reports */}
                    <div>
                         <div className="flex items-center justify-between mb-4">
                              <h3 className="text-base font-bold text-neutral-900">My Reports</h3>
                              <span className="text-xs font-semibold text-neutral-400">
                                   {reports.length} total
                              </span>
                         </div>

                         {isReportsLoading ? (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                   {[1, 2].map((i) => (
                                        <div key={i} className="h-24 rounded-2xl bg-white border border-neutral-200/70 animate-pulse" />
                                   ))}
                              </div>
                         ) : reports.length === 0 ? (
                              <div className="text-center py-12 bg-white rounded-2xl border border-neutral-200/70">
                                   <p className="text-sm text-neutral-500">You haven't reported anything yet.</p>
                              </div>
                         ) : (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                   {reports.map((report) => {
                                        const status = statusConfig[report.status];
                                        return (
                                             <div
                                                  key={report._id}
                                                  className="flex gap-4 bg-white border border-neutral-200/70 rounded-2xl p-4 hover:shadow-md transition-all"
                                             >
                                                  <img
                                                       src={report.imageUrl}
                                                       alt={report.title}
                                                       className="w-40 h-20 rounded-xl object-cover flex-shrink-0"
                                                  />
                                                  <div className="min-w-0 flex-1">
                                                       <h4 className="text-sm font-bold text-neutral-900 truncate">{report.title}</h4>
                                                       <p className="text-xs text-neutral-500 truncate mt-0.5">
                                                            {report.landmark}, {report.district}
                                                       </p>
                                                       <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2 py-0.5 rounded-full mt-2 ${status.bg} ${status.text}`}>
                                                            <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                                                            {status.label}
                                                       </span>
                                                  </div>
                                             </div>
                                        );
                                   })}
                              </div>
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