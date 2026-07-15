import Image from "next/image";
import Link from "next/link";
import {
     Calendar,
     Person,
     MapPin,
     Compass,
     Layers,
     ArrowLeft
} from "@gravity-ui/icons";

interface Report {
     _id: string;
     title: string;
     description: string;
     category: string;
     imageUrl: string;
     division: string;
     district: string;
     upazila: string;
     landmark: string;
     status: string;
     creatorId: string;
     creatorName: string;
     creatorPhoto: string;
     createdAt: string;
}

interface PageProps {
     params: Promise<{ id: string }>;
}

async function getReportDetails(id: string): Promise<Report> {
     const res = await fetch(`https://reports-zone-server.vercel.app/api/reports/${id}`, {
          cache: "no-store",
     });

     if (!res.ok) {
          throw new Error("Failed to fetch report details");
     }

     return res.json();
}

export default async function ReportDetailsPage({ params }: PageProps) {
     const { id } = await params;
     const reportData = await getReportDetails(id);
     const formattedDate = new Date(reportData.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
     });

     return (
          <main className="min-h-screen bg-neutral-50/50 py-10 px-4 sm:px-6 lg:px-8">
               <div className="max-w-7xl mx-auto">

                    {/* Back Button */}
                    <Link
                         href="/browse-problems"
                         className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 hover:text-neutral-900 transition-colors mb-6 group"
                    >
                         <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                         Back to Problems
                    </Link>

                    {/* Main Content Card */}
                    <div className="bg-white rounded-3xl border border-neutral-200/60 shadow-xl shadow-neutral-100/50 overflow-hidden">

                         {/* Report Image Section */}
                         <div className="relative h-[300px] sm:h-[400px] w-full bg-neutral-100">
                              <Image
                                   src={reportData.imageUrl}
                                   alt={reportData.title}
                                   fill
                                   className="object-cover"
                                   priority
                                   unoptimized 
                              />
                              <div className="absolute top-4 right-4">
                                   <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md border ${reportData.status === "pending"
                                             ? "bg-amber-50 border-amber-200 text-amber-600 backdrop-blur-md bg-white/90"
                                             : "bg-emerald-50 border-emerald-200 text-emerald-600 backdrop-blur-md bg-white/90"
                                        }`}>
                                        ● {reportData.status}
                                   </span>
                              </div>
                         </div>

                         {/* Details Section */}
                         <div className="p-6 sm:p-10 space-y-8">
                              <div>
                                   <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wide mb-2">
                                        <Layers className="h-3.5 w-3.5" />
                                        {reportData.category}
                                   </div>
                                   <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                                        {reportData.title}
                                   </h1>
                              </div>

                              <hr className="border-neutral-100" />

                              {/* Info Grid */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-neutral-50 p-6 rounded-2xl border border-neutral-200/40">
                                   <div className="space-y-3">
                                        <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                                             <MapPin className="h-3.5 w-3.5" /> Location Details
                                        </h3>
                                        <div className="text-sm font-semibold text-neutral-700 space-y-1">
                                             <p><span className="text-neutral-400 font-medium">Division:</span> {reportData.division}</p>
                                             <p><span className="text-neutral-400 font-medium">District:</span> {reportData.district}</p>
                                             <p><span className="text-neutral-400 font-medium">Upazila:</span> {reportData.upazila}</p>
                                        </div>
                                   </div>

                                   <div className="space-y-4">
                                        <div>
                                             <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                                                  <Compass className="h-3.5 w-3.5" /> Landmark
                                             </h3>
                                             <p className="text-sm font-semibold text-neutral-700">
                                                  {reportData.landmark}
                                             </p>
                                        </div>
                                        <div>
                                             <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                                                  <Calendar className="h-3.5 w-3.5" /> Reported On
                                             </h3>
                                             <p className="text-sm font-semibold text-neutral-700">
                                                  {formattedDate}
                                             </p>
                                        </div>
                                   </div>
                              </div>

                              {/* Description */}
                              <div className="space-y-3">
                                   <h3 className="text-sm font-bold text-neutral-800 uppercase tracking-wide">
                                        Description
                                   </h3>
                                   <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-medium">
                                        {reportData.description}
                                   </p>
                              </div>

                              <hr className="border-neutral-100" />

                              {/* Creator Info */}
                              <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
                                   <div className="flex items-center gap-3">
                                        <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-amber-500/20">
                                             <Image
                                                  src={reportData.creatorPhoto}
                                                  alt={reportData.creatorName}
                                                  fill
                                                  className="object-cover"
                                                  unoptimized
                                             />
                                        </div>
                                        <div>
                                             <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1">
                                                  <Person className="h-3 w-3" /> Reported By
                                             </p>
                                             <p className="text-sm font-bold text-neutral-800">
                                                  {reportData.creatorName}
                                             </p>
                                        </div>
                                   </div>

                                   <div className="text-xs font-mono text-neutral-400 bg-neutral-100 px-3 py-1.5 rounded-lg border border-neutral-200/50">
                                        ID: #{reportData._id ? reportData._id.slice(-6).toUpperCase() : "Unknown"}
                                   </div>
                              </div>

                         </div>
                    </div>

               </div>
          </main>
     );
}