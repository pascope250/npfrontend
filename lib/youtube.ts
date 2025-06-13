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

export const getOrSearchYoutubeVideos = async (query: string):Promise<Videos[]> => {
  const Url = 'https://hobby.nepoba.com/api/videos/list';

  const res = await fetch(Url);
  if(!res.ok) {
    throw new Error('Failed to fetch videos');
  }
  const data = await res.json();
  
  return data as Videos[];
}