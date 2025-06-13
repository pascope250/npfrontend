'use client';
import Navbar from '@/components/Navbar';
import Head from 'next/head';

export default function DMCAPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>DMCA & Copyright Policy - HobbyVb</title>
        <meta name="description" content="HobbyVb's DMCA and Copyright Policy" />
      </Head>
      <Navbar/>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">DMCA & Copyright Policy</h1>
          <p className="text-gray-600 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">1. Copyright Infringement Notification</h2>
              <p>
                HobbyVb respects the intellectual property rights of others and expects our users to do the same. 
                We respond to clear notices of alleged copyright infringement in accordance with the 
                Digital Millennium Copyright Act (DMCA).
              </p>
              <p className="mt-2">
                <strong>Important:</strong> We do not host any video files or content on our servers. 
                We aggregate and display content from third-party services like YouTube and other public APIs.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">2. Filing a DMCA Notice</h2>
              <p>
                If you believe your copyrighted work has been copied in a way that constitutes infringement, 
                please provide our Copyright Agent with the following information:
              </p>
              <ol className="list-decimal pl-5 mt-2 space-y-2">
                <li>A physical or electronic signature of the copyright owner or authorized agent</li>
                <li>Identification of the copyrighted work claimed to have been infringed</li>
                <li>Identification of the material that is claimed to be infringing (with URL)</li>
                <li>Your contact information (address, phone number, and email)</li>
                <li>
                  A statement that you have a good faith belief that use of the material is not authorized 
                  by the copyright owner
                </li>
                <li>
                  A statement that the information in the notification is accurate, and under penalty of 
                  perjury, that you are authorized to act on behalf of the owner
                </li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">3. Counter-Notification</h2>
              <p>
                If you believe your content was wrongly removed, you may send a counter-notification containing:
              </p>
              <ol className="list-decimal pl-5 mt-2 space-y-2">
                <li>Your physical or electronic signature</li>
                <li>Identification of the removed material and its location before removal</li>
                <li>
                  A statement under penalty of perjury that you believe the material was removed 
                  or disabled as a result of mistake or misidentification
                </li>
                <li>Your name, address, and telephone number</li>
                <li>
                  A statement that you consent to the jurisdiction of the federal court in your district, 
                  or if outside the U.S., to the jurisdiction where we are located
                </li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">4. Repeat Infringer Policy</h2>
              <p>
                In accordance with the DMCA and other applicable laws, we will terminate, in appropriate 
                circumstances, users who are repeat infringers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">5. Designated Copyright Agent</h2>
              <p>
                Please send DMCA notices and counter-notices to our designated agent:
              </p>
              <address className="not-italic mt-2 bg-gray-50 p-4 rounded">
                <p>Copyright Agent</p>
                <p>HobbyVb Legal Department</p>
                <p>123 Copyright Lane</p>
                <p>Legal City, LC 12345</p>
                <p>Email: <a href="mailto:copyright@HobbyVb.com" className="text-blue-600 hover:underline">copyright@HobbyVb.com</a></p>
              </address>
              <p className="mt-2 text-sm text-gray-600">
                Note: Only copyright-related notices should be sent to the Copyright Agent. 
                Other inquiries will be ignored.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">6. YouTube-Specific Information</h2>
              <p>
                For content accessed through YouTube's API services, you may also file a copyright 
                complaint directly with YouTube:
              </p>
              <p className="mt-2">
                <a href="https://support.google.com/youtube/answer/2807622" className="text-blue-600 hover:underline">
                  YouTube Copyright Complaint Process
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}