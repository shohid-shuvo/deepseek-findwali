'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { familyInfoSchema, FamilyInfoFormData } from '@/utils/schemas/biodata';

interface FamilyInfoProps {
  onNext: () => void;
  onBack: () => void;
}

export default function FamilyInfo({ onNext, onBack }: FamilyInfoProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FamilyInfoFormData>({
    resolver: zodResolver(familyInfoSchema),
    mode: 'onChange',
    defaultValues: {
      siblings: [{ name: '', occupation: '', maritalStatus: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'siblings',
  });

  const onSubmit = async (data: FamilyInfoFormData) => {
    try {
      const response = await fetch('https://findwali.dusrasoftltd.com/api/BioData/add-update-family-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save family info');
      }

      onNext();
    } catch (error) {
      console.error('Error saving family info:', error);
    }
  };

  return (
    <div>
      <div className="space-y-4">
        {/* Father's Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Father's Name *
          </label>
          <input
            type="text"
            {...register('fatherName')}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#522B79] focus:ring-[#522B79] sm:text-sm ${
              errors.fatherName ? 'border-red-500' : 'border'
            }`}
          />
          {errors.fatherName && (
            <p className="mt-1 text-sm text-red-600">{errors.fatherName.message}</p>
          )}
        </div>

        {/* Father's Occupation */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Father's Occupation *
          </label>
          <input
            type="text"
            {...register('fatherOccupation')}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#522B79] focus:ring-[#522B79] sm:text-sm ${
              errors.fatherOccupation ? 'border-red-500' : 'border'
            }`}
          />
          {errors.fatherOccupation && (
            <p className="mt-1 text-sm text-red-600">{errors.fatherOccupation.message}</p>
          )}
        </div>

        {/* Mother's Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mother's Name *
          </label>
          <input
            type="text"
            {...register('motherName')}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#522B79] focus:ring-[#522B79] sm:text-sm ${
              errors.motherName ? 'border-red-500' : 'border'
            }`}
          />
          {errors.motherName && (
            <p className="mt-1 text-sm text-red-600">{errors.motherName.message}</p>
          )}
        </div>

        {/* Mother's Occupation */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mother's Occupation *
          </label>
          <input
            type="text"
            {...register('motherOccupation')}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#522B79] focus:ring-[#522B79] sm:text-sm ${
              errors.motherOccupation ? 'border-red-500' : 'border'
            }`}
          />
          {errors.motherOccupation && (
            <p className="mt-1 text-sm text-red-600">{errors.motherOccupation.message}</p>
          )}
        </div>

        {/* Siblings */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Siblings</label>
          {fields.map((field, index) => (
            <div key={field.id} className="mt-4 space-y-4 border p-4 rounded-md">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Sibling {index + 1}</h3>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  {...register(`siblings.${index}.name`)}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#522B79] focus:ring-[#522B79] sm:text-sm ${
                    errors.siblings?.[index]?.name ? 'border-red-500' : 'border'
                  }`}
                />
                {errors.siblings?.[index]?.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.siblings[index]?.name?.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Occupation
                </label>
                <input
                  type="text"
                  {...register(`siblings.${index}.occupation`)}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#522B79] focus:ring-[#522B79] sm:text-sm ${
                    errors.siblings?.[index]?.occupation ? 'border-red-500' : 'border'
                  }`}
                />
                {errors.siblings?.[index]?.occupation && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.siblings[index]?.occupation?.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Marital Status
                </label>
                <select
                  {...register(`siblings.${index}.maritalStatus`)}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#522B79] focus:ring-[#522B79] sm:text-sm ${
                    errors.siblings?.[index]?.maritalStatus ? 'border-red-500' : 'border'
                  }`}
                >
                  <option value="">Select</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                </select>
                {errors.siblings?.[index]?.maritalStatus && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.siblings[index]?.maritalStatus?.message}
                  </p>
                )}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => append({ name: '', occupation: '', maritalStatus: '' })}
            className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-[#522B79] bg-[#ED3284]/10 hover:bg-[#ED3284]/20"
          >
            + Add Sibling
          </button>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid}
          className="px-4 py-2 bg-[#ED3284] text-white rounded-md hover:bg-[#d12773] disabled:opacity-50"
        >
          Save & Next
        </button>
      </div>
    </div>
  );
}