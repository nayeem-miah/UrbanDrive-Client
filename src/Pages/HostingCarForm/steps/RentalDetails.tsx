/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Select from 'react-select';
import { useFormContext } from 'react-hook-form';

const RentalDetails: React.FC = () => {
  const { register, setValue, formState: { errors } } = useFormContext();

  
  const durationOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
  ];


  const availabilityOptions = [
    { value: 'available', label: 'Available' },
    { value: 'notAvailable', label: 'Not Available' },
  ];

  const handleDurationChange = (selectedOption: any) => {
    setValue('rentalDetails.duration', selectedOption ? selectedOption.value : '');
  };

  const handleAvailabilityChange = (selectedOption: any) => {
    setValue('rentalDetails.availability', selectedOption ? selectedOption.value : '');
  };

  return (
    <>
      <div className="mb-4">
        <label htmlFor="price" className="block font-semibold mb-2">Price Per Day</label>
        <input
          id="price"
          type="number"
          placeholder='100'
          className="w-full border border-gray-300 rounded p-2"
          {...register('rentalDetails.price', { required: 'Price is required' })}
        />
        {errors.rentalDetails && 'price' in errors.rentalDetails && typeof errors.rentalDetails.price?.message === 'string' && (
          <p className="text-red-500">{errors.rentalDetails.price.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="discount" className="block font-semibold mb-2">Discount (if applicable)</label>
        <input
          id="discount"
          type="number"
          placeholder='25%'
          className="w-full border border-gray-300 rounded p-2"
          {...register('rentalDetails.discount')}
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-2">Rental Duration</label>
        <Select
          options={durationOptions}
          onChange={handleDurationChange}
          classNamePrefix="select"
          isClearable
        />
        {errors.rentalDetails && 'duration' in errors.rentalDetails && typeof errors.rentalDetails.duration?.message === 'string' && (
          <p className="text-red-500">{errors.rentalDetails.duration.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-2">Availability</label>
        <Select
          options={availabilityOptions}
          onChange={handleAvailabilityChange}
          classNamePrefix="select"
          isClearable
          
        />
        {errors.rentalDetails && 'availability' in errors.rentalDetails && typeof errors.rentalDetails.availability?.message === 'string' && (
          <p className="text-red-500">{errors.rentalDetails.availability.message}</p>
        )}
      </div>
    </>
  );
};

export default RentalDetails;
