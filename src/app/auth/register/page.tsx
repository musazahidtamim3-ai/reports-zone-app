"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

// এইটা একটা "type" — বলে দিচ্ছে ফর্মে ঠিক কী কী ফিল্ড থাকবে এবং প্রতিটার ডেটা টাইপ কী।
// এখান থেকে ভুল বানানে বা ভুল ফিল্ড ইউজ করলে VS Code সাথে সাথে এরর দেখাবে।
type SignUpFormValues = {
     firstName: string;
     lastName: string;
     email: string;
     password: string;
     terms: boolean;
};

export default function SignUpPage() {
     const router = useRouter();
     const [isGoogleLoading, setIsGoogleLoading] = useState(false);

     // react-hook-form থেকে সব কিছু বের করে আনছি: register (input-এর সাথে ফর্ম কানেক্ট করে),
     // handleSubmit (submit হ্যান্ডেল করে), formState.errors (ভ্যালিডেশন এরর), isSubmitting (লোডিং স্টেট)
     const {
          register,
          handleSubmit,
          formState: { errors, isSubmitting },
     } = useForm<SignUpFormValues>();

     // এই ফাংশনটা তখনই কল হবে যখন সব ভ্যালিডেশন পাস করবে
     const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
          try {
               await authClient.signUp.email({
                    email: data.email,
                    password: data.password,
                    name: `${data.firstName} ${data.lastName}`,
                    fetchOptions: {
                         onSuccess: () => {
                              toast.success("Account created successfully!");
                              router.push("/dashboard/user");
                         },
                         onError: (ctx) => {
                              toast.error(ctx.error.message || "Something went wrong. Try again.");
                         },
                    },
               });
          } catch (err) {
               toast.error("Something went wrong. Try again.");
          }
     };

     const handleGoogleSignUp = async () => {
          setIsGoogleLoading(true);
          try {
               await authClient.signIn.social({
                    provider: "google",
                    callbackURL: "/dashboard/user",
               });
          } catch (err) {
               toast.error("Google sign up failed. Try again.");
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

                         <h1 className="text-3xl font-extrabold text-neutral-900 leading-tight mb-4">
                              Join the movement to fix your neighborhood.
                         </h1>
                         <p className="text-sm text-neutral-500 leading-relaxed mb-10">
                              Report issues, track resolutions, and be part of a community that turns complaints into real change.
                         </p>

                         <div className="space-y-4">
                              <div className="flex items-center gap-3 bg-white/70 border border-blue-100 rounded-2xl px-4 py-3">
                                   <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-500 text-white flex-shrink-0">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                             <path d="M12 21s-7-6.2-7-11.2A7 7 0 0 1 19 9.8C19 14.8 12 21 12 21Z" />
                                             <circle cx="12" cy="9.5" r="2.3" />
                                        </svg>
                                   </span>
                                   <p className="text-sm text-neutral-700 font-medium">Report problems in your exact location</p>
                              </div>
                              <div className="flex items-center gap-3 bg-white/70 border border-emerald-100 rounded-2xl px-4 py-3">
                                   <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-500 text-white flex-shrink-0">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                             <circle cx="12" cy="12" r="9" />
                                             <path d="M12 7v5l3.5 2" />
                                        </svg>
                                   </span>
                                   <p className="text-sm text-neutral-700 font-medium">Track your report's status live</p>
                              </div>
                              <div className="flex items-center gap-3 bg-white/70 border border-rose-100 rounded-2xl px-4 py-3">
                                   <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-rose-500 text-white flex-shrink-0">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                             <path d="M17 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1" />
                                             <circle cx="9" cy="7" r="3.5" />
                                             <path d="M22 20v-1a4 4 0 0 0-3-3.87" />
                                             <path d="M16.5 3.6a3.5 3.5 0 0 1 0 6.8" />
                                        </svg>
                                   </span>
                                   <p className="text-sm text-neutral-700 font-medium">Join thousands making a difference</p>
                              </div>
                         </div>
                    </div>
               </div>

               {/* Right: Form Panel */}
               <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-12">
                    <div className="w-full max-w-md">

                         <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                              Create your account
                         </h2>
                         <p className="text-sm text-neutral-500 mb-8">
                              Already have an account?{" "}
                              <Link href="/auth/login" className="font-semibold text-amber-600 hover:text-amber-700">
                                   Log in
                              </Link>
                         </p>

                         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                   <div>
                                        <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                                             First name
                                        </label>
                                        <input
                                             type="text"
                                             placeholder="John"
                                             {...register("firstName", { required: "First name is required" })}
                                             className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-blue-400 transition-all"
                                        />
                                        {errors.firstName && (
                                             <p className="text-[11px] text-rose-500 mt-1">{errors.firstName.message}</p>
                                        )}
                                   </div>
                                   <div>
                                        <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                                             Last name
                                        </label>
                                        <input
                                             type="text"
                                             placeholder="Doe"
                                             {...register("lastName", { required: "Last name is required" })}
                                             className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400 transition-all"
                                        />
                                        {errors.lastName && (
                                             <p className="text-[11px] text-rose-500 mt-1">{errors.lastName.message}</p>
                                        )}
                                   </div>
                              </div>

                              <div>
                                   <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                                        Email address
                                   </label>
                                   <input
                                        type="email"
                                        placeholder="you@example.com"
                                        {...register("email", {
                                             required: "Email is required",
                                             pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
                                        })}
                                        className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-violet-400/40 focus:border-violet-400 transition-all"
                                   />
                                   {errors.email && (
                                        <p className="text-[11px] text-rose-500 mt-1">{errors.email.message}</p>
                                   )}
                              </div>

                              <div>
                                   <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                                        Password
                                   </label>
                                   <input
                                        type="password"
                                        placeholder="Create a password"
                                        {...register("password", {
                                             required: "Password is required",
                                             minLength: { value: 8, message: "Must be at least 8 characters" },
                                        })}
                                        className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-rose-400/40 focus:border-rose-400 transition-all"
                                   />
                                   {errors.password ? (
                                        <p className="text-[11px] text-rose-500 mt-1">{errors.password.message}</p>
                                   ) : (
                                        <p className="text-[11px] text-neutral-400 mt-1.5">Must be at least 8 characters</p>
                                   )}
                              </div>

                              <div className="flex items-start gap-2.5 pt-1">
                                   <input
                                        type="checkbox"
                                        id="terms"
                                        {...register("terms", { required: "You must accept the terms" })}
                                        className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-amber-500 focus:ring-amber-400/40"
                                   />
                                   <label htmlFor="terms" className="text-xs text-neutral-500 leading-relaxed">
                                        I agree to the{" "}
                                        <Link href="/terms" className="font-semibold text-neutral-700 hover:text-amber-600">
                                             Terms of Service
                                        </Link>{" "}
                                        and{" "}
                                        <Link href="/privacy" className="font-semibold text-neutral-700 hover:text-amber-600">
                                             Privacy Policy
                                        </Link>
                                   </label>
                              </div>
                              {errors.terms && (
                                   <p className="text-[11px] text-rose-500 -mt-2">{errors.terms.message}</p>
                              )}

                              <button
                                   type="submit"
                                   disabled={isSubmitting}
                                   className="w-full rounded-xl bg-linear-to-l from-[#fe8c00] to-[#f83600] py-3 text-sm font-bold text-white hover:opacity-90 transition-all transform hover:-translate-y-0.5 shadow-md mt-2 disabled:opacity-60 disabled:hover:translate-y-0"
                              >
                                   {isSubmitting ? "Creating account..." : "Create account"}
                              </button>
                         </form>

                         <div className="flex items-center gap-3 my-6">
                              <div className="h-px flex-1 bg-neutral-200" />
                              <span className="text-xs text-neutral-400">or continue with</span>
                              <div className="h-px flex-1 bg-neutral-200" />
                         </div>

                         <button
                              type="button"
                              onClick={handleGoogleSignUp}
                              disabled={isGoogleLoading}
                              className="w-full flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors disabled:opacity-60"
                         >
                              <svg viewBox="0 0 24 24" className="h-4 w-4">
                                   <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                                   <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.85A11 11 0 0 0 12 23z" />
                                   <path fill="#FBBC05" d="M5.84 14.09A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.43.34-2.09V7.06H2.18A11 11 0 0 0 1 12c0 1.77.43 3.45 1.18 4.94l3.66-2.85z" />
                                   <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.06l3.66 2.85C6.71 7.31 9.14 5.38 12 5.38z" />
                              </svg>
                              {isGoogleLoading ? "Redirecting..." : "Sign up with Google"}
                         </button>
                    </div>
               </div>

          </div>
     );
}