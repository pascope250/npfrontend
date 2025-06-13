// components/DownloadButton.tsx
import { useState } from 'react';

interface GoogleDownloadButtonProps {
  driveUrl: string;
  fileName?: string;
}

export default function GoogleDownloadButton({ 
  driveUrl, 
  fileName = 'video.mp4' 
}: GoogleDownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    try {
      // Extract file ID from URL
      const fileId = driveUrl.match(/\/file\/d\/([^\/]+)/)?.[1];
      if (!fileId) throw new Error('Invalid Google Drive URL');
      
      // Create download link
      const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
      
      // Trigger download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className="px-4 py-2 rounded-md min-w-32 bg-emerald-600 hover:bg-emerald-700 text-white transition-colors duration-200 cursor-pointer" // Add your styles
    >
      {isDownloading ? 'Downloading...' : 'Download Video'}
    </button>
  );
}