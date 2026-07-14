'use client'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function FeaturedSection() {
     const [incidents, setIncidents] = useState([]);
     const [loading, setLoading] = useState<boolean>(true);

     useEffect(() => {
          const fetchFeaturedData = async () => {
               try {
                    const response = await fetch('https://reports-zone-server.vercel.app/api/reports');
                    const data = await response.json();
                    setIncidents(data);
               } catch (error) {
                    toast.error('Failed to fetch featured reports. Please try again later.');
               } finally {
                    setLoading(false);
               }
          };

          fetchFeaturedData();
     }, []);

     if (loading) {
          return <div className="text-center py-10 text-gray-500">Loading Featured Reports...</div>;
     }

     return (
          <section className="py-10">
               <div className="max-w-7xl mx-auto px-4 lg:px-0">

                    {/* Section Header */}
                    <div className="mb-10 text-center md:text-left">
                         <h2 className="text-2xl font-bold text-gray-900 tracking-tight sm:text-4xl">
                              Featured Reports
                         </h2>
                         <p className="mt-3 text-md text-gray-500">
                              Urgent infrastructure issues that require immediate attention.
                         </p>
                    </div>

                    {/* Cards Grid*/}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                         {incidents.slice(0, 3).map((item, index) => (
                              <div
                                   key={item._id || index}
                                   className="relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
                              >
                                   {/* Featured Badge - Strictly on the Top Right */}
                                   <span className="absolute top-4 right-4 z-10 bg-amber-200 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm tracking-wider uppercase">
                                        Featured
                                   </span>

                                   {/* Card Image */}
                                   <div className="relative h-40 w-full overflow-hidden bg-gray-200">
                                        <img
                                             src={item.imageUrl}
                                             alt={item.title}
                                             className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                                             loading="lazy"
                                        />
                                   </div>

                                   {/* Card Content */}
                                   <div className="p-6 flex flex-col flex-grow">
                                        <span className="text-[10px] text-amber-600 uppercase tracking-wide">
                                             {item.category}
                                        </span>

                                        <h3 className="mt-2 text-md font-semibold text-gray-900 line-clamp-1">
                                             {item.title}
                                        </h3>

                                        <p className="mt-2 text-[10px] text-gray-500 flex items-center gap-1">
                                             <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                             </svg>
                                             {item.landmark}, {item.upazila}
                                        </p>

                                        {/* Divider */}
                                        <hr className="my-4 border-gray-100" />

                                        {/* Creator Info (Footer of the card) */}
                                        <div className="mt-auto flex items-center gap-3">
                                             <img
                                                  src={item.creatorPhoto}
                                                  alt={item.creatorName}
                                                  className="w-8 h-8 rounded-full border border-gray-200 object-cover"
                                             />
                                             <div className="text-xs">
                                                  <p className="font-semibold text-gray-700">{item.creatorName}</p>
                                                  <p className="text-gray-400">Reporter</p>
                                             </div>
                                        </div>
                                   </div>

                              </div>
                         ))}
                    </div>

               </div>
          </section>
     );
}