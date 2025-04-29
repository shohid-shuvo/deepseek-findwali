
// src/app/create/general-info/page.tsx
'use client'

import axiosInstance from '@/utils/axiosInstance'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

// Enhanced schema with all required fields
const generalInfoSchema = z.object({
  biodataType: z.enum(['Bride', 'Groom'], {
    required_error: "Biodata type is required",
  }),
  maritalStatus: z.enum(['Never Married', 'Divorced', 'Widowed'], {
    required_error: "Marital status is required",
  }),
  birthDate: z.string()
    .min(1, "Birth date is required")
    .refine(val => !isNaN(Date.parse(val)), {
      message: "Invalid date format"
    }),
  height: z.string().min(1, "Height is required"),
  complexion: z.string().min(1, "Complexion is required"),
  weight: z.string()
    .min(1, "Weight is required")
    .regex(/^\d+\s?(kg|KG|Kg)$/, "Must be in kg (e.g. 82 kg)"),
  bloodGroup: z.string().min(1, "Blood group is required"),
  nationality: z.string().min(1, "Nationality is required"),
})

type GeneralInfoFormData = z.infer<typeof generalInfoSchema>

// Dropdown options
const BIODATA_TYPES = ['Bride', 'Groom']
const MARITAL_STATUSES = ['Never Married', 'Divorced', 'Widowed']
const HEIGHTS = ["4' 10\"", "5'", "5' 2\"", "5' 4\"", "5' 6\"", "5' 8\"", "5' 10\"", "6'"]
const COMPLEXIONS = ['Very Fair', 'Fair', 'Brown', 'Wheatish', 'Dark']
const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
const NATIONALITIES = ['Bangladeshi', 'Other']

