import React, { useState } from 'react';
import GoogleDownloadButton from './GoogleDownloadButton';
import DirectDownloadButton from './DirectDownloadButton';
import WixMPDownloadButton from './WixMPDownloadButton';

interface HlsDownloaderProps {
  hlsUrl: string;
  movieTitle: string;
  partName: string;
  downloadLink?: string;
  downloadType: 'HLS' | 'GOOGLE' | 'DIRECT' | 'WIXMP' | 'DOWNLOAD_LINK';
}

const HlsDownloader: React.FC<HlsDownloaderProps> = ({ 
  hlsUrl, 
  partName, 
  movieTitle, 
  downloadType, 
  downloadLink 
}) => {
  // If it's a WixMP manifest, use the specialized component
  if (downloadType === 'WIXMP' || hlsUrl.includes('wixmp.com')) {
    return (
      <WixMPDownloadButton 
        manifestUrl={hlsUrl}
        movieTitle={movieTitle}
        partName={partName}
      />
    );
  }


  // Existing download logic for other types
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

      const preview = await fetch(`/api/download-video?m3u8Url=${encodeURIComponent(videoUrl)}&preview=true`);
      if (!preview.ok) {
        const errorData = await preview.json();
        throw new Error(errorData.details || 'Invalid playlist');
      }

      window.location.href = `/api/download-video?m3u8Url=${encodeURIComponent(videoUrl)}&movieName=${encodeURIComponent(movieTitle)}-${encodeURIComponent(partName)}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Download failed');
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
        
        {downloadType === 'HLS' && (
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
        )}

        {downloadType === 'DOWNLOAD_LINK' && downloadLink && (
  <button 
    onClick={() => {
      if (downloadLink.includes('agasobanuyenow.com')) {
        // Use our proxy for agasobanuyenow links
        window.open(`/api/download-with-referer?url=${encodeURIComponent(downloadLink)}`, '_blank');
      } else {
        // Regular download for other links
        window.open(downloadLink, '_blank');
      }
    }}
    className="px-4 py-2 rounded-md min-w-32 bg-emerald-600 hover:bg-emerald-700 text-white transition-colors duration-200 cursor-pointer"
  >
    Download Video
  </button>
)}

        {downloadType === 'GOOGLE' && (
          <GoogleDownloadButton 
            driveUrl={hlsUrl} 
            fileName={`${movieTitle}-${partName}`} 
          />
        )}

        {downloadType === 'DIRECT' && (
          <DirectDownloadButton 
            fileUrl={hlsUrl} 
            fileName={`${movieTitle}-${partName}`} 
          />
        )}

      </div>
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600">
          <p className="font-medium">Download Error</p>
          <p className="text-xs mt-1">
            Tip: Make sure your internet is stable
          </p>
        </div>
      )}
    </div>
  );
};

export default HlsDownloader;