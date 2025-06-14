// context/MovieContext.tsx
'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

export interface Comment {
  id: string;
  movieId: string;
  userName: string;
  comment: string;
  commentLike: number;
  createdAt: string;
  replies: Reply[]; // Nested replies
}
export interface Reply {
  id: string;
  commentId: string;
  userName: string;
  content: string;
  createdAt: string;
  replyLike: number;
}
export interface MovieSource {
  type: string;
  part: number;
  domain: string;
  baseUrl: string;
  isIframe: boolean;
}

export interface Movie {
  id: string;
  categoryId: string;
  categoryName: string;
  title: string;
  year: number;
  rating: number;
  description: string;
  poster: string;
  createdAt: string;
  source: MovieSource[];
}
export interface Genre {
  id: string;
  name: string;
}

interface MovieContextType {
  movies: Movie[];
  fetchComments: () => Promise<void>;
  addComment: (data: Partial<Comment>) => Promise<void>;
  addReply: (data: Partial<Reply>) => Promise<void>;
  addCommentLike: (commentId: string) => Promise<void>;
  addReplyLike: (commentId:string, replyId: string) => Promise<void>;
  socket: Socket;
  genre:Genre[];
  comment: Comment[];
  loading: boolean;
  error: string | null;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genre, setGenre] = useState<Genre[]>([]);
  const [comment, setComment] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');
 const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://hobby.nepoba.com';


const socket: Socket = io(BACKEND_URL, {
  withCredentials: true,
   path: '/api/socketio',
   transports: ['websocket', 'polling'],
  // autoConnect: false
  // transports: ['websocket', 'polling'] // Try both transports
});

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BACKEND_URL}/api/movies/list`);
        // const res = await fetch('https://hobby.nepoba.com/api/movies/list');
        if (!res.ok) throw new Error('Failed to fetch movies');
        const data: Movie[] = await res.json();
        
        setMovies(data);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();

     // --- SOCKET.IO LOGIC START ---
    // Connect to your socket server (change URL as needed)
    // Change your socket connection to match your backend URL
 // or your production socket URL

  socket.on('moviesUpdated', async() => {

    const res = await fetch(`${BACKEND_URL}/api/movies/list`);
    // const res = await fetch('https://hobby.nepoba.com/api/movies/list');
    if (!res.ok) throw new Error('Failed to fetch movies');
    const data: Movie[] = await res.json();
    setMovies(data);
});

    // Optionally, listen for single movie add/update/delete events
    // socket.on('movieAdded', (movie: Movie) => setMovies(prev => [...prev, movie]));
    // socket.on('movieUpdated', (movie: Movie) => setMovies(prev => prev.map(m => m.id === movie.id ? movie : m)));
    // socket.on('movieDeleted', (movieId: string) => setMovies(prev => prev.filter(m => m.id !== movieId)));

    // Clean up on unmount
    return () => {
      socket.disconnect();
    };
    // --- SOCKET.IO LOGIC END ---
  }, []);

  useEffect(() => {
    const fetchGenre = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BACKEND_URL}/api/categories/list`); // Your actual API endpoint
        if (!res.ok) throw new Error('Failed to fetch genre');
        const data: Genre[] = await res.json();
        setGenre(data);
      }catch( err: any) {
        setError(err.message || 'Unknown error');
      }
    };
    fetchGenre();
  },[]);


  // for comments
   const fetchComments = async () => {
    try{
      setLoading(true);
      // const res = await fetch('https://hobby.nepoba.com/api/comments/list');
      const res = await fetch(`${BACKEND_URL}/api/comments/list`);
      if (!res.ok) throw new Error('Failed to fetch comments');
      const data: Comment[] = await res.json();
      setComment(data);
    }catch(err:any){
      setError(err.message || 'Unknown error');
    }
    }
  useEffect(() => {
    fetchComments();
  },[]);

  const addComment = async (data: Partial<Comment>) => {
  try {
    setLoading(true);
    setError(null);
    const res = await fetch(
      // 'https://hobby.nepoba.com/api/comments/create',
      `${BACKEND_URL}/api/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    if (!res.ok) throw new Error('Failed to add comment');
    // Optionally, fetch comments again or update state
    const newComment: Comment = await res.json();
    // selectively update the comment state
   await fetchComments();
  } catch (err: any) {
    setError(err.message || 'Unknown error');
  } finally {
    setLoading(false);
  }
};


// add a reply to a comment
const addReply = async (data: Partial<Reply>) => {
  
  try {
    setLoading(true);
    setError(null);
    const res = await fetch(
      `${BACKEND_URL}/api/comments/${data.commentId}/replies`, // Change this to your actual API endpoint
      // 'https://hobby.nepoba.com/api/replies/create',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    if (!res.ok) throw new Error('Failed to add reply');
    // Optionally, fetch comments again or update state
    const newReply: Reply = await res.json();
    // Update by fetching comments again
   fetchComments();
   
  } catch (err: any) {
    setError(err.message || 'Unknown error');
  } finally {
    setLoading(false);
  }
};

// add like to a comment
const addCommentLike = async (commentId: string) => {
  try {
    setLoading(true);
    setError(null);
    const res = await fetch(
      `${BACKEND_URL}/api/comments/${commentId}/like`, // Change this to your actual API endpoint
      // 'https://hobby.nepoba.com/api/comments/like/' + commentId,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (!res.ok) throw new Error('Failed to like comment');
    // Optionally, fetch comments again or update state
    const updatedComment: Comment = await res.json();
    // Update by fetching comments again
    fetchComments();
  } catch (err: any) {
    setError(err.message || 'Unknown error');
  } finally {
    setLoading(false);
  }
};
// add like to a reply
const addReplyLike = async (commentId:string, replyId: string) => {
  try {
    setLoading(true);
    setError(null);
    const res = await fetch(
      `${BACKEND_URL}/api/comments/${commentId}/replies/${replyId}/like`, // Change this to your actual API endpoint
      // 'https://hobby.nepoba.com/api/replies/like/' + replyId,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ); 
    if (!res.ok) throw new Error('Failed to like reply');
    // Optionally, fetch comments again or update state
    const updatedReply: Reply = await res.json();
  } catch (err: any) {
    setError(err.message || 'Unknown error');
    setLoading(false);  
  }
  finally {
    setLoading(false);
  }
};

  return (
    <MovieContext.Provider value={{ movies,genre,comment, addComment,addReply, addCommentLike, addReplyLike, fetchComments,socket, loading, error }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) throw new Error('useMovieContext must be used within a MovieProvider');
  return context;
};
