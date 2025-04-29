
// findwali\src\app\create\page.tsx
'use client'

import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import dynamic from 'next/dynamic'
import GeneralInfoForm from './general-info/page'
import AddressFormComponent from './address/page'
import { FiChevronRight, FiCheck } from 'react-icons/fi'
import { FaRegCircle, FaRegCheckCircle } from 'react-icons/fa'

// Dynamically import to ensure client-side only
const AddressForm = dynamic(() => import('./address/page'), { ssr: false, loading: () => <p>Loading...</p> })

const steps = [
  { id: 1, title: 'General Info', component: GeneralInfoForm },
  { id: 2, title: 'Address', component: AddressFormComponent },
  { id: 3, title: 'Educational Qualifications' },
  { id: 4, title: 'Family Information' },
  { id: 5, title: 'Personal Information' },
  { id: 6, title: 'Occupational information' },
  { id: 7, title: 'Marriage related information' },
  { id: 8, title: 'Expected Life Partner' },
  { id: 9, title: 'Pledge' },
  { id: 10, title: 'Contact' },
]

export default function CreateBiodataPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const methods = useForm()

  const onNext = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep])
    }
    setCurrentStep(prev => Math.min(prev + 1, steps.length))
  }

  const onBack = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  const CurrentStepComponent = steps.find(step => step.id === currentStep)?.component

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Progress Bar - Top (for mobile) */}
      <div className="md:hidden mb-6">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-[#522B79]">
            Step {currentStep} of {steps.length}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round((currentStep / steps.length) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
          <div
            className="bg-[#ED3284] h-2.5 rounded-full"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Step Navigation - Left Sidebar */}
        <div className="w-full md:w-72 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-6 text-[#522B79] border-b pb-2">
            Biodata Creation Steps
          </h2>
          <ul className="space-y-3">
            {steps.map(step => (
              <li key={step.id}>
                <button
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex items-center w-full text-left p-3 rounded-lg transition-all ${
                    currentStep === step.id
                      ? 'bg-[#ED3284]/10 text-[#ED3284] font-medium border-l-4 border-[#ED3284]'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <span className="flex-shrink-0 mr-3">
                    {completedSteps.includes(step.id) ? (
                      <FaRegCheckCircle className="text-green-500 text-lg" />
                    ) : (
                      <FaRegCircle
                        className={`text-lg ${
                          currentStep === step.id ? 'text-[#ED3284]' : 'text-gray-400'
                        }`}
                      />
                    )}
                  </span>
                  <span>
                    <span className="block text-sm font-medium">{step.title}</span>
                    <span className="block text-xs text-gray-500">
                      Step {step.id}/{steps.length}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Form Content - Right Side */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          {/* Step Indicator - Desktop (top of form) */}
          <div className="hidden md:flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              {steps.map(step => (
                <div
                  key={step.id}
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    currentStep === step.id
                      ? 'bg-[#ED3284] text-white'
                      : completedSteps.includes(step.id)
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {completedSteps.includes(step.id) && currentStep !== step.id ? (
                    <FiCheck className="text-sm" />
                  ) : (
                    step.id
                  )}
                </div>
              ))}
            </div>
            <span className="text-sm text-gray-500">
              {currentStep}/{steps.length} steps
            </span>
          </div>

          {/* Current Step Content */}
          <FormProvider {...methods}>
            {CurrentStepComponent ? (
              <CurrentStepComponent onNext={onNext} onBack={onBack} />
            ) : (
              <div className="text-center py-10">
                <h3 className="text-xl font-medium text-[#522B79]">
                  {steps.find(s => s.id === currentStep)?.title}
                </h3>
                <p className="text-gray-500 mt-2">This step is coming soon</p>
                <div className="mt-6 flex justify-center gap-4">
                  <button
                    onClick={onBack}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                  >
                    Back
                  </button>
                  <button
                    onClick={onNext}
                    className="px-4 py-2 bg-[#ED3284] text-white rounded-md hover:bg-[#d12773]"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}
          </FormProvider>
        </div>
      </div>
    </div>
  )
}