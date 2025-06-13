// components/DownloadButton.tsx
import { useState } from 'react';

interface DirectDownloadButtonProps {
  fileUrl: string;        // Direct file URL
  fileName?: string;      // Optional custom file name
}

export default function DirectDownloadButton({
  fileUrl,
  fileName = 'video.mp4',
}: DirectDownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    try {
      // Create and trigger download link
      const link = document.createElement('a');
      link.href = fileUrl;
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
      className="px-4 py-2 rounded-md min-w-32 bg-emerald-600 hover:bg-emerald-700 text-white transition-colors duration-200 cursor-pointer"
    >
      {isDownloading ? 'Downloading...' : 'Download Video'}
    </button>
  );
}
