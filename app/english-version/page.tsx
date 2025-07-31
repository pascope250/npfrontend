// "use client";

// import { useState, useEffect, useRef } from "react";
// import { useParams, useRouter } from "next/navigation";
// import MovieCard from "../../components/MovieCard";
// import { Movie, useMovieContext } from "@/context/movieContext";
// import MovieNavbar from "@/components/MovieNavbar";

// export default function GenrePage() {
//   const { movies: allMovies, genre: genres } = useMovieContext();

//   const params = useParams();
//   const router = useRouter();
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const observer = useRef<IntersectionObserver | null>(null);
//   const lastMovieRef = useRef<HTMLDivElement>(null);
//   // Reset state when genre changes

//   // Fetch movies when genre or page changes
//   useEffect(() => {
//     setLoading(true);

//     // Simulate async fetch
//     setTimeout(() => {
//       const startIdx = (page - 1) * 20;
//       const newMovies = allMovies.slice(startIdx, startIdx + 20);

//       setMovies((prev) => (page === 1 ? newMovies : [...prev, ...newMovies]));
//       setHasMore(startIdx + 20 < allMovies.length);
//       setLoading(false);
//     }, 800);
//   }, [ page, allMovies]);

//   // Infinite scroll observer
//   useEffect(() => {
//     if (loading || !hasMore) return;

//     const currentObserver = observer.current;
//     if (currentObserver) currentObserver.disconnect();

//     observer.current = new IntersectionObserver((entries) => {
//       if (entries[0].isIntersecting && hasMore) {
//         setPage((prev) => prev + 1);
//       }
//     });

//     if (lastMovieRef.current) {
//       observer.current.observe(lastMovieRef.current);
//     }
//     return () => {
//       if (currentObserver) currentObserver.disconnect();
//     };
//   }, [loading, hasMore, movies]);

//   function GenrePageSkeleton() {
//   const params = useParams();
//   const genre = params?.genre as string;

//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-100">
//       <MovieNavbar />

//       <main className="container mx-auto px-4 py-8">
//         {/* Genre chips and sort dropdown skeleton */}
//         <div className="flex flex-col sm:flex-row justify-between items-stretch gap-4 mb-8 animate-pulse">
//           {/* Genre chips skeleton */}
//           <section className="w-full sm:w-[80%]">
//             <div className="relative">
//               <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none"></div>
//               <div className="overflow-x-auto scrollbar-hide scrollbar-none pb-3 -mb-3">
//                 <div className="flex gap-2 pl-3 pr-3 sm:pl-1 sm:pr-3 min-w-max">
//                   {[...Array(8)].map((_, i) => (
//                     <div
//                       key={i}
//                       className={`h-10 w-24 rounded-full bg-gray-800 flex-shrink-0 ${
//                         i === 0 ? "bg-gray-700" : "bg-gray-800"
//                       }`}
//                     />
//                   ))}
//                 </div>
//               </div>
//               <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none"></div>
//             </div>
//           </section>

//           {/* Sort dropdown skeleton */}
//           <div className="w-full sm:w-[20%] flex items-center justify-end sm:justify-start gap-2 pl-3 sm:pl-0 mb-5">
//             <div className="h-4 w-12 bg-gray-800 rounded"></div>
//             <div className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 sm:py-1 w-full h-10"></div>
//           </div>
//         </div>

//         {/* Movie grid skeleton */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
//           {[...Array(10)].map((_, i) => (
//             <div key={i} className="bg-gray-800/80 rounded-lg overflow-hidden">
//               <div className="aspect-[2/3] bg-gray-700 animate-pulse"></div>
//               <div className="p-3">
//                 <div className="h-4 w-3/4 bg-gray-700 rounded mb-2 animate-pulse"></div>
//                 <div className="flex justify-between">
//                   <div className="h-3 w-10 bg-gray-700 rounded animate-pulse"></div>
//                   <div className="h-3 w-12 bg-gray-700 rounded animate-pulse"></div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Loading spinner skeleton */}
//         <div className="flex justify-center mt-8">
//           <div className="h-12 w-12 bg-gray-800 rounded-full"></div>
//         </div>
//       </main>
//     </div>
//   );
// }
//   return loading ? <GenrePageSkeleton /> : (
    
