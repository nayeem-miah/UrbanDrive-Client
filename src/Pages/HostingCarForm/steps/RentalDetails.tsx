import React from 'react';
import { useFormContext } from 'react-hook-form';

const RentalDetails: React.FC = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <>
      <div className="mb-4">
        <label htmlFor="price" className="block font-semibold mb-2">Price Per Day</label>
        <input
          id="price"
          className="w-full border border-gray-300 rounded p-2"
          {...register('rentalDetails.price', { required: 'Price is required' })} 
        />
        {errors.rentalDetails && 'price' in errors.rentalDetails && typeof errors.rentalDetails.price?.message === 'string' && (
            <p className="text-red-500">{errors.rentalDetails.price.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="availability" className="block font-semibold mb-2">Availability</label>
        <input
          id="availability"
          className="w-full border border-gray-300 rounded p-2"
          {...register('rentalDetails.availability', { required: 'Availability is required' })} 
        />
       
        {errors.rentalDetails && 'availability' in errors.rentalDetails && typeof errors.rentalDetails.availability?.message === 'string' && (
          <p className="text-red-500">{errors.rentalDetails.availability.message}</p>
        )}
      </div>
    </>
  );
};

export default RentalDetails;