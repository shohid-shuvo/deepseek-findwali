'use client'

import Link from 'next/link';
import { FaYoutube } from 'react-icons/fa';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Left Column - Text Content */}
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-[#522B79]">
              Find Your Perfect Life Partner
            </h1>
            <p className="text-lg text-gray-600">
              Create your biodata and join thousands of others in the search for marriage partners.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/create"
                className="px-8 py-3 text-lg font-medium text-white rounded-lg shadow-lg 
                bg-gradient-to-r from-[#ED3284] to-[#522B79] hover:from-[#d12773] hover:to-[#3d1f5a]
                transition-all duration-300 transform hover:scale-105"
              >
                Create Your Biodata
              </Link>
              
              <button className="px-6 py-3 text-lg font-medium text-[#522B79] rounded-lg border-2 border-[#522B79] 
              hover:bg-[#522B79] hover:text-white flex items-center gap-2 transition-all">
                <FaYoutube className="text-red-600 text-xl" />
                How to Create Biodata
              </button>
            </div>
          </div>
          
          {/* Right Column - Image/Illustration */}
          <div className="md:w-1/2">
            <div className="bg-gradient-to-br from-[#ED3284]/20 to-[#522B79]/20 rounded-2xl p-8 flex justify-center">
              <img src="/images/banner.png" alt="Marriage illustration"className="w-[50%] " />
              
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#522B79] mb-12">
            Why Create a Biodata With Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-[#ED3284] mb-3">Easy to Use</h3>
              <p className="text-gray-600">
                Our step-by-step form makes creating your biodata simple and straightforward.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-[#ED3284] mb-3">Professional Design</h3>
              <p className="text-gray-600">
                Get a beautifully formatted biodata that makes a great impression.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-[#ED3284] mb-3">Wide Reach</h3>
              <p className="text-gray-600">
                Connect with thousands of potential matches from our network.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}