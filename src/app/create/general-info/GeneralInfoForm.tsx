// 'use client'


// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';
// import axios from 'axios';

// const generalInfoSchema = z.object({
//   biodataType: z.enum(['Bride', 'Groom'], {
//     required_error: "Biodata type is required",
//   }),
//   maritalStatus: z.enum(['Single', 'Divorced', 'Widowed'], {
//     required_error: "Marital status is required",
//   }),
//   birthDate: z.string().min(1, "Birth date is required"),
//   height: z.string().min(1, "Height is required"),
//   complexion: z.string().min(1, "Complexion is required"),
//   weight: z.string().min(1, "Weight is required"),
//   bloodGroup: z.string().min(1, "Blood group is required"),
//   nationality: z.string().min(1, "Nationality is required"),
// });

// type GeneralInfoFormData = z.infer<typeof generalInfoSchema>;

// interface GeneralInfoFormProps {
//   onNext: () => void;
//   onBack: () => void;
// }

// export default function GeneralInfoForm({ onNext, onBack }: GeneralInfoFormProps) {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isValid },
//   } = useForm<GeneralInfoFormData>({
//     resolver: zodResolver(generalInfoSchema),
//     mode: 'onChange',
//   });

//   const onSubmit = async (data: GeneralInfoFormData) => {
//     try {
//       await axios.post(
//         'https://findwali.dusrasoftltd.com/api/BioData/add-update-general-info',
//         data
//       );
//       onNext();
//     } catch (error) {
//       console.error('Error saving general info:', error);
//     }
//   };

//   return (
//     <div>
//       {/* Your form fields here (same as before) */}
//       <div className="space-y-4">
//         {/* All your form fields with register and error handling */}
//       </div>
      
//       <div className="mt-8 flex justify-between">
//         <button
//           type="button"
//           onClick={onBack}
//           className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
//         >
//           Back
//         </button>
//         <button
//           type="button"
//           onClick={handleSubmit(onSubmit)}
//           disabled={!isValid}
//           className="px-4 py-2 bg-[#ED3284] text-white rounded-md hover:bg-[#d12773] disabled:opacity-50"
//         >
//           Save & Next
//         </button>
//       </div>
//     </div>
//   );
// }

// src/components/biodata/GeneralInfoForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useBiodataStore } from '@/store/biodataStore';
import { addOrUpdateGeneralInfo } from '@/utils/api';
import { useEffect } from 'react';

// Define Zod schema for General Info validation
const generalInfoSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  age: z.number().min(18, 'You must be at least 18 years old'),
  address: z.string().min(1, 'Address is required'),
  // Add other fields as needed
});

type GeneralInfoFormData = z.infer<typeof generalInfoSchema>;

const GeneralInfoForm = () => {
  const { 
    stepData, 
    currentStep, 
    setStepData, 
    setIsLoading,
    addCompletedStep 
  } = useBiodataStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GeneralInfoFormData>({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: stepData[currentStep] || {},
  });

  // Load saved data when component mounts
  useEffect(() => {
    if (stepData[currentStep]) {
      reset(stepData[currentStep]);
    }
  }, [currentStep, reset, stepData]);

  const onSubmit = async (data: GeneralInfoFormData) => {
    try {
      setIsLoading(true);
      
      // Call API to save data
      const response = await addOrUpdateGeneralInfo(data);
      
      // Update local state
      setStepData(currentStep, data);
      addCompletedStep(currentStep);
      
      // Handle success (e.g., show toast or move to next step)
      console.log('General info saved successfully', response);
      
    } catch (error) {
      console.error('Error saving general info:', error);
      // Handle error (e.g., show error message)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Full Name</label>
        <input 
          {...register('name')} 
          id="name" 
          type="text" 
        />
        {errors.name && <span>{errors.name.message}</span>}
      </div>

      <div>
        <label htmlFor="age">Age</label>
        <input 
          {...register('age', { valueAsNumber: true })} 
          id="age" 
          type="number" 
        />
        {errors.age && <span>{errors.age.message}</span>}
      </div>

      <div>
        <label htmlFor="address">Address</label>
        <input 
          {...register('address')} 
          id="address" 
          type="text" 
        />
        {errors.address && <span>{errors.address.message}</span>}
      </div>

      <button type="submit">Save and Continue</button>
    </form>
  );
};

export default GeneralInfoForm;