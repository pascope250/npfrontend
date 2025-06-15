'use client';

import React, { useEffect, useRef, useState } from 'react';
import { DashJsPlayer } from '@/types/types';

interface VideoPlayerProps {
  src: string;
  width?: number;
  height?: number;
  autoPlay?: boolean;
  muted?: boolean;
  className?: string;
  onError?: (error: Error) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  width = 720,
  height = 480,
  autoPlay = false,
  muted = false,
  className = '',
  onError,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<DashJsPlayer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(muted);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  // Check if the source is a manifest
  const isManifest = src.match(/\.(mpd|m3u8)(\?.*)?$/i) !== null;

  // Hide controls after 3 seconds of inactivity
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const hideControls = () => {
      if (isPlaying && !isHovering) {
        timeoutId = setTimeout(() => {
          setShowControls(false);
        }, 3000);
      }
    };

    hideControls();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isPlaying, isHovering]);

  useEffect(() => {
    let player: DashJsPlayer | null = null;

    const initializePlayer = async () => {
      if (!videoRef.current) return;

      try {
        if (isManifest) {
          const dashjs = await import('dashjs');
          player = dashjs.MediaPlayer().create();
          player.initialize(videoRef.current, src, autoPlay);
          playerRef.current = player;

          player.updateSettings({
            streaming: {
              abr: {
                autoSwitchBitrate: {
                  video: true,
                },
              },
            },
          });
        } else {
          if (videoRef.current) {
            videoRef.current.src = src;
            if (autoPlay) {
              videoRef.current.play().catch(e => onError?.(e));
            }
          }
        }

        const video = videoRef.current;
        const handleTimeUpdate = () => {
          if (video.duration) {
            setProgress((video.currentTime / video.duration) * 100);
            setDuration(video.duration);
          }
        };

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleVolumeChange = () => {
          if (video) {
            setVolume(video.volume);
            setIsMuted(video.muted);
          }
        };

        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('play', handlePlay);
        video.addEventListener('pause', handlePause);
        video.addEventListener('volumechange', handleVolumeChange);

        return () => {
          video.removeEventListener('timeupdate', handleTimeUpdate);
          video.removeEventListener('play', handlePlay);
          video.removeEventListener('pause', handlePause);
          video.removeEventListener('volumechange', handleVolumeChange);
        };
      } catch (error) {
        console.error('Player initialization error:', error);
        onError?.(error as Error);
      }
    };

    initializePlayer();

    return () => {
      if (player) {
        player.reset();
        player = null;
      }
    };
  }, [src, autoPlay, isManifest, onError]);

  const togglePlay = () => {
    setShowControls(true);
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(e => onError?.(e));
      }
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !duration) return;
    
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * duration;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newVolume = parseFloat(e.target.value);
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;

    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen().catch(e => onError?.(e));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div 
      className={`relative bg-black rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${className}`}
      onMouseEnter={() => {
        setIsHovering(true);
        setShowControls(true);
      }}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={() => setShowControls(true)}
    >
      <video
        ref={videoRef}
        width={width}
        height={height}
        className="w-full aspect-video"
        muted={isMuted}
        onClick={togglePlay}
      />

      {/* Custom Controls */}
      <div 
        ref={controlsRef}
        className={`absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Progress Bar */}
        <div className="group mb-3">
          <div
            className="h-1.5 bg-gray-600/60 rounded-full cursor-pointer transition-all duration-200 group-hover:h-2"
            onClick={handleSeek}
          >
            <div
              className="h-full bg-red-500 rounded-full relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Play/Pause Button */}
            <button 
              onClick={togglePlay} 
              className="text-white hover:bg-white/10 p-2 rounded-full transition-colors duration-200"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <PauseIcon className="w-6 h-6" />
              ) : (
                <PlayIcon className="w-6 h-6" />
              )}
            </button>

            {/* Volume Controls */}
            <div className="flex items-center space-x-2 group">
              <button 
                onClick={toggleMute} 
                className="text-white hover:bg-white/10 p-2 rounded-full transition-colors duration-200"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeOffIcon className="w-5 h-5" />
                ) : volume < 0.5 ? (
                  <VolumeDownIcon className="w-5 h-5" />
                ) : (
                  <VolumeUpIcon className="w-5 h-5" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-24 accent-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              />
            </div>

            {/* Time Display */}
            <div className="text-white text-sm font-medium select-none">
              {formatTime(videoRef.current?.currentTime || 0)} /{' '}
              {formatTime(duration)}
            </div>
          </div>

          {/* Fullscreen Button */}
          <button 
            onClick={toggleFullscreen} 
            className="text-white hover:bg-white/10 p-2 rounded-full transition-colors duration-200"
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? (
              <FullscreenExitIcon className="w-5 h-5" />
            ) : (
              <FullscreenIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Play/Pause Center Button */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 m-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm transition-opacity duration-300 hover:bg-white/30"
          aria-label="Play"
        >
          <PlayIcon className="w-8 h-8 text-white" />
        </button>
      )}
    </div>
  );
};

// Icon components with improved styling
const PlayIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

const VolumeUpIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
  </svg>
);

const VolumeDownIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z" />
  </svg>
);

const VolumeOffIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
  </svg>
);

const FullscreenIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
  </svg>
);

const FullscreenExitIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
  </svg>
);

export default VideoPlayer;