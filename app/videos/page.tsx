"use client";
import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import { useVideoContext, Videos } from "@/context/youtubeContext";
import React from "react";
import Link from "next/link";
import AdInFeed from "@/components/ads/AdInFeed";

const VideosPage: NextPage = () => {
  const { videos, loading, searchVideo, loadPage } = useVideoContext();
  const [search, setSearch] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<Videos[]>([]);
  const [filteredVideos, setFilteredVideos] = React.useState<Videos[]>([]);
  const [page, setPage] = React.useState(1);
  const [isFetching, setIsFetching] = React.useState(false);

  React.useEffect(() => {
    if (!search.trim()) {
      setSuggestions([]);
      setFilteredVideos(videos);
      return;
    }
    const lower = search.toLowerCase();
    const filtered = videos.filter((v) =>
      v.snippet.title.toLowerCase().includes(lower)
    );

    if (filtered.length === 0) {
      // trigger search ofter user input
      const debounce = setTimeout(() => {
        if (search.trim()) {
          searchVideo(search, 1);
        }
      }, 2000);
      return () => clearTimeout(debounce);
    } else {
      setSuggestions(filtered.slice(0, 5));
      setFilteredVideos(filtered);
    }
  }, [search, videos]);

  React.useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 &&
        !loading &&
        !isFetching
      ) {
        setIsFetching(true);
        loadPage(page + 1).then(() => {
          setPage((prev) => prev + 1);
          setIsFetching(false);
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, isFetching, page, loadPage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <Head>
        <title>My Hobbies | YouTube Videos</title>
        <meta name="description" content="My favorite YouTube videos" />
      </Head>

      <Navbar />
      {loading ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-500 mb-4 shadow-lg"></div>
            <span className="text-emerald-500 text-lg font-semibold tracking-wide drop-shadow-lg">
              Loading...
            </span>
          </div>
        </div>
      ) : (
        <main className="container mx-auto px-4 py-12">
          <h1 className="hidden lg:block text-4xl font-bold text-emerald-700 mb-8 text-center drop-shadow-lg">
            Search Videos From More Than Billion On YouTube
          </h1>
          <nav className=" py-2 px-4 flex items-center justify-between sticky top-0 z-50 rounded-xl shadow mb-10">
            <div className="flex-1 max-w-2xl mx-auto">
              <div className="relative bg-white rounded-full shadow-md">
                <input
                  type="text"
                  placeholder="Search videos..."
                  className="w-full border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:border-emerald-500 transition-all"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoComplete="off"
                />
                <button className="absolute right-0 top-0 h-full px-4 text-gray-500 hover:text-emerald-600">
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
                </button>
                {/* Suggestions dropdown */}
                {suggestions.length > 0 && (
                  <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 word-clamp-7">
                    {suggestions.map((video, idx) => (
                      <button
                        key={idx}
                        className="w-full text-left px-4 py-2 hover:bg-emerald-50 transition-colors truncate cursor-pointer"
                        onClick={() => {
                          setSearch(video.snippet.title);
                          setSuggestions([]);
                          setFilteredVideos([video]);
                        }}
                      >
                        {video.snippet.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </nav>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {filteredVideos.map((video, index) => (
  <React.Fragment key={index}>
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
      <Link href={`/play/video/${video.id.videoId}`}>
        <div className="relative pb-[56.25%] bg-gray-300">
          <img
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <h2 className="font-bold text-lg mb-1 line-clamp-2">
          {video.snippet.title}
        </h2>
        <p className="text-gray-600 text-sm mb-2">
          {video.snippet.channelTitle}
        </p>
        <div className="flex justify-between text-gray-500 text-xs mt-auto">
          <span>
            {new Date(video.snippet.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>

    {(index + 1) % 3 === 0 && <AdInFeed />} {/* Show ad every 3 videos */}
  </React.Fragment>
))}

            {filteredVideos.length === 0 && (
              <div className="col-span-full text-center text-gray-500 py-12 text-lg">
                No videos found.
              </div>
            )}
          </div>

          {isFetching && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-emerald-500"></div>
            </div>
          )}
        </main>
      )}
    </div>
  );
};

export default VideosPage;
