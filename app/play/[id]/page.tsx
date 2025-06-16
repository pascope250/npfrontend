// app/play/[id]/page.tsx
import { Metadata } from 'next';
import { useMovieContext } from '@/context/movieContext'; // Your data fetching function
import { redirect } from 'next/navigation';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const { movies } = useMovieContext();
  if (!movies) {
    return {
      title: 'Loading...',
      description: 'Loading movie details...',
    };
  }
  const movie = movies.find((movie) => movie.id === params.id);
  
  if (!movie) {
    return {
      title: 'Movie Not Found',
      description: 'The requested movie could not be found.',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hobbyvb.com';
  const imageUrl = movie.poster.startsWith('http') 
    ? movie.poster 
    : `${baseUrl}${movie.poster}`;

  return {
    title: `Agasobanute - ${movie.title} (${movie.year}) | HobbyVb`,
    description: movie.description || `Watch ${movie.title} online for free. ${movie.categoryName} movie.`,
    openGraph: {
      title: `${movie.title} (${movie.year})`,
      description: movie.description || `Watch ${movie.title} online now.`,
      url: `${baseUrl}/play/${movie.id}/movie`,
      siteName: 'HobbyVb',
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 1200,
          alt: `${movie.title} poster`,
        },
      ],
      locale: 'en_US',
      type: 'video.movie',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${movie.title} (${movie.year})`,
      description: movie.description || `Watch ${movie.title} online now.`,
      images: [imageUrl],
    },
    alternates: {
      canonical: `${baseUrl}/play/${movie.id}/movie`,
    }
  };
}

export default function Page({ params }: { params: { id: string } }) {
  redirect(`/play/${params.id}/movie`);
}
