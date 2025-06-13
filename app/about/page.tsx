
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>About HobbyVb - Your Gateway to Creative Pursuits</title>
        <meta name="description" content="Learn about HobbyVb's mission to connect people with their passions through curated content" />
      </Head>
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About HobbyVb</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connecting enthusiasts with the resources they need to explore, learn, and grow in their favorite hobbies
            </p>
          </div>

          {/* Our Story */}
          <section className="mb-16 bg-white p-8 rounded-lg shadow-sm">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  HobbyVb was born from a simple idea: the world is full of amazing hobbies, but discovering quality resources can be overwhelming.
                </p>
                <p className="text-gray-600 mb-4">
                  Founded in 2023, we set out to create a centralized platform where hobbyists of all levels could find curated content to fuel their passions.
                </p>
                <p className="text-gray-600">
                  Today, we serve millions of creative minds worldwide, helping them find inspiration and community.
                </p>
              </div>
              <div className="md:w-1/2">
                <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center text-gray-400">
                  {/* [Placeholder for team photo or illustration] */}
                </div>
              </div>
            </div>
          </section>

          {/* What We Offer */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-blue-600 text-3xl mb-4">🎬</div>
                <h3 className="text-xl font-semibold mb-3">Video Collections</h3>
                <p className="text-gray-600">
                  Curated YouTube videos showcasing techniques, tutorials, and inspiration across hundreds of hobbies.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-blue-600 text-3xl mb-4">🎥</div>
                <h3 className="text-xl font-semibold mb-3">Movie Recommendations</h3>
                <p className="text-gray-600">
                  Discover films that celebrate various hobbies and crafts, from woodworking to painting.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-blue-600 text-3xl mb-4">💬</div>
                <h3 className="text-xl font-semibold mb-3">Inspirational Quotes</h3>
                <p className="text-gray-600">
                  Motivational words from masters and enthusiasts to keep your creative juices flowing.
                </p>
              </div>
            </div>
          </section>

          {/* How We Work */}
          <section className="mb-16 bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How We Work</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-blue-600">Content Aggregation</h3>
                <p className="text-gray-600 mb-4">
                  We carefully select and organize content from reputable sources across the web, including:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>YouTube (via their public API)</li>
                  <li>Public movie databases</li>
                  <li>Quote collections and APIs</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-blue-600">Important Disclosures</h3>
                <p className="text-gray-600 mb-4">
                  Transparency is important to us. Please note:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>We do not host any video files on our servers</li>
                  <li>All embedded content links back to its original source</li>
                  <li>We comply with all third-party platform terms of service</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                <h3 className="text-lg font-semibold mb-2 text-blue-700">Our Content Philosophy</h3>
                <p className="text-blue-800">
                  "We believe in celebrating creativity in all its forms while respecting intellectual property rights. 
                  Our goal is to direct traffic to original creators, not away from them."
                </p>
              </div>
            </div>
          </section>

          {/* Meet the Team */}
          {/* <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Meet the Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="bg-gray-200 h-32 w-32 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-400">
                  [Photo]
                </div>
                <h3 className="text-xl font-semibold">Alex Johnson</h3>
                <p className="text-gray-500 mb-3">Founder & CEO</p>
                <p className="text-gray-600 text-sm">
                  Passionate woodworker and lifelong hobby collector
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="bg-gray-200 h-32 w-32 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-400">
                  [Photo]
                </div>
                <h3 className="text-xl font-semibold">Sam Chen</h3>
                <p className="text-gray-500 mb-3">Content Curator</p>
                <p className="text-gray-600 text-sm">
                  Film buff and amateur photographer
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="bg-gray-200 h-32 w-32 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-400">
                  [Photo]
                </div>
                <h3 className="text-xl font-semibold">Taylor Smith</h3>
                <p className="text-gray-500 mb-3">Developer</p>
                <p className="text-gray-600 text-sm">
                  Board game enthusiast and coding hobbyist
                </p>
              </div>
            </div>
          </section> */}

          {/* Call to Action */}
          <section className="bg-blue-600 text-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Explore?</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Join our community of passionate hobbyists and discover your next creative adventure
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/" className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition">
                Browse Hobbies
              </Link>
              <Link href="/contact" className="bg-transparent border border-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition">
                Contact Us
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}