"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

export default function BannerSlider() {
     const [mounted, setMounted] = useState(false);

     useEffect(() => {
          setMounted(true);
     }, []);

     // Structural Local Reports Schema (Images space left empty for you to fill)
     const slidesData = [
          {
               tag: "Live Incident",
               title: "Empower Your Community Through Transparency",
               description: "Report local issues like road damage, utility disruptions, or safety concerns instantly. Let the authorities and your neighbors know in real-time.",
               bgImage: "/street.jpg",
               fallbackGradient: "from-amber-500/10 via-rose-500/5 to-transparent",
               ctaText: "File A Report",
               ctaLink: "/report-issue",
          },
          {
               tag: "Community Resolution",
               title: "Track Resolutions & Verified Local Updates",
               description: "Don't just complain, see the change. Follow up on submitted reports, check authority responses, and see what issues have been successfully resolved in your area.",
               bgImage: "/report.jpg",
               fallbackGradient: "from-purple-500/10 via-indigo-500/5 to-transparent",
               ctaText: "View Resolved Cases",
               ctaLink: "/browse?status=resolved",
          },
          {
               tag: "Civic Awareness",
               title: "Your Voice Matters in Shaping Tomorrow",
               description: "Join thousands of local citizens making Bangladesh better. Post verified reports, upvote critical data, and ensure civic accountability together.",
               bgImage: "/speak.jpg", 
               fallbackGradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
               ctaText: "Join the Zone",
               ctaLink: "/auth/register",
          }
     ];

     if (!mounted) return <div className="h-[60vh] rounded-3xl bg-neutral-100 animate-pulse mt-6" />;

     return (
          // Floating Outer Container: Screen boundaries framework control
          <section className="mx-auto px-4 sm:px-6 lg:px-12 mt-6 sm:mt-10 mb-10">

               {/* Floating Capsule Main Wrapper Card */}
               <div className="w-full h-[65vh] sm:h-[75vh] min-h-[480px] rounded-3xl overflow-hidden bg-neutral-50  border border-neutral-200/60  shadow-[0_20px_50px_rgba(0,0,0,0.05)]  relative">

                    <Swiper
                         modules={[Autoplay, EffectFade, Pagination]}
                         effect={"fade"}
                         autoplay={{
                              delay: 5000,
                              disableOnInteraction: false,
                         }}
                         pagination={{
                              clickable: true,
                              dynamicBullets: true,
                         }}
                         className="w-full h-full mySwiper"
                    >
                         {slidesData.map((slide, index) => (
                              <SwiperSlide key={index} className="relative w-full h-full flex items-center">

                                   {/* Dynamic Image Overlay Logic */}
                                   {slide.bgImage ? (
                                        <>
                                             <div
                                                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[5000ms] scale-105"
                                                  style={{ backgroundImage: `url(${slide.bgImage})` }}
                                             />
                                             <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/20 " />
                                        </>
                                   ) : (
                                        /* Fallback clean modern tech-mesh grid background (Jokhno image thakbena) */
                                        <div className={`absolute inset-0 bg-gradient-to-tr ${slide.fallbackGradient} bg-white  transition-colors duration-300`} />
                                   )}

                                   {/* Standard subtle linear grid structure back-mesh */}
                                   <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />

                                   {/* Responsive Content Core */}
                                   <div className="relative w-full h-full flex flex-col justify-center px-6 sm:px-12 lg:px-16 z-10">
                                        <div className="max-w-xl lg:max-w-2xl space-y-5 text-neutral-900 ">

                                             {/* Premium Micro Accent Pill Tag */}
                                             <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-3.5 py-1 w-fit">
                                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                                                  <span className="text-[10px] font-bold tracking-wider text-amber-700  uppercase">
                                                       {slide.tag}
                                                  </span>
                                             </div>

                                             {/* Adaptive Responsive Typography */}
                                             <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-700 bg-clip-text text-transparent">
                                                  {slide.title}
                                             </h2>

                                             {/* Adaptive Description block */}
                                             <p className="text-xs sm:text-sm text-neutral-600 font-medium leading-relaxed max-w-lg">
                                                  {slide.description}
                                             </p>

                                             {/* Floating Compact Actions Control */}
                                             <div className="flex items-center gap-3 pt-2">
                                                  <Link
                                                       href={slide.ctaLink}
                                                       className="rounded-xl bg-linear-to-l from-[#fe8c00] to-[#f83600] px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-black/5 hover:opacity-90 transition-all transform hover:-translate-y-0.5"
                                                  >
                                                       {slide.ctaText}
                                                  </Link>
                                                  <Link
                                                       href="/browse"
                                                       className="rounded-xl border border-neutral-200 bg-white/50 backdrop-blur-sm px-5 py-2.5 text-xs font-bold text-neutral-700 hover:text-neutral-950 transition-all"
                                                  >
                                                       Explore Area Map
                                                  </Link>
                                             </div>

                                        </div>
                                   </div>

                              </SwiperSlide>
                         ))}
                    </Swiper>
               </div>

               <style jsx global>{`
        .swiper-pagination-bullet {
          background: #f83600 !important;
          opacity: 0.25;
        }
        .swiper-pagination-bullet-active {
          background: #f83600 !important;
          opacity: 1 !important;
          width: 20px !important;
          border-radius: 6px !important;
        }
      `}</style>
          </section>
     );
}