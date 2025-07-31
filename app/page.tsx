// 'use client'
// import { useState } from 'react';
// import type { NextPage } from 'next';
// import Head from 'next/head';
// import Link from 'next/link';

// interface Movie {
//   id: number;
//   title: string;
//   poster: string;
//   rating: number;
//   type: boolean;
//   year: number;
//   categoryName: string[];
// }

// const Home: NextPage = () => {
//   const [activeTab, setActiveTab] = useState<'trending' | 'recent'>('trending');

//   // Sample data
//   const moviesData = {
//     trending: {
//       translated: [
//         { id: 2, title: 'Oppenheimer', poster: 'https://hobby.nepoba.com/posters/Maaveeran.jpeg', rating: 8.8, type: true, year: 2023, categoryName: ['Biography', 'Drama'] },
//         { id: 7, title: 'The Dark Knight', poster: 'https://hobby.nepoba.com/posters/Maaveeran.jpeg', rating: 9.0, type: true, year: 2008, categoryName: ['Action', 'Crime'] },
//       ],
//       nonTranslated: [
//         { id: 1, title: 'Dune: Part Two', poster: 'https://hobby.nepoba.com/posters/Maaveeran.jpeg', rating: 8.5, type: false, year: 2024, categoryName: ['Sci-Fi', 'Adventure'] },
//         { id: 8, title: 'Inception', poster: 'https://hobby.nepoba.com/posters/Maaveeran.jpeg', rating: 8.8, type: false, year: 2010, categoryName: ['Action', 'Adventure'] },
//       ]
//     },
//     recent: {
//       translated: [
//         { id: 3, title: 'The Batman', poster: 'https://hobby.nepoba.com/posters/Maaveeran.jpeg', rating: 7.9, type: true, year: 2022, categoryName: ['Action', 'Crime'] },
//         { id: 9, title: 'Joker', poster: 'https://hobby.nepoba.com/posters/Maaveeran.jpeg', rating: 8.4, type: true, year: 2019, categoryName: ['Crime', 'Drama'] },
//       ],
//       nonTranslated: [
//         { id: 4, title: 'Everything Everywhere All at Once', poster: 'https://hobby.nepoba.com/posters/Maaveeran.jpeg', rating: 8.8, type: false, year: 2022, categoryName: ['Action', 'Adventure'] },
//         { id: 10, title: 'The Shawshank Redemption', poster: 'https://hobby.nepoba.com/posters/Maaveeran.jpeg', rating: 9.3, type: false, year: 1994, categoryName: ['Drama'] },
//       ]
//     }
//   };

//   const sidebarMovies = {
//     trending: [
//       { id: 5, title: 'Interstellar', poster: 'https://hobby.nepoba.com/posters/Maaveeran.jpeg', rating: 8.6, type: true, year: 2014, categoryName: ['Sci-Fi', 'Drama'] },
//       { id: 11, title: 'Pulp Fiction', poster: 'https://hobby.nepoba.com/posters/Maaveeran.jpeg', rating: 8.9, type: false, year: 1994, categoryName: ['Crime', 'Drama'] },
//     ],
//     recent: [
//       { id: 6, title: 'Parasite', poster: 'https://hobby.nepoba.com/posters/Maaveeran.jpeg', rating: 8.5, type: false, year: 2019, categoryName: ['Drama', 'Thriller'] },
//       { id: 12, title: 'The Godfather', poster: 'https://hobby.nepoba.com/posters/Maaveeran.jpeg', rating: 9.2, type: true, year: 1972, categoryName: ['Crime', 'Drama'] },
//     ]
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <Head>
//         <title>MovieHub - Browse Movies</title>
//         <meta name="description" content="Browse translated and original version movies" />
//       </Head>

//       {/* Navbar */}
//       <nav className="bg-gray-800 p-4">
//         <div className="container mx-auto flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-red-500">MovieHub</h1>
//           <div className="flex space-x-4">
//             <button className="px-3 py-1 rounded hover:bg-gray-700">Login</button>
//             <button className="px-3 py-1 bg-red-600 rounded hover:bg-red-700">Sign Up</button>
//           </div>
//         </div>
//       </nav>

//       <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row">
//         {/* Main Content */}
//         <main className="flex-1 lg:mr-8">
//           {/* Navigation Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//             <div className="bg-gray-800 p-4 rounded-lg">
//               <h3 className="font-bold text-lg">All Movies</h3>
//               <p className="text-sm text-gray-400">Browse all available movies</p>
//             </div>

//             <Link href="/translated-movies" passHref>
//               <div className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition-all">
//                 <div className="flex items-center">
//                   <h3 className="font-bold text-lg">Translated Only</h3>
//                   <span className="ml-2 bg-blue-500 text-xs px-2 py-1 rounded">Localized</span>
//                 </div>
//                 <p className="text-sm text-gray-400">Movies with translated versions</p>
//               </div>
//             </Link>

//             <Link href="/original-movies" passHref>
//               <div className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition-all">
//                 <div className="flex items-center">
//                   <h3 className="font-bold text-lg">Original Only</h3>
//                   <span className="ml-2 bg-green-500 text-xs px-2 py-1 rounded">English</span>
//                 </div>
//                 <p className="text-sm text-gray-400">Movies in original language</p>
//               </div>
//             </Link>
//           </div>

//           {/* Tabs */}
//           <div className="flex border-b border-gray-700 mb-6">
//             <button
//               onClick={() => setActiveTab('trending')}
//               className={`px-4 py-2 font-medium ${activeTab === 'trending' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-white'}`}
//             >
//               Trending Now
//             </button>
//             <button
//               onClick={() => setActiveTab('recent')}
//               className={`px-4 py-2 font-medium ${activeTab === 'recent' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-white'}`}
//             >
//               Recent Releases
//             </button>
//           </div>

//           {/* Movie Sections */}
//           <section className="mb-12">
//             <div className="flex items-center mb-4">
//               <h2 className="text-xl font-bold">Translated Movies</h2>
//               <span className="ml-2 bg-blue-500 text-xs px-2 py-1 rounded">
//                 Localized Versions
//               </span>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {moviesData[activeTab].translated.map((movie) => (
//                 <MovieCard key={`translated-${movie.id}`} movie={movie} />
//               ))}
//             </div>
//           </section>

//           <section>
//             <div className="flex items-center mb-4">
//               <h2 className="text-xl font-bold">Original Version Movies</h2>
//               <span className="ml-2 bg-green-500 text-xs px-2 py-1 rounded">
//                 English Version
//               </span>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {moviesData[activeTab].nonTranslated.map((movie) => (
//                 <MovieCard key={`nonTranslated-${movie.id}`} movie={movie} />
//               ))}
//             </div>
//           </section>
//         </main>

