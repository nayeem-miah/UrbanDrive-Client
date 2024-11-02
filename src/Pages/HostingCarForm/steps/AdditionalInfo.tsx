import React from 'react';
import { useFormContext } from 'react-hook-form';

const AdditionalInfo: React.FC = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="mb-4">
      <label className="block font-semibold mb-2">Description</label>
      <textarea
        className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-indigo-300 hover:shadow-lg hover:border-indigo-300 bg-gray-100"
        rows={4}
        {...register('additionalInfo.description', {
          required: 'Description is required',
          minLength: { 
            value: 50, 
            message: 'Description must be at least 50 characters' 
          }
        })}
        placeholder="Describe your car's features, condition, and any special notes..."
      />
      {errors.additionalInfo && 'description' in errors.additionalInfo && typeof errors.additionalInfo.description?.message === 'string' && (
        <p className="text-red-500">{errors.additionalInfo.description.message}</p>
      )}
    </div>
  );
};

export default AdditionalInfo;
