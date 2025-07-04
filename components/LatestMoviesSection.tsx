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