//         {/* Sidebar */}
//         <aside className="w-full lg:w-80 mt-8 lg:mt-0">
//           <div className="bg-gray-800 rounded-lg p-4 sticky top-4">
//             <div className="flex border-b border-gray-700 mb-4">
//               <button
//                 className={`flex-1 py-2 font-medium ${activeTab === 'trending' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-white'}`}
//                 onClick={() => setActiveTab('trending')}
//               >
//                 Trending
//               </button>
//               <button
//                 className={`flex-1 py-2 font-medium ${activeTab === 'recent' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-white'}`}
//                 onClick={() => setActiveTab('recent')}
//               >
//                 Recent
//               </button>
//             </div>
//             <h2 className="text-xl font-bold mb-4">Recommended For You</h2>
//             <div className="space-y-4">
//               {sidebarMovies[activeTab].map((movie) => (
//                 <SidebarMovieCard key={`sidebar-${movie.id}`} movie={movie} />
//               ))}
//             </div>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// };

// // Movie Card Component
// const MovieCard = ({ movie }: { movie: Movie }) => {
//   return (
//     <Link href={`/movies/${movie.id}`} passHref>
//       <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition duration-300 cursor-pointer">
//         <div className="relative">
//           <img
//             src={movie.poster}
//             alt={movie.title}
//             className="w-full h-64 object-cover"
//             onError={(e) => {
//               (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x450?text=Poster+Not+Available';
//             }}
//           />
//           {movie.type ? (
//             <span className="absolute top-2 right-2 bg-blue-500 text-xs px-2 py-1 rounded">
//               Translated
//             </span>
//           ) : (
//             <span className="absolute top-2 right-2 bg-green-500 text-xs px-2 py-1 rounded">
//               Original
//             </span>
//           )}
//           <div className="absolute bottom-2 left-2 bg-yellow-500 text-black text-sm px-2 py-1 rounded flex items-center">
//             ⭐ {movie.rating}
//           </div>
//         </div>
//         <div className="p-4">
//           <h3 className="font-bold text-lg mb-1 truncate">{movie.title}</h3>
//           <div className="flex justify-between text-sm text-gray-400">
//             <span>{movie.year}</span>
//             <span className="truncate max-w-[120px]">{movie.categoryName}</span>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// // Sidebar Movie Card Component
// const SidebarMovieCard = ({ movie }: { movie: Movie }) => {
//   return (
//     <Link href={`/movies/${movie.id}`} passHref>
//       <div className="flex space-x-3 hover:bg-gray-700 p-2 rounded cursor-pointer">
//         <img
//           src={movie.poster}
//           alt={movie.title}
//           className="w-16 h-20 object-cover rounded"
//           onError={(e) => {
//             (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64x80?text=Poster';
//           }}
//         />
//         <div className="flex-1">
//           <h4 className="font-medium text-sm line-clamp-1">{movie.title}</h4>
//           <div className="flex items-center text-xs text-gray-400 mt-1">
//             <span>⭐ {movie.rating}</span>
//             <span className="mx-2">•</span>
//             <span>{movie.year}</span>
//           </div>
//           {movie.type ? (
//             <span className="text-xs bg-blue-500 px-1 rounded inline-block mt-1">
//               Translated
//             </span>
//           ) : (
//             <span className="text-xs bg-green-500 px-1 rounded inline-block mt-1">
//               Original
//             </span>
//           )}
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default Home;

// "use client";
// import { useState } from "react";
// import type { NextPage } from "next";
// import Head from "next/head";
// import Link from "next/link";

// interface Movie {
//   id: number;
//   title: string;
//   poster: string;
//   rating: number;
//   type: boolean;
//   year: number;
//   categoryName: string[];
// }

// interface ContentCard {
//   id: number;
//   type: "youtube" | "quote";
//   title: string;
//   content: string;
//   author?: string;
// }

// const Home: NextPage = () => {
//   const [activeTab, setActiveTab] = useState<"trending" | "recent">("trending");

//   // Sample data
//   const moviesData = {
//     trending: {
//       translated: [
//         {
//           id: 2,
//           title: "Oppenheimer",
//           poster: "https://hobby.nepoba.com/posters/Maaveeran.jpeg",
//           rating: 8.8,
//           type: true,
//           year: 2023,
//           categoryName: ["Biography", "Drama"],
//         },
//         {
//           id: 7,
//           title: "The Dark Knight",
//           poster: "https://hobby.nepoba.com/posters/Maaveeran.jpeg",
//           rating: 9.0,
//           type: true,
//           year: 2008,
//           categoryName: ["Action", "Crime"],
//         },
//       ],
//       nonTranslated: [
//         {
//           id: 1,
//           title: "Dune: Part Two",
//           poster: "https://hobby.nepoba.com/posters/Maaveeran.jpeg",
//           rating: 8.5,
//           type: false,
//           year: 2024,
//           categoryName: ["Sci-Fi", "Adventure"],
//         },
//         {
//           id: 8,
//           title: "Inception",
//           poster: "https://hobby.nepoba.com/posters/Maaveeran.jpeg",
//           rating: 8.8,
//           type: false,
//           year: 2010,
//           categoryName: ["Action", "Adventure"],
//         },
//       ],
//     },
//     recent: {
//       translated: [
//         {
//           id: 3,
//           title: "The Batman",
//           poster: "https://hobby.nepoba.com/posters/Maaveeran.jpeg",
//           rating: 7.9,
//           type: true,
//           year: 2022,
//           categoryName: ["Action", "Crime"],
//         },
//         {
//           id: 9,
//           title: "Joker",
//           poster: "https://hobby.nepoba.com/posters/Maaveeran.jpeg",
//           rating: 8.4,
//           type: true,
//           year: 2019,
//           categoryName: ["Crime", "Drama"],
//         },
//       ],
//       nonTranslated: [
//         {
//           id: 4,
//           title: "Everything Everywhere All at Once",
//           poster: "https://hobby.nepoba.com/posters/Maaveeran.jpeg",
//           rating: 8.8,
//           type: false,
//           year: 2022,
//           categoryName: ["Action", "Adventure"],
//         },
//         {
//           id: 10,
//           title: "The Shawshank Redemption",
//           poster: "https://hobby.nepoba.com/posters/Maaveeran.jpeg",
//           rating: 9.3,
//           type: false,
//           year: 1994,
//           categoryName: ["Drama"],
//         },
//       ],
//     },
//   };

//   const sidebarMovies = {
//     trending: [
//       {
//         id: 5,
//         title: "Interstellar",
//         poster: "https://hobby.nepoba.com/posters/Maaveeran.jpeg",
//         rating: 8.6,
//         type: true,
//         year: 2014,
//         categoryName: ["Sci-Fi", "Drama"],
//       },
//       {
//         id: 11,
//         title: "Pulp Fiction",
//         poster: "https://hobby.nepoba.com/posters/Maaveeran.jpeg",
//         rating: 8.9,
//         type: false,
//         year: 1994,
//         categoryName: ["Crime", "Drama"],
//       },
//     ],
//     recent: [
//       {
//         id: 6,
//         title: "Parasite",
//         poster: "https://hobby.nepoba.com/posters/Maaveeran.jpeg",
//         rating: 8.5,
//         type: false,
//         year: 2019,
//         categoryName: ["Drama", "Thriller"],
//       },
//       {
//         id: 12,
//         title: "The Godfather",
//         poster: "https://hobby.nepoba.com/posters/Maaveeran.jpeg",
//         rating: 9.2,
//         type: true,
//         year: 1972,
//         categoryName: ["Crime", "Drama"],
//       },
//     ],
//   };

