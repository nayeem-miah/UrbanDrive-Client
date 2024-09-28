import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormData = {
  carCategory: string;
  make: string;
  model: string;
  seatCount: number;
  features: string[];
};

const BasicCarInfo: React.FC<{ onSubmit: SubmitHandler<FormData> }> = ({ onSubmit }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="carCategory" className="block text-sm font-medium text-gray-700">Car Category</label>
        <select
          id="carCategory"
          {...register("carCategory", { required: "Car category is required" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Select a category</option>
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Hatchback">Hatchback</option>
          <option value="Truck">Truck</option>
        </select>
        {errors.carCategory && <span className="text-red-500 text-sm">{errors.carCategory.message}</span>}
      </div>

      

      <div>
        <span className="block text-sm font-medium text-gray-700">Features</span>
        <div className="mt-2 space-y-2">
          {['Bluetooth', 'Air Conditioning', 'USB Charging'].map((feature) => (
            <label key={feature} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                value={feature}
                {...register("features")}
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <span className="ml-2">{feature}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Next
      </button>
    </form>
  );
};

export default BasicCarInfo;