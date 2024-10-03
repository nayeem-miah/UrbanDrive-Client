import React from 'react';
import { useForm } from 'react-hook-form';

interface RentalDetailsFormValues {
  rentalPrice: string;
  rentalDuration: string;
  discount: string;
  availability: boolean | true;
}

interface RentalDetailsProps {
  formData: RentalDetailsFormValues;
  onSubmit: (data: RentalDetailsFormValues) => void;
  nextStep: () => void;
}

const RentalDetails: React.FC<RentalDetailsProps> = ({ formData, onSubmit, nextStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RentalDetailsFormValues>({
    defaultValues: { ...formData, 
    availability: true,
    discount: "0",
   }
  });

  const handleFormSubmit = (data: RentalDetailsFormValues) => {
    onSubmit(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {/* Rental Price per Day */}
      <div>
        <label htmlFor="rentalPrice" className="block text-sm font-medium text-gray-700">Rental Price per Day</label>
        <input
          type="number"
          id="rentalPrice"
          {...register('rentalPrice', { required: 'Rental price is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.rentalPrice && <span className="text-red-500 text-sm">{errors.rentalPrice.message}</span>}
      </div>

      {/* Rental Duration */}
      <div>
        <label htmlFor="rentalDuration" className="block text-sm font-medium text-gray-700">Rental Duration</label>
        <select
          id="rentalDuration"
          {...register('rentalDuration', { required: 'Please select a rental duration' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Select a duration</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
        {errors.rentalDuration && <span className="text-red-500 text-sm">{errors.rentalDuration.message}</span>}
      </div>

      {/* Discount */}
      <div>
        <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Discount (if applicable)</label>
        <input
          type="number"
          id="discount"
          {...register('discount')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      {/* Availability */}
      {/* Availability */}
<div>
  <label htmlFor="availability" className="block text-sm font-medium text-gray-700">Availability</label>
  <select
    id="availability"
    {...register('availability')}
    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
  >
    <option value="true">Available</option>
    <option value="false">Not Available</option>
  </select>
</div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Next
      </button>
    </form>
  );
};

export default RentalDetails;