//   // Additional content cards
//   const contentCards: ContentCard[] = [
//     {
//       id: 1,
//       type: "youtube",
//       title: "Top Movie Trailers This Week",
//       content: "https://www.youtube.com/embed/dQw4w9WgXcQ",
//     },
//     {
//       id: 2,
//       type: "quote",
//       title: "Cinema Quote of the Day",
//       content: "The cinema is truth 24 frames per second.",
//       author: "Jean-Luc Godard",
//     },
//     {
//       id: 3,
//       type: "youtube",
//       title: "Behind The Scenes",
//       content: "https://www.youtube.com/embed/9bZkp7q19f0",
//     },
//     {
//       id: 3,
//       type: "youtube",
//       title: "Behind The Scenes",
//       content: "https://www.youtube.com/embed/9bZkp7q19f0",
//     },
//     {
//       id: 3,
//       type: "youtube",
//       title: "Behind The Scenes",
//       content: "https://www.youtube.com/embed/9bZkp7q19f0",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <Head>
//         <title>MovieHub - Browse Movies & More</title>
//         <meta name="description" content="Browse movies, videos, and quotes" />
//       </Head>

//       {/* Navbar */}
//       <nav className="bg-gray-800 p-4">
//         <div className="container mx-auto flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-red-500">MovieHub</h1>
//           <div className="flex space-x-4">
//             <button className="px-3 py-1 rounded hover:bg-gray-700">
//               Login
//             </button>
//             <button className="px-3 py-1 bg-red-600 rounded hover:bg-red-700">
//               Sign Up
//             </button>
//           </div>
//         </div>
//       </nav>

//       <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row">
//         {/* Main Content */}
//         <main className="flex-1 lg:mr-8">
//           {/* Navigation Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//             <div className="bg-gray-800 p-4 rounded-lg">
//               <h3 className="font-bold text-lg">All Movies</h3>
//               <p className="text-sm text-gray-400">
//                 Browse all available movies
//               </p>
//             </div>

//             <Link href="/translated-movies" passHref>
//               <div className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition-all">
//                 <div className="flex items-center">
//                   <h3 className="font-bold text-lg">Translated Only</h3>
//                   <span className="ml-2 bg-blue-500 text-xs px-2 py-1 rounded">
//                     Localized
//                   </span>
//                 </div>
//                 <p className="text-sm text-gray-400">
//                   Movies with translated versions
//                 </p>
//               </div>
//             </Link>

//             <Link href="/original-movies" passHref>
//               <div className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition-all">
//                 <div className="flex items-center">
//                   <h3 className="font-bold text-lg">Original Only</h3>
//                   <span className="ml-2 bg-green-500 text-xs px-2 py-1 rounded">
//                     English
//                   </span>
//                 </div>
//                 <p className="text-sm text-gray-400">
//                   Movies in original language
//                 </p>
//               </div>
//             </Link>
//           </div>

//           {/* Content Cards Section */}
//           <section className="mb-8">
//             <h2 className="text-xl font-bold mb-4">Featured Content</h2>
//             <div className="flex overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
//               <div className="flex space-x-4 flex-nowrap">
//                 {contentCards.map((card) => (
//                   <div
//                     key={`content-${card.id}`}
//                     className="flex-shrink-0 w-72"
//                   >
//                     <ContentCard card={card} />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>

//           {/* Tabs */}
//           <div className="flex border-b border-gray-700 mb-6">
//             <button
//               onClick={() => setActiveTab("trending")}
//               className={`px-4 py-2 font-medium ${
//                 activeTab === "trending"
//                   ? "text-red-500 border-b-2 border-red-500"
//                   : "text-gray-400 hover:text-white"
//               }`}
//             >
//               Trending Now
//             </button>
//             <button
//               onClick={() => setActiveTab("recent")}
//               className={`px-4 py-2 font-medium ${
//                 activeTab === "recent"
//                   ? "text-red-500 border-b-2 border-red-500"
//                   : "text-gray-400 hover:text-white"
//               }`}
//             >
//               Recent Releases
//             </button>
//           </div>

//           {/* Movie Sections */}
//           <section className="mb-12">
//             <div className="flex items-center mb-4">
//               <h2 className="text-xl font-bold">Translated Movies</h2>
//               <span className="ml-2 bg-blue-500 text-xs px-2 py-1 rounded">
//                 Localized Versions
//               </span>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {moviesData[activeTab].translated.map((movie) => (
//                 <MovieCard key={`translated-${movie.id}`} movie={movie} />
//               ))}
//             </div>
//           </section>

//           <section>
//             <div className="flex items-center mb-4">
//               <h2 className="text-xl font-bold">Original Version Movies</h2>
//               <span className="ml-2 bg-green-500 text-xs px-2 py-1 rounded">
//                 English Version
//               </span>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {moviesData[activeTab].nonTranslated.map((movie) => (
//                 <MovieCard key={`nonTranslated-${movie.id}`} movie={movie} />
//               ))}
//             </div>
//           </section>
//         </main>

//         {/* Sidebar */}
//         <aside className="w-full lg:w-80 mt-8 lg:mt-0">
//           <div className="bg-gray-800 rounded-lg p-4 sticky top-4">
//             <div className="flex border-b border-gray-700 mb-4">
//               <button
//                 className={`flex-1 py-2 font-medium ${
//                   activeTab === "trending"
//                     ? "text-red-500 border-b-2 border-red-500"
//                     : "text-gray-400 hover:text-white"
//                 }`}
//                 onClick={() => setActiveTab("trending")}
//               >
//                 Trending
//               </button>
//               <button
//                 className={`flex-1 py-2 font-medium ${
//                   activeTab === "recent"
//                     ? "text-red-500 border-b-2 border-red-500"
//                     : "text-gray-400 hover:text-white"
//                 }`}
//                 onClick={() => setActiveTab("recent")}
//               >
//                 Recent
//               </button>
//             </div>
//             <h2 className="text-xl font-bold mb-4">Recommended For You</h2>
//             <div className="space-y-4">
//               {sidebarMovies[activeTab].map((movie) => (
//                 <SidebarMovieCard key={`sidebar-${movie.id}`} movie={movie} />
//               ))}
//             </div>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// };

