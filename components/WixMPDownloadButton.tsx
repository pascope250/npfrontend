import React, { useState } from 'react';

interface WixMPDownloadButtonProps {
  manifestUrl: string;
  movieTitle: string;
  partName: string;
}

const WixMPDownloadButton: React.FC<WixMPDownloadButtonProps> = ({ 
  manifestUrl, 
  movieTitle, 
  partName 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extractVideoUrl = async (manifestUrl: string): Promise<string> => {
    try {
      // First try to get the highest quality available
      const qualities = ['1080p', '720p', '480p', '360p', '240p'];
      const baseUrl = manifestUrl.split('/manifest.mpd')[0];
      
      for (const quality of qualities) {
        if (manifestUrl.includes('/file.mp4.urlset/')) {
          const testUrl = baseUrl.replace('/file.mp4.urlset', `/${quality}/file.mp4`);
          try {
            const response = await fetch(testUrl, { method: 'HEAD' });
            if (response.ok) {
              return testUrl;
            }
          } catch (e) {
            console.log(`Quality ${quality} not available`);
          }
        }
      }
      
      // If no quality-specific URL works, try the standard pattern
      const fallbackUrl = `${baseUrl}/file.mp4`;
      const response = await fetch(fallbackUrl, { method: 'HEAD' });
      if (response.ok) {
        return fallbackUrl;
      }

      throw new Error('No working video URL found');
    } catch (err) {
      console.error('Error extracting video URL:', err);
      throw new Error('Could not extract video URL from manifest');
    }
  };

  const handleDownload = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Extract and verify the video URL
      const videoUrl = await extractVideoUrl(manifestUrl);
      
      // Trigger download with isWixMP flag
      window.location.href = `/api/download-video?m3u8Url=${encodeURIComponent(videoUrl)}&movieName=${encodeURIComponent(movieTitle)}-${encodeURIComponent(partName)}&isWixMP=true`;
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Download failed');
      console.error('Download error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-4 border border-gray-700">
      <div className="flex justify-between items-center mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium truncate">{movieTitle}</h3>
          <p className="text-sm text-gray-400 truncate">{partName}</p>
        </div>
        <button
          onClick={handleDownload}
          disabled={isLoading}
          className={`px-4 py-2 rounded-md min-w-32 ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
          } transition-colors duration-200`}
        >
          {isLoading ? 'Preparing download...' : 'Download Video'}
        </button>
      </div>
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600">
          <p className="font-medium">Download Error</p>
          <p className="text-xs mt-1">
            {error} - Try again or check your connection
          </p>
        </div>
      )}
    </div>
  );
};

export default WixMPDownloadButton;