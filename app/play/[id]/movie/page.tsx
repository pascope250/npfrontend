"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Comment, Movie, useMovieContext } from "@/context/movieContext";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Iframe from "react-iframe";
import MovieNavbar from "@/components/MovieNavbar";
import { toast, Toaster } from "react-hot-toast";
// import VideoPlayer from "@/components/VideoPlayer";
import DirectVideoPlayer from "@/components/DirectVideoPlayer";
import GoogleAd from "@/components/ads/GoogleAd";
import MovieCard from "@/components/MovieCard";
import VideoPlayer from "@/components/DashVideoPlayer";


const MoviePlayerPage = () => {
  const {
    loading,
    movies,
    comment,
    addReply,
    addComment,
    fetchComments,
    addCommentLike,
    isCommentLoading,
    addReplyLike,
  } = useMovieContext();
  const router = useRouter();
  const [currentMovie, setCurrentMovie] = useState<Movie>();
  const [relatedMovies, setRelatedMovies] = useState<Movie[]>([]);
  const [showPartsModal, setShowPartsModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [currentSourceIndex, setCurrentSourceIndex] = useState(0);
  const [userName, setUserName] = useState("");
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [visibleComments, setVisibleComments] = useState(5);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const param = useParams();
  const id = param?.id;

  useEffect(() => {
    if (!loading && movies.length > 0 && id) {
      const foundMovie = movies.find(
        (movie) => movie.id.toString() === id.toString()
      );
      setCurrentMovie(foundMovie);

      if (foundMovie) {
        const related = movies
          .filter(
            (movie) =>
              movie.categoryId === foundMovie.categoryId &&
              movie.id !== foundMovie.id
          )
          .slice(0, 20);
        setRelatedMovies(related);
      }
    }
    if (comment.length > 0) {
      const filteredComments = comment.filter(
        (c) => Number(c.movieId) === Number(id)
      );
      setComments(filteredComments);
    }
  }, [loading, movies, id, comment]);

  const handleSourceChange = (index: number) => {
    setCurrentSourceIndex(index);
    setShowPartsModal(false);

    requestAnimationFrame(() => {
      const playerElement = document.getElementById("movie-player");
      if (playerElement) {
        const headerHeight = document.querySelector("nav")?.clientHeight || 0;
        const offset = 20;
        const topPosition = playerElement.offsetTop - headerHeight - offset;
        window.scrollTo({
          top: topPosition,
          behavior: "smooth",
        });
      }
    });
  };

  function timeAgo(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 5) return "just now";
    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 2) return "1 minute ago";
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 2) return "1 hour ago";
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    if (days < 2) return "1 day ago";
    if (days < 7) return `${days} days ago`;
    const weeks = Math.floor(days / 7);
    if (weeks < 2) return "1 week ago";
    if (weeks < 5) return `${weeks} weeks ago`;
    const months = Math.floor(days / 30);
    if (months < 2) return "1 month ago";
    if (months < 12) return `${months} months ago`;
    const years = Math.floor(days / 365);
    if (years < 2) return "1 year ago";
    return `${years} years ago`;
  }

  const handleLike = async (commentId: string) => {
    try {
      await addCommentLike(commentId);
      await fetchComments();
    } catch (error) {
      console.error("Error liking comment:", error);
  };
}

  const handleReplyLike = async (commentId: string, replyId: string) => {
    try {
      await addReplyLike(commentId, replyId);
      await fetchComments();
    } catch (error) {
      console.error("Error liking reply:", error);
    }
  };

  const handleReply = async (commentId: string) => {
    // Trim inputs
    const trimmedReply = replyText.trim();
    const trimmedUserName = userName.trim();

    if (!trimmedReply || !trimmedUserName) return;

    // Regular expressions for detection
    const websiteRegex =
      /(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:\/?%#\[\]@!$&'()*+,;=]*)?/gi;
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi;
    const blockedTermsRegex = /hobbyvb/gi;

    // Check for matches
    if (websiteRegex.test(trimmedReply) || websiteRegex.test(trimmedUserName)) {
      toast.error("Website links are not allowed in comments or usernames");
      return;
    }

    if (emailRegex.test(trimmedReply) || emailRegex.test(trimmedUserName)) {
      toast.error("Email addresses are not allowed in comments or usernames");
      return;
    }

    if (
      blockedTermsRegex.test(trimmedReply) ||
      blockedTermsRegex.test(trimmedUserName)
    ) {
      toast.error("The term 'hobbyVb' is not allowed");
      return;
    }

    try {
      await addReply({
        commentId: commentId,
        userName: trimmedUserName,
        content: trimmedReply,
      });
      await fetchComments();
      setReplyingTo(null);
      setUserName("");
      setReplyText("");
      toast.success("Reply posted successfully!");
    } catch (error) {
      console.error("Error adding reply:", error);
      toast.error("Failed to post reply");
    }
  };

  const handleAddComment = async () => {
    // Trim inputs
    const trimmedComment = newComment.trim();
    const trimmedUserName = userName.trim();

    if (!trimmedComment || !trimmedUserName) return;

    // Regular expressions for detection
    const websiteRegex =
      /(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:\/?%#\[\]@!$&'()*+,;=]*)?/gi;
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi;
    const blockedTermsRegex = /hobbyvb/gi;

    // Check for matches
    if (
      websiteRegex.test(trimmedComment) ||
      websiteRegex.test(trimmedUserName)
    ) {
      toast.error("Website links are not allowed in comments or usernames");
      return;
    }

    if (emailRegex.test(trimmedComment) || emailRegex.test(trimmedUserName)) {
      toast.error("Email addresses are not allowed in comments or usernames");
      return;
    }

    if (
      blockedTermsRegex.test(trimmedComment) ||
      blockedTermsRegex.test(trimmedUserName)
    ) {
      toast.error("The term 'hobbyVb' is not allowed");
      return;
    }

    try {
      await addComment({
        movieId: currentMovie?.id,
        userName: trimmedUserName,
        comment: trimmedComment,
      });
      setNewComment("");
      toast.success("Comment added successfully!");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment");
    } 
  };

  useEffect(() => {
    const fetchVideo = async () => {
      if (!currentMovie?.source?.[currentSourceIndex]) return;

      const externalVideoUrl = `${currentMovie.source[currentSourceIndex].domain}${currentMovie.source[currentSourceIndex].baseUrl}`;
      try {
        if (
          currentMovie.source[currentSourceIndex].domain.includes("google.com")
        ) {
          setVideoUrl(externalVideoUrl);
        } else {
          if (
            currentMovie?.source[currentSourceIndex].domain.includes(
              "dhcplay.com"
            )
          ) {
            const res = await fetch(
              `https://hobby-api.hdev.rw/api/screenshot?url=${encodeURIComponent(
                externalVideoUrl
              )}`
            );

            if (!res.ok) {
              const errorData = await res.json().catch(() => ({}));
              console.error("API Error:", errorData);
              throw new Error(errorData.error || "Failed to fetch video");
            }
            const data = await res.json();
            if (data.videoUrl) {
              setVideoUrl(
                `/api/stream-url?url=${encodeURIComponent(data.videoUrl)}`
              );
            } else {
              console.warn("No videoUrl in response:", data);
            }
          }
        }
      } catch (err) {
        console.error("Full error:", err);
      }
    };

    fetchVideo();
  }, [currentMovie, currentSourceIndex]);

  const handleDownload = async (part: number) => {
    // router.push(`/download/${currentMovie?.id}/${part}`);
    // open in new tab
    window.open(`/download/${currentMovie?.id}/${part}`, "_blank");
  };

  // Skeleton Loader Component
  function MoviePlayerSkeleton() {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <div className="container mx-auto px-4 py-8" id="movie-player">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Movie Player Skeleton */}
            <div className="lg:w-2/3">
              {/* Video Player Placeholder */}
              <div className="relative bg-gray-800 aspect-video w-full rounded-xl overflow-hidden shadow-2xl mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gray-700/70 border-4 border-gray-600/50 animate-pulse" />
                </div>
              </div>

              {/* Movie Info Section */}
              <div className="mt-6 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-3">
                    <div className="h-8 w-64 bg-gray-700 rounded-full animate-pulse" />
                    <div className="flex items-center gap-4">
                      <div className="h-5 w-20 bg-gray-700 rounded-full animate-pulse" />
                      <div className="h-5 w-24 bg-gray-700 rounded-full animate-pulse" />
                      <div className="h-5 w-16 bg-gray-700 rounded-full animate-pulse" />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-11 w-32 bg-gray-700 rounded-lg animate-pulse" />
                    <div className="h-11 w-32 bg-gray-700 rounded-lg animate-pulse" />
                  </div>
                </div>

                {/* Description */}
                <div className="bg-gray-800/80 rounded-xl p-5 space-y-3">
                  <div className="h-6 w-40 bg-gray-700 rounded-full animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-700 rounded-full animate-pulse" />
                    <div className="h-4 w-5/6 bg-gray-700 rounded-full animate-pulse" />
                    <div className="h-4 w-2/3 bg-gray-700 rounded-full animate-pulse" />
                  </div>
                </div>

                {/* Comments Section */}
                <div className="space-y-6">
                  <div className="h-7 w-40 bg-gray-700 rounded-full animate-pulse mb-2" />

                  {/* Add Comment */}
                  <div className="bg-gray-800/80 rounded-xl p-5 shadow-lg">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-700 animate-pulse flex-shrink-0" />
                      <div className="flex-1 space-y-3">
                        <div className="h-5 w-1/3 bg-gray-700 rounded-full animate-pulse" />
                        <div className="h-20 w-full bg-gray-700 rounded-xl animate-pulse" />
                        <div className="flex justify-end">
                          <div className="h-9 w-28 bg-gray-700 rounded-lg animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-gray-800/60 rounded-xl p-4 shadow-sm border border-gray-700/30"
                      >
                        <div className="flex gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-700 animate-pulse flex-shrink-0" />
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-3">
                              <div className="h-4 w-28 bg-gray-700 rounded-full animate-pulse" />
                              <div className="h-3 w-16 bg-gray-700 rounded-full animate-pulse" />
                            </div>
                            <div className="space-y-1.5">
                              <div className="h-4 w-3/4 bg-gray-700 rounded-full animate-pulse" />
                              <div className="h-4 w-full bg-gray-700 rounded-full animate-pulse" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="bg-gray-800/80 rounded-xl p-5 sticky top-6 space-y-5">
                <div className="h-7 w-40 bg-gray-700 rounded-full animate-pulse" />
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="flex gap-3 p-2 rounded-lg hover:bg-gray-700/30 transition-colors"
                    >
                      <div className="w-20 h-28 bg-gray-700 rounded-lg animate-pulse flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-5 w-32 bg-gray-700 rounded-full animate-pulse" />
                        <div className="h-4 w-24 bg-gray-700 rounded-full animate-pulse" />
                        <div className="h-4 w-20 bg-gray-700 rounded-full animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Add JSON-LD structured data
  // Add this useEffect for client-side meta tags
  useEffect(() => {
    if (currentMovie) {
      // Update document title
      document.title = `Agasobanuye - ${currentMovie.title} (${currentMovie.year}) | HobbyVb`;

      // Helper function to update or create meta tags
      const updateMetaTag = (property: string, content: string) => {
        let tag = document.querySelector(`meta[property="${property}"]`);

        if (!tag) {
          tag = document.createElement("meta");
          tag.setAttribute("property", property);
          document.head.appendChild(tag);
        }
        tag.setAttribute("content", content);
      };

      // Update OpenGraph tags
      updateMetaTag(
        "og:title",
        `${currentMovie.title} (${currentMovie.year}) | HobbyVb`
      );
      updateMetaTag(
        "og:description",
        currentMovie.description || `Watch ${currentMovie.title} online now.`
      );
      updateMetaTag("og:image", currentMovie.poster);
      updateMetaTag("og:url", window.location.href);
      updateMetaTag("og:type", "website");

      // Update Twitter tags
      updateMetaTag("twitter:card", "summary_large_image");
      updateMetaTag(
        "twitter:title",
        `${currentMovie.title} (${currentMovie.year}) | HobbyVb`
      );
      updateMetaTag(
        "twitter:description",
        currentMovie.description || `Watch ${currentMovie.title} online now.`
      );
      updateMetaTag("twitter:image", currentMovie.poster);
    }
  }, [currentMovie]);

  // Simple SVG icons (or use from your icon library)
  const StarIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );

  const FacebookIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
    </svg>
  );

  const TwitterIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
    </svg>
  );

  return loading ? (
    <>
      <MovieNavbar />
      <MoviePlayerSkeleton />
    </>
  ) : (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:url"
          content={`${window.location.origin}/play/${currentMovie?.id}`}
        />
        <link
          rel="canonical"
          href={`${window.location.origin}/play/${currentMovie?.id}/movie`}
        />
      </Head>

      {/* {structuredData && (
        <Script
          id="movie-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
      )} */}
      <MovieNavbar />
      <Toaster />
      <div className="container mx-auto px-4 py-6" id="movie-player">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Movie Player */}
          <div className="lg:w-2/3">
            {/* Movie Player */}
            <div className="bg-black aspect-video w-full rounded-lg overflow-hidden shadow-xl relative">
              {loading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                  <span className="text-emerald-400 text-lg font-semibold tracking-wide drop-shadow-lg">
                    Loading...
                  </span>
                </div>
              ) : (
                <>
                  {currentMovie?.source[currentSourceIndex].domain.includes(
                    "google.com"
                  ) ? (
                    <iframe
                      src={`${currentMovie?.source[currentSourceIndex].domain}${currentMovie?.source[currentSourceIndex].baseUrl}`}
                      width="100%"
                      height="100%"
                      allow="autoplay"
                      allowFullScreen
                    ></iframe>
                  ) : currentMovie?.source[currentSourceIndex].domain.includes(
                      "dhcplay.com"
                    ) ? (
                    <Iframe
                      url={`${currentMovie?.source[currentSourceIndex].domain}${currentMovie?.source[currentSourceIndex].baseUrl}`}
                      width="100%"
                      height="100%"
                      className="aspect-video"
                      allowFullScreen
                    />
                  ) : // <VideoPlayer isLoading={isLoading} videoUrl={videoUrl} />
                  // is endwith MP4, WebM, MKV, AVI, MOV, FLV, WMV
                  currentMovie?.source[currentSourceIndex].baseUrl.endsWith(
                      ".mp4"
                    ) ||
                    currentMovie?.source[currentSourceIndex].baseUrl.endsWith(
                      ".webm"
                    ) ||
                    currentMovie?.source[currentSourceIndex].baseUrl.endsWith(
                      ".mkv"
                    ) ||
                    currentMovie?.source[currentSourceIndex].baseUrl.endsWith(
                      ".avi"
                    ) ||
                    currentMovie?.source[currentSourceIndex].baseUrl.endsWith(
                      ".mov"
                    ) ||
                    currentMovie?.source[currentSourceIndex].baseUrl.endsWith(
                      ".flv"
                    ) ||
                    currentMovie?.source[currentSourceIndex].baseUrl.endsWith(
                      ".wmv"
                    ) ? (
                    <DirectVideoPlayer
                      videoUrl={
                        currentMovie?.source[currentSourceIndex].domain +
                        "" +
                        currentMovie?.source[currentSourceIndex].baseUrl
                      }
                      isLoading={loading}
                      adTagUrl={`https://pubads.g.doubleclick.net/gampad/live/ads?iu=/23308224455/Video//Preroll_Main&description_url=https%3A%2F%2Fhobbyvb.com%2Fmovies&tfcd=1&npa=0&sz=640x480&ciu_szs=300x600%2C728x90%2C300x250&cmsid=${
                        currentMovie?.id || "default"
                      }&vid=${
                        currentMovie?.id || "default"
                      }&gdfp_req=1&unviewed_position_start=1&output=vast&env=vp&impl=s&correlator=`}
                    />
                  ) : currentMovie?.source[currentSourceIndex].isIframe ? (
                    <Iframe
                      url={`${currentMovie?.source[currentSourceIndex].domain}${currentMovie?.source[currentSourceIndex].baseUrl}`}
                      width="100%"
                      height="100%"
                      className="aspect-video"
                      allowFullScreen
                    />
                  ) : currentMovie?.source[currentSourceIndex].baseUrl.endsWith(
                      ".mpd"
                    ) ? (
                    <VideoPlayer
                      src={
                        currentMovie?.source[currentSourceIndex].domain +
                        "" +
                        currentMovie?.source[currentSourceIndex].baseUrl
                      }
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      <span className="text-gray-400 text-lg font-semibold tracking-wide drop-shadow-lg">
                        {currentMovie?.source[currentSourceIndex].domain} is
                        not supported.
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Movie Info */}
            <div className="mt-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="space-y-3">
                  {/* Title with Year */}
                  <div className="flex items-baseline gap-2">
                    <h1 className="text-2xl font-bold text-white truncate">
                      {currentMovie?.title}
                    </h1>
                    {currentMovie?.year && (
                      <span className="text-gray-400 text-lg whitespace-nowrap">
                        ({currentMovie.year})
                      </span>
                    )}
                  </div>

                  {/* Rating and Category */}
                  <div className="flex flex-wrap items-center gap-3">
                    {currentMovie?.rating && (
                      <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                        <StarIcon className="w-4 h-4 mr-1" />
                        {currentMovie.rating}/10
                      </span>
                    )}
                    {currentMovie?.categoryName && (
                      <span className="text-gray-300 text-sm bg-gray-700 px-3 py-1 rounded-full">
                        {currentMovie.categoryName}
                      </span>
                    )}
                    {/* Social Sharing Buttons */}
                    <span className="text-gray-400 text-sm mr-1">Share:</span>

                    <a
                      href={`whatsapp://send?text=Watch ${encodeURIComponent(
                        currentMovie?.title || "this movie"
                      )} on ${window.location.origin}/play/${
                        currentMovie?.id
                      }/movie`}
                      className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full transition-colors duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on WhatsApp"
                    >
                      <WhatsAppIcon className="w-5 h-5" />
                    </a>

                    {/* Facebook Share */}
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        `${window.location.origin}/play/${currentMovie?.id}/movie`
                      )}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on Facebook"
                    >
                      <FacebookIcon className="w-5 h-5" />
                    </a>

                    {/* Twitter Share */}
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        `Watch ${currentMovie?.title || "this movie"}`
                      )}&url=${encodeURIComponent(
                        `${window.location.origin}/play/${currentMovie?.id}/movie`
                      )}`}
                      className="bg-blue-400 hover:bg-blue-500 text-white p-2 rounded-full transition-colors duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on Twitter"
                    >
                      <TwitterIcon className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-3">
                  <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                    {/* Parts Button */}
                    <div className="relative w-full sm:w-auto">
                      <button
                        onClick={() => {
                          setShowPartsModal((prev) => {
                            if (!prev) setShowDownloadModal(false);
                            return !prev;
                          });
                        }}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center w-full sm:w-auto cursor-pointer transition-colors duration-200"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Select&nbsp;Parts
                      </button>
                      {/* Parts Modal */}
                      {showPartsModal && (
                        <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-md shadow-lg z-50 border border-gray-700 overflow-y-auto max-h-80 sm:max-h-96 w-full sm:w-56">
                          <div className="py-1">
                            {currentMovie?.source.map((source, index) => (
                              <button
                                key={index}
                                onClick={() => handleSourceChange(index)}
                                className={`block w-full text-left px-4 py-2 text-sm ${
                                  currentSourceIndex === index
                                    ? "bg-emerald-600 text-white"
                                    : "text-gray-300 hover:bg-gray-700"
                                } cursor-pointer transition-colors duration-150`}
                                title={
                                  source.type === "END"
                                    ? `${currentMovie?.title} ${
                                        currentMovie?.source.length === 1
                                          ? "Full Movie"
                                          : `- Part ${index + 1}`
                                      }`
                                    : `${currentMovie?.title} - Ep ${index + 1}`
                                }
                              >
                                <span className="font-bold truncate block max-w-[140px]">
                                  {currentMovie?.title}
                                </span>
                                {source.type === "END" ? (
                                  <span className="text-gray-800 truncate block max-w-[100px]">
                                    {currentMovie?.source.length === 1
                                      ? "Full Movie"
                                      : `- Part ${index + 1}`}
                                  </span>
                                ) : (
                                  <span className="text-gray-400 truncate block max-w-[100px]">
                                    - Ep {index + 1}
                                  </span>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Download Button */}
                    <div className="relative w-full sm:w-auto mt-2 sm:mt-0">
                      <button
                        onClick={() => {
                          setShowDownloadModal((prev) => {
                            if (!prev) setShowPartsModal(false);
                            return !prev;
                          });
                        }}
                        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center w-full sm:w-auto transition-colors duration-200 cursor-pointer"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        Download
                        <svg
                          className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                            showDownloadModal ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      {/* Download Modal */}
                      {showDownloadModal && (
                        <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-md shadow-lg z-50 border border-gray-700 overflow-y-auto max-h-80 sm:max-h-96 w-full sm:w-64">
                          <div className="py-1">
                            <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-700">
                              Available Downloads
                            </div>
                            {currentMovie?.source.map((source, index) => (
                              <button
                                key={index}
                                onClick={() => handleDownload(source.part)}
                                className="flex items-center w-full text-left px-3 py-2.5 text-sm text-gray-300 hover:bg-gray-700/50 transition-colors duration-150 cursor-pointer"
                              >
                                {source.type === "END" ? (
                                  <>
                                    <svg
                                      className="w-4 h-4 mr-3 text-emerald-400"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                                      />
                                    </svg>
                                    <div>
                                      <span className="font-medium">
                                        {currentMovie?.title}
                                      </span>
                                      <div className="flex items-center text-xs text-gray-400 mt-0.5">
                                        <span>Part {source.part}</span>
                                        <span className="mx-1.5">•</span>
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <svg
                                      className="w-4 h-4 mr-3 text-blue-400"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                      />
                                    </svg>
                                    <div>
                                      <span className="font-medium">
                                        Episode {source.part}
                                      </span>
                                    </div>
                                  </>
                                )}
                              </button>
                            ))}
                          </div>
                          <div className="px-3 py-2 text-xs text-gray-500 border-t border-gray-700">
                            {currentMovie?.source.length} options available
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Movie Details */}
              <div className="mt-6 bg-gray-800 rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-3">Overview</h2>
                <p className="text-gray-300">{currentMovie?.description}</p>
              </div>

              <GoogleAd />

              {/* Comments Section */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-6">
                  Comments ({comments.length}){" "}
                </h2>

                {/* Add Comment */}
                <div className="bg-gray-800 rounded-lg p-5 mb-6 shadow-lg">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow">
                      {userName ? (
                        userName[0].toUpperCase()
                      ) : (
                        <svg
                          className="w-6 h-6 text-white opacity-60"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col gap-3">
                        <input
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          placeholder="Your name"
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500 transition-all placeholder-gray-400"
                        />
                        <textarea
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Share your thoughts about this movie..."
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500 transition-all placeholder-gray-400 resize-none"
                          rows={3}
                        />
                      </div>
                      <div className="flex items-center justify-end mt-4">
                        <button
                          onClick={handleAddComment}
                          disabled={
                            !newComment.trim() || !userName.trim() || isCommentLoading
                          }
                          className={`px-5 py-2 rounded-lg font-semibold transition-colors duration-150 shadow cursor-pointer disabled:cursor-not-allowed ${
                            newComment.trim() && userName.trim()
                              ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                              : "bg-gray-700 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          {isCommentLoading ? "Posting..." : "Post Comment"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.slice(0, visibleComments).map((comment) => (
                    <div
                      key={comment.id}
                      className="bg-gray-800/80 rounded-xl p-4 shadow-md border border-gray-700/50 hover:border-gray-600 transition-colors duration-200"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex-shrink-0 flex items-center justify-center text-white font-bold text-base shadow-md">
                          {comment.userName ? (
                            comment.userName[0].toUpperCase()
                          ) : (
                            <svg
                              className="w-5 h-5 text-white opacity-80"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-white truncate">
                                {comment.userName || "Anonymous"}
                              </span>
                              {comment && (
                                <span className="text-emerald-400">
                                  <svg
                                    className="w-4 h-4"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M23 12l-2.44-2.78.34-3.68-3.61-.82-1.89-3.18L12 3 8.6 1.54 6.71 4.72l-3.61.81.34 3.68L1 12l2.44 2.78-.34 3.69 3.61.82 1.89 3.18L12 21l3.4 1.46 1.89-3.18 3.61-.82-.34-3.68L23 12zm-10 5h-2v-2h2v2zm0-4h-2V7h2v6z" />
                                  </svg>
                                </span>
                              )}
                            </div>
                            <span
                              className="flex items-center gap-1 text-xs text-gray-400"
                              title={new Date(
                                comment.createdAt
                              ).toLocaleString()}
                            >
                              <svg
                                className="w-3 h-3 text-emerald-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-12.75a.75.75 0 00-1.5 0v4.25c0 .414.336.75.75.75h3a.75.75 0 000-1.5h-2.25V5.25z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              {timeAgo(comment.createdAt)}
                            </span>
                          </div>

                          <div className="mt-2 p-3 bg-gray-700/40 rounded-lg">
                            <p className="text-gray-100 leading-relaxed whitespace-pre-line">
                              {comment.comment}
                            </p>
                          </div>

                          <div className="mt-3 flex items-center gap-4 text-sm">
                            <button
                              className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
                              onClick={() => handleLike(comment.id)}
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                                />
                              </svg>
                              <span>
                                Like
                                {comment.commentLike
                                  ? ` (${comment.commentLike})`
                                  : ""}
                              </span>
                            </button>
                            <button
                              className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
                              onClick={() =>
                                setReplyingTo(
                                  replyingTo === Number(comment.id)
                                    ? null
                                    : Number(comment.id)
                                )
                              }
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                />
                              </svg>
                              <span>Reply</span>
                            </button>
                          </div>

                          {/* Reply input */}
                          {replyingTo === Number(comment.id) && (
                            <div className="mt-3 flex flex-col gap-2">
                              <input
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="Your name"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:border-emerald-500"
                              />
                              <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder={`Reply to ${comment.userName}...`}
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:border-emerald-500"
                                rows={3}
                              />
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleReply(comment.id)}
                                  className="px-3 py-1 rounded bg-emerald-600 text-white hover:bg-emerald-700 disable:opacity-50 transition-colors cursor-pointer disabled:cursor-not-allowed"
                                  disabled={
                                    !replyText.trim() ||
                                    !userName.trim() ||
                                    isCommentLoading
                                  }
                                >
                                  {isCommentLoading ? "Replying..." : "Reply"}
                                </button>
                                <button
                                  onClick={() => {
                                    setReplyingTo(null);
                                    setReplyText("");
                                  }}
                                  className="px-3 py-1 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 cursor-pointer"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Replies List */}
                          {comment.replies && comment.replies.length > 0 && (
                            <div className="mt-4 pl-6 border-l-2 border-emerald-700 space-y-3">
                              {comment.replies.map((reply) => (
                                <div
                                  key={reply.id}
                                  className="bg-gray-700/60 rounded-lg p-3"
                                >
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold text-emerald-300">
                                      {reply.userName}
                                    </span>
                                    <span
                                      className="flex items-center gap-1 text-xs text-gray-400"
                                      title={new Date(
                                        comment.createdAt
                                      ).toLocaleString()}
                                    >
                                      <svg
                                        className="w-3 h-3 text-emerald-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-12.75a.75.75 0 00-1.5 0v4.25c0 .414.336.75.75.75h3a.75.75 0 000-1.5h-2.25V5.25z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      {timeAgo(reply.createdAt)}
                                    </span>
                                  </div>
                                  <div className="text-gray-100">
                                    {reply.content}
                                  </div>
                                  <div className="mt-2 flex items-center gap-2 text-xs">
                                    <button
                                      className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
                                      onClick={() =>
                                        handleReplyLike(
                                          reply.commentId,
                                          reply.id
                                        )
                                      }
                                    >
                                      <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                                        />
                                      </svg>
                                      <span>
                                        Like
                                        {reply.replyLike
                                          ? ` (${reply.replyLike})`
                                          : ""}
                                      </span>
                                    </button>
                                    {/* <button
                                        className="text-gray-400 hover:text-emerald-400"
                                        onClick={() => {
                                          setReplyingTo(Number(comment.id));
                                          setReplyText(`@${reply.userName} `);
                                        }}
                                      >
                                        Reply
                                      </button> */}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {comments.length > visibleComments && (
                    <div className="flex justify-center mt-4">
                      <button
                        className="px-4 py-2 rounded bg-emerald-700 text-white hover:bg-emerald-800 transition"
                        onClick={() => setVisibleComments((v) => v + 5)}
                      >
                        Show More Comments
                      </button>
                    </div>
                  )}
                </div>

                {/* space for You may Also Like  */}

                <div className="mt-12">
                  <h2 className="text-xl font-semibold mb-4">You Also Like</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {movies
                      .filter((m) => m.id !== currentMovie?.id) // Exclude current movie
                      .slice(0, 50)
                      .map((movie) => (
                        <MovieCard
                          key={movie.id}
                          movie={movie}
                          onClick={() => router.push(`/play/${movie.id}/movie`)}
                        />
                      ))}
                  </div>
                </div>

                <GoogleAd />
              </div>
            </div>
          </div>

          {/* Related Movies Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-gray-800 rounded-lg p-4 sticky top-20">
              <h2 className="text-xl font-semibold mb-4">More Like This</h2>
              <div className="space-y-4">
                {relatedMovies.map((movie, index) => (
                  <React.Fragment key={movie.id}>
                    <div
                      onClick={() => router.push(`/play/${movie.id}/movie`)}
                      className="flex cursor-pointer hover:bg-gray-700 p-2 rounded-lg transition-colors"
                    >
                      <div className="w-20 h-28 bg-gray-700 rounded-md flex-shrink-0 overflow-hidden">
                        <Image
                          src={movie.poster}
                          alt={movie.title}
                          width={100}
                          height={150}
                          unoptimized
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-3 flex flex-col justify-between">
                        <div>
                          <h3 className="font-medium">{movie.title}</h3>
                          <div className="flex items-center mt-1 text-sm text-gray-400">
                            <span>{movie.year}</span>
                            <span className="mx-2">•</span>
                            <span>{movie.rating}</span>
                          </div>
                        </div>
                        <button className="mt-2 text-sm text-emerald-400 hover:text-emerald-300 flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                          </svg>
                          Watch Now
                        </button>
                      </div>
                    </div>
                    {(index + 1) % 3 === 0 && <GoogleAd />}{" "}
                    {/* Show ad after every 3 movies */}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePlayerPage;
