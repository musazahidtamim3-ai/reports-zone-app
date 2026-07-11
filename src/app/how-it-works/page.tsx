import Link from "next/link";

const steps = [
     {
          number: "01",
          title: "Write the Report",
          description: "Give your report a clear title and describe the problem in detail — what's wrong, how bad it is, and since when.",
          color: {
               bg: "bg-blue-50",
               border: "border-blue-100",
               iconBg: "bg-blue-500",
               text: "text-blue-600",
               line: "bg-blue-200",
          },
          icon: (
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <path d="M4 19.5V6a2 2 0 0 1 2-2h9.5L20 8.5V19.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
                    <path d="M8 10h6" />
                    <path d="M8 14h8" />
                    <path d="M8 18h5" />
               </svg>
          ),
     },
     {
          number: "02",
          title: "Pin the Address",
          description: "Add the exact location or address of the issue so local authorities know precisely where to take action.",
          color: {
               bg: "bg-emerald-50",
               border: "border-emerald-100",
               iconBg: "bg-emerald-500",
               text: "text-emerald-600",
               line: "bg-emerald-200",
          },
          icon: (
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <path d="M12 21s-7-6.2-7-11.2A7 7 0 0 1 19 9.8C19 14.8 12 21 12 21Z" />
                    <circle cx="12" cy="9.5" r="2.3" />
               </svg>
          ),
     },
     {
          number: "03",
          title: "Add Contact Info",
          description: "Share your contact information so the responsible authority can reach out to you with updates or questions.",
          color: {
               bg: "bg-violet-50",
               border: "border-violet-100",
               iconBg: "bg-violet-500",
               text: "text-violet-600",
               line: "bg-violet-200",
          },
          icon: (
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.9.6 2.7a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2Z" />
               </svg>
          ),
     },
     {
          number: "04",
          title: "Submit & Track",
          description: "Send your report and follow its journey live — from submitted, to reviewed, to resolved.",
          color: {
               bg: "bg-rose-50",
               border: "border-rose-100",
               iconBg: "bg-rose-500",
               text: "text-rose-600",
               line: "bg-rose-200",
          },
          icon: (
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <path d="m5 13 4 4L19 7" />
               </svg>
          ),
     },
];

export default function HowItWorksPage() {
     return (
          <div className="w-full min-h-screen bg-white">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Hero */}
                    <section className="relative pt-20 sm:pt-28 pb-16 text-center overflow-hidden">
                         <div className="pointer-events-none absolute left-1/3 top-0 -translate-x-1/2 h-72 w-72 rounded-full bg-blue-400/15 blur-3xl" />
                         <div className="pointer-events-none absolute right-1/3 top-10 translate-x-1/2 h-64 w-64 rounded-full bg-rose-400/15 blur-3xl" />
                         <div className="pointer-events-none absolute left-1/2 top-24 -translate-x-1/2 h-56 w-56 rounded-full bg-amber-400/15 blur-3xl" />

                         <span className="relative inline-block text-xs font-semibold tracking-wide text-amber-600 bg-amber-100/60 px-3 py-1 rounded-full mb-4">
                              How It Works
                         </span>
                         <h1 className="relative text-4xl sm:text-5xl font-extrabold text-neutral-900 max-w-2xl mx-auto">
                              From problem to resolution, in four simple steps
                         </h1>
                         <p className="relative text-sm sm:text-base text-neutral-500 max-w-xl mx-auto mt-5 leading-relaxed">
                              Reporting a local issue takes less than two minutes. Here's exactly what happens.
                         </p>
                    </section>

                    {/* Timeline */}
                    <section className="pb-24">
                         <div className="relative">

                              {/* connecting line, desktop only */}
                              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-blue-200 via-violet-200 to-rose-200" />

                              <div className="space-y-8 lg:space-y-0">
                                   {steps.map((step, index) => {
                                        const isEven = index % 2 === 0;
                                        return (
                                             <div
                                                  key={step.number}
                                                  className="lg:grid lg:grid-cols-2 lg:gap-10 lg:py-6 relative"
                                             >
                                                  {/* card */}
                                                  <div className={isEven ? "lg:col-start-1" : "lg:col-start-2"}>
                                                       <div
                                                            className={`group relative overflow-hidden ${step.color.bg} border ${step.color.border} rounded-3xl p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
                                                       >
                                                            <div className={`absolute -right-8 -top-8 w-28 h-28 rounded-full ${step.color.iconBg} opacity-10 group-hover:scale-125 transition-transform duration-500`} />

                                                            <div className="relative flex items-center gap-4 mb-4">
                                                                 <span className={`flex items-center justify-center w-12 h-12 rounded-2xl text-white ${step.color.iconBg} shadow-md group-hover:rotate-6 transition-transform duration-300 flex-shrink-0`}>
                                                                      {step.icon}
                                                                 </span>
                                                                 <span className={`font-mono text-3xl font-extrabold ${step.color.text} opacity-40`}>
                                                                      {step.number}
                                                                 </span>
                                                            </div>

                                                            <h3 className="relative text-lg font-bold text-neutral-900 mb-2">
                                                                 {step.title}
                                                            </h3>
                                                            <p className="relative text-sm text-neutral-600 leading-relaxed">
                                                                 {step.description}
                                                            </p>
                                                       </div>
                                                  </div>

                                                  {/* timeline dot, desktop only */}
                                                  <div
                                                       className={`hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center w-5 h-5 rounded-full ${step.color.iconBg} ring-4 ring-white shadow-md z-10`}
                                                  />
                                             </div>
                                        );
                                   })}
                              </div>
                         </div>
                    </section>

                    {/* CTA */}
                    <section className="pb-24">
                         <div className="relative overflow-hidden w-full rounded-3xl p-10 sm:p-14 text-center border border-neutral-200/70 bg-neutral-50">
                              <div className="pointer-events-none absolute left-10 -top-10 h-40 w-40 rounded-full bg-blue-400/20 blur-3xl" />
                              <div className="pointer-events-none absolute right-10 -bottom-10 h-40 w-40 rounded-full bg-rose-400/20 blur-3xl" />
                              <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl" />

                              <div className="relative max-w-xl mx-auto space-y-4">
                                   <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
                                        Ready to report your first issue?
                                   </h3>
                                   <p className="text-sm text-neutral-500 leading-relaxed">
                                        It takes less than two minutes and could be the first step toward real change in your area.
                                   </p>
                                   <div className="pt-2 flex justify-center">
                                        <Link
                                             href="/auth/register"
                                             className="inline-flex items-center gap-2 rounded-xl bg-linear-to-l from-[#fe8c00] to-[#f83600] px-6 py-3 text-sm font-bold text-white hover:opacity-90 transition-all transform hover:-translate-y-0.5 shadow-md"
                                        >
                                             Get Started
                                        </Link>
                                   </div>
                              </div>
                         </div>
                    </section>

               </div>
          </div>
     );
}