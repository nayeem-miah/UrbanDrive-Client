import React from 'react';
import { useFormContext } from 'react-hook-form';

const BasicCarInfo: React.FC = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <>
      <div className="mb-4">
        <label htmlFor="make" className="block font-semibold mb-2">Make</label>
        <input
          id="make"
          className="w-full border border-gray-300 rounded p-2"
          {...register('basicCarInfo.make', { required: 'Make is required' })}
        />
        {typeof errors.basicCarInfo_make?.message === 'string' && (
          <p className="text-red-500">{errors.basicCarInfo_make.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="model" className="block font-semibold mb-2">Model</label>
        <input
          id="model"
          
          className="w-full border border-gray-300 rounded p-2"
          {...register('basicCarInfo_model', { required: 'Model is required' })}
        />
        {typeof errors.basicCarInfo_model?.message === 'string' && (
          <p className="text-red-500">{errors.basicCarInfo_model.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="year" className="block font-semibold mb-2">Year</label>
        <input
          id="year"
          type="number"
          className="w-full border border-gray-300 rounded p-2"
          {...register('basicCarInfo_year', { required: 'Year is required' })}
        />
        {typeof errors.basicCarInfo_year?.message === 'number' && (
          <p className="text-red-500">{errors.basicCarInfo_year.message}</p>
        )}
      </div>
    </>
  );
};

export default BasicCarInfo;
