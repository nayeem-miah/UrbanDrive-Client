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
          className="w-full border border-gray-300 rounded p-2"
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
