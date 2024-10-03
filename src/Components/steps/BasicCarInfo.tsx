import React from 'react';
import { useForm } from 'react-hook-form';

interface BasicCarInfoFormValues {
  carCategory: string;
  make: string;
  model: string;
  seatCount: number;
  features: string[];
}

interface BasicCarInfoProps {
  formData: BasicCarInfoFormValues;
  onSubmit: (data: BasicCarInfoFormValues) => void;
  nextStep: () => void;
}

const BasicCarInfo: React.FC<BasicCarInfoProps> = ({ formData, onSubmit, nextStep }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BasicCarInfoFormValues>({
    defaultValues: formData,
  });

  // const selectedFeatures = watch('features');

  // const handleFeatureChange = (feature: string) => {
  //   const updatedFeatures = selectedFeatures.includes(feature)
  //     ? selectedFeatures.filter(f => f !== feature)
  //     : [...selectedFeatures, feature];

  //   setValue('features', updatedFeatures); // Update the features value in the form
  // };

  const handleFormSubmit = (data: BasicCarInfoFormValues) => {
    onSubmit(data);
    nextStep();
  };  

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {/* Car Category */}
      <div>
        <label htmlFor="carCategory" className="block text-sm font-medium text-gray-700">Car Category</label>
        <select
          id="carCategory"
          {...register('carCategory', { required: 'Please select a category' })}
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

      {/* Make */}
      <div>
        <label htmlFor="make" className="block text-sm font-medium text-gray-700">Make</label>
        <input
          type="text"
          id="make"
          {...register('make', { required: 'Make is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.make && <span className="text-red-500 text-sm">{errors.make.message}</span>}
      </div>

      {/* Model */}
      <div>
        <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
        <input
          type="text"
          id="model"
          {...register('model', { required: 'Model is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.model && <span className="text-red-500 text-sm">{errors.model.message}</span>}
      </div>

      {/* Seat Count */}
      <div>
        <label htmlFor="seatCount" className="block text-sm font-medium text-gray-700">Seat Count</label>
        <input
          type="number"
          id="seatCount"
          {...register('seatCount', { required: 'Seat count is required', min: { value: 1, message: 'Minimum seat count is 1' } })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.seatCount && <span className="text-red-500 text-sm">{errors.seatCount.message}</span>}
      </div>

      {/* Features */}
      {/* <div>
        <span className="block text-sm font-medium text-gray-700">Features</span>
        <div className="mt-2 space-y-2">
          {['Bluetooth', 'Air Conditioning', 'USB Charging'].map((feature) => (
            <label key={feature} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                checked={selectedFeatures.includes(feature)}
                onChange={() => handleFeatureChange(feature)}
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <span className="ml-2">{feature}</span>
            </label>
          ))}
        </div>
      </div> */}

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

export default BasicCarInfo;