// // Movie Card Component
// const MovieCard = ({ movie }: { movie: Movie }) => {
//   return (
//     <Link href={`/movies/${movie.id}`} passHref>
//       <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition duration-300 cursor-pointer">
//         <div className="relative">
//           <img
//             src={movie.poster}
//             alt={movie.title}
//             className="w-full h-64 object-cover"
//             onError={(e) => {
//               (e.target as HTMLImageElement).src =
//                 "https://via.placeholder.com/300x450?text=Poster+Not+Available";
//             }}
//           />
//           {movie.type ? (
//             <span className="absolute top-2 right-2 bg-blue-500 text-xs px-2 py-1 rounded">
//               Translated
//             </span>
//           ) : (
//             <span className="absolute top-2 right-2 bg-green-500 text-xs px-2 py-1 rounded">
//               Original
//             </span>
//           )}
//           <div className="absolute bottom-2 left-2 bg-yellow-500 text-black text-sm px-2 py-1 rounded flex items-center">
//             ⭐ {movie.rating}
//           </div>
//         </div>
//         <div className="p-4">
//           <h3 className="font-bold text-lg mb-1 truncate">{movie.title}</h3>
//           <div className="flex justify-between text-sm text-gray-400">
//             <span>{movie.year}</span>
//             <span className="truncate max-w-[120px]">
//               {movie.categoryName.join(", ")}
//             </span>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// // Sidebar Movie Card Component
// const SidebarMovieCard = ({ movie }: { movie: Movie }) => {
//   return (
//     <Link href={`/movies/${movie.id}`} passHref>
//       <div className="flex space-x-3 hover:bg-gray-700 p-2 rounded cursor-pointer">
//         <img
//           src={movie.poster}
//           alt={movie.title}
//           className="w-16 h-20 object-cover rounded"
//           onError={(e) => {
//             (e.target as HTMLImageElement).src =
//               "https://via.placeholder.com/64x80?text=Poster";
//           }}
//         />
//         <div className="flex-1">
//           <h4 className="font-medium text-sm line-clamp-1">{movie.title}</h4>
//           <div className="flex items-center text-xs text-gray-400 mt-1">
//             <span>⭐ {movie.rating}</span>
//             <span className="mx-2">•</span>
//             <span>{movie.year}</span>
//           </div>
//           {movie.type ? (
//             <span className="text-xs bg-blue-500 px-1 rounded inline-block mt-1">
//               Translated
//             </span>
//           ) : (
//             <span className="text-xs bg-green-500 px-1 rounded inline-block mt-1">
//               Original
//             </span>
//           )}
//         </div>
//       </div>
//     </Link>
//   );
// };

// // Content Card Component
// const ContentCard = ({ card }: { card: ContentCard }) => {
//   return (
//     <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition duration-300">
//       <div className="p-4">
//         <h3 className="font-bold text-lg mb-2">{card.title}</h3>
//         {card.type === "youtube" ? (
//           <div className="aspect-w-16 aspect-h-9">
//             <iframe
//               src={card.content}
//               className="w-full h-48"
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//               title={card.title}
//             ></iframe>
//           </div>
//         ) : (
//           <div className="bg-gray-700 p-4 rounded">
//             <p className="italic text-gray-300">"{card.content}"</p>
//             {card.author && (
//               <p className="text-right mt-2 text-gray-400">— {card.author}</p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;

// 'use client'
// import { useEffect, useRef, useState } from 'react';
// import type { NextPage } from 'next';
// import Head from 'next/head';
// import Link from 'next/link';
// import Navbar from '@/components/Navbar';

// interface Movie {
//   id: number;
//   title: string;
//   poster: string;
//   rating: number;
//   type: boolean;
//   year: number;
//   categoryName: string[];
// }

// interface ContentCard {
//   id: number;
//   type: 'youtube' | 'quote';
//   title: string;
//   content: string;
//   author?: string;
// }

// const Home: NextPage = () => {
//   const [activeTab, setActiveTab] = useState<'trending' | 'recent'>('trending');

//   // Sample data
//   const moviesData = {
//     trending: {
//       translated: [
//         { id: 2, title: 'Oppenheimer', poster: 'https://hobby.nepoba.com/posters/Maaveeran.jpeg', rating: 8.8, type: true, year: 2023, categoryName: ['Biography', 'Drama'] },
//         { id: 7, title: 'The Dark Knight', poster: 'https://hobby.nepoba.com/posters/Maaveeran.jpeg', rating: 9.0, type: true, year: 2008, categoryName: ['Action', 'Crime'] },
//         { id: 7, title: 'The Dark Knight', poster: 'https://hobby.nepoba.com/posters/Maaveeran.jpeg', rating: 9.0, type: true, year: 2008, categoryName: ['Action', 'Crime'] },
//         { id: 7, title: 'The Dark Knight', poster: 'https://hobby.nepoba.com/posters/Maaveeran.jpeg', rating: 9.0, type: true, year: 2008, categoryName: ['Action', 'Crime'] },
//         { id: 7, title: 'The Dark Knight', poster: 'https://hobby.nepoba.com/posters/Maaveeran.jpeg', rating: 9.0, type: true, year: 2008, categoryName: ['Action', 'Crime'] },
//         { id: 7, title: 'The Dark Knight', poster: 'https://hobby.nepoba.com/posters/Maaveeran.jpeg', rating: 9.0, type: true, year: 2008, categoryName: ['Action', 'Crime'] },
//         { id: 7, title: 'The Dark Knight', poster: 'https://hobby.nepoba.com/posters/Maaveeran.jpeg', rating: 9.0, type: true, year: 2008, categoryName: ['Action', 'Crime'] },
//         { id: 7, title: 'The Dark Knight', poster: 'https://hobby.nepoba.com/posters/Maaveeran.jpeg', rating: 9.0, type: true, year: 2008, categoryName: ['Action', 'Crime'] },

//       ],
//       nonTranslated: [
//         { id: 1, title: 'Dune: Part Two', poster: 'https://hobby.nepoba.com/posters/Maaveeran.jpeg', rating: 8.5, type: false, year: 2024, categoryName: ['Sci-Fi', 'Adventure'] },
//         { id: 8, title: 'Inception', poster: 'https://hobby.nepoba.com/posters/Maaveeran.jpeg', rating: 8.8, type: false, year: 2010, categoryName: ['Action', 'Adventure'] },
//       ]
//     },
//     recent: {
//       translated: [
//         { id: 3, title: 'The Batman', poster: 'https://hobby.nepoba.com/posters/Maaveeran.jpeg', rating: 7.9, type: true, year: 2022, categoryName: ['Action', 'Crime'] },
//         { id: 9, title: 'Joker', poster: 'https://hobby.nepoba.com/posters/Maaveeran.jpeg', rating: 8.4, type: true, year: 2019, categoryName: ['Crime', 'Drama'] },

