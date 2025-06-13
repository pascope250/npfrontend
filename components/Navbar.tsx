
// for client
'use client'

import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white hover:text-emerald-400 transition-colors">
          HobbyVb
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link 
            href="/movies" 
            className="text-white hover:text-emerald-400 transition-colors font-medium"
          >
            Agasobanuye
          </Link>
          <Link 
            href="/quotes" 
            className="text-white hover:text-emerald-400 transition-colors font-medium"
          >
            Quotes
          </Link>
          <Link 
            href="/videos" 
            className="text-white hover:text-emerald-400 transition-colors font-medium"
          >
            YouTube Videos
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
            />
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-4 pt-2 pb-4 space-y-2">
          <Link 
            href="/movies" 
            className="block text-white hover:text-emerald-400 transition-colors py-2"
            onClick={() => setIsOpen(false)}
          >
            Agasobanuye
          </Link>
          <Link 
            href="/quotes" 
            className="block text-white hover:text-emerald-400 transition-colors py-2"
            onClick={() => setIsOpen(false)}
          >
            Quotes
          </Link>
          <Link 
            href="/videos" 
            className="block text-white hover:text-emerald-400 transition-colors py-2"
            onClick={() => setIsOpen(false)}
          >
            YouTube Videos
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;