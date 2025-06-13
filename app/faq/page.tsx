'use client';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import { useState } from 'react';

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<string | null>(null);

  const toggleAccordion = (index: string) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqCategories = [
    {
      name: 'General Questions',
      items: [
        {
          question: 'What is HobbyVb?',
          answer: 'HobbyVb is a platform dedicated to helping people discover, explore, and share their hobbies. We provide resources, tutorials, and a community for hobby enthusiasts of all levels.'
        },
        {
          question: 'Is HobbyVb free to use?',
          answer: 'Yes! HobbyVb is completely free to use. We may offer premium features in the future, but the core functionality will always remain free.'
        },
        {
          question: 'How do I create an account?',
          answer: 'You can sign up by clicking the "Sign Up" button in the top navigation. We offer both email registration and social media login options for your convenience.'
        }
      ]
    },
    // {
    //   name: 'Account & Profile',
    //   items: [
    //     {
    //       question: 'How do I reset my password?',
    //       answer: 'Click on "Forgot Password" on the login page and enter your email address. You\'ll receive instructions to reset your password. If you don\'t see the email, check your spam folder.'
    //     },
    //     {
    //       question: 'Can I change my username?',
    //       answer: 'Yes, you can change your username in your account settings. Note that username changes are limited to once every 30 days.'
    //     },
    //     {
    //       question: 'How do I delete my account?',
    //       answer: 'Account deletion can be done in your account settings under "Privacy". Please note this action is permanent and cannot be undone.'
    //     }
    //   ]
    // },
    {
      name: 'Content & Community',
      items: [
        {
          question: 'How do I report inappropriate content?',
          answer: 'Each post has a "Report" option in its menu. Select the reason for reporting and our moderation team will review it promptly.'
        },
        {
          question: 'Can I share my own tutorials?',
          answer: 'Absolutely! We encourage users to share their knowledge. Use the "Create Post" button and select "Tutorial" as your post type.'
        },
        {
          question: 'Are there community guidelines?',
          answer: 'Yes, we have community guidelines to ensure a positive environment. Please be respectful, keep content relevant, and avoid self-promotion outside designated areas.'
        }
      ]
    },
    {
      name: 'Technical Issues',
      items: [
        {
          question: 'The site isn\'t loading properly',
          answer: 'Try clearing your browser cache or using a different browser. If the issue persists, please contact us with details about your device and browser version.'
        },
        {
          question: 'I\'m having trouble uploading images',
          answer: 'Ensure your images are in JPG, PNG, or GIF format and under 5MB in size. If you continue having issues, try compressing your images before uploading.'
        },
        {
          question: 'Why am I not receiving email notifications?',
          answer: 'First, check your spam folder. Then verify your notification settings in your account preferences. Some email providers may block our messages, so you might need to whitelist our email address.'
        }
      ]
    },
    {
      name: 'Advertising & Partnerships',
      items: [
        {
          question: 'How can I advertise on HobbyVb?',
          answer: 'We offer several advertising options. Please visit our Advertising page or contact our partnerships team at myhobbies250@gmail.com for more information.'
        },
        {
          question: 'Do you offer sponsored content opportunities?',
          answer: 'Yes, we work with brands to create authentic content that resonates with our community. Reach out to discuss potential collaborations.'
        },
        {
          question: 'What are your advertising guidelines?',
          answer: 'We maintain strict guidelines to ensure ads are relevant and non-intrusive. All ads must be hobby-related and approved by our team before going live.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>FAQs - HobbyVb</title>
        <meta name="description" content="Frequently asked questions about HobbyVb" />
      </Head>
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Can't find what you're looking for? <a href="/contact" className="text-blue-600 hover:underline">Contact our support team</a> for further assistance.
            </p>
          </div>

          <div className="space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <h2 className="text-xl font-semibold p-6 bg-gray-50">{category.name}</h2>
                <div className="divide-y divide-gray-200">
                  {category.items.map((item, itemIndex) => {
                    const index = `${categoryIndex}-${itemIndex}`;
                    const isActive = activeIndex === index;
                    return (
                      <div key={itemIndex} className="p-6">
                        <button
                          onClick={() => toggleAccordion(index)}
                          className="flex justify-between items-center w-full text-left"
                        >
                          <h3 className="text-lg font-medium text-gray-900">{item.question}</h3>
                          <svg
                            className={`h-5 w-5 text-gray-500 transform transition-transform ${isActive ? 'rotate-180' : ''}`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        {isActive && (
                          <div className="mt-4 text-gray-600">
                            <p>{item.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Still have questions?</h2>
            <p className="text-gray-600 mb-4">
              We're here to help! Get in touch with our support team for personalized assistance.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Contact Support
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}