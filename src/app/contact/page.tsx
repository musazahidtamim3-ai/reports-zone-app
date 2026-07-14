const contactInfo = [
     {
          title: "Call Us",
          detail: "+880 1234567890",
          color: {
               bg: "bg-blue-50",
               border: "border-blue-100",
               iconBg: "bg-blue-500",
          },
          icon: (
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.9.6 2.7a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2Z" />
               </svg>
          ),
     },
     {
          title: "Email Us",
          detail: "support@reportszone.com",
          color: {
               bg: "bg-emerald-50",
               border: "border-emerald-100",
               iconBg: "bg-emerald-500",
          },
          icon: (
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
               </svg>
          ),
     },
     {
          title: "Visit Us",
          detail: "Feni, Bangladesh",
          color: {
               bg: "bg-violet-50",
               border: "border-violet-100",
               iconBg: "bg-violet-500",
          },
          icon: (
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <path d="M12 21s-7-6.2-7-11.2A7 7 0 0 1 19 9.8C19 14.8 12 21 12 21Z" />
                    <circle cx="12" cy="9.5" r="2.3" />
               </svg>
          ),
     },
     {
          title: "Working Hours",
          detail: "Sat - Thu, 9AM - 6PM",
          color: {
               bg: "bg-rose-50",
               border: "border-rose-100",
               iconBg: "bg-rose-500",
          },
          icon: (
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3.5 2" />
               </svg>
          ),
     },
];

export default function ContactSection() {
     return (
          <section className="px-4 sm:px-6 lg:px-12 py-20 bg-neutral-50">
               <div className="max-w-7xl mx-auto">

                    {/* Heading */}
                    <div className="text-center max-w-2xl mx-auto mb-14">
                         <span className="inline-block text-xs font-semibold tracking-wide text-amber-600 bg-amber-100/60 px-3 py-1 rounded-full mb-4">
                              Get In Touch
                         </span>
                         <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-3">
                              Let's fix your neighborhood, together
                         </h2>
                         <p className="text-neutral-500 text-sm sm:text-base">
                              Got a question, suggestion, or a problem to report? Reach out and we'll get back to you.
                         </p>
                    </div>

                    {/* Info Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                         {contactInfo.map((item, index) => (
                              <div
                                   key={index}
                                   className={`group relative overflow-hidden ${item.color.bg} border ${item.color.border} rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300`}
                              >
                                   <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${item.color.iconBg} opacity-10 group-hover:scale-125 transition-transform duration-500`} />

                                   <div className={`relative flex items-center justify-center w-12 h-12 rounded-xl ${item.color.iconBg} text-white mb-5 shadow-md group-hover:rotate-6 transition-transform duration-300`}>
                                        {item.icon}
                                   </div>

                                   <h3 className="relative text-base font-bold text-neutral-900 mb-1">
                                        {item.title}
                                   </h3>
                                   <p className="relative text-sm text-neutral-600 leading-relaxed">
                                        {item.detail}
                                   </p>
                              </div>
                         ))}
                    </div>

                    {/* Contact Form */}
                    <div className="relative overflow-hidden bg-white border border-neutral-200/70 rounded-3xl p-8 sm:p-12 shadow-sm">

                         {/* decorative gradient blobs */}
                         <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-blue-400 opacity-10" />
                         <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-rose-400 opacity-10" />

                         <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

                              {/* Left: intro text */}
                              <div>
                                   <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                                        Send us a message
                                   </h3>
                                   <p className="text-sm text-neutral-500 leading-relaxed mb-6">
                                        Whether it's feedback about the platform or a problem you want us to know about, drop us a line below.
                                   </p>

                                   <div className="flex items-center gap-3">
                                        <span className="flex items-center justify-center w-9 h-9 rounded-full bg-emerald-500 text-white text-xs font-bold">✓</span>
                                        <p className="text-sm text-neutral-600">We usually respond within 24 hours</p>
                                   </div>
                              </div>

                              {/* Right: form fields */}
                              <div className="space-y-4">
                                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <input
                                             type="text"
                                             placeholder="Your name"
                                             className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-blue-400 transition-all"
                                        />
                                        <input
                                             type="email"
                                             placeholder="Your email"
                                             className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400 transition-all"
                                        />
                                   </div>

                                   <input
                                        type="text"
                                        placeholder="Subject"
                                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-violet-400/40 focus:border-violet-400 transition-all"
                                   />

                                   <textarea
                                        rows={4}
                                        placeholder="Your message"
                                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-rose-400/40 focus:border-rose-400 transition-all resize-none"
                                   />

                                   <button
                                        type="button"
                                        className="w-full rounded-xl bg-linear-to-l from-[#fe8c00] to-[#f83600] py-3 text-sm font-bold text-white hover:opacity-90 transition-all transform hover:-translate-y-0.5 shadow-md"
                                   >
                                        Send Message
                                   </button>
                              </div>

                         </div>
                    </div>

               </div>
          </section>
     );
}