//       ],
//       nonTranslated: [
//         { id: 4, title: 'Everything Everywhere All at Once', poster: 'https://hobby.nepoba.com/posters/Maaveeran.jpeg', rating: 8.8, type: false, year: 2022, categoryName: ['Action', 'Adventure'] },
//         { id: 10, title: 'The Shawshank Redemption', poster: 'https://hobby.nepoba.com/posters/Maaveeran.jpeg', rating: 9.3, type: false, year: 1994, categoryName: ['Drama'] },
//       ]
//     }
//   };

//   const sidebarMovies = {
//     trending: [
//       { id: 5, title: 'Interstellar', poster: 'https://hobby.nepoba.com/posters/Maaveeran.jpeg', rating: 8.6, type: true, year: 2014, categoryName: ['Sci-Fi', 'Drama'] },
//       { id: 11, title: 'Pulp Fiction', poster: 'https://hobby.nepoba.com/posters/Maaveeran.jpeg', rating: 8.9, type: false, year: 1994, categoryName: ['Crime', 'Drama'] },

//     ],
//     recent: [
//       { id: 6, title: 'Parasite', poster: 'https://hobby.nepoba.com/posters/Maaveeran.jpeg', rating: 8.5, type: false, year: 2019, categoryName: ['Drama', 'Thriller'] },
//       { id: 12, title: 'The Godfather', poster: 'https://hobby.nepoba.com/posters/Maaveeran.jpeg', rating: 9.2, type: true, year: 1972, categoryName: ['Crime', 'Drama'] },

//     ]
//   };

//   // Additional content cards
//   const contentCards: ContentCard[] = [
//     {
//       id: 1,
//       type: 'youtube',
//       title: 'Top Movie Trailers This Week',
//       content: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
//     },
//     {
//       id: 2,
//       type: 'quote',
//       title: 'Cinema Quote of the Day',
//       content: 'The cinema is truth 24 frames per second.',
//       author: 'Jean-Luc Godard'
//     },
//     {
//       id: 3,
//       type: 'youtube',
//       title: 'Behind The Scenes',
//       content: 'https://www.youtube.com/embed/9bZkp7q19f0',
//     }
//   ];

//   const featuredRef = useRef<HTMLDivElement>(null);
// const [slideIndex, setSlideIndex] = useState(0);

// useEffect(() => {
//   const interval = setInterval(() => {
//     setSlideIndex((prev) => (prev + 1) % 6);
//   }, 3500);
//   return () => clearInterval(interval);
// }, []);

// useEffect(() => {
//   if (featuredRef.current) {
//     featuredRef.current.scrollTo({
//       left: slideIndex * 240,
//       behavior: "smooth",
//     });
//   }
// }, [slideIndex]);

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <Head>
//         <title>MovieHub - Browse Movies & More</title>
//         <meta name="description" content="Browse movies, videos, and quotes" />
//       </Head>

//       <Navbar/>

//       <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row">
//         {/* Main Content */}
//         <main className="flex-1 lg:mr-8">
//           {/* Navigation Cards - Updated as requested */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//             {/* Translated Only Card */}
//             <Link href="/translated-movies" passHref>
//               <div className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition-all">
//                 <div className="flex items-center">
//                   <h3 className="font-bold text-lg">Agasobanuye</h3>
//                   <span className="ml-2 bg-blue-500 text-xs px-2 py-1 rounded">Localized</span>
//                 </div>
//                 <p className="text-sm text-gray-400">Movies&nbsp;with&nbsp;translated&nbsp;versions</p>
//               </div>
//             </Link>

//             {/* Original Only Card */}
//             <Link href="/original-movies" passHref>
//               <div className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition-all">
//                 <div className="flex items-center">
//                   <h3 className="font-bold text-lg">Original Only</h3>
//                   <span className="ml-2 bg-green-500 text-xs px-2 py-1 rounded">English</span>
//                 </div>
//                 <p className="text-sm text-gray-400">Movies in original language</p>
//               </div>
//             </Link>

//             {/* Inspiration Quotes Card */}
//             <Link href="/inspiration-quotes" passHref>
//               <div className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition-all">
//                 <div className="flex items-center">
//                   <h3 className="font-bold text-lg">Quotes</h3>
//                   <span className="ml-2 bg-purple-500 text-xs px-2 py-1 rounded">Wisdom</span>
//                 </div>
//                 <p className="text-sm text-gray-400">Motivational movie quotes</p>
//               </div>
//             </Link>

//             {/* Videos Card */}
//             <Link href="/videos" passHref>
//               <div className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition-all">
//                 <div className="flex items-center">
//                   <h3 className="font-bold text-lg">Videos</h3>
//                   <span className="ml-2 bg-red-500 text-xs px-2 py-1 rounded">Watch</span>
//                 </div>
//                 <p className="text-sm text-gray-400">Movie trailers & clips</p>
//               </div>
//             </Link>
//           </div>

//           {/* Content Cards Section */}
//          <section className="mb-8">
//   <h2 className="text-xl font-bold mb-4">Featured Movies</h2>
//   <div className="relative">
//     <div
//       ref={featuredRef}
//       className="flex overflow-x-auto space-x-6 scrollbar-none pb-2 transition-all"
//       style={{ scrollBehavior: "smooth" }}
//     >
//       {moviesData.trending.translated
//         .concat(moviesData.trending.nonTranslated)
//         .slice(0, 4)
//         .map((movie) => (
//           <div
//             key={`featured-${movie.id}`}
//             className="min-w-[220px] max-w-[240px] bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 flex-shrink-0"
//           >
//             <MovieCard movie={movie} />
//           </div>
//         ))}
//     </div>
//     {/* Optional: Add left/right buttons for manual sliding */}
//     <button
//       className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-900/70 text-white p-2 rounded-full z-10 hover:bg-red-600 transition hidden sm:block"
//       onClick={() => {
//         if (featuredRef.current) {
//           featuredRef.current.scrollBy({ left: -240, behavior: "smooth" });
//         }
//       }}
//       aria-label="Scroll left"
//       type="button"
//     >
//       &#8592;
//     </button>
//     <button
//       className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-900/70 text-white p-2 rounded-full z-10 hover:bg-red-600 transition hidden sm:block"
//       onClick={() => {
//         if (featuredRef.current) {
//           featuredRef.current.scrollBy({ left: 240, behavior: "smooth" });
//         }
//       }}
//       aria-label="Scroll right"
//       type="button"
//     >
//       &#8594;
//     </button>
//   </div>
// </section>

//           {/* Tabs */}
//           <div className="flex border-b border-gray-700 mb-6">
//             <button
//               onClick={() => setActiveTab('trending')}
//               className={`px-4 py-2 font-medium ${activeTab === 'trending' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-white'}`}
//             >
//               Trending Now
//             </button>
//             <button
//               onClick={() => setActiveTab('recent')}
//               className={`px-4 py-2 font-medium ${activeTab === 'recent' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-white'}`}
//             >
//               Recent Releases
//             </button>
//           </div>

