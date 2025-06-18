// app/play/[id]/page.tsx
import { redirect } from 'next/navigation';
import { fetchMovieById } from '@/lib/api';

// This is the correct type
interface PageProps {
  params: Promise<{ id: string }>;
}

// generateMetadata expects a single param with `params` key
export async function generateMetadata({ params }: PageProps) {
   const { id } = await params; // Await the promise
  const movie = await fetchMovieById(id);

  if (!movie) {
    return {
      title: 'Movie Not Found | HobbyVb',
      description: 'The requested movie could not be found.',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hobbyvb.com';
  const imageUrl = movie.poster.startsWith('http') 
    ? movie.poster 
    : `${baseUrl}${movie.poster}`;

  return {
    title: `Agasobanuye - ${movie.title} (${movie.year}) | HobbyVb`,
    description: movie.description || `Watch ${movie.title} online for free.`,
    keywords: [
      movie.title,
      movie.categoryName,
      movie.year?.toString(),
    ].filter(Boolean).join(', '),
    openGraph: {
      title: `${movie.title} (${movie.year}) | HobbyVb`,
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
      title: `${movie.title} (${movie.year}) | HobbyVb`,
      description: movie.description || `Watch ${movie.title} online now.`,
      images: [imageUrl],
    },
    alternates: {
      canonical: `${baseUrl}/play/${movie.id}/movie`,
    },
  };
}

// Also use correct type here
export default async function Page({ params }: PageProps) {
  const { id } = await params; // Await the promise
  redirect(`/play/${id}/movie`);
}
