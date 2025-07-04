'use client';

import MovieCard from '@/components/MovieCard';
import { useMovieContext } from '@/context/movieContext';
import Link from 'next/link';

const LatestMoviesSection = () => {
  const { movies, loading } = useMovieContext();

  // Get the latest 30 movies (or fewer if there aren't 30)
  const latestMovies = movies.slice(0, 30);

  if (latestMovies.length === 0) {
    return null; // Don't render anything if no movies
  }

   return (
   loading ? (
     <div className="min-h-screen bg-gray-900 text-gray-100">
      <main className="container mx-auto px-4 py-8">
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
      </main>
    </div>
   ) :
    <section className="mt-16">
      <h2 className="text-3xl font-bold mb-6 text-center">Latest Movies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {latestMovies.map((movie) => (
          <MovieCard 
            key={movie.id}
            movie={movie}
            onClick={() => window.open(`/play/${movie.id}/movie`, '_blank')}
          />
        ))}
      </div>
      <div className="text-center mt-6">
        <Link 
          href="/movies" 
          className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          View All Movies
        </Link>
      </div>
    </section>
  );
};

export default LatestMoviesSection;