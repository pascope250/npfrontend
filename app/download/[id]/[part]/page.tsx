"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useMovieContext } from "@/context/movieContext";
import Head from "next/head";
import MovieNavbar from "@/components/MovieNavbar";
import HlsDownloader from "@/components/HlsDownloader";


export default function DownloadPage() {
  const { loading, movies } = useMovieContext();
  const [currentMovie, setCurrentMovie] = useState<any>(null);
  const param = useParams();
  const id = param?.id;
  const part = param?.part;

  useEffect(() => {
    if (!loading && movies.length > 0 && id) {
      const foundMovie = movies.find(
        (movie) => movie.id.toString() === id.toString()
      );
      setCurrentMovie(foundMovie);
    }
  }, [loading, movies, id]);

  if (!currentMovie) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <MovieNavbar />
        <div className="container mx-auto px-4 py-8 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Head>
        <title>Download {currentMovie.title} | My Hobbies</title>
      </Head>
      <MovieNavbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Movie Header */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src={currentMovie.poster}
                  alt={currentMovie.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {currentMovie.title}{" "}
                {currentMovie.year && `(${currentMovie.year})`}
              </h1>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-emerald-600 text-white px-2 py-1 rounded text-sm">
                  Rating: {currentMovie.rating}/10
                </span>
                <span className="bg-gray-700 text-white px-2 py-1 rounded text-sm">
                  {currentMovie.categoryName}
                </span>
              </div>

              <p className="text-gray-300 mb-4">{currentMovie.description}</p>
            </div>
          </div>

          {/* Download Options */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-6 pb-2 border-b border-gray-700">
              Download Options
            </h2>

            <div className="space-y-4">
              {currentMovie.source.map((source: any, index: number) => 
              {
                // check link type is included dhcplay.com or drive.google.com for with .mp4

                const typee = source.domain.includes("dhcplay.com") ? "HLS" : source.domain.includes("drive.google.com") ? "GOOGLE" : "DIRECT";
               return (
                <div key={index}>
                  {part && Number(source.part) === Number(part) && (
                    
                    <HlsDownloader
                    downloadType={typee}
                      movieTitle={currentMovie.title}
                      partName={
                        source.type === "END"
                          ? `  Part ${index + 1}`
                          : `Episode ${index + 1}`
                      }
                      hlsUrl={`${source.domain}${source.baseUrl}`}
                    />
                  )}
                </div>
              )})}
            </div>
          </div>

          {/* Download Instructions */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">
              Download Instructions
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <h4 className="font-medium text-emerald-400 mb-2">
                  For HLS Streams
                </h4>
                <ol className="list-disc list-inside space-y-1 text-sm">
                  <li>Click the "Download Video" button</li>
                  <li>Wait for the server to process the stream</li>
                  <li>The download will start automatically</li>
                  <li>Use VLC for best playback compatibility</li>
                </ol>
              </div>
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <h4 className="font-medium text-emerald-400 mb-2">
                  For Direct Downloads
                </h4>
                <ol className="list-disc list-inside space-y-1 text-sm">
                  <li>Choose your preferred quality/part</li>
                  <li>Click the download button</li>
                  <li>Save the file when prompted</li>
                  <li>Enjoy your content offline</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
