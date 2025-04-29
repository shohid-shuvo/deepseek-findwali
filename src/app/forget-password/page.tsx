// src/app/forget-password/page.tsx
'use client'

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { forgotPassword } from '@/utils/api';
import { FiAlertCircle, FiMail, FiCheckCircle } from 'react-icons/fi';

const forgotPasswordSchema = z.object({
  email: z.string()
    .min(1, "Email is required")
    .email("Invalid email address")
});

export default function ForgetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState<{
    text: string;
    type: 'success' | 'error';
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema)
  });

  const onSubmit = async (data: { email: string }) => {
    setLoading(true);
    setServerMessage(null);

    try {
      const response = await forgotPassword(data);
      
      // Always show success message even if email doesn't exist (security best practice)
      setServerMessage({
        text: 'If an account exists with this email, you will receive a reset link',
        type: 'success'
      });
      reset();
      
    } catch (error: any) {
      console.error('Password reset error:', error);
      
      // Generic error message (don't reveal if email exists for security)
      setServerMessage({
        text: 'There was an issue processing your request. Please try again later.',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#522B79]">Forgot Password?</h2>
          <p className="mt-2 text-gray-600">
            Enter your email to receive a reset link
          </p>
        </div>

        {serverMessage && (
          <div className={`p-4 rounded-md flex items-start ${
            serverMessage.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {serverMessage.type === 'success' ? (
              <FiCheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-green-500" />
            ) : (
              <FiAlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-red-500" />
            )}
            <span>{serverMessage.text}</span>
          </div>
        )}

        <form className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register('email')}
                className={`block w-full pl-10 pr-3 py-3 border ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-[#ED3284] focus:border-[#ED3284] sm:text-sm`}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <FiAlertCircle className="mr-1" />
                {errors.email.message as string}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#ED3284] to-[#522B79] hover:from-[#d12773] hover:to-[#3d1f5a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ED3284] disabled:opacity-70 transition-colors duration-200"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </div>
        </form>

        <div className="text-center text-sm">
          <Link href="/login" className="font-medium text-[#ED3284] hover:text-[#d12773] transition-colors duration-200">
            Remember your password? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}