export default function GeneralInfoPage() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue
  } = useForm<GeneralInfoFormData>({
    resolver: zodResolver(generalInfoSchema),
    mode: 'onChange'
  })

  // Load saved data on component mount
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const response = await axios.get('/api/BioData/get-general-info')
        if (response.data) {
          // Set form values from saved data
          Object.entries(response.data).forEach(([key, value]) => {
            setValue(key as keyof GeneralInfoFormData, value)
          })
        }
      } catch (error) {
        console.error('Error loading saved data:', error)
      }
    }
    loadSavedData()
  }, [setValue])

  const onSubmit = async (data: GeneralInfoFormData) => {
    try {
      // Format date to YYYY-MM-DD before sending
      const formattedData = {
        ...data,
        birthDate: new Date(data.birthDate).toISOString().split('T')[0]
      }

      await axios.post(
        'https://findwali.dusrasoftltd.com/api/BioData/add-update-general-info',
        formattedData
      )
      
      // Redirect to next step
      router.push('/create/address')
    } catch (error) {
      console.error('Error saving general info:', error)
    }
  }

  return (
    
<div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-[0px_0px_7px_2px_#ddd]">
  <div className="text-center mb-8">
    <h1 className="text-3xl font-bold text-[#522B79]">General Information</h1>
    <p className="text-gray-500 mt-2">Please provide your basic details</p>
  </div>
  
  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Biodata Type */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Biodata Type <span className="text-red-500">*</span>
        </label>
        <select
          {...register('biodataType')}
          className={`mt-1 block w-full px-4 py-2.5 rounded-lg border focus:border-[#522B79] focus:ring-2 focus:ring-[#522B79]/50 transition-all ${
            errors.biodataType ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select Biodata Type</option>
          {BIODATA_TYPES.map(type => (
            <option key={type} value={type} className="py-2">
              {type === 'Groom' ? "Male's Biodata" : "Female's Biodata"}
            </option>
          ))}
        </select>
        {errors.biodataType && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
            </svg>
            {errors.biodataType.message}
          </p>
        )}
      </div>

      {/* Marital Status */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Marital Status <span className="text-red-500">*</span>
        </label>
        <select
          {...register('maritalStatus')}
          className={`mt-1 block w-full px-4 py-2.5 rounded-lg border focus:border-[#522B79] focus:ring-2 focus:ring-[#522B79]/50 transition-all ${
            errors.maritalStatus ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select Marital Status</option>
          {MARITAL_STATUSES.map(status => (
            <option key={status} value={status} className="py-2">{status}</option>
          ))}
        </select>
        {errors.maritalStatus && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
            </svg>
            {errors.maritalStatus.message}
          </p>
        )}
      </div>

      {/* Birth Date */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Birth Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          {...register('birthDate')}
          className={`mt-1 block w-full px-4 py-2.5 rounded-lg border focus:border-[#522B79] focus:ring-2 focus:ring-[#522B79]/50 transition-all ${
            errors.birthDate ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.birthDate && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
            </svg>
            {errors.birthDate.message}
          </p>
        )}
      </div>

      {/* Height */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Height <span className="text-red-500">*</span>
        </label>
        <select
          {...register('height')}
          className={`mt-1 block w-full px-4 py-2.5 rounded-lg border focus:border-[#522B79] focus:ring-2 focus:ring-[#522B79]/50 transition-all ${
            errors.height ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select Height</option>
          {HEIGHTS.map(height => (
            <option key={height} value={height} className="py-2">{height}</option>
          ))}
        </select>
        {errors.height && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
            </svg>
            {errors.height.message}
          </p>
        )}
      </div>

      {/* Complexion */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Complexion <span className="text-red-500">*</span>
        </label>
        <select
          {...register('complexion')}
          className={`mt-1 block w-full px-4 py-2.5 rounded-lg border focus:border-[#522B79] focus:ring-2 focus:ring-[#522B79]/50 transition-all ${
            errors.complexion ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select Complexion</option>
          {COMPLEXIONS.map(complexion => (
            <option key={complexion} value={complexion} className="py-2">{complexion}</option>
          ))}
        </select>
        {errors.complexion && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
            </svg>
            {errors.complexion.message}
          </p>
        )}
      </div>

      {/* Weight */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Weight (kg) <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register('weight')}
          placeholder="e.g. 82 kg"
          className={`mt-1 block w-full px-4 py-2.5 rounded-lg border focus:border-[#522B79] focus:ring-2 focus:ring-[#522B79]/50 transition-all ${
            errors.weight ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.weight && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
            </svg>
            {errors.weight.message}
          </p>
        )}
      </div>

      {/* Blood Group */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Blood Group <span className="text-red-500">*</span>
        </label>
        <select
          {...register('bloodGroup')}
          className={`mt-1 block w-full px-4 py-2.5 rounded-lg border focus:border-[#522B79] focus:ring-2 focus:ring-[#522B79]/50 transition-all ${
            errors.bloodGroup ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select Blood Group</option>
          {BLOOD_GROUPS.map(group => (
            <option key={group} value={group} className="py-2">{group}</option>
          ))}
        </select>
        {errors.bloodGroup && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
            </svg>
            {errors.bloodGroup.message}
          </p>
        )}
      </div>

      {/* Nationality */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Nationality <span className="text-red-500">*</span>
        </label>
        <select
          {...register('nationality')}
          className={`mt-1 block w-full px-4 py-2.5 rounded-lg border focus:border-[#522B79] focus:ring-2 focus:ring-[#522B79]/50 transition-all ${
            errors.nationality ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select Nationality</option>
          {NATIONALITIES.map(nationality => (
            <option key={nationality} value={nationality} className="py-2">{nationality}</option>
          ))}
        </select>
        {errors.nationality && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
            </svg>
            {errors.nationality.message}
          </p>
        )}
      </div>
    </div>

    <div className="flex justify-end pt-6 border-t">
      <button
        type="submit"
        disabled={!isValid}
        className="px-8 py-3 bg-gradient-to-r from-[#ED3284] to-[#522B79] text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Save & Next
        <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>
  </form>
</div>
  )
}