// lib/api.ts
 const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://hobby.nepoba.com';
export async function fetchMovieById(id: string) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/movies/${id}`);
    if (!response.ok) {
      throw new Error('Movie not found');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching movie:', error);
    return null;
  }
}