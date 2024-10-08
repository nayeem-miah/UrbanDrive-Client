import React from 'react';
import { useFormContext } from 'react-hook-form';

const LocationAndPickupInfo: React.FC = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <>
      <div className="mb-4">
        <label htmlFor="city" className="block font-semibold mb-2">City</label>
        <input
          id="city"
          className="w-full border border-gray-300 rounded p-2"
          {...register('location.city', { required: 'City is required' })}
        />
        {errors.location?.city && 'city' in errors.location && typeof errors.location.city.message === 'string' && (
          <p className="text-red-500">{errors.location.city.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="pickupPoint" className="block font-semibold mb-2">Pickup Point</label>
        <input
          id="pickupPoint"
          className="w-full border border-gray-300 rounded p-2"
          {...register('location.pickupPoint', { required: 'Pickup point is required' })}
        />
        {errors.location?.pickupPoint && 'pickupPoint' in errors.location && typeof errors.location.pickupPoint.message === 'string' && (
          <p className="text-red-500">{errors.location.pickupPoint.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="openingHours" className="block font-semibold mb-2">Opening Hours</label>
        <input
          id="openingHours"
          placeholder="e.g., 7:00 AM - 9:00 PM"
          className="w-full border border-gray-300 rounded p-2"
          {...register('location.openingHours', { required: 'Opening hours are required' })}
        />
        {errors.location?.openingHours && 'openingHours' in errors.location && typeof errors.location.openingHours.message === 'string' && (
          <p className="text-red-500">{errors.location.openingHours.message}</p>
        )}
      </div>
    </>
  );
};

export default LocationAndPickupInfo;
