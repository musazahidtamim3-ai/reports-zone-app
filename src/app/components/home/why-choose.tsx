const features = [
     {
          title: "Report Instantly",
          description: "Spot a problem in your area? Report it in under a minute with photo and location.",
          color: {
               bg: "bg-blue-50",
               border: "border-blue-100",
               iconBg: "bg-blue-500",
               accent: "text-blue-600",
          },
          icon: (
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <path d="M12 21s-7-6.2-7-11.2A7 7 0 0 1 19 9.8C19 14.8 12 21 12 21Z" />
                    <circle cx="12" cy="9.5" r="2.3" />
               </svg>
          ),
     },
     {
          title: "Track Live Status",
          description: "Follow your report from submitted to resolved with real-time status updates.",
          color: {
               bg: "bg-emerald-50",
               border: "border-emerald-100",
               iconBg: "bg-emerald-500",
               accent: "text-emerald-600",
          },
          icon: (
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3.5 2" />
               </svg>
          ),
     },
     {
          title: "Community Powered",
          description: "Upvote and comment on issues that matter to you and get your neighbors involved.",
          color: {
               bg: "bg-violet-50",
               border: "border-violet-100",
               iconBg: "bg-violet-500",
               accent: "text-violet-600",
          },
          icon: (
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <path d="M17 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1" />
                    <circle cx="9" cy="7" r="3.5" />
                    <path d="M22 20v-1a4 4 0 0 0-3-3.87" />
                    <path d="M16.5 3.6a3.5 3.5 0 0 1 0 6.8" />
               </svg>
          ),
     },
     {
          title: "Faster Resolution",
          description: "Reports go straight to the right local authority, cutting through the red tape.",
          color: {
               bg: "bg-rose-50",
               border: "border-rose-100",
               iconBg: "bg-rose-500",
               accent: "text-rose-600",
          },
          icon: (
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <path d="M13 3 4 14h7l-1 7 9-11h-7l1-7Z" />
               </svg>
          ),
     },
];

export default function WhyChooseUs() {
     return (
          <section className="px-4 lg:px-0 py-20 bg-white">
               <div className="max-w-7xl mx-auto">

                    {/* Heading */}
                    <div className="text-center max-w-2xl mx-auto mb-14">
                         <span className="inline-block text-xs font-semibold tracking-wide text-amber-600 bg-amber-100/60 px-3 py-1 rounded-full mb-4">
                              Why Reports Zone
                         </span>
                         <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-3">
                              Your voice for a better neighborhood
                         </h2>
                         <p className="text-neutral-500 text-sm sm:text-base">
                              Report local problems, track progress, and see real change happen around you.
                         </p>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                         {features.map((item, index) => (
                              <div
                                   key={index}
                                   className={`group relative overflow-hidden ${item.color.bg} border ${item.color.border} rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300`}
                              >
                                   {/* decorative blob */}
                                   <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${item.color.iconBg} opacity-10 group-hover:scale-125 transition-transform duration-500`} />

                                   <div className={`relative flex items-center justify-center w-12 h-12 rounded-xl ${item.color.iconBg} text-white mb-5 shadow-md group-hover:rotate-6 transition-transform duration-300`}>
                                        {item.icon}
                                   </div>

                                   <h3 className="relative text-base font-bold text-neutral-900 mb-2">
                                        {item.title}
                                   </h3>
                                   <p className="relative text-sm text-neutral-600 leading-relaxed">
                                        {item.description}
                                   </p>
                              </div>
                         ))}
                    </div>

               </div>
          </section>
     );
}