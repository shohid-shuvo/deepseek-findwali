'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterFormData } from '@/utils/validation-draft';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { register as registerUser } from '@/utils/api';

const suggestAlternativeEmail = (email: string) => {
  const [name, domain] = email.split('@');
  return `${name}+${Math.floor(Math.random() * 1000)}@${domain}`;
};

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });


const onSubmit = async (data: RegisterFormData) => {
  setLoading(true);
  setError('');

  try {
    const payload = {
      ...data,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth).toISOString() : null,
    };
    delete payload.confirmPassword;

    const response = await registerUser(payload);
    router.push('/otp-verification');
  } catch (err: any) {
    // Handle duplicate email error
    if (err.code === 'DuplicateUserName' || err.message.includes('already registered')) {
      setError('This email is already registered. Please use a different email or login.');
    } 
    // Handle other validation errors
    else if (err.details) {
      const errorMessages = Object.values(err.details).flat();
      setError(`Validation error: ${errorMessages.join(', ')}`);
    }
    // Generic error fallback
    // else {
    //   setError(err.message || 'Registration failed. Please try again.');
    // }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold text-[#522B79]">Create a new account</h2>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md">
            <span>{error}</span>
          </div>
        )}

        {/* Error display section */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md">
          <span>{error}</span>
          {/* Add the login link suggestion here */}
          {error.includes('already registered') && (
            <div className="mt-2 text-center">
              <span className="text-gray-700">Already have an account? </span>
              <Link href="/login" className="text-[#ED3284] font-medium hover:underline">
                Login here
              </Link>
            </div>
          )}
        </div>
      )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name *</label>
              <input
                id="fullName"
                type="text"
                {...register('fullName')}
                className={`input ${errors.fullName ? 'border-red-500' : ''}`}
              />
              {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>}
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender *</label>
              <select
                id="gender"
                {...register('gender')}
                className={`input ${errors.gender ? 'border-red-500' : ''}`}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>}
            </div>

            {/* Email */}
            <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address *</label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email address',
                },
              })}
              className={`input ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            {error && error.includes('already registered') && (
              <p className="mt-1 text-sm text-red-600">
                This email is already registered. Please use a different email or login.
              </p>
            )}
            </div>

            {/* Uncomment this section if you want to check email availability */}
            {/* <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address *</label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className={`input ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            {/* <input
              id="email"
              type="email"
              {...register('email', {
                onBlur: async (e) => {
                  if (e.target.value) {
                    try {
                      const res = await axiosInstance.get(`/Auth/check-email?email=${e.target.value}`);
                      if (res.data.exists) {
                        setError('This email is already registered');
                      }
                    } catch (error) {
                      console.log('Email check error:', error);
                    }
                  }
                }
              })}
              className={`input ${errors.email ? 'border-red-500' : ''}`}
            /> */}
      
            {/* Mobile */}
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile Number *</label>
              <input
                id="mobile"
                type="tel"
                {...register('mobile')}
                className={`input ${errors.mobile ? 'border-red-500' : ''}`}
              />
              {errors.mobile && <p className="mt-1 text-sm text-red-600">{errors.mobile.message}</p>}
            </div>

            {/* Date of Birth */}
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                id="dateOfBirth"
                type="date"
                {...register('dateOfBirth')}
                className="input"
              />
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input
                id="address"
                type="text"
                {...register('address')}
                className="input"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password *</label>
              <input
                id="password"
                type="password"
                {...register('password')}
                className={`input ${errors.password ? 'border-red-500' : ''}`}
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password *</label>
              <input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
                className={`input ${errors.confirmPassword ? 'border-red-500' : ''}`}
              />
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 text-sm font-semibold text-white bg-[#ED3284] hover:bg-[#d12773] rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ED3284] disabled:opacity-60"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>

        <div className="text-sm text-center pt-2">
          <span className="text-gray-600">Already have an account? </span>
          <Link href="/login" className="font-medium text-[#ED3284] hover:text-[#c72069]">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}