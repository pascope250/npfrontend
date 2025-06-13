'use client';
import Navbar from '@/components/Navbar';
import Head from 'next/head';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Privacy Policy - HobbyVb</title>
        <meta name="description" content="HobbyVb's Privacy Policy" />
      </Head>
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
              <p>
                Welcome to HobbyVb ("we," "our," or "us"). We are committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you visit our website HobbyVb.example (the "Site").
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">2. Information We Collect</h2>
              <h3 className="font-medium mb-2">2.1 Personal Data</h3>
              <p>
                We may collect personally identifiable information when you voluntarily provide it, such as:
              </p>
              <ul className="list-disc pl-5 mb-4">
                <li>Name and email address (when contacting us)</li>
                <li>Account information (if registration is available)</li>
              </ul>
              
              <h3 className="font-medium mb-2">2.2 Non-Personal Data</h3>
              <p>
                We automatically collect certain information when you visit our Site:
              </p>
              <ul className="list-disc pl-5">
                <li>Browser type and version</li>
                <li>Pages visited and time spent</li>
                <li>Referring website addresses</li>
                <li>IP address (anonymized where possible)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-5">
                <li>Provide and maintain our service</li>
                <li>Respond to your inquiries</li>
                <li>Improve user experience</li>
                <li>Monitor usage and analyze trends</li>
                <li>Prevent fraudulent activity</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">4. Third-Party Services</h2>
              <p>
                Our Site integrates with and relies on several third-party services:
              </p>
              <ul className="list-disc pl-5 mb-4">
                <li>
                  <strong>YouTube API Services:</strong> We use YouTube's API services to display video content. 
                  By using our Site, you are agreeing to be bound by YouTube's 
                  <a href="https://www.youtube.com/t/terms" className="text-blue-600 hover:underline ml-1">Terms of Service</a>.
                </li>
                <li>
                  <strong>Movie Data:</strong> Movie information is sourced from third-party providers. 
                  We do not host any video files on our servers.
                </li>
                <li>
                  <strong>Quotes API:</strong> Quotes are provided by public APIs and properly attributed.
                </li>
              </ul>
              <p>
                These third parties have their own privacy policies, and we encourage you to review them.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">5. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to track activity on our Site. 
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">6. Data Security</h2>
              <p>
                We implement reasonable security measures to protect your information. 
                However, no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">7. Children's Privacy</h2>
              <p>
                Our Site is not intended for children under 13. We do not knowingly collect personal 
                information from children under 13.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">8. Changes to This Policy</h2>
              <p>
                We may update our Privacy Policy periodically. We will notify you of any changes by 
                posting the new policy on this page.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">9. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at 
                <a href="mailto:privacy@HobbyVb.example" className="text-blue-600 hover:underline ml-1">privacy@HobbyVb.com</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}