//           {/* Movie Sections */}
//           <section className="mb-12">
//             <div className="flex items-center mb-4">
//               <h2 className="text-xl font-bold">Translated Movies</h2>
//               <span className="ml-2 bg-blue-500 text-xs px-2 py-1 rounded">
//                 Localized Versions
//               </span>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {moviesData[activeTab].translated.map((movie) => (
//                 <MovieCard key={`translated-${movie.id}`} movie={movie} />
//               ))}
//             </div>
//           </section>

//           <section>
//             <div className="flex items-center mb-4">
//               <h2 className="text-xl font-bold">Original Version Movies</h2>
//               <span className="ml-2 bg-green-500 text-xs px-2 py-1 rounded">
//                 English Version
//               </span>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {moviesData[activeTab].nonTranslated.map((movie) => (
//                 <MovieCard key={`nonTranslated-${movie.id}`} movie={movie} />
//               ))}
//             </div>
//           </section>
//         </main>

//         {/* Sidebar */}
//         <aside className="w-full lg:w-80 mt-8 lg:mt-0">
//           <div className="bg-gray-800 rounded-lg p-4 sticky top-4">
//             <div className="flex border-b border-gray-700 mb-4">
//               <button
//                 className={`flex-1 py-2 font-medium ${activeTab === 'trending' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-white'}`}
//                 onClick={() => setActiveTab('trending')}
//               >
//                 Trending
//               </button>
//               <button
//                 className={`flex-1 py-2 font-medium ${activeTab === 'recent' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-white'}`}
//                 onClick={() => setActiveTab('recent')}
//               >
//                 Recent
//               </button>
//             </div>
//             <h2 className="text-xl font-bold mb-4">Recommended For You</h2>
//             <div className="space-y-4">
//               {sidebarMovies[activeTab].map((movie) => (
//                 <SidebarMovieCard key={`sidebar-${movie.id}`} movie={movie} />
//               ))}
//             </div>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// };

// // Movie Card Component
// const MovieCard = ({ movie }: { movie: Movie }) => {
//   return (
//     <Link href={`/movies/${movie.id}`} passHref>
//       <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition duration-300 cursor-pointer">
//         <div className="relative">
//           <img
//             src={movie.poster}
//             alt={movie.title}
//             className="w-full h-64 object-cover"
//             onError={(e) => {
//               (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x450?text=Poster+Not+Available';
//             }}
//           />
//           {movie.type ? (
//             <span className="absolute top-2 right-2 bg-blue-500 text-xs px-2 py-1 rounded">
//               Translated
//             </span>
//           ) : (
//             <span className="absolute top-2 right-2 bg-green-500 text-xs px-2 py-1 rounded">
//               Original
//             </span>
//           )}
//           <div className="absolute bottom-2 left-2 bg-yellow-500 text-black text-sm px-2 py-1 rounded flex items-center">
//             ⭐ {movie.rating}
//           </div>
//         </div>
//         <div className="p-4">
//           <h3 className="font-bold text-lg mb-1 truncate">{movie.title}</h3>
//           <div className="flex justify-between text-sm text-gray-400">
//             <span>{movie.year}</span>
//             <span className="truncate max-w-[120px]">{movie.categoryName}</span>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// // Sidebar Movie Card Component
// const SidebarMovieCard = ({ movie }: { movie: Movie }) => {
//   return (
//     <Link href={`/movies/${movie.id}`} passHref>
//       <div className="flex space-x-3 hover:bg-gray-700 p-2 rounded cursor-pointer">
//         <img
//           src={movie.poster}
//           alt={movie.title}
//           className="w-16 h-20 object-cover rounded"
//           onError={(e) => {
//             (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64x80?text=Poster';
//           }}
//         />
//         <div className="flex-1">
//           <h4 className="font-medium text-sm line-clamp-1">{movie.title}</h4>
//           <div className="flex items-center text-xs text-gray-400 mt-1">
//             <span>⭐ {movie.rating}</span>
//             <span className="mx-2">•</span>
//             <span>{movie.year}</span>
//           </div>
//           {movie.type ? (
//             <span className="text-xs bg-blue-500 px-1 rounded inline-block mt-1">
//               Translated
//             </span>
//           ) : (
//             <span className="text-xs bg-green-500 px-1 rounded inline-block mt-1">
//               Original
//             </span>
//           )}
//         </div>
//       </div>
//     </Link>
//   );
// };

// // Content Card Component
// const ContentCard = ({ card }: { card: ContentCard }) => {
//   return (
//     <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition duration-300">
//       <div className="p-4">
//         <h3 className="font-bold text-lg mb-2">{card.title}</h3>
//         {card.type === 'youtube' ? (
//           <div className="aspect-w-16 aspect-h-9">
//             <iframe
//               src={card.content}
//               className="w-full h-48"
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//               title={card.title}
//             ></iframe>
//           </div>
//         ) : (
//           <div className="bg-gray-700 p-4 rounded">
//             <p className="italic text-gray-300">"{card.content}"</p>
//             {card.author && (
//               <p className="text-right mt-2 text-gray-400">— {card.author}</p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;

"use client";
import { useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useMovieContext } from "@/context/movieContext";

interface Movie {
  id: string;
  title: string;
  poster: string;
  rating: number;
  type: types;
  year: number;
  categoryName: string;
}

type types = "ORIGINAL" | "TRANSLATED";

interface ContentCard {
  id: number;
  type: "youtube" | "quote";
  title: string;
  content: string;
  author?: string;
}

