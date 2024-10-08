import React from 'react';
import { useFormContext } from 'react-hook-form';

const RentalDetails: React.FC = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <>
      <div className="mb-4">
        <label htmlFor="price" className="block font-semibold mb-2">Price per day</label>
        <input
          id="price"
          type="number"
          className="w-full border border-gray-300 rounded p-2"
          {...register('rentalDetails_price', { required: 'Price is required' })}
        />
        {/* Only render if message exists and is a string */}
        {typeof errors.rentalDetails_price?.message === 'number' && (
          <p className="text-red-500">{errors.rentalDetails_price.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="availability" className="block font-semibold mb-2">Availability</label>
        <input
          id="availability"
          className="w-full border border-gray-300 rounded p-2"
          {...register('rentalDetails_availability', { required: 'Availability is required' })}
        />
        {/* Only render if message exists and is a string */}
        {typeof errors.rentalDetails_availability?.message === 'string' && (
          <p className="text-red-500">{errors.rentalDetails_availability.message}</p>
        )}
      </div>
    </>
  );
};

export default RentalDetails;
