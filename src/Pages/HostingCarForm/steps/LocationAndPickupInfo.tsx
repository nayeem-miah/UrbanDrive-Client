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
          className="w-full border border-gray-300 rounded p-2"
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
          className="w-full border border-gray-300 rounded p-2"
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
              control: (provided) => ({
                ...provided,
                borderColor: errors.locationAndPickupInfo && 'openingHours' in errors.locationAndPickupInfo && (errors.locationAndPickupInfo.openingHours as { start?: any }).start ? 'red' : provided.borderColor,
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
              control: (provided) => ({
                ...provided,
                borderColor: errors.locationAndPickupInfo && 'openingHours' in errors.locationAndPickupInfo && (errors.locationAndPickupInfo.openingHours as { end?: any }).end ? 'red' : provided.borderColor,
              }),
            }}
          />
        </div>
      
    </div>
  </>
);
};

export default LocationAndPickupInfo;