const Home: NextPage = () => {
  const { movies, originals, loading } = useMovieContext();
  const [activeTab, setActiveTab] = useState<"trending" | "recent">("trending");

  // Sample data
  const trailersRef = useRef<HTMLDivElement>(null); // Add this
  // get first 12 movies
  const translated = movies.filter((movie) => {
    if (movie.type === "TRANSLATED") {
      return {
        id: movie.id,
        title: movie.title,
        poster: movie.poster,
        rating: movie.rating,
        type: movie.type,
        year: movie.year,
        categoryName: movie.categoryName,
        createdAt: movie.createdAt,
      };
    }
  });

  const nonTranslated = originals.filter((movie) => {
    if (movie.type === "ORIGINAL") {
      return {
        id: movie.id,
        title: movie.title,
        poster: movie.poster,
        rating: movie.rating,
        type: movie.type,
        year: movie.year,
        categoryName: movie.categoryName,
        createdAt: movie.createdAt,
      };
    }
  });

  const moviesData = {
    trending: {
      translated: translated.slice(0, 12),
      nonTranslated: nonTranslated.slice(0, 12),
    },
    recent: {
      translated: translated.slice(0, 2),
      nonTranslated: nonTranslated.slice(0, 2),
    },
  };

  const sidebarMovies = nonTranslated
    .slice(0, 3)
    .concat(translated.slice(0, 3));

  // Additional content cards
  const contentCards: ContentCard[] = [
    {
      id: 1,
      type: "youtube",
      title: "Top Movie Trailers This Week",
      content: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: 2,
      type: "quote",
      title: "Cinema Quote of the Day",
      content: "The cinema is truth 24 frames per second.",
      author: "Jean-Luc Godard",
    },
    {
      id: 3,
      type: "youtube",
      title: "Behind The Scenes",
      content: "https://www.youtube.com/embed/9bZkp7q19f0",
    },
    {
      id: 3,
      type: "youtube",
      title: "Behind The Scenes",
      content: "https://www.youtube.com/embed/9bZkp7q19f0",
    },
  ];

  const featuredRef = useRef<HTMLDivElement>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % 6);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (featuredRef.current) {
      featuredRef.current.scrollTo({
        left: slideIndex * 240,
        behavior: "smooth",
      });
    }
  }, [slideIndex]);

  // Skeleton Loader Components
  const NavigationCardsSkeleton = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8  scrollbar-none">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-gray-800 p-4 rounded-lg">
          <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );

  const ContentCardsSkeleton = () => (
    <div className="mb-8">
      <div className="h-8 bg-gray-800 rounded w-1/3 mb-4"></div>
      <div className="flex overflow-x-auto space-x-4 pb-2  scrollbar-none">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="min-w-[160px] md:min-w-[220px] bg-gray-800 rounded-lg flex-shrink-0"
          >
            <div className="h-48 bg-gray-700 rounded-t-lg"></div>
            <div className="p-4">
              <div className="h-6 bg-gray-700 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const MovieGridSkeleton = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-gray-800 rounded-lg overflow-hidden  scrollbar-none">
          <div className="w-full h-48 md:h-64 bg-gray-700"></div>
          <div className="p-4">
            <div className="h-6 bg-gray-700 rounded w-full mb-2"></div>
            <div className="flex justify-between">
              <div className="h-4 bg-gray-700 rounded w-1/4"></div>
              <div className="h-4 bg-gray-700 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const SidebarSkeleton = () => (
    <div className="hidden lg:block w-full lg:w-80 mt-8 lg:mt-0">
      <div className="bg-gray-800 rounded-lg p-4 sticky top-4">
        <div className="flex border-b border-gray-700 mb-4">
          <div className="flex-1 py-2 h-10 bg-gray-700 rounded"></div>
          <div className="flex-1 py-2 h-10 bg-gray-700 rounded"></div>
        </div>
        <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex space-x-3 p-2">
              <div className="w-16 h-20 bg-gray-700 rounded"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>MovieHub - Browse Movies & More</title>
        <meta name="description" content="Browse movies, videos, and quotes" />
      </Head>

      <Navbar />

      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row">
        {/* Main Content */}
        <main className="flex-1 lg:mr-8 overflow-hidden">
          {" "}
          {/* Added overflow-hidden */}
          {/* Loading State */}
          {loading ? (
            <>
              <NavigationCardsSkeleton />
              <ContentCardsSkeleton />
              <div className="mb-8">
                <div className="h-8 bg-gray-800 rounded w-1/4 mb-4"></div>
                <ContentCardsSkeleton />
              </div>

              {/* Tabs Skeleton */}
              <div className="flex border-b border-gray-700 mb-6">
                <div className="h-10 bg-gray-800 rounded w-1/2 mr-2"></div>
                <div className="h-10 bg-gray-800 rounded w-1/2"></div>
              </div>

              {/* Movie Sections Skeleton */}
              <section className="mb-12">
                <div className="flex items-center mb-4">
                  <div className="h-8 bg-gray-800 rounded w-1/4"></div>
                  <div className="ml-2 h-6 bg-gray-800 rounded w-1/5"></div>
                </div>
                <MovieGridSkeleton />
              </section>

              <section>
                <div className="flex items-center mb-4">
                  <div className="h-8 bg-gray-800 rounded w-1/3"></div>
                  <div className="ml-2 h-6 bg-gray-800 rounded w-1/6"></div>
                </div>
                <MovieGridSkeleton />
              </section>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
                {/* Translated Only Card */}
                <Link href="/movies" passHref>
                  <div className="bg-gray-800 p-3 md:p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition-all">
                    <div className="flex items-center">
                      <h3 className="font-bold text-sm md:text-lg">
                        Agasobanuye
                      </h3>
                      <span className="ml-1 md:ml-2 bg-blue-500 text-xs px-1 md:px-2 py-1 rounded">
                        Localized
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-400">
                      Movies with translations
                    </p>
                  </div>
                </Link>

                {/* Original Only Card */}
                <Link href="/english-version" passHref>
                  <div className="bg-gray-800 p-3 md:p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition-all">
                    <div className="flex items-center">
                      <h3 className="font-bold text-sm md:text-lg">
                        Original Only
                      </h3>
                      <span className="ml-1 md:ml-2 bg-green-500 text-xs px-1 md:px-2 py-1 rounded">
                        English
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-400">
                      Original language
                    </p>
                  </div>
                </Link>

                {/* Inspiration Quotes Card */}
                <Link href="/quotes" passHref>
                  <div className="bg-gray-800 p-3 md:p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition-all">
                    <div className="flex items-center">
                      <h3 className="font-bold text-sm md:text-lg">Quotes</h3>
                      <span className="ml-1 md:ml-2 bg-purple-500 text-xs px-1 md:px-2 py-1 rounded">
                        Wisdom
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-400">
                      Movie quotes
                    </p>
                  </div>
                </Link>

                {/* Videos Card */}
                <Link href="/videos" passHref>
                  <div className="bg-gray-800 p-3 md:p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition-all">
                    <div className="flex items-center">
                      <h3 className="font-bold text-sm md:text-lg">Videos</h3>
                      <span className="ml-1 md:ml-2 bg-red-500 text-xs px-1 md:px-2 py-1 rounded">
                        Watch
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-400">
                      Trailers & clips
                    </p>
                  </div>
                </Link>
              </div>
              {/* <section className="mb-8 w-full">
                <h2 className="text-xl font-bold mb-4">Latest Trailer</h2>
                <div className="relative w-full">
                  <div
                    ref={trailersRef}
                    className="flex overflow-x-auto w-full scrollbar-none pb-2"
                    style={{ scrollBehavior: "smooth" }}
                  >
                    <div className="flex space-x-4 md:space-x-6 first:pl-4 last:pr-4">
                      {contentCards.map((card) => (
                        <div
                          key={`trailer-${card.id}`}
                          className="flex-shrink-0 w-[calc(50vw-2rem)] md:w-[220px] h-[280px]" // Fixed height
                        >
                          <div className="w-full h-full bg-gray-800 rounded-lg overflow-hidden">
                            <ContentCard card={card} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section> */}

              {/* Featured Movies Section - Fixed */}
              <section className="mb-8 w-full">
                <h2 className="text-xl font-bold mb-4">Featured Movies</h2>
                <div className="relative w-full">
                  <div
                    ref={featuredRef}
                    className="flex overflow-x-auto w-full scrollbar-none pb-2"
                    style={{ scrollBehavior: "smooth" }}
                  >
                    <div className="flex space-x-4 md:space-x-6">
                      {moviesData.trending.translated
                        .concat(moviesData.trending.nonTranslated)
                        .sort(
                          (a, b) =>
                            new Date(b.createdAt).getTime() -
                            new Date(a.createdAt).getTime()
                        )
                        .map((movie) => (
                          <div
                            key={`featured-${movie.id}`}
                            className="flex-shrink-0 w-[calc(50vw-2rem)] md:w-[220px]"
                          >
                            <div className="w-full bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
                              <MovieCard movie={movie} />
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Navigation buttons */}
                  {moviesData.trending.translated.concat(
                    moviesData.trending.nonTranslated
                  ).length > 4 && (
                    <>
                      <button
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-900/70 text-white p-2 rounded-full z-10 hover:bg-red-600 transition hidden sm:block"
                        onClick={() =>
                          featuredRef.current?.scrollBy({
                            left: -240,
                            behavior: "smooth",
                          })
                        }
                      >
                        &#8592;
                      </button>
                      <button
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-900/70 text-white p-2 rounded-full z-10 hover:bg-red-600 transition hidden sm:block"
                        onClick={() =>
                          featuredRef.current?.scrollBy({
                            left: 240,
                            behavior: "smooth",
                          })
                        }
                      >
                        &#8594;
                      </button>
                    </>
                  )}
                </div>
              </section>

              {/* Rest of your content... */}
              {/* Tabs */}
              <div className="flex border-b border-gray-700 mb-6">
                {/* <button
            className={`px-4 py-2 font-medium ${activeTab === 'trending' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('trending')}
          >
            Trending Now
          </button> */}
                <button
                  className={`px-4 py-2 font-medium text-red-500 border-b-2 border-red-500}`}
                  // onClick={() => setActiveTab('recent')}
                >
                  Recent Releases
                </button>
              </div>

              {/* Movie Grid Sections */}
              <section className="mb-12">
                <div className="flex items-center mb-4">
                  <h2 className="text-xl font-bold">Translated Movies</h2>
                  <span className="ml-2 bg-blue-500 text-xs px-2 py-1 rounded">
                    Localized Versions
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {moviesData[activeTab].translated.map((movie: Movie) => (
                    <MovieCard key={`translated-${movie.id}`} movie={movie} />
                  ))}
                </div>
              </section>

              <section>
                <div className="flex items-center mb-4">
                  <h2 className="text-xl font-bold">Original Version Movies</h2>
                  <span className="ml-2 bg-green-500 text-xs px-2 py-1 rounded">
                    English Version
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {moviesData[activeTab].nonTranslated.map((movie) => (
                    <MovieCard
                      key={`nonTranslated-${movie.id}`}
                      movie={movie}
                    />
                  ))}
                </div>
              </section>
            </>
          )}
        </main>

        {/* Sidebar */}
        {loading ? (
          <SidebarSkeleton />
        ) : (
          <aside className="hidden lg:block w-full lg:w-80 mt-8 lg:mt-0">
            <div className="bg-gray-800 rounded-lg p-4 sticky top-4">
              <div className="flex border-b border-gray-700 mb-4">
                <button
                  className={`flex-1 py-2 font-medium text-red-500 border-b-2 border-red-500`}
                  // onClick={() => setActiveTab('trending')}
                >
                  Trending
                </button>
                {/* <button
            className={`flex-1 py-2 font-medium ${activeTab === 'recent' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('recent')}
          >
            Recent
          </button> */}
              </div>
              <h2 className="text-xl font-bold mb-4">Recommended For You</h2>
              <div className="space-y-4">
                {sidebarMovies
                  .sort((a, b) => b.year - a.year)
                  .map((movie) => (
                    <SidebarMovieCard
                      key={`sidebar-${movie.id}`}
                      movie={movie}
                    />
                  ))}
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

// Movie Card Component - Responsive adjustments
const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <Link
      href={
        movie.type === "TRANSLATED"
          ? `/play/${movie.id}/movie`
          : `/play/${movie.id}/english-version`
      }
      passHref
    >
      <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition duration-300 cursor-pointer">
        <div className="relative">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-48 md:h-64 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/300x450?text=Poster+Not+Available";
            }}
          />
          {movie.type === "TRANSLATED" ? (
            <span className="absolute top-1 md:top-2 right-1 md:right-2 bg-blue-500 text-xs px-1 md:px-2 py-1 rounded">
              Translated
            </span>
          ) : (
            <span className="absolute top-1 md:top-2 right-1 md:right-2 bg-green-500 text-xs px-1 md:px-2 py-1 rounded">
              Original
            </span>
          )}
          <div className="absolute bottom-1 md:bottom-2 left-1 md:left-2 bg-yellow-500 text-black text-xs md:text-sm px-1 md:px-2 py-1 rounded flex items-center">
            ⭐ {movie.rating}
          </div>
        </div>
        <div className="p-2 md:p-4">
          <h3 className="font-bold text-sm md:text-lg mb-1 truncate">
            {movie.title}
          </h3>
          <div className="flex justify-between text-xs md:text-sm text-gray-400">
            <span>{movie.year}</span>
            <span className="truncate max-w-[80px] md:max-w-[120px]">
              {movie.categoryName}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Sidebar Movie Card Component
const SidebarMovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <Link
      href={
        movie.type === "TRANSLATED"
          ? `/play/${movie.id}/movie`
          : `/play/${movie.id}/english-version`
      }
      passHref
    >
      <div className="flex space-x-3 hover:bg-gray-700 p-2 rounded cursor-pointer">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-16 h-20 object-cover rounded"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/64x80?text=Poster";
          }}
        />
        <div className="flex-1">
          <h4 className="font-medium text-sm line-clamp-1">{movie.title}</h4>
          <div className="flex items-center text-xs text-gray-400 mt-1">
            <span>⭐ {movie.rating}</span>
            <span className="mx-2">•</span>
            <span>{movie.year}</span>
          </div>
          {movie.type === "TRANSLATED" ? (
            <span className="text-xs bg-blue-500 px-1 rounded inline-block mt-1">
              Translated
            </span>
          ) : (
            <span className="text-xs bg-green-500 px-1 rounded inline-block mt-1">
              Original
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

// Content Card Component
const ContentCard = ({ card }: { card: ContentCard }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition duration-300">
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{card.title}</h3>
        {card.type === "youtube" ? (
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={card.content}
              className="w-full h-48"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={card.title}
            ></iframe>
          </div>
        ) : (
          <div className="bg-gray-700 p-4 rounded">
            <p className="italic text-gray-300">"{card.content}"</p>
            {card.author && (
              <p className="text-right mt-2 text-gray-400">— {card.author}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;
