"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutList, Plus, BookOpen, Heart, Person, Xmark, Bars } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";

interface MenuItem {
     label: string;
     href: string;
     icon: react.ReactNode;
}

interface DashboardLayoutProps {
     children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
     const pathname = usePathname();
     const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

     const { data: sessionData } = authClient.useSession();
     const user = sessionData?.user;

     const menuItems:MenuItem[] = [
          { label: "Overview", href: "/dashboard/user", icon: <LayoutList className="w-5 h-5" /> },
          { label: "New Report", href: "/dashboard/user/add-report", icon: <Plus className="w-5 h-5" /> },
          { label: "My Reports", href: "/dashboard/user/my-reports", icon: <BookOpen className="w-5 h-5" /> },
          { label: "Profile", href: "/dashboard/user/profile", icon: <Person className="w-5 h-5" /> },
     ];

     return (
          <div className="min-h-screen bg-white  text-neutral-900  flex flex-col relative transition-colors duration-300" >

               {/* Mobile menu toggle */}
               < div className="md:hidden fixed bottom-6 right-6 z-50" >
                    <button
                         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                         className="flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-r from-[#fe8c00] to-[#f83600] text-white shadow-xl shadow-orange-600/30 border border-orange-400/30 focus:outline-none active:scale-95 transition-transform"
                    >
                         {isSidebarOpen ? <Xmark className="h-6 w-6" /> : <Bars className="h-6 w-6" />}
                    </button>
               </div>

               < div className="flex flex-1 relative h-full" >

                    <aside
                         className={
                              `fixed inset-y-0 left-0 z-40 w-64 border-r border-neutral-200  bg-white/95  backdrop-blur-md pt-24 px-4 transition-transform duration-300 md:translate-x-0 md:bg-white 
                              ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`
                         }
                    >
                         <div className="flex items-center justify-between mb-6 md:hidden px-2" >
                              <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase" > Dashboard Menu </span>
                              < button
                                   onClick={() => setIsSidebarOpen(false)}
                                   className="p-1 rounded-lg text-neutral-500 hover:bg-neutral-100 "
                              >
                                   <Xmark className="w-5 h-5" />
                              </button>
                         </div>

                         < div className="space-y-1" >
                              {
                                   menuItems.map((item) => {
                                        const isActive = pathname === item.href;
                                        return (
                                             <Link
                                                  key={item.href}
                                                  href={item.href}
                                                  onClick={() => setIsSidebarOpen(false)
                                                  }
                                                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                                                       ? "bg-gradient-to-r from-[#fe8c00] to-[#f83600] text-white shadow-lg shadow-orange-600/20"
                                                       : "text-neutral-500hover:bg-neutral-100 hover:text-neutral-900 "
                                                       }`}
                                             >
                                                  {item.icon}
                                                  {item.label}
                                             </Link>
                                        );
                                   })}
                         </div>
                    </aside>

                    {
                         isSidebarOpen && (
                              <div
                                   onClick={() => setIsSidebarOpen(false)}
                                   className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden transition-opacity"
                              />
                         )
                    }

                    <div className="flex-1 md:pl-64 pt-20 flex flex-col min-w-0 min-h-[calc(100vh-80px)]" >
                         <main className="flex-grow p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-24" >
                              {children}
                         </main>
                    </div>

               </div>
          </div>
     );
}