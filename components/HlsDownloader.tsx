import React, { useState } from 'react';
import GoogleDownloadButton from './GoogleDownloadButton';
import DirectDownloadButton from './DirectDownloadButton';

interface HlsDownloaderProps {
  hlsUrl: string;
  movieTitle: string;
  partName: string;
  downloadType: 'HLS' | 'GOOGLE' | 'DIRECT';
}


const HlsDownloader: React.FC<HlsDownloaderProps> = ({ hlsUrl, partName, movieTitle, downloadType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    setIsLoading(true);
    setError(null);

    try {

          const apiResponse = await fetch(
        `https://hobby-api.hdev.rw/api/screenshot?url=${encodeURIComponent(hlsUrl)}`
      );
      
      if (!apiResponse.ok) {
        throw new Error(`Failed to get download URL: ${apiResponse.status}`);
      }

      const { videoUrl } = await apiResponse.json();
      if (!videoUrl) throw new Error("No video URL available");


      // First verify the playlist
      const preview = await fetch(`/api/download-video?m3u8Url=${encodeURIComponent(videoUrl)}&preview=true`);
      if (!preview.ok) {
        const errorData = await preview.json();
        throw new Error(errorData.details || 'Invalid playlist');
      }

      // If preview succeeds, proceed with download
      window.location.href = `/api/download-video?m3u8Url=${encodeURIComponent(videoUrl)}&movieName=${encodeURIComponent(movieTitle)}-${encodeURIComponent(partName)}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Download failed');
    //   console.error('Download error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
     <div className="bg-gray-800 rounded-lg p-4 mb-4 border border-gray-700">
      <div className="flex justify-between items-center mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium truncate">
            {movieTitle}
          </h3>
          <p className="text-sm text-gray-400 truncate">{partName}</p>
        
        </div>
        {
            downloadType === 'HLS'  &&
            <button
        onClick={handleDownload}
        disabled={isLoading}
        className={`px-4 py-2 rounded-md min-w-32 bg-emerald-600 hover:bg-emerald-700 text-white transition-colors duration-200 cursor-pointer ${
          isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {isLoading ? 'Preparing download...' : 'Download Video'}
      </button>
        }

        {
            downloadType === 'GOOGLE'  &&
            <GoogleDownloadButton driveUrl={hlsUrl} fileName={`${movieTitle}-${partName}`} />
        }
        {
            downloadType === 'DIRECT'  &&
            <DirectDownloadButton fileUrl={hlsUrl} fileName={`${movieTitle}-${partName}`} />
        }
        
      </div>
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600">
          <p className="font-medium">Download Error</p>
          {/* <p className="text-sm">{error}</p> */}
          <p className="text-xs mt-1">
            Tip: Make sure your Your internet is Stable
          </p>
        </div>
      )}
    </div>
  );
};

export default HlsDownloader;   