"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

type ReportFormValues = {
     title: string;
     description: string;
     category: string;
     imageUrl: string;
     division: string;
     district: string;
     upazila: string;
     landmark: string;
};

const categories = [
     "Road & Infrastructure",
     "Water Supply",
     "Electricity",
     "Other",
];

export default function AddReportPage() {
     const { data: session } = authClient.useSession();
     const user = session?.user;
     const [imagePreviewError, setImagePreviewError] = useState(false);

     const {
          register,
          handleSubmit,
          watch,
          formState: { errors, isSubmitting },
     } = useForm<ReportFormValues>();

     const imageUrl = watch("imageUrl");
     const router = useRouter();

     const onSubmit: SubmitHandler<ReportFormValues> = async (data) => {
          try {
               const payload = {
                    ...data,
                    status: "pending",
                    creatorId: user?.id,
                    creatorName: user?.name,
                    creatorPhoto: user?.image,
               };
               const res = await fetch("http://localhost:5000/api/reports", {
                    method: "POST",
                    headers: {
                         "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
               });
               if (res.ok) {
                    toast.success("Report submitted successfully!");
                    router.push("/dashboard/user");
               } else {
                    toast.error("Something went wrong. Try again.");
               }
          } catch (err) {
               toast.error("Something went wrong. Try again.");
          }
     };

     return (
          <div className="w-full min-h-screen bg-gradient-to-br from-amber-50/40 via-neutral-50 to-blue-50/40 px-4 sm:px-6 lg:px-10 py-8">
               <div className="max-w-3xl mx-auto">


                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                         {/* Report Details Card */}
                         <div className="group relative overflow-hidden bg-white border border-blue-100 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
                              <div className="pointer-events-none absolute -right-10 -top-10 w-32 h-32 rounded-full bg-blue-400 opacity-[0.07]" />

                              <div className="relative flex items-center gap-2.5 mb-6">
                                   <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-500 text-white flex-shrink-0 shadow-md shadow-blue-500/20">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5">
                                             <path d="M4 19.5V6a2 2 0 0 1 2-2h9.5L20 8.5V19.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
                                             <path d="M8 10h6" />
                                             <path d="M8 14h8" />
                                        </svg>
                                   </span>
                                   <div>
                                        <h2 className="text-base font-bold text-neutral-900">Report Details</h2>
                                        <p className="text-xs text-neutral-400">What's the problem?</p>
                                   </div>
                              </div>

                              <div className="relative space-y-4">
                                   <div>
                                        <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                                             Report Title
                                        </label>
                                        <input
                                             type="text"
                                             placeholder="e.g. Broken streetlight on Main Road"
                                             {...register("title", { required: "Title is required" })}
                                             className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-blue-400 focus:bg-white transition-all"
                                        />
                                        {errors.title && (
                                             <p className="text-[11px] text-rose-500 mt-1">{errors.title.message}</p>
                                        )}
                                   </div>

                                   <div>
                                        <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                                             Description
                                        </label>
                                        <textarea
                                             rows={4}
                                             placeholder="Describe the problem in detail — what's wrong, how bad it is, since when..."
                                             {...register("description", { required: "Description is required" })}
                                             className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-blue-400 focus:bg-white transition-all resize-none"
                                        />
                                        {errors.description && (
                                             <p className="text-[11px] text-rose-500 mt-1">{errors.description.message}</p>
                                        )}
                                   </div>

                                   <div>
                                        <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                                             Category
                                        </label>
                                        <select
                                             {...register("category", { required: "Please select a category" })}
                                             defaultValue=""
                                             className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-blue-400 focus:bg-white transition-all"
                                        >
                                             <option value="" disabled>
                                                  Select a category
                                             </option>
                                             {categories.map((cat) => (
                                                  <option key={cat} value={cat}>
                                                       {cat}
                                                  </option>
                                             ))}
                                        </select>
                                        {errors.category && (
                                             <p className="text-[11px] text-rose-500 mt-1">{errors.category.message}</p>
                                        )}
                                   </div>
                              </div>
                         </div>

                         {/* Image URL Card */}
                         <div className="group relative overflow-hidden bg-white border border-violet-100 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
                              <div className="pointer-events-none absolute -right-10 -top-10 w-32 h-32 rounded-full bg-violet-400 opacity-[0.07]" />

                              <div className="relative flex items-center gap-2.5 mb-6">
                                   <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-violet-500 text-white flex-shrink-0 shadow-md shadow-violet-500/20">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5">
                                             <rect x="3" y="3" width="18" height="18" rx="2" />
                                             <circle cx="9" cy="9" r="1.5" />
                                             <path d="m21 15-5-5L5 21" />
                                        </svg>
                                   </span>
                                   <div>
                                        <h2 className="text-base font-bold text-neutral-900">Photo Evidence</h2>
                                        <p className="text-xs text-neutral-400">Paste an image link (optional)</p>
                                   </div>
                              </div>

                              <div className="relative">
                                   <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                                        Image URL
                                   </label>
                                   <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                                             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                                  <path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.5 1.5" />
                                                  <path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.5-1.5" />
                                             </svg>
                                        </span>
                                        <input
                                             type="url"
                                             placeholder="https://example.com/photo.jpg"
                                             {...register("imageUrl", {
                                                  pattern: {
                                                       value: /^https?:\/\/.+/,
                                                       message: "Enter a valid URL starting with http:// or https://",
                                                  },
                                             })}
                                             onError={() => setImagePreviewError(true)}
                                             className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 pl-11 pr-4 py-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-violet-400/40 focus:border-violet-400 focus:bg-white transition-all"
                                        />
                                   </div>
                                   {errors.imageUrl && (
                                        <p className="text-[11px] text-rose-500 mt-1">{errors.imageUrl.message}</p>
                                   )}

                                   {/* Live preview */}
                                   {imageUrl && !errors.imageUrl && (
                                        <div className="mt-4 relative rounded-xl overflow-hidden border border-violet-100 bg-violet-50/30">
                                             {!imagePreviewError ? (
                                                  <img
                                                       src={imageUrl}
                                                       alt="Preview"
                                                       onError={() => setImagePreviewError(true)}
                                                       onLoad={() => setImagePreviewError(false)}
                                                       className="w-full h-52 object-cover"
                                                  />
                                             ) : (
                                                  <div className="w-full h-32 flex items-center justify-center text-xs text-neutral-400">
                                                       Couldn't load image from this link
                                                  </div>
                                             )}
                                        </div>
                                   )}
                              </div>
                         </div>

                         {/* Address Card */}
                         <div className="group relative overflow-hidden bg-white border border-emerald-100 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
                              <div className="pointer-events-none absolute -right-10 -top-10 w-32 h-32 rounded-full bg-emerald-400 opacity-[0.07]" />

                              <div className="relative flex items-center gap-2.5 mb-6">
                                   <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-500 text-white flex-shrink-0 shadow-md shadow-emerald-500/20">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5">
                                             <path d="M12 21s-7-6.2-7-11.2A7 7 0 0 1 19 9.8C19 14.8 12 21 12 21Z" />
                                             <circle cx="12" cy="9.5" r="2.3" />
                                        </svg>
                                   </span>
                                   <div>
                                        <h2 className="text-base font-bold text-neutral-900">Location</h2>
                                        <p className="text-xs text-neutral-400">Where is this happening?</p>
                                   </div>
                              </div>

                              <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4">
                                   <div>
                                        <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                                             Division
                                        </label>
                                        <input
                                             type="text"
                                             placeholder="e.g. Chattogram"
                                             {...register("division", { required: "Division is required" })}
                                             className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400 focus:bg-white transition-all"
                                        />
                                        {errors.division && (
                                             <p className="text-[11px] text-rose-500 mt-1">{errors.division.message}</p>
                                        )}
                                   </div>

                                   <div>
                                        <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                                             District
                                        </label>
                                        <input
                                             type="text"
                                             placeholder="e.g. Chattogram"
                                             {...register("district", { required: "District is required" })}
                                             className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400 focus:bg-white transition-all"
                                        />
                                        {errors.district && (
                                             <p className="text-[11px] text-rose-500 mt-1">{errors.district.message}</p>
                                        )}
                                   </div>

                                   <div>
                                        <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                                             Upazila
                                        </label>
                                        <input
                                             type="text"
                                             placeholder="e.g. Panchlaish"
                                             {...register("upazila", { required: "Upazila is required" })}
                                             className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400 focus:bg-white transition-all"
                                        />
                                        {errors.upazila && (
                                             <p className="text-[11px] text-rose-500 mt-1">{errors.upazila.message}</p>
                                        )}
                                   </div>

                                   <div>
                                        <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                                             Landmark
                                        </label>
                                        <input
                                             type="text"
                                             placeholder="e.g. Near GEC Circle"
                                             {...register("landmark", { required: "Landmark is required" })}
                                             className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400 focus:bg-white transition-all"
                                        />
                                        {errors.landmark && (
                                             <p className="text-[11px] text-rose-500 mt-1">{errors.landmark.message}</p>
                                        )}
                                   </div>
                              </div>
                         </div>

                         {/* Submit */}
                         <div className="flex justify-end gap-3">
                              <button
                                   type="button"
                                   className="px-6 py-3 rounded-xl text-sm font-semibold text-neutral-600 border border-neutral-200 bg-white hover:bg-neutral-100 transition-colors"
                              >
                                   Cancel
                              </button>
                              <button
                                   type="submit"
                                   disabled={isSubmitting}
                                   className="px-6 py-3 rounded-xl bg-linear-to-l from-[#fe8c00] to-[#f83600] text-sm font-bold text-white hover:opacity-90 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-orange-500/25 disabled:opacity-60 disabled:hover:translate-y-0"
                              >
                                   {isSubmitting ? "Submitting..." : "Submit Report"}
                              </button>
                         </div>

                    </form>
               </div>
          </div>
     );
}