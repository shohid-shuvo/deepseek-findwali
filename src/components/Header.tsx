'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [language, setLanguage] = useState('English')
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)

  const toggleLanguage = () => setIsLanguageOpen(!isLanguageOpen)
  const changeLanguage = (lang: string) => {
    setLanguage(lang)
    setIsLanguageOpen(false)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo on the left */}
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold" style={{ color: '#ED3284' }}>
            Find<span className='text-[#40115B] italic'>Wali</span>
          </Link>
        </div>

        {/* Navigation menu in the middle */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-700 hover:text-[#ED3284] transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-[#ED3284] transition-colors">
            About Us
          </Link>
          <Link href="/faq" className="text-gray-700 hover:text-[#ED3284] transition-colors">
            FAQ
          </Link>
          <Link href="/guide" className="text-gray-700 hover:text-[#ED3284] transition-colors">
            Guide
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-[#ED3284] transition-colors">
            Contact
          </Link>
        </nav>

        {/* Right side - Language dropdown and Login button */}
        <div className="flex items-center space-x-4">
          {/* Language dropdown */}
          <div className="relative">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-gray-700 hover:text-[#ED3284] transition-colors"
            >
              <span>{language}</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>


            {isLanguageOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10 border border-[#ED3284]">
                <button
                  onClick={() => changeLanguage('English')}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-[#ED3284] hover:text-white transition-colors"
                >
                  English
                </button>
                <button
                  onClick={() => changeLanguage('বাংলা')}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-[#ED3284] hover:text-white transition-colors"
                >
                  বাংলা
                </button>
              </div>
            )}
          </div>
           {/* E-Login link */}
            <Link
              href="/e-login"
              className="text-gray-700 hover:text-[#ED3284] transition-colors"
            >
              E-Login
            </Link>

          {/* Login button */}
          <Link
            href="/login"
            className="px-4 py-2 rounded-md transition-colors"
            style={{ 
              backgroundColor: '#ED3284',
              color: 'white',
            //   hover: {
            //     backgroundColor: '#522B79'
            //   }
            }}
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  )
}