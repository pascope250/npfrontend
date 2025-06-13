'use client';
import type { NextPage } from 'next';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import { QuoteContextType, useQuoteContext } from '@/context/quoteContext';
import {
  HeartIcon,
  BoltIcon,
  ComputerDesktopIcon,
  FaceSmileIcon,
  UsersIcon,
  LightBulbIcon,
  StarIcon,
  UserIcon,
  FaceFrownIcon,
  SparklesIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/solid';
import React, { JSX } from 'react';
import AdInFeed from '@/components/ads/AdInFeed';

const categoryColors: Record<string, string> = {
  love: 'bg-pink-100 text-pink-600',
  motivational: 'bg-orange-100 text-orange-600',
  technology: 'bg-blue-100 text-blue-600',
  attitude: 'bg-purple-100 text-purple-600',
  life: 'bg-green-100 text-green-600',
  inspirational: 'bg-yellow-100 text-yellow-600',
  success: 'bg-teal-100 text-teal-600',
  friendship: 'bg-sky-100 text-sky-600',
  funny: 'bg-amber-100 text-amber-600',
  nature: 'bg-lime-100 text-lime-600',
  All: 'bg-gray-200 text-gray-600',
};

const categoryIcons: Record<string, JSX.Element> = {
  love: <HeartIcon className="w-5 h-5" />,
  motivational: <BoltIcon className="w-5 h-5" />,
  technology: <ComputerDesktopIcon className="w-5 h-5" />,
  attitude: <UserIcon className="w-5 h-5" />,
  life: <GlobeAltIcon className="w-5 h-5" />,
  inspirational: <LightBulbIcon className="w-5 h-5" />,
  success: <StarIcon className="w-5 h-5" />,
  friendship: <UsersIcon className="w-5 h-5" />,
  funny: <FaceSmileIcon className="w-5 h-5" />,
  nature: <SparklesIcon className="w-5 h-5" />,
  All: <FaceFrownIcon className="w-5 h-5" />,
};

const PAGE_SIZE = 20;

const QuotesPage: NextPage = () => {
  const { Quotes: quotes, loading } = useQuoteContext();
  const [visibleQuotes, setVisibleQuotes] = React.useState<any[]>([]);
  const [hasMore, setHasMore] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [isFetching, setIsFetching] = React.useState(false);

  // Load first 20 on mount or when quotes change
  React.useEffect(() => {
    if (quotes && quotes.length > 0) {
      setVisibleQuotes(quotes.slice(0, PAGE_SIZE));
      setPage(1);
      setHasMore(quotes.length > PAGE_SIZE);
    }
  }, [quotes]);

  // Infinite scroll handler
  React.useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
        !loading &&
        hasMore &&
        !isFetching
      ) {
        setIsFetching(true);
        setTimeout(() => {
          setVisibleQuotes(prev => {
            const nextPage = page + 1;
            const nextQuotes = quotes.slice(0, nextPage * PAGE_SIZE);
            setPage(nextPage);
            setHasMore(nextQuotes.length < quotes.length);
            setIsFetching(false);
            return nextQuotes;
          });
        }, 500); // Simulate loading delay
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [quotes, loading, hasMore, page, isFetching]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <Head>
        <title>My Hobbies | Quotes</title>
        <meta name="description" content="Inspiring and thought-provoking quotes" />
      </Head>
      <Navbar />

      {loading ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-500 mb-4 shadow-lg"></div>
            <span className="text-emerald-400 text-lg font-semibold tracking-wide drop-shadow-lg">
              Loading...
            </span>
          </div>
        </div>
      ) : (
        <main className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-extrabold text-emerald-700 mb-10 text-center drop-shadow-lg">
            Inspiring Quotes
          </h1>
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
            {visibleQuotes.map((quote, index) => {
  const colorClass = categoryColors[quote.category?.toLowerCase()] || categoryColors.All;
  const icon = categoryIcons[quote.category?.toLowerCase()] || categoryIcons.All;

  return (
    <React.Fragment key={index}>
      <div className="bg-white/90 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow border border-emerald-100 flex flex-col justify-between">
        <blockquote className="text-2xl italic text-gray-800 mb-6 leading-relaxed text-center">
          “{quote.quote}”
        </blockquote>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mt-auto">
          <span className={`flex items-center gap-2 px-4 py-1 rounded-full text-sm font-medium shadow ${colorClass}`}>
            {icon}
            {quote.category}
          </span>
        </div>
      </div>

      {/* Show ad after every 3 quotes */}
      {(index + 1) % 3 === 0 && <AdInFeed />}
    </React.Fragment>
  );
})}

            {isFetching && (
              <div className="col-span-full flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-emerald-500"></div>
              </div>
            )}
          </div>
        </main>
      )}
    </div>
  );
};

export default QuotesPage;