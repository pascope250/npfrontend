// context/MovieContext.tsx
"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
export interface Videos {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: Thumbnail;
      medium: Thumbnail;
      high: Thumbnail;
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
}

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

interface VideoContextType {
  videos: Videos[];
  // page number: number; by default 1
  searchVideo: (query: string, page: number) => Promise<void>;
  loadPage: (page: number) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider = ({ children }: { children: ReactNode }) => {
  const [videos, setVideos] = useState<Videos[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://hobby.nepoba.com/api/videos/list"); // Your actual API endpoint
        if (!res.ok) throw new Error("Failed to fetch movies");
        const data: Videos[] = await res.json();
        setVideos(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const searchVideo = async (query: string, page: number) => {
    const pageNumber = page || 1;
    // if result not fount try next page until 10
    try {
      setLoading(true);
      const res = await fetch(
        `https://hobby.nepoba.com/api/videos/list?query=${query}&page=${pageNumber}`
      ); // Your actual API endpoint
      if (!res.ok) throw new Error("Failed to fetch movies");
      const data: Videos[] = await res.json();
      setVideos(data);
      if (data.length === 0 && pageNumber < 10) {
        searchVideo(query, pageNumber + 1);
      }
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  // load page 1 by default

  const loadPage = async (page: number) => {
    const pageNumber = page || 1;
    try {
      const res = await fetch(
        `https://hobby.nepoba.com/api/videos/list?page=${pageNumber}`
      ); // Your actual API endpoint
      if (!res.ok) throw new Error("Failed to fetch movies");
      const data: Videos[] = await res.json();
      // append data to videos
      setVideos((prev) => [...prev, ...data]);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    }
  };

  return (
    <VideoContext.Provider value={{ videos, loading, error, searchVideo, loadPage }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (!context)
    throw new Error("useVideoContext must be used within a MovieProvider");
  return context;
};
