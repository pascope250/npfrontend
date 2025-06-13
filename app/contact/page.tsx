'use client';
import { useState } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import { useContactContext } from '@/context/contactContext';
import { toast, Toaster} from 'react-hot-toast';
export default function ContactPage() {
  const { addContactInquiry } = useContactContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all fields',{id: 'contact-toast'});
      setIsSubmitting(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    try {
      setSubmitStatus('idle');
      toast.loading('Sending your message...',{id: 'contact-toast'});
      addContactInquiry(formData);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      toast.dismiss('contact-toast');
      if (submitStatus === 'success') {
        toast.success('Your message has been sent successfully!', { duration: 3000 , id: 'contact-toast' });
      }
      if (submitStatus === 'error') {
        toast.error('There was an error sending your message. Please try again later.', { duration: 3000, id: 'contact-toast' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Contact Us - HobbyVb</title>
        <meta name="description" content="Get in touch with HobbyVb team" />
      </Head>
      <Navbar/>
      <Toaster/>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
          <p className="text-gray-600 mb-8">
            Have questions, suggestions, or concerns? We'd love to hear from you! 
            Fill out the form below or reach out through our other contact methods.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">Email</h3>
                  <p className="text-gray-600">myhobbies250@gmail.com</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Business Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
                </div>
                {/* <div>
                  <h3 className="font-medium text-gray-900">Address</h3>
                  <p className="text-gray-600">123 Hobby Street, Creative City, CC 12345</p>
                </div> */}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
              <ul className="space-y-3">
                <li>
                  <a href="/faq" className="text-blue-600 hover:underline">Frequently Asked Questions</a>
                </li>
                <li>
                  <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
                </li>
                <li>
                  <a href="/dmca" className="text-blue-600 hover:underline">DMCA/Copyright Issues</a>
                </li>
                <li>
                  <a href="/advertise" className="text-blue-600 hover:underline">Advertising Inquiries</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Send Us a Message</h2>
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md">
                Thank you for your message! We'll get back to you as soon as possible.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
                There was an error submitting your message. Please try again later.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`cursor-pointer px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}