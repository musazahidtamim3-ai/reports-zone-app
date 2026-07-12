"use client";

import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { Card, Chip } from "@heroui/react";
import { Sparkles, BookOpen, Heart, CloudArrowUpIn, Pencil } from "@gravity-ui/icons";
import Image from "next/image";
import { toast } from "react-toastify";


export default function ProfilePage() {
     const [isSubmitting, setIsSubmitting] = useState(false);
     const [isModalOpen, setIsModalOpen] = useState(false);

     const { data: sessionData, isPending } = authClient.useSession();
     const user = sessionData?.user;

     const [tempName, setTempName] = useState("");
     const [tempAvatar, setTempAvatar] = useState("");

     useEffect(() => {
          if (user) {
               setTempName(user.name || "");
               setTempAvatar(user.image || "");
          }
     }, [user]);

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

               toast.success("Profile updated successfully!", {
                    style: { background: '#0c0c0e', color: '#fff', border: '1px solid #27272a' }
               });
               setIsModalOpen(false);
          } catch (error) {
               console.error("Failed updating profile data:", error);
               toast.error("Failed to update profile. Try again.");
          } finally {
               setIsSubmitting(false);
          }
     };

     if (isPending) {
          return (
               <div className="min-h-[60vh] flex items-center justify-center">
                    <span className="text-sm font-mono text-neutral-500 animate-pulse">Loading Profile...</span>
               </div>
          );
     }

     if (!user) {
          return (
               <div className="min-h-[60vh] flex items-center justify-center">
                    <span className="text-sm font-mono text-danger">Access Denied. Please log in first.</span>
               </div>
          );
     }

     return (
          <div className="space-y-2 max-w-5xl mx-auto relative z-10 p-4">

               {/* Glow Ambient Design */}
               <div className="absolute left-1/4 w-[400px] h-[400px] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />

               {/* Profile Card */}
               <Card className=" bg-white overflow-hidden backdrop-blur-md rounded-md ">
                    <div className="h-32 w-full bg-gradient-to-r from-amber-600 via-orange-700 to-amber-800 " />

                    <div className="px-6 pb-6 sm:px-8 sm:pb-8 relative">
                         <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 -mt-12 mb-6">
                              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
                                   <Image
                                        height={300}
                                        width={300}
                                        alt={user?.name || "User Banner"}
                                        src={user?.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300"}
                                        className="w-24 h-24 rounded-md sm:w-28 sm:h-28 text-large border-4 border-white shadow-xl object-cover"
                                   />
                                   <div className="space-y-1.5 pb-1">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
                                             <h2 className="text-2xl font-black text-gray-800">{user.name}</h2>
                                        </div>
                                        <p className="text-xs sm:text-sm text-neutral-700 font-light">{user.email}</p>
                                   </div>
                              </div>

                              <button
                                   onClick={() => setIsModalOpen(true)}
                                   className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl border border-neutral-800 bg-neutral-900/80 text-amber-500 transition-all active:scale-95 shadow-md"
                              >
                                   <Pencil className="w-4 h-4" />
                                   Edit Profile
                              </button>
                         </div>
                    </div>
               </Card>
               {/* Modal Popup Component */}
               {isModalOpen && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">

                         {/* Backdrop Matte Blur click out */}
                         <div className="absolute inset-0 bg-white/70 backdrop-blur-md" onClick={() => !isSubmitting && setIsModalOpen(false)} />

                         {/* Core Sheet Container */}
                         <div className="bg-white border border-neutral-200 text-gray-700 rounded-2xl w-full max-w-md overflow-hidden relative z-10 shadow-2xl animate-in fade-in zoom-in-95 duration-150">

                              {/* Header */}
                              <div className="pt-6 px-6 pb-2">
                                   <h3 className="text-xl font-bold tracking-tight text-gray-800">Edit Profile</h3>
                              </div>

                              {/* Content Body */}
                              <div className="py-4 px-6 space-y-5">

                                   {/* Name Block */}
                                   <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-neutral-400">Display Name</label>
                                        <input
                                             type="text"
                                             placeholder="Enter your name"
                                             value={tempName}
                                             disabled={isSubmitting}
                                             onChange={(e) => setTempName(e.target.value)}
                                             className="w-full bg-white border border-neutral-200 rounded-xl px-3 py-2.5 text-sm text-gray-400 placeholder-neutral-600 focus:outline-none focus:border-amber-500 transition-colors disabled:opacity-50"
                                        />
                                   </div>

                                   {/* Avatar URL Block */}
                                   <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-neutral-400">Profile Photo URL</label>
                                        <div className="relative flex items-center">
                                             <input
                                                  type="text"
                                                  placeholder="Paste image URL"
                                                  value={tempAvatar}
                                                  disabled={isSubmitting}
                                                  onChange={(e) => setTempAvatar(e.target.value)}
                                                  className="w-full bg-white border border-neutral-200 rounded-xl pl-3 pr-10 py-2.5 text-sm text-gray-400 placeholder-neutral-600 focus:outline-none focus:border-amber-500 transition-colors disabled:opacity-50"
                                             />
                                             <CloudArrowUpIn className="w-4 h-4 text-neutral-500 absolute right-3 pointer-events-none" />
                                        </div>
                                   </div>

                                   {/* Strict Locked Email Segment */}
                                   <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-neutral-500">Email Address (Locked)</label>
                                        <input
                                             type="text"
                                             readOnly
                                             value={user.email || ""}
                                             className="w-full bg-white border border-neutral-200 rounded-xl px-3 py-2.5 text-sm text-neutral-400 cursor-not-allowed select-none outline-none"
                                        />
                                   </div>

                              </div>

                              {/* Footer Action Bar */}
                              <div className="border-t border-neutral-200 p-6 flex items-center justify-end gap-3">
                                   <button
                                        onClick={() => setIsModalOpen(false)}
                                        disabled={isSubmitting}
                                        className="px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white rounded-xl hover:bg-amber-900 transition-colors cursor-pointer disabled:opacity-50"
                                   >
                                        Cancel
                                   </button>
                                   <button
                                        onClick={handleSaveChanges}
                                        disabled={isSubmitting}
                                        className="px-5 py-2 text-sm font-semibold bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl shadow-md active:scale-95 transition-all cursor-pointer disabled:opacity-70"
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