import type { NextPage } from 'next';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import MenuCard from '../components/MenuCard';
import { FaFilm, FaQuoteLeft, FaYoutube } from 'react-icons/fa';
// import AdMultiplex from '@/components/ads/AdMultiplex';
import GoogleAd from '@/components/ads/GoogleAd';
const Home: NextPage = () => {
  return (
    <div className="min-h-screen">
      <Head>
        <title>My HobbyVb | Home</title>
        <meta name="description" content="Explore my favorite hobbies" />
        <link rel="icon" href="/icon/favicon.ico" />
      </Head>

      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-primary mb-4">Welcome to HobbyVb</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore my favorite movies, inspiring quotes, and entertaining YouTube videos.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <MenuCard
            title="Agasobanuye"
            description="Explore my favorite movies and TV shows"
            href="/movies"
            icon={<FaFilm />}
            bgColor="bg-gradient-to-br from-purple-500 to-indigo-600"
          />

          <MenuCard
            title="Quotes"
            description="Inspiring and thought-provoking quotes"
            href="/quotes"
            icon={<FaQuoteLeft />}
            bgColor="bg-gradient-to-br from-blue-500 to-teal-400"
          />

          <MenuCard
            title="YouTube Videos"
            description="My favorite entertaining and educational videos, There is not need to Login or provide any Email"
            href="/videos"
            icon={<FaYoutube />}
            bgColor="bg-gradient-to-br from-red-500 to-pink-500"
          />
        </div>
        <GoogleAd />
      </main>

      
    </div>
  );
};

export default Home;