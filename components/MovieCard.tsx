import { Movie } from "@/context/movieContext";
import Image from "next/image";
interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}


const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  return (
    <div 
      className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-200 cursor-pointer shadow-lg"
      onClick={onClick}
    >
      <div className="aspect-[2/3] bg-gray-700 relative">
        <Image 
          src={movie.poster}
          width={200}
          height={300}
          alt={movie.title}
          className="w-full h-full object-cover"
          priority={false}
          fetchPriority="low"
          loading="lazy"
          placeholder="blur"
          blurDataURL={movie.poster}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, (min-width: 1281px) 20vw"
          quality={80}
          onError={
            (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              e.currentTarget.src = "/placeholder.png"; // Fallback image
            }
          }
        />
        <div className="absolute bottom-2 right-2 bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded">
          <span className="text-xs text-gray-300">⭐ {movie.rating}/10</span>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm sm:text-base line-clamp-1">{movie.title}</h3>
        <p className="text-gray-400 text-xs sm:text-sm">Released: {movie.year}</p>
      </div>
    </div>
  );
};

export default MovieCard;