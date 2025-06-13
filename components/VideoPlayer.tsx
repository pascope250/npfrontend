import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";

// Helper function to format time (MM:SS)
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

// Icons
const PlayIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
      clipRule="evenodd"
    />
  </svg>
);

const PauseIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

const LoadingSpinner = ({
  className = "w-12 h-12",
}: {
  className?: string;
}) => (
  <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
    <span className="text-emerald-400 text-lg font-semibold tracking-wide drop-shadow-lg">
      Loading...
    </span>
  </div>
);

export default function VideoPlayer({
  videoUrl,
  isLoading,
}: {
  videoUrl: string;
  isLoading: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Track user interaction for autoplay
  useEffect(() => {
    const handleInteraction = () => {
      if (!hasUserInteracted) {
        setHasUserInteracted(true);
        setIsMuted(false);
      }
    };

    document.addEventListener("click", handleInteraction);
    document.addEventListener("keydown", handleInteraction);

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
    };
  }, [hasUserInteracted]);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch((e) => {
        console.error("Playback failed:", e);
        // Fallback to muted playback if autoplay blocked
        if (e.name === "NotAllowedError") {
          videoRef.current!.muted = true;
          videoRef
            .current!.play()
            .then(() => setIsPlaying(true))
            .catch((e) => console.error("Muted playback failed:", e));
        }
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const currentProgress =
      (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(currentProgress);
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * videoRef.current.duration;
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  // Initialize HLS player
  useEffect(() => {
    const video = videoRef.current;
    if (!video || isLoading) return;

    let hls: Hls | null = null;

    const initializePlayer = () => {
      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (hasUserInteracted) {
            video.play().catch((e) => {
              console.error("Autoplay failed:", e);
              video.muted = true;
              video
                .play()
                .catch((e) => console.error("Muted autoplay failed:", e));
            });
          }
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = videoUrl;
        video.addEventListener("loadedmetadata", () => {
          if (hasUserInteracted) {
            video.play().catch((e) => {
              console.error("Autoplay failed:", e);
              video.muted = true;
              video
                .play()
                .catch((e) => console.error("Muted autoplay failed:", e));
            });
          }
        });
      }
    };

    initializePlayer();

    return () => {
      if (hls) {
        hls.destroy();
      }
      if (video) {
        video.removeAttribute("src");
        video.load();
      }
    };
  }, [videoUrl, isLoading, hasUserInteracted]);
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const FullscreenIcon = ({
    className = "w-5 h-5",
  }: {
    className?: string;
  }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z"
        clipRule="evenodd"
      />
    </svg>
  );

  const toggleFullscreen = () => {
    if (!videoRef.current) return;

    if (!document.fullscreenElement) {
      // Enter fullscreen
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if ((videoRef.current as any).webkitRequestFullscreen) {
        // For Safari
        (videoRef.current as any).webkitRequestFullscreen();
      } else if ((videoRef.current as any).msRequestFullscreen) {
        // For IE11
        (videoRef.current as any).msRequestFullscreen();
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        // For Safari
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        // For IE11
        (document as any).msExitFullscreen();
      }
    }
  };

  return (
    <div
      className="relative w-full max-w-3xl mx-auto group aspect-video bg-black rounded-lg overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onContextMenu={handleContextMenu}
    >
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <LoadingSpinner className="text-white" />
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            onTimeUpdate={handleTimeUpdate}
            onClick={togglePlay}
            onLoadedMetadata={handleLoadedMetadata}
            playsInline
            muted={isMuted}
          />

          {/* Big center play button when paused */}
          {!isPlaying && (
            <button
              onClick={togglePlay}
              className="absolute inset-0 m-auto w-20 h-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Play"
            >
              <PlayIcon className="text-white/80 hover:text-white transition-colors" />
            </button>
          )}

          {/* Custom Controls */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent transition-all ${
              isHovering ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="p-2 text-white rounded-full hover:bg-white/10"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon className="w-5 h-5" />}
              </button>

              <div className="flex-1 flex items-center gap-2">
                <div
                  className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer"
                  onClick={handleSeek}
                >
                  <div
                    className="h-full bg-red-500 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-white text-sm min-w-[100px] text-right">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <button
                onClick={toggleFullscreen}
                className="p-2 text-white rounded-full hover:bg-white/10"
                aria-label="Toggle fullscreen"
              >
                <FullscreenIcon />
              </button>

              <button
                onClick={toggleMute}
                className="p-2 text-white rounded-full hover:bg-white/10"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
