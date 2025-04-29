// findwali\src\app\create\address\page.tsx
'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import { addressSchema, AddressFormData } from '@/utils/schemas/biodata';

const LOCATIONS = [
  'Dhaka', 'Chittagong', 'Rajshahi', 'Khulna',
  'Barishal', 'Sylhet', 'Rangpur', 'Mymensingh'
];

export default function AddressForm({ onNext, onBack }: {
  onNext: () => void,
  onBack: () => void
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    mode: 'onChange'
  });

  const sameAsPermanent = watch('presentAddress.sameAsPermanent');
  const permanentLocation = watch('permanentAddress.location');
  const permanentArea = watch('permanentAddress.area');

  // Auto-fill present address when checkbox is checked
  useEffect(() => {
    if (sameAsPermanent) {
      setValue('presentAddress.location', permanentLocation);
      setValue('presentAddress.area', permanentArea);
    }
  }, [sameAsPermanent, permanentLocation, permanentArea, setValue]);

  const onSubmit = async (data: AddressFormData) => {
    try {
      const payload = {
        ...data,
        presentAddress: sameAsPermanent 
          ? { ...data.permanentAddress, sameAsPermanent: true }
          : data.presentAddress
      };

      await axiosInstance.post('/BioData/add-update-address', payload);
      onNext();
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

  return (
     <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-[0px_0px_7px_2px_#ddd]">
  <div className="text-center mb-8">
    <h1 className="text-3xl font-bold text-[#522B79]">Address Information</h1>
    <p className="text-gray-500 mt-2">Please provide your current and permanent addresses</p>
  </div>
  
  <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
    {/* Permanent Address Section */}
    <div className="border-b border-gray-200 pb-8">
      <h2 className="text-xl font-semibold text-[#ED3284] mb-6 flex items-center">
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
        Permanent Address <span className="text-red-500 ml-1">*</span>
      </h2>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Location <span className="text-red-500">*</span>
          </label>
          <select
            {...register('permanentAddress.location')}
            className={`mt-1 block w-full px-4 py-3 rounded-lg border focus:border-[#522B79] focus:ring-2 focus:ring-[#522B79]/50 transition-all ${
              errors.permanentAddress?.location ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          >
            <option value="">Select Location</option>
            {LOCATIONS.map(loc => (
              <option key={loc} value={loc} className="py-2">{loc}</option>
            ))}
          </select>
          {errors.permanentAddress?.location && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
              </svg>
              {errors.permanentAddress.location.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Area/Village <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register('permanentAddress.area')}
            placeholder="e.g. Mirpur 10, Baghmara"
            className={`mt-1 block w-full px-4 py-3 rounded-lg border focus:border-[#522B79] focus:ring-2 focus:ring-[#522B79]/50 transition-all ${
              errors.permanentAddress?.area ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          />
          <p className="mt-1 text-xs text-gray-500 italic">
            Write the name of the village or area without entering the house number
          </p>
          {errors.permanentAddress?.area && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
              </svg>
              {errors.permanentAddress.area.message}
            </p>
          )}
        </div>
      </div>
    </div>

    {/* Present Address Section */}
    <div className="border-b border-gray-200 pb-8">
      <h2 className="text-xl font-semibold text-[#ED3284] mb-6 flex items-center">
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
        Present Address
      </h2>
      
      <div className="flex items-center mb-6">
        <input
          type="checkbox"
          id="sameAsPermanent"
          {...register('presentAddress.sameAsPermanent')}
          className="h-5 w-5 text-[#ED3284] focus:ring-[#522B79] border-gray-300 rounded"
        />
        <label htmlFor="sameAsPermanent" className="ml-3 block text-sm font-medium text-gray-700">
          Same as permanent address
        </label>
      </div>

      {!sameAsPermanent && (
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Location <span className="text-red-500">*</span>
            </label>
            <select
              {...register('presentAddress.location')}
              className={`mt-1 block w-full px-4 py-3 rounded-lg border focus:border-[#522B79] focus:ring-2 focus:ring-[#522B79]/50 transition-all ${
                errors.presentAddress?.location ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            >
              <option value="">Select Location</option>
              {LOCATIONS.map(loc => (
                <option key={loc} value={loc} className="py-2">{loc}</option>
              ))}
            </select>
            {errors.presentAddress?.location && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                </svg>
                {errors.presentAddress.location.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Area/Village <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('presentAddress.area')}
              placeholder="e.g. Mirpur 10, Baghmara"
              className={`mt-1 block w-full px-4 py-3 rounded-lg border focus:border-[#522B79] focus:ring-2 focus:ring-[#522B79]/50 transition-all ${
                errors.presentAddress?.area ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
            <p className="mt-1 text-xs text-gray-500 italic">
              Write the name of the village or area without entering the house number
            </p>
            {errors.presentAddress?.area && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                </svg>
                {errors.presentAddress.area.message}
              </p>
            )}
          </div>
        </div>
      )}
    </div>

    {/* Grew Up Location */}
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Where did you grow up? <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        {...register('grewUpLocation')}
        className={`mt-1 block w-full px-4 py-3 rounded-lg border focus:border-[#522B79] focus:ring-2 focus:ring-[#522B79]/50 transition-all ${
          errors.grewUpLocation ? 'border-red-500 bg-red-50' : 'border-gray-300'
        }`}
        placeholder="Enter where you spent most of your childhood"
      />
      {errors.grewUpLocation && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
          </svg>
          {errors.grewUpLocation.message}
        </p>
      )}
    </div>

    {/* Form Actions */}
    <div className="flex justify-between pt-8 border-t border-gray-200">
      <button
        type="button"
        onClick={onBack}
        className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back
      </button>
      <button
        type="submit"
        disabled={!isValid}
        className="px-8 py-3 bg-gradient-to-r from-[#ED3284] to-[#522B79] text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
      >
        Save & Next
        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>
  </form>
</div>
  );
}