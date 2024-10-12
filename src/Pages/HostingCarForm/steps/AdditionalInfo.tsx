import React from 'react';
import { useFormContext } from 'react-hook-form';

const AdditionalInfo: React.FC = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <>
      <div className="mb-4">
        <label htmlFor="description" className="block font-semibold mb-2">Additional Information</label>
        <textarea
          id="description"
          className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-indigo-300 hover:shadow-lg hover:border-indigo-300 bg-gray-100"
          {...register('additionalInfo_description', { required: 'Description is required' })}
        />
       
        {errors.additionalInfo && 'description' in errors.additionalInfo && typeof errors.additionalInfo.description?.message === 'string' && (
          <p className="text-red-500">{errors.additionalInfo.description.message}</p>
        )}
      </div>
    </>
  );
};

export default AdditionalInfo;
