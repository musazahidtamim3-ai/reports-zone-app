"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
     const router = useRouter();

     const [formData, setFormData] = useState({
          email: "",
          password: "",
     });
     const [isLoading, setIsLoading] = useState(false);
     const [isGoogleLoading, setIsGoogleLoading] = useState(false);
     const [showPassword, setShowPassword] = useState(false);

     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
     };

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();

          if (!formData.email || !formData.password) {
               toast.error("Please fill in all fields");
               return;
          }

          setIsLoading(true);

          await authClient.signIn.email({
               email: formData.email,
               password: formData.password,
               fetchOptions: {
                    onSuccess: () => {
                         toast.success("Welcome back!");
                         router.push("/dashboard/user");
                    },
                    onError: (ctx) => {
                         toast.error(ctx.error.message || "Invalid email or password");
                         setIsLoading(false);
                    },
               },
          });
     };

     const handleGoogleLogin = async () => {
          setIsGoogleLoading(true);
          try {
               await authClient.signIn.social({
                    provider: "google",
                    callbackURL: "/dashboard/user",
               });
          } catch (err) {
               toast.error("Google sign in failed. Try again.");
               setIsGoogleLoading(false);
          }
     };

     return (
          <div className="min-h-screen w-full flex bg-neutral-50">

               {/* Left: Branding Panel */}
               <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-blue-50 items-center justify-center p-14">

                    <div className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
                    <div className="pointer-events-none absolute right-0 top-1/3 h-64 w-64 rounded-full bg-rose-400/20 blur-3xl" />
                    <div className="pointer-events-none absolute left-1/4 bottom-0 h-72 w-72 rounded-full bg-amber-400/25 blur-3xl" />
                    <div className="pointer-events-none absolute right-10 bottom-10 h-56 w-56 rounded-full bg-emerald-400/15 blur-3xl" />

                    <div
                         className="pointer-events-none absolute inset-0 opacity-[0.4]"
                         style={{
                              backgroundImage:
                                   "linear-gradient(to right, #e5e5e5 1px, transparent 1px), linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)",
                              backgroundSize: "48px 48px",
                              maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
                         }}
                    />

                    <div className="relative max-w-md">

                         <div className="inline-flex items-center gap-2 bg-white/80 border border-amber-200 rounded-full px-3 py-1.5 mb-6 shadow-sm">
                              <span className="flex -space-x-1.5">
                                   <span className="h-5 w-5 rounded-full bg-blue-400 border-2 border-white" />
                                   <span className="h-5 w-5 rounded-full bg-rose-400 border-2 border-white" />
                                   <span className="h-5 w-5 rounded-full bg-emerald-400 border-2 border-white" />
                              </span>
                              <span className="text-xs font-semibold text-neutral-700">
                                   Trusted by 5,000+ citizens
                              </span>
                         </div>

                         <h1 className="text-3xl font-extrabold text-neutral-900 leading-tight mb-4">
                              Welcome back to your community.
                         </h1>
                         <p className="text-sm text-neutral-500 leading-relaxed mb-10">
                              Log in to track your reports, see what's happening around you, and keep pushing for change.
                         </p>

                         <div className="space-y-4">
                              <div className="flex items-center gap-3 bg-white/70 border border-blue-100 rounded-2xl px-4 py-3 hover:bg-white hover:shadow-sm transition-all">
                                   <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-500 text-white flex-shrink-0">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                             <circle cx="12" cy="12" r="9" />
                                             <path d="M12 7v5l3.5 2" />
                                        </svg>
                                   </span>
                                   <p className="text-sm text-neutral-700 font-medium">Check your report's latest status</p>
                              </div>
                              <div className="flex items-center gap-3 bg-white/70 border border-emerald-100 rounded-2xl px-4 py-3 hover:bg-white hover:shadow-sm transition-all">
                                   <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-500 text-white flex-shrink-0">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                             <path d="M12 21s-7-6.2-7-11.2A7 7 0 0 1 19 9.8C19 14.8 12 21 12 21Z" />
                                             <circle cx="12" cy="9.5" r="2.3" />
                                        </svg>
                                   </span>
                                   <p className="text-sm text-neutral-700 font-medium">Report new issues anytime</p>
                              </div>
                              <div className="flex items-center gap-3 bg-white/70 border border-rose-100 rounded-2xl px-4 py-3 hover:bg-white hover:shadow-sm transition-all">
                                   <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-rose-500 text-white flex-shrink-0">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                             <path d="M17 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1" />
                                             <circle cx="9" cy="7" r="3.5" />
                                             <path d="M22 20v-1a4 4 0 0 0-3-3.87" />
                                             <path d="M16.5 3.6a3.5 3.5 0 0 1 0 6.8" />
                                        </svg>
                                   </span>
                                   <p className="text-sm text-neutral-700 font-medium">See what your neighbors are reporting</p>
                              </div>
                         </div>
                    </div>
               </div>

               {/* Right: Form Panel */}
               <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-12 bg-neutral-50">
                    <div className="w-full p-8 sm:p-10">

                         <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                              Log in to your account
                         </h2>
                         <p className="text-sm text-neutral-500 mb-8">
                              Don't have an account?{" "}
                              <Link href="/auth/register" className="font-semibold text-amber-600 hover:text-amber-700">
                                   Sign up
                              </Link>
                         </p>

                         <form onSubmit={handleSubmit} className="space-y-4">
                              <div>
                                   <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                                        Email address
                                   </label>
                                   <input
                                        type="email"
                                        name="email"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-blue-400 transition-all"
                                   />
                              </div>

                              <div>
                                   <div className="flex items-center justify-between mb-1.5">
                                        <label className="block text-xs font-semibold text-neutral-600">
                                             Password
                                        </label>
                                        <Link href="/auth/forgot-password" className="text-xs font-semibold text-amber-600 hover:text-amber-700">
                                             Forgot password?
                                        </Link>
                                   </div>

                                   <div className="relative flex items-center">
                                        <input
                                             type={showPassword ? "text" : "password"}
                                             name="password"
                                             placeholder="Enter your password"
                                             value={formData.password}
                                             onChange={handleChange}
                                             className="w-full rounded-xl border border-neutral-200 bg-white pl-4 pr-12 py-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-rose-400/40 focus:border-rose-400 transition-all"
                                        />

                                        {/* Show/Hide বাটন আইকন */}
                                        <button
                                             type="button"
                                             onClick={() => setShowPassword(!showPassword)}
                                             className="absolute right-4 text-neutral-400 hover:text-neutral-600 focus:outline-none p-1"
                                             aria-label={showPassword ? "Hide password" : "Show password"}
                                        >
                                             {showPassword ? (
                                                  // Eye Slash (চোখ বন্ধ) Icon
                                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                                       <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                                       <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                                       <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                                       <line x1="2" y1="2" x2="22" y2="22" />
                                                  </svg>
                                             ) : (
                                                  // Eye (চোখ খোলা) Icon
                                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                                       <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                                       <circle cx="12" cy="12" r="3" />
                                                  </svg>
                                             )}
                                        </button>
                                   </div>
                              </div>

                              <button
                                   type="submit"
                                   disabled={isLoading}
                                   className="w-full rounded-xl bg-linear-to-l from-[#fe8c00] to-[#f83600] py-3 text-sm font-bold text-white hover:opacity-90 transition-all transform hover:-translate-y-0.5 shadow-md mt-2 disabled:opacity-60 disabled:hover:translate-y-0"
                              >
                                   {isLoading ? "Logging in..." : "Log in"}
                              </button>
                         </form>

                         <div className="flex items-center gap-3 my-6">
                              <div className="h-px flex-1 bg-neutral-200" />
                              <span className="text-xs text-neutral-400">or continue with</span>
                              <div className="h-px flex-1 bg-neutral-200" />
                         </div>

                         <button
                              type="button"
                              onClick={handleGoogleLogin}
                              disabled={isGoogleLoading}
                              className="w-full flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors disabled:opacity-60"
                         >
                              <svg viewBox="0 0 24 24" className="h-4 w-4">
                                   <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                                   <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.85A11 11 0 0 0 12 23z" />
                                   <path fill="#FBBC05" d="M5.84 14.09A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.43.34-2.09V7.06H2.18A11 11 0 0 0 1 12c0 1.77.43 3.45 1.18 4.94l3.66-2.85z" />
                                   <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.06l3.66 2.85C6.71 7.31 9.14 5.38 12 5.38z" />
                              </svg>
                              {isGoogleLoading ? "Redirecting..." : "Log in with Google"}
                         </button>
                    </div>
               </div>

          </div>
     );
}