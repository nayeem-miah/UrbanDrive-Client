/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Select from 'react-select';
import { useFormContext } from 'react-hook-form';


const timeOptions = Array.from({ length: 24 }, (_, i) => {
  const hour = i % 12 === 0 ? 12 : i % 12; 
  const period = i < 12 ? 'AM' : 'PM';
  return { value: `${i}:00`, label: `${hour}:00 ${period}` };
});

const LocationAndPickupInfo: React.FC = () => {
  const { register, setValue, formState: { errors } } = useFormContext();

  const handleStartChange = (selectedOption: any) => {
    setValue('location.openingHours.start', selectedOption ? selectedOption.value : '');
  };

  const handleEndChange = (selectedOption: any) => {
    setValue('location.openingHours.end', selectedOption ? selectedOption.value : '');
  };

  return (
    <>

    
      <div className="mb-4">
        <label htmlFor="city" className="block font-semibold mb-2">City</label>
        <input
          id="city"
          className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-indigo-300 hover:shadow-lg hover:border-indigo-300 bg-gray-100"
          {...register('locationAndPickupInfo.city', { required: 'City is required' })}
        />
        {errors.locationAndPickupInfo && 'city' in errors.locationAndPickupInfo && typeof errors.locationAndPickupInfo.city?.message === 'string' && (
          <p className="text-red-500">{errors.locationAndPickupInfo.city.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="pickupPoint" className="block font-semibold mb-2">Pickup Point</label>
        <input
          id="pickupPoint"
          className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-indigo-300 hover:shadow-lg hover:border-indigo-300 bg-gray-100"
          {...register('locationAndPickupInfo.pickupPoint', { required: 'Pickup point is required' })}
        />
        {errors.locationAndPickupInfo && 'pickupPoint' in errors.locationAndPickupInfo && typeof errors.locationAndPickupInfo.pickupPoint?.message === 'string' && (
          <p className="text-red-500">{errors.locationAndPickupInfo.pickupPoint.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-2">Opening Hours</label>
        <div className="flex gap-4">
          <Select
            options={timeOptions}
            onChange={handleStartChange}
            className="flex-1"
            placeholder="Start Time"
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
          
          <span className="self-center">-</span>
          <Select
            options={timeOptions}
            onChange={handleEndChange}
            className="flex-1"
            placeholder="End Time"
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
        </div>
      
    </div>
  </>
);
};

export default LocationAndPickupInfo;

