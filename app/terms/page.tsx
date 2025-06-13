'use client';
import Navbar from '@/components/Navbar';
import Head from 'next/head';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Terms of Service - HobbyVb</title>
        <meta name="description" content="HobbyVb's Terms of Service" />
      </Head>

      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing or using HobbyVb ("the Site"), you agree to be bound by these Terms of Service. 
                If you disagree with any part, you may not access the Site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">2. Description of Service</h2>
              <p>
                HobbyVb is a platform that aggregates content related to various hobbies, including:
              </p>
              <ul className="list-disc pl-5">
                <li>Videos from YouTube (via YouTube API)</li>
                <li>Movie information from third-party providers</li>
                <li>Quotes from public APIs</li>
              </ul>
              <p className="mt-2">
                <strong>Important:</strong> We do not host any video files or content on our servers. 
                All content is provided by third-party services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">3. User Responsibilities</h2>
              <p>You agree not to:</p>
              <ul className="list-disc pl-5">
                <li>Use the Site for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with the Site's operation</li>
                <li>Use automated systems to access the Site without permission</li>
                <li>Violate YouTube's Terms of Service when accessing video content</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">4. Intellectual Property</h2>
              <p>
                All content on our Site, except user-generated and third-party content, is our property. 
                You may not reproduce, distribute, or create derivative works without permission.
              </p>
              <p className="mt-2">
                For YouTube content, you must comply with YouTube's Terms of Service and any copyright restrictions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">5. Third-Party Content</h2>
              <p>
                The Site displays content from third parties. We:
              </p>
              <ul className="list-disc pl-5">
                <li>Do not host or upload any videos/movies</li>
                <li>Only embed or link to content hosted elsewhere</li>
                <li>Are not responsible for the accuracy or legality of third-party content</li>
              </ul>
              <p className="mt-2">
                If you believe any content infringes your rights, please see our 
                <a href="/dmca" className="text-blue-600 hover:underline ml-1">DMCA Policy</a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">6. Disclaimer of Warranties</h2>
              <p>
                The Site is provided "as is." We make no warranties about:
              </p>
              <ul className="list-disc pl-5">
                <li>The accuracy or completeness of content</li>
                <li>The availability of the Site</li>
                <li>That the Site will meet your requirements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">7. Limitation of Liability</h2>
              <p>
                We shall not be liable for any damages resulting from:
              </p>
              <ul className="list-disc pl-5">
                <li>Use or inability to use the Site</li>
                <li>Unauthorized access to your data</li>
                <li>Any third-party conduct or content</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">8. Termination</h2>
              <p>
                We may terminate or suspend access to our Site immediately, without prior notice, 
                for any breach of these Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">9. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. Your continued use constitutes acceptance.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">10. Governing Law</h2>
              <p>
                These Terms shall be governed by the laws of Rwanda/Kigali without regard to conflict of law provisions.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}