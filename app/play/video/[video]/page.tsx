'use client'

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useParams, useRouter } from 'next/navigation';
import { useVideoContext, Videos } from '@/context/youtubeContext';
import YouTube from 'react-youtube';

const VideoPage = () => {
  const router = useRouter();
  const { videos } = useVideoContext();
  const videoId = useParams()?.video;
  const [currentVideo, setCurrentVideo] = useState<Partial<Videos>>({} as Videos );

  const [relatedVideos, setRelatedVideos] = useState<Videos[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // --- Search with suggestions ---
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<Videos[]>([]);
  useEffect(() => {
    if (!search.trim()) {
      setSuggestions([]);
      return;
    }
    const lower = search.toLowerCase();
    setSuggestions(
      videos
        .filter(
          v =>
            v.snippet.title.toLowerCase().includes(lower) &&
            v.id.videoId.toString() !== currentVideo.id?.videoId.toString()
        )
        .slice(0, 5)
    );
  }, [search, videos, currentVideo.id]);
  // --- End search with suggestions ---

  useEffect(() => {
    if (videos.length > 0 && videoId) {
      const video = videos.find((v) => v.id.videoId === videoId);
      if (video) {
        setCurrentVideo(video);

        // Filter related videos (excluding current video and from same channel)
        const related = videos
          .filter(v => v.id.videoId !== videoId && v.snippet.channelId !== video.snippet.channelId)
          .slice(0, 8);
        setRelatedVideos(related);
      }
    }
  }, [videoId, videos]);

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
    // Here you would typically call an API to subscribe/unsubscribe
  };

  const handleVideoSelect = (videoId: string) => {
    setSearch('');
    setSuggestions([]);
    router.push(`/play/video/${videoId}`);
  };

  // const onPlayerReady = (event) => {
  //   // You can access the player instance here if needed
  // };

  const playerOptions = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      rel: 0
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Head>
        <title>{currentVideo.snippet?.title} | My Hobbies</title>
        <meta name="description" content={currentVideo.snippet?.description} />
      </Head>

      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm py-2 px-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center">
          <button 
            onClick={() => router.back()}
            className="mr-4 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-red-600 dark:text-red-500 cursor-pointer" onClick={() => router.push('/')}>
            MyHobbies
          </h1>
        </div>
        
        <div className="flex-1 max-w-2xl mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-full py-2 px-4 focus:outline-none focus:border-red-500 bg-white dark:bg-gray-700 dark:text-white"
              value={search}
              onChange={e => setSearch(e.target.value)}
              autoComplete="off"
            />
            <button className="absolute right-0 top-0 h-full px-4 text-gray-500 dark:text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            {/* Suggestions dropdown */}
            {suggestions.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                {suggestions.map((video, idx) => (
                  <button
                    key={idx}
                    className="w-full text-left px-4 py-2 hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors truncate cursor-pointer"
                    onClick={() => handleVideoSelect(video.id.videoId)}
                  >
                    {video.snippet.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div>
          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
        </div>
      </nav>

      <div className="flex flex-col lg:flex-row p-4 gap-4">
        {/* Main Video Content */}
        <div className="lg:w-2/3">
          {/* Video Player */}
          <div className="bg-black aspect-video w-full rounded-lg overflow-hidden shadow-lg">
            <YouTube
              videoId={currentVideo.id?.videoId}
              opts={playerOptions}
              // onReady={onPlayerReady}
              className="w-full h-full"
            />
          </div>

          {/* Video Info */}
          <div className="mt-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h1 className="text-xl font-bold dark:text-white">{currentVideo.snippet?.title}</h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0 overflow-hidden">
                  {/* Channel avatar would go here */}
                </div>
                <div>
                  <p className="font-medium dark:text-white">{currentVideo.snippet?.channelTitle}</p>
                  {/* <p className="text-sm text-gray-500 dark:text-gray-400">2.5M subscribers</p> */}
                </div>
                {/* <button 
                  onClick={handleSubscribe}
                  className={`px-4 py-1 rounded-full text-sm font-medium ${
                    isSubscribed 
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
                      : 'bg-red-600 text-white'
                  }`}
                >
                  {isSubscribed ? 'Subscribed' : 'Subscribe'}
                </button> */}
              </div>
              
              {/* <div className="flex gap-2">
                <button className="flex items-center bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  {currentVideo.likes}
                </button>
                <button className="flex items-center bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share
                </button>
              </div> */}
            </div>

            {/* Video Description */}
            <div className="mt-4 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
              <div className="flex text-sm text-gray-600 dark:text-gray-300 mb-2">
                {/* <span>{currentVideo.views}</span> */}
                {/* <span className="mx-2">•</span> */}
                <span>{new Date(currentVideo.snippet?.publishedAt || '').toLocaleDateString()}</span>
              </div>
              <p className="text-sm dark:text-gray-200 whitespace-pre-line">
                {currentVideo.snippet?.description}
              </p>
            </div>
          </div>

          {/* Related Videos (Mobile) */}
          {relatedVideos.length > 0 && (
            <div className="lg:hidden mt-6">
              <h2 className="text-xl font-bold mb-4 dark:text-white">More Videos</h2>
              <div className="grid grid-cols-1 gap-4">
                {relatedVideos.map(video => (
                  <div 
                    key={video.id.videoId} 
                    className="flex cursor-pointer bg-white dark:bg-gray-800 p-2 rounded-lg shadow hover:shadow-md transition-shadow"
                    onClick={() => handleVideoSelect(video.id.videoId)}
                  >
                    <div className="w-40 h-24 bg-gray-300 dark:bg-gray-600 flex-shrink-0 rounded overflow-hidden">
                      <img 
                        src={video.snippet.thumbnails.medium.url} 
                        alt={video.snippet.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <h3 className="font-medium text-sm line-clamp-2 dark:text-white">{video.snippet.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">{video.snippet.channelTitle}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">
                        {new Date(video.snippet.publishedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Videos (Desktop) */}
        {relatedVideos.length > 0 && (
          <div className="hidden lg:block lg:w-1/3">
            <h2 className="text-lg font-bold mb-4 dark:text-white">Up next</h2>
            <div className="space-y-3">
              {relatedVideos.map(video => (
                <div 
                  key={video.id.videoId} 
                  className="flex cursor-pointer bg-white dark:bg-gray-800 p-2 rounded-lg shadow hover:shadow-md transition-shadow"
                  onClick={() => handleVideoSelect(video.id.videoId)}
                >
                  <div className="w-40 h-24 bg-gray-300 dark:bg-gray-600 flex-shrink-0 rounded overflow-hidden">
                    <img 
                      src={video.snippet.thumbnails.medium.url} 
                      alt={video.snippet.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-2 flex-1 min-w-0">
                    <h3 className="font-medium text-sm line-clamp-2 dark:text-white">{video.snippet.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">{video.snippet.channelTitle}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs">
                      {new Date(video.snippet.publishedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPage;