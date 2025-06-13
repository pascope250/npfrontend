'use client';
import { useState } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import { toast, Toaster } from 'react-hot-toast';
import { useContactContext } from '@/context/contactContext';
export default function AdvertisingPage() {
    const { addAdvertiseInquiry } = useContactContext();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

    try {
        if (!formData.name || !formData.email || !formData.budget || !formData.message) {
            toast.error('Please fill in all required fields');
            setIsSubmitting(false);
            return;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            toast.error('Please enter a valid email address');
            setIsSubmitting(false);
            return;
        }

        // phone must be number and equal to 10 digits
        if (!/^\d{10}$/.test(formData.phone)) {
            toast.error('Please enter a valid phone number (10 digits)', { id: 'advertise-toast' });
            setIsSubmitting(false);
            return;
        }
      setSubmitStatus('idle');
      toast.loading('Submitting your inquiry...', { id: 'advertise-toast' });
      addAdvertiseInquiry(formData);
      const isSuccess = true; // Simulate successful submission, replace with actual API call if needed
      toast.dismiss('advertise-toast');
      if (isSuccess) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          budget: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
        toast.error('There was an error submitting your inquiry. Please try again later or email us directly at myhobbies250@gmail.com', { id: 'advertise-toast' });
      }
    } catch (error) {
        toast.dismiss('advertise-toast');
        toast.error('There was an error submitting your inquiry. Please try again later or email us directly at myhobbies250@gmail.com', { id: 'advertise-toast' });
      setSubmitStatus('error');
    } finally {
       setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          budget: '',
          message: ''
        });
      setIsSubmitting(false);
        if (submitStatus === 'success') {
            toast.success('Your inquiry has been submitted successfully!', { duration: 3000, id: 'advertise-toast' });
        }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Advertising Inquiries - HobbyVb</title>
        <meta name="description" content="Advertising opportunities with HobbyVb" />
      </Head>
      <Navbar/>
      <Toaster position='top-center' reverseOrder={false} toastOptions={{ duration: 3000 }} />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Advertising Opportunities</h1>
          <p className="text-gray-600 mb-8">
            Interested in advertising with HobbyVb? We offer various advertising solutions to help you reach our engaged audience. 
            Fill out the form below and our advertising team will get back to you with more details.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Why Advertise With Us?</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Targeted audience interested in hobbies and creative activities</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Multiple ad formats available (display, sponsored content, newsletters)</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Competitive pricing and performance tracking</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Dedicated account manager for all campaigns</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Advertising Options</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">Display Ads</h3>
                  <p className="text-gray-600">Banner ads in various sizes across our website</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Sponsored Content</h3>
                  <p className="text-gray-600">Native articles and product features</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Newsletter Sponsorships</h3>
                  <p className="text-gray-600">Reach our subscribers directly</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Custom Campaigns</h3>
                  <p className="text-gray-600">Tailored solutions for your specific needs</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Advertising Inquiry Form</h2>
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md">
                Thank you for your inquiry! Our advertising team will contact you within 1-2 business days.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
                There was an error submitting your inquiry. Please try again later or email us directly at myhobbies250@gmail.com
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name <span className="text-red-500">*</span>
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
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
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
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                  Estimated Monthly Budget <span className="text-red-500">*</span>
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a range</option>
                  <option value="Under $500">Under $500</option>
                  <option value="$500 - $1,000">$500 - $1,000</option>
                  <option value="$1,000 - $2,500">$1,000 - $2,500</option>
                  <option value="$2,500 - $5,000">$2,500 - $5,000</option>
                  <option value="Over $5,000">Over $5,000</option>
                  <option value="Custom">Custom (please specify in message)</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Tell Us About Your Campaign <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Please include details about your product/service, target audience, campaign goals, and any specific requirements"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>

              <div className="flex items-center">
                <input
                  id="agree-terms"
                  name="agree-terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
                  I agree to receive communications from HobbyVb regarding my inquiry
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}