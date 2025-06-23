"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import MovieCard from "../../../../components/MovieCard";
import { Movie, useMovieContext } from "@/context/movieContext";
import MovieNavbar from "@/components/MovieNavbar";

export default function GenrePage() {
  const { movies: allMovies, genre: genres } = useMovieContext();

  const params = useParams();
  const router = useRouter();
  const genre = params?.genre as string;
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastMovieRef = useRef<HTMLDivElement>(null);
  // Reset state when genre changes
  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
  }, [genre]);

  // Fetch movies when genre or page changes
  useEffect(() => {
    if (!genre) return;

    setLoading(true);

    // Simulate async fetch
    setTimeout(() => {
      const genreMovies = allMovies.filter(
        (movie) => movie.categoryId.toString() === genre.toString()
      );
      const startIdx = (page - 1) * 20;
      const newMovies = genreMovies.slice(startIdx, startIdx + 20);

      setMovies((prev) => (page === 1 ? newMovies : [...prev, ...newMovies]));
      setHasMore(startIdx + 20 < genreMovies.length);
      setLoading(false);
    }, 800);
  }, [genre, page, allMovies]);

  // Infinite scroll observer
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

  if (!genre) {
    return <div className="min-h-screen bg-gray-900"></div>;
  }

  const genreName = genre.charAt(0).toUpperCase() + genre.slice(1);


  function GenrePageSkeleton() {
  const params = useParams();
  const genre = params?.genre as string;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <MovieNavbar />

      <main className="container mx-auto px-4 py-8">
        {/* Genre chips and sort dropdown skeleton */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch gap-4 mb-8 animate-pulse">
          {/* Genre chips skeleton */}
          <section className="w-full sm:w-[80%]">
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none"></div>
              <div className="overflow-x-auto scrollbar-hide scrollbar-none pb-3 -mb-3">
                <div className="flex gap-2 pl-3 pr-3 sm:pl-1 sm:pr-3 min-w-max">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-10 w-24 rounded-full bg-gray-800 flex-shrink-0 ${
                        i === 0 ? "bg-gray-700" : "bg-gray-800"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none"></div>
            </div>
          </section>

          {/* Sort dropdown skeleton */}
          <div className="w-full sm:w-[20%] flex items-center justify-end sm:justify-start gap-2 pl-3 sm:pl-0 mb-5">
            <div className="h-4 w-12 bg-gray-800 rounded"></div>
            <div className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 sm:py-1 w-full h-10"></div>
          </div>
        </div>

        {/* Movie grid skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="bg-gray-800/80 rounded-lg overflow-hidden">
              <div className="aspect-[2/3] bg-gray-700 animate-pulse"></div>
              <div className="p-3">
                <div className="h-4 w-3/4 bg-gray-700 rounded mb-2 animate-pulse"></div>
                <div className="flex justify-between">
                  <div className="h-3 w-10 bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-3 w-12 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading spinner skeleton */}
        <div className="flex justify-center mt-8">
          <div className="h-12 w-12 bg-gray-800 rounded-full"></div>
        </div>
      </main>
    </div>
  );
}
  return loading ? <GenrePageSkeleton /> : (
    
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <MovieNavbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-stretch gap-4 mb-8">
          {/* Genre chips - 70% width on desktop */}
          <section className="w-full sm:w-[80%]">
            <div className="relative">
              {/* Left fade effect */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none"></div>

              {/* Genre chips container */}
              <div className="overflow-x-auto scrollbar-hide scrollbar-none pb-3 -mb-3">
                <div className="flex gap-2 pl-3 pr-3 sm:pl-1 sm:pr-3 min-w-max">
                  {genres.map((gen) => (
                    <button
                      key={gen.id}
                      onClick={() => {
                        gen.id.toString() === "0"
                          ? router.push("/movies")
                          : router.push(`/movies/genre/${gen.id}`);
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex-shrink-0 whitespace-nowrap cursor-pointer ${
                        genre.toString() === gen.id.toString()
                          ? "bg-emerald-600 text-white shadow-md hover:bg-emerald-700"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      {gen.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right fade effect */}
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none"></div>
            </div>
          </section>

          {/* Sort dropdown - 30% width on desktop */}
          <div className="w-full sm:w-[20%] flex items-center justify-end sm:justify-start gap-2 pl-3 sm:pl-0 mb-5">
            <span className="text-gray-400 text-sm whitespace-nowrap">
              Sort by:
            </span>
            <select className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 sm:py-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full">
              <option>Popularity</option>
              <option>Release Date</option>
              <option>Rating</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              ref={index === movies.length - 1 ? lastMovieRef : null}
            >
              <MovieCard
                movie={movie}
                onClick={() => window.open(`/play/${movie.id}/movie`, "_blank")}
              />
            </div>
          ))}
        </div>
        {!loading && !hasMore && (
          <div className="text-center mt-8 text-gray-400">
            You've reached the end of {allMovies[0]?.categoryName} movies
          </div>
        )}
      </main>
    </div>
  );
}
