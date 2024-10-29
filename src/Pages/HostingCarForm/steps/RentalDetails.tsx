/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Select from 'react-select';
import { useFormContext } from 'react-hook-form';

const RentalDetails: React.FC = () => {
  const { register, setValue, formState: { errors } } = useFormContext();

  
  const durationOptions = [
    { value: 'Daily', label: 'Daily' },
    { value: 'Weekly', label: 'Weekly' },
    { value: 'Monthly', label: 'Monthly' },
  ];


  const availabilityOptions = [
    { value: true, label: 'Available' },
    { value: false, label: 'Not Available' },
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
        <label htmlFor="price" className="block font-semibold mb-2">Price Per Day (৳)</label>
        <input
          id="price"
          type="number"
          placeholder='2200'
          className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-indigo-500 hover:shadow-lg hover:border-indigo-300 bg-gray-100"
          {...register('rentalDetails.price_per_day', { 
            required: 'Price is required',
            min: { value: 1, message: 'Price must be greater than 0' }
          })}
        />
        {errors.rentalDetails && 'price_per_day' in errors.rentalDetails && typeof errors.rentalDetails.price_per_day?.message === 'string' && (
          <p className="text-red-500">{errors.rentalDetails.price_per_day.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="discount" className="block font-semibold mb-2">Discount (if applicable)</label>
        <input
          id="discount"
          type="number"
          placeholder='25%'
          className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-indigo-500 hover:shadow-lg hover:border-indigo-300 bg-gray-100"
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
          styles={{
            control: (provided, { isFocused }) => ({
              ...provided,  
              border: `1px solid ${isFocused ? '#4f46e5' : '#d1d5db'}`, 
              borderRadius: '0.5rem', 
              backgroundColor: '#f9fafb',
              boxShadow: isFocused ? '0 0 0 1px rgba(79, 70, 229, 0.5)' : '0 1px 2px rgba(0, 0, 0, 0.1)', 
              transition: 'border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
              transform: isFocused ? 'translateY(-0.25rem)' : 'translateY(0)', 
            }),
            menu: (provided) => ({
              ...provided,
              zIndex: 9999, 
            }),
          }}
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
          styles={{
            control: (provided, { isFocused }) => ({
              ...provided,  
              border: `1px solid ${isFocused ? '#4f46e5' : '#d1d5db'}`, 
              borderRadius: '0.5rem', 
              backgroundColor: '#f9fafb',
              boxShadow: isFocused ? '0 0 0 1px rgba(79, 70, 229, 0.5)' : '0 1px 2px rgba(0, 0, 0, 0.1)', 
              transition: 'border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
              transform: isFocused ? 'translateY(-0.25rem)' : 'translateY(0)', 
            }),
            menu: (provided) => ({
              ...provided,
              zIndex: 9999, 
            }),
          }}
          
        />
        {errors.rentalDetails && 'availability' in errors.rentalDetails && typeof errors.rentalDetails.availability?.message === 'string' && (
          <p className="text-red-500">{errors.rentalDetails.availability.message}</p>
        )}
      </div>
    </>
  );
};

export default RentalDetails;
