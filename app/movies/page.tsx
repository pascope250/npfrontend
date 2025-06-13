"use client";
import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import { Genre, Movie, useMovieContext } from "@/context/movieContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MovieNavbar from "@/components/MovieNavbar";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";
import { FaInfoCircle } from "react-icons/fa";

const MoviesPage: NextPage = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const { error, genre, loading, movies } = useMovieContext();
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === newReleases.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? newReleases.length - 1 : prev - 1));
  };

  // slice first five from movies
  const newReleases = movies.slice(0, 5);
  // filter movies by selected genre
  // 1. Group movies by category
  const moviesByCategory = movies.reduce((acc, movie) => {
    if (!acc[movie.categoryName]) {
      acc[movie.categoryName] = [];
    }
    acc[movie.categoryName].push(movie);
    return acc;
  }, {} as Record<string, Movie[]>);

  // 2. Filter categories with at least 5 movies
  const filteredCategories = Object.entries(moviesByCategory)
    .filter(([_, categoryMovies]) => categoryMovies.length >= 5)
    .slice(0, 5) // Take first 5 categories that meet the criteria
    .map(([categoryName, categoryMovies]) => ({
      categoryName,
      movies: categoryMovies.slice(0, 6), // Take first 5 movies per category
    }));

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) =>
          prev === newReleases.length - 1 ? 0 : prev + 1
        );
      }, 5000); // Change slide every 5 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, newReleases.length]);

  // Pause auto-play when user interacts with carousel
  const handleUserInteraction = () => {
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  function MoviesPageSkeleton() {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-12">
          {/* Genre chips skeleton */}
          <section className="mb-6 px-2 sm:px-0">
            <div className="flex space-x-2 pl-1 pr-3 min-w-max mx-auto">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-8 w-24 bg-gray-800 rounded-full" />
              ))}
            </div>
          </section>
          {/* Carousel skeleton */}
          <section className="mb-10 sm:mb-16">
            <div className="relative h-64 sm:h-80 md:h-96 bg-gray-800 rounded-xl overflow-hidden mx-2 sm:mx-0 flex items-center">
              <div className="w-1/2 h-full flex items-center justify-center">
                <div className="w-48 h-72 bg-gray-700 rounded-lg" />
              </div>
              <div className="w-1/2 flex flex-col justify-center h-full px-6 sm:px-12">
                <div className="h-8 w-3/4 bg-gray-700 rounded mb-2" />
                <div className="h-4 w-2/3 bg-gray-700 rounded mb-2" />
                <div className="h-4 w-1/3 bg-gray-700 rounded mb-4" />
                <div className="h-10 w-32 bg-emerald-700 rounded" />
              </div>
            </div>
          </section>
          {/* Genre sections skeleton */}
          {[...Array(3)].map((_, genreIdx) => (
            <section key={genreIdx} className="mb-10 sm:mb-16 px-2 sm:px-0">
              <div className="h-7 w-40 bg-gray-700 rounded mb-4 sm:mb-6" />
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-800 rounded-lg flex flex-col">
                    <div className="aspect-[2/3] bg-gray-700 rounded-t-lg" />
                    <div className="p-2 sm:p-3 flex-grow">
                      <div className="h-4 w-3/4 bg-gray-700 rounded mb-2" />
                      <div className="flex justify-between items-center">
                        <div className="h-3 w-10 bg-gray-700 rounded" />
                        <div className="h-3 w-12 bg-gray-700 rounded" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Head>
        <title>My Hobbies | Agasobanuye</title>
        <meta name="description" content="My favorite movies and TV shows" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <MovieNavbar />

      {loading ? (
        <MoviesPageSkeleton />
      ) : (
        <main className="container mx-auto px-2 sm:px-4 py-6 sm:py-12">
          <section className="mb-6 px-2 sm:px-0">
            <div className="relative">
              {/* Left fade effect */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none"></div>

              {/* Genre chips container with hidden scroll */}
              <div className="flex overflow-x-auto pb-3 -mb-3 space-x-2 scrollbar-none">
                <div className="flex space-x-2 pl-1 pr-3 min-w-max mx-auto">
                  <button
                    onClick={() => setSelectedGenre(null)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex-shrink-0 ${
                      selectedGenre === null
                        ? "bg-emerald-600 text-white shadow-md"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    All Genres
                  </button>
                  {genre.map((gen) => (
                    //  if
                    <button
                      key={gen.id}
                      onClick={() => {
                        // if genre id is 0, go to home page
                        if (gen.id === "0") {
                          router.push(`/movies`);
                        } else {
                          setSelectedGenre(gen.name),
                            router.push(`/movies/genre/${gen.id}`);
                        }
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex-shrink-0 cursor-pointer ${
                        selectedGenre === gen.name
                          ? "bg-emerald-600 text-white shadow-md"
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
          {/* New Releases Carousel */}
          {/* New Releases Carousel */}
          <section className="mb-8 sm:mb-12 md:mb-20 group">
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[28rem] bg-gray-800 rounded-lg md:rounded-2xl overflow-hidden shadow-lg md:shadow-2xl mx-2 sm:mx-0">
              {/* Background image - hidden on mobile */}
              <div
                className="absolute inset-0 w-full h-full transition-transform duration-1000 ease-out hidden sm:block"
                style={{
                  backgroundImage:
                    "url('/wp10615928-movie-collection-wallpapers.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "brightness(0.3)",
                  zIndex: 1,
                  transform: `scale(${1 + currentSlide * 0.02})`,
                }}
              />

              {/* Gradient overlay - hidden on mobile */}
              <div
                className="absolute inset-0 z-10 transition-all duration-500 hidden sm:block"
                style={{
                  background: `linear-gradient(90deg, rgba(16,16,16,0.9) 30%, rgba(16,16,16,0.5) 70%)`,
                }}
              />

              {/* Slides container */}
              <div
                className="absolute inset-0 flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                  zIndex: 20,
                }}
              >
                {newReleases.map((movie, index) => (
                  <div
                    key={movie.id}
                    className="min-w-full h-full relative flex flex-col sm:flex-row items-center"
                  >
                    {/* Movie poster - full width on mobile, half on desktop */}
                    <div
                      className="w-full sm:w-1/2 h-2/3 sm:h-full flex items-center justify-center relative z-30 p-4 sm:p-8"
                      onClick={handleUserInteraction}
                    >
                      <div className="relative w-full h-full max-w-xs transition-all duration-500 group-hover:scale-105 hover:!scale-110">
                        <Image
                          src={movie.poster}
                          alt={movie.title}
                          width={260}
                          height={390}
                          className="object-cover rounded-lg sm:rounded-xl shadow-lg sm:shadow-2xl border-2 sm:border-4 border-gray-900/50 hover:border-emerald-500/30 transition-all duration-300"
                          quality={90}
                          placeholder="blur"
                          blurDataURL={movie.poster}
                          unoptimized
                          onError={(e) =>
                            (e.currentTarget.src = "/placeholder.png")
                          }
                          style={{
                            maxHeight: "100%",
                            maxWidth: "100%",
                            transform: `rotateY(${
                              index === currentSlide ? "0deg" : "5deg"
                            })`,
                          }}
                        />
                        {/* Play button overlay - mobile only */}
                        <div className="absolute inset-0 flex items-center justify-center sm:hidden">
                          <div className="bg-emerald-600/80 rounded-full p-3 sm:p-4 backdrop-blur-sm">
                            <PlayIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content - hidden on mobile, shown on desktop */}
                    <div
                      className="hidden sm:flex w-full sm:w-1/2 flex-col justify-center h-full text-left px-4 sm:px-6 md:px-12 relative z-30"
                      style={{
                        opacity: index === currentSlide ? 1 : 0.7,
                        transition: "opacity 0.5s ease",
                      }}
                      onClick={handleUserInteraction}
                    >
                      <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 text-white drop-shadow-lg">
                        {movie.title}
                      </h3>
                      <div className="flex gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <span className="bg-emerald-600/20 text-emerald-400 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                          {movie.year}
                        </span>
                        <span className="bg-gray-700/50 text-gray-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                          {movie.rating}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3 drop-shadow">
                        {movie.description}
                      </p>
                      <div className="flex gap-3 sm:gap-4">
                        <Link href={`/play/${movie.id}/movie`}>
                          <button
                            className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md sm:rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md sm:shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5 sm:hover:-translate-y-1 text-sm sm:text-base"
                            onClick={handleUserInteraction}
                          >
                            <PlayIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            Watch Now
                          </button>
                        </Link>
                        <Link href={`/play/${movie.id}/movie`}>
                          <button
                            className="bg-gray-800/70 hover:bg-gray-700/70 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md sm:rounded-lg transition-all duration-300 flex items-center gap-2 border border-gray-700 hover:border-gray-600 text-sm sm:text-base"
                            onClick={handleUserInteraction}
                          >
                            <FaInfoCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                            Details
                          </button>
                        </Link>
                      </div>
                    </div>

                    {/* Mobile-only title overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 sm:hidden z-20">
                      <h3 className="text-lg font-bold text-white truncate">
                        {movie.title}
                      </h3>
                      <div className="flex gap-2 mt-1">
                        <span className="text-emerald-400 text-xs">
                          {movie.year}
                        </span>
                        <span className="text-gray-300 text-xs">•</span>
                        <span className="text-gray-300 text-xs">
                          {movie.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation controls - simplified for mobile */}
              <button
                onClick={() => {
                  prevSlide();
                  handleUserInteraction();
                }}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-gray-900/70 text-white p-1 sm:p-2 rounded-full hover:bg-emerald-600 transition-all duration-300 z-40 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-110 hover:shadow-lg"
                aria-label="Previous slide"
              >
                <ChevronLeftIcon className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={() => {
                  nextSlide();
                  handleUserInteraction();
                }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-gray-900/70 text-white p-1 sm:p-2 rounded-full hover:bg-emerald-600 transition-all duration-300 z-40 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-110 hover:shadow-lg"
                aria-label="Next slide"
              >
                <ChevronRightIcon className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>

              {/* Progress indicators - always visible */}
              <div
                className="absolute bottom-2 sm:bottom-4 left-0 right-0 flex justify-center gap-1 sm:gap-2 z-40"
                onClick={handleUserInteraction}
              >
                {newReleases.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 ${
                      currentSlide === index
                        ? "bg-emerald-500 w-6 sm:w-8 md:w-12"
                        : "bg-gray-600 hover:bg-gray-500 w-3 sm:w-4"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Auto-play controls - hidden on mobile */}
              <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-40 hidden sm:flex gap-2">
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="bg-gray-900/70 text-white p-1 sm:p-2 rounded-full hover:bg-emerald-600 transition-all"
                  aria-label={
                    isAutoPlaying ? "Pause auto-play" : "Start auto-play"
                  }
                >
                  {isAutoPlaying ? (
                    <PauseIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                  ) : (
                    <PlayIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                  )}
                </button>
              </div>
            </div>
          </section>
          {/* Genre Sections */}
          {filteredCategories.map((genre) => (
            <section
              key={genre.categoryName}
              className="mb-10 sm:mb-16 px-2 sm:px-0"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
                {genre.categoryName}
              </h2>
              <div className={`grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4`}>
                {genre.movies.slice(0, isMobile ? 6 : 5).map((movie) => (
                  <div
                    key={movie.id}
                    className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors h-full flex flex-col"
                  >
                    <div className="relative aspect-[2/3] bg-gray-700 overflow-hidden">
                      {movie.poster ? (
                        <Link href={`/play/${movie.id}/movie`}>
                          <Image
                            src={movie.poster}
                            width={200}
                            height={300}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL={movie.poster}
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, (min-width: 1281px) 20vw"
                            quality={80}
                            unoptimized
                            onError={(e) =>
                              (e.currentTarget.src = "/placeholder.png")
                            }
                          />
                        </Link>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-gray-400 text-xs sm:text-sm text-center p-1">
                            No poster available
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-2 sm:p-3 flex-grow">
                      <h3 className="font-bold text-sm sm:text-base truncate">
                        {movie.title}
                      </h3>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-gray-400 text-xs sm:text-sm">
                          {movie.year}
                        </p>
                        <div className="flex items-center">
                          <span className="text-xs text-gray-300">
                            ⭐ {movie.rating}/10
                          </span>
                          {/* <span className="text-xs text-gray-300">{movie.rating}</span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {isMobile && genre.movies.length > 6 && (
                  <Link href={`/genre/${genre.movies[0].categoryId}`} passHref>
                    <div className="bg-gray-800 rounded-lg flex items-center justify-center aspect-[2/3] cursor-pointer hover:bg-gray-700 transition-colors">
                      <button className="text-emerald-400 text-sm font-medium">
                        +{genre.movies.length - 6} More
                      </button>
                    </div>
                  </Link>
                )}
              </div>

              {/* {!isMobile && genre.movies.length > 5 && (
                <div className="mt-4 text-center">
                  <Link href={`/genre/${genre.movies[0].categoryId}`} passHref>
                    <button className="text-emerald-400 hover:text-emerald-300 text-sm font-medium">
                      View All {genre.movies.length}{" "}
                      {genre.movies[0].categoryId} Movies
                    </button>
                  </Link>
                </div>
              )} */}
            </section>
          ))}
        </main>
      )}
    </div>
  );
};

export default MoviesPage;
