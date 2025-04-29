// src/app/e-login/page.tsx
'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { sendEmailOtp } from '@/utils/api';
import Header from '@/components/Header';

export default function EmailLoginPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const router = useRouter();

  // src/app/e-login/page.tsx
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setError('');
    setFieldErrors({});
  
    // Enhanced validation
    if (!email.trim()) {
      setFieldErrors({ Email: ["Email is required"] });
      return;
    }
  
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setFieldErrors({ Email: ["Please enter a valid email address"] });
      return;
    }
  
    setIsLoading(true);
  
    try {
      const response = await sendEmailOtp(email.trim());
      
      if (response.success) {
        router.push(`/otp-verification?email=${encodeURIComponent(response.email)}`);
      }
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setFieldErrors(err.response.data.errors);
      } else {
        setError(err.message || 'Failed to send OTP. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Email Login
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a one-time password
            </p>
          </div>

          {/* Display general errors */}
          {error && (
            <div className="rounded-md bg-red-50 p-4 mb-4">
              <div className="text-sm text-red-600">{error}</div>
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="Email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setFieldErrors({}); // Clear errors when typing
                  }}
                  className={`mt-1 appearance-none block w-full px-3 py-2 border ${
                    fieldErrors.Email ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#ED3284] focus:border-[#ED3284] sm:text-sm`}
                  placeholder="your@email.com"
                />
                {/* Display field-specific errors */}
                {fieldErrors.Email && (
                  <div className="mt-1 text-sm text-red-600">
                    {fieldErrors.Email.join(', ')}
                  </div>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#ED3284] hover:bg-[#d42a76] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ED3284] ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending OTP...
                  </>
                ) : 'Send OTP'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}