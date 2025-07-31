// for client
"use client";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Movie, useMovieContext } from "@/context/movieContext";
import NotificationBell from "./NotificationBell";
// import NotificationOverlay from "./NotificationToggle";

const MovieNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { movies, searchMovies, searchingLoader } = useMovieContext();
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = await searchMovies(query);
    setSearchResults(results || []);
  };

  return (
    <>
      {/* Add this style tag to prevent horizontal overflow at the document level */}
      <style jsx global>{`
        html,
        body {
          max-width: 100%;
          overflow-x: hidden;
        }
      `}</style>

      <nav className="bg-gray-900 text-white p-4 shadow-lg sticky top-0 z-50 w-screen">
        <div className="w-full px-2 sm:px-4 flex justify-between items-center relative">
          {/* Logo Links - unchanged */}
          <Link
            href="/"
            className="hidden lg:block text-2xl font-bold text-white hover:text-emerald-400 transition-colors"
          >
            HobbyVb
          </Link>
          <Link
            href="/"
            className="sm:block lg:hidden text-2xl font-bold text-white hover:text-emerald-400 transition-colors"
          >
            MH
          </Link>

          {/* Search Bar - modified for better responsiveness */}
          <div
            className="flex-1 min-w-0 mx-2 sm:mx-4 relative max-w-2xl"
            ref={searchRef}
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search movies..."
                className="w-full bg-gray-700 border border-gray-600 rounded-full py-2 px-4 text-white focus:outline-none focus:border-emerald-500"
                value={searchQuery}
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
                onFocus={() => setShowSuggestions(true)}
              />
              <button className="absolute right-0 top-0 h-full px-4 text-gray-400 hover:text-white">
                {searchingLoader ? (
                  <svg
                    className="w-5 h-5 animate-spin"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Search Suggestions */}
            {showSuggestions && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 rounded-lg shadow-lg z-50 border border-gray-700 max-h-96 overflow-y-auto scrollbar-none">
                {searchResults.map((movie) => (
                  <Link
                    key={movie.id}
                    href={movie.type ==="TRANSLATED" ? `/play/${movie.id}/movie` : `/play/${movie.id}/english-version`}
                    className="block p-3 hover:bg-gray-700 transition-colors border-b border-gray-700 last:border-b-0"
                    onClick={() => {
                      setSearchQuery("");
                      setShowSuggestions(false);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      {movie.poster && (
                        <div className="w-10 h-10 flex-shrink-0 rounded overflow-hidden">
                          <img
                            src={movie.poster}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <h4 className="font-medium text-white">
                          {movie.title}
                          {movie.type === "TRANSLATED" ? (
                            <span className="bg-blue-500 text-xs px-1 md:px-2 py-1 rounded">
                              Translated
                            </span>
                          ) : (
                            <span className="bg-green-500 text-xs px-1 md:px-2 py-1 rounded">
                              Original
                            </span>
                          )}
                        </h4>
                        <p className="text-sm text-gray-400 line-clamp-1">
                          {movie.year} • {movie.categoryName}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link
              href="/movies"
              className="text-white hover:text-emerald-400 transition-colors font-medium"
            >
              Agasobanuye
            </Link>
            <Link
              href="/quotes"
              className="text-white hover:text-emerald-400 transition-colors font-medium"
            >
              Quotes
            </Link>
            <Link
              href="/videos"
              className="text-white hover:text-emerald-400 transition-colors font-medium"
            >
              YouTube Videos
            </Link>

            <a
              href="https://whatsapp.com/channel/0029Vb6rsTmGufIse0MGrx3g"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white hover:text-green-400 transition-colors font-medium"
              title="Join us on WhatsApp"
            >
              <FaWhatsapp className="w-5 h-5 text-green-400" />
            </a>

            <NotificationBell />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-gray-800 px-4 pt-2 pb-4 space-y-2">
            <Link
              href="/movies"
              className="block text-white hover:text-emerald-400 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Agasobanuye
            </Link>
            <Link
              href="/quotes"
              className="block text-white hover:text-emerald-400 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Quotes
            </Link>
            <Link
              href="/videos"
              className="block text-white hover:text-emerald-400 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              YouTube Videos
            </Link>

            <a
              href="https://whatsapp.com/channel/0029Vb6rsTmGufIse0MGrx3g"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white hover:text-green-400 transition-colors py-2"
              title="Join us on WhatsApp"
            >
              <FaWhatsapp className="w-5 h-5 text-green-400" />
              WhatsApp
            </a>
            <NotificationBell />
          </div>
        )}

        {/* <NotificationOverlay /> */}
      </nav>
    </>
  );
};

export default MovieNavbar;