//     <div className="min-h-screen bg-gray-900 text-gray-100">
//       <MovieNavbar />
//       <main className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
//           {movies.map((movie, index) => (
//             <div
//               key={movie.id}
//               ref={index === movies.length - 1 ? lastMovieRef : null}
//             >
//               <MovieCard
//                 movie={movie}
//                 onClick={() => window.open(`/play/${movie.id}/movie`, "_blank")}
//               />
//             </div>
//           ))}
//         </div>
//         {!loading && !hasMore && (
//           <div className="text-center mt-8 text-gray-400">
//             You've reached the end
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }




"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import MovieCard from "../../components/MovieCard";
import { Movie, useMovieContext } from "@/context/movieContext";
import MovieNavbar from "@/components/MovieNavbar";

export default function GenrePage() {
  const { originals: allMovies, } = useMovieContext();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastMovieRef = useRef<HTMLDivElement>(null);

  // Generate years from 1999 to 2025
  const years = Array.from({ length: 27 }, (_, i) => 2025 - i);

  // Filter movies by selected year
  useEffect(() => {
    if (selectedYear) {
      const filtered = allMovies.filter(movie => movie.year === selectedYear);
      setFilteredMovies(filtered);
      setMovies(filtered.slice(0, 20));
      setPage(1);
      setHasMore(filtered.length > 20);
    } else {
      setFilteredMovies(allMovies);
      setMovies(allMovies.slice(0, 20));
      setPage(1);
      setHasMore(allMovies.length > 20);
    }
  }, [selectedYear, allMovies]);

  // Infinite scroll
  useEffect(() => {
    if (loading || !hasMore) return;

    const currentObserver = observer.current;
    if (currentObserver) currentObserver.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    });

    if (lastMovieRef.current) {
      observer.current.observe(lastMovieRef.current);
    }
    return () => {
      if (currentObserver) currentObserver.disconnect();
    };
  }, [loading, hasMore, movies]);

  // Load more movies
  useEffect(() => {
    if (page === 1) return;
    
    setLoading(true);
    setTimeout(() => {
      const startIdx = (page - 1) * 20;
      const newMovies = filteredMovies.slice(startIdx, startIdx + 20);
      setMovies((prev) => [...prev, ...newMovies]);
      setHasMore(startIdx + 20 < filteredMovies.length);
      setLoading(false);
    }, 500);
  }, [page, filteredMovies]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <MovieNavbar />
      
      {/* Year Filter Navbar */}
      <div className="bg-gray-800/95 backdrop-blur-sm py-4 sticky top-0 z-10 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="relative">
            {/* Gradient overlays to indicate scrollable content */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-800 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-800 to-transparent z-10 pointer-events-none" />
            
            {/* Scrollable year buttons - scrollbar hidden */}
            <div className="flex overflow-x-auto scrollbar-none space-x-3 px-1 py-1">
              <button
                onClick={() => setSelectedYear(null)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                  !selectedYear 
                    ? 'bg-red-600 text-white shadow-md' 
                    : 'bg-gray-700/80 text-gray-200 hover:bg-gray-600'
                }`}
              >
                All Years
              </button>
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                    selectedYear === year 
                      ? 'bg-red-600 text-white shadow-md' 
                      : 'bg-gray-700/80 text-gray-200 hover:bg-gray-600'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              ref={index === movies.length - 1 ? lastMovieRef : null}
            >
              <MovieCard
                movie={movie}
                onClick={() => window.open(movie.type === "TRANSLATED" ? `/play/${movie.id}/movie` : `/play/${movie.id}/english-version`, "_blank")}
              />
            </div>
          ))}
        </div>
        {!loading && !hasMore && (
          <div className="text-center mt-8 text-gray-400">
            {selectedYear 
              ? `No more movies from ${selectedYear}`
              : "You've reached the end"}
          </div>
        )}
      </main>
    </div>
  );
}