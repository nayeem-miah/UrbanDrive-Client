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
        {errors.basicCarInfo && 'make' in errors.basicCarInfo && typeof errors.basicCarInfo.make?.message === 'string' && (
          <p className="text-red-500">{errors.basicCarInfo.make.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="model" className="block font-semibold mb-2">Model</label>
        <input
          id="model"
          className="w-full border border-gray-300 rounded p-2"
          {...register('basicCarInfo.model', { required: 'Model is required' })}
        />
        {errors.basicCarInfo && 'model' in errors.basicCarInfo && typeof errors.basicCarInfo.model?.message === 'string' && (
          <p className="text-red-500">{errors.basicCarInfo.model.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="year" className="block font-semibold mb-2">Year</label>
        <input
          id="year"
          className="w-full border border-gray-300 rounded p-2"
          {...register('basicCarInfo.year', { required: 'Year is required' })}
        />
        {errors.basicCarInfo && 'year' in errors.basicCarInfo && typeof errors.basicCarInfo.year?.message === 'string' && (
          <p className="text-red-500">{errors.basicCarInfo.year.message}</p>
        )}
      </div>
    </>
  );
};

export default BasicCarInfo;
