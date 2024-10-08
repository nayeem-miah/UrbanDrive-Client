import React from 'react';
import Select from 'react-select';
import { useFormContext } from 'react-hook-form';

const BasicCarInfo: React.FC = () => {
  const { register, setValue, formState: { errors } } = useFormContext();

  const featuresOptions = [
    { value: 'Bluetooth', label: 'Bluetooth' },
    { value: 'Air Conditioning', label: 'Air Conditioning' },
    { value: 'USB Charging', label: 'USB Charging' },
    { value: 'GPS Navigation', label: 'GPS Navigation' },
    { value: 'Heated Seats', label: 'Heated Seats' },
  ];

  const categoriesOptions = [
    { value: 'SUV', label: 'SUV' },
    { value: 'Sedan', label: 'Sedan' },
    { value: 'Hatchback', label: 'Hatchback' },
    { value: 'Coupe', label: 'Coupe' },
    { value: 'Convertible', label: 'Convertible' },
    { value: 'Truck', label: 'Truck' },
  ];

  const handleFeatureChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
    setValue('basicCarInfo.features', selectedValues);
  };

  const handleCategoryChange = (selectedOption: any) => {
    setValue('basicCarInfo.category', selectedOption ? selectedOption.value : '');
  };

  return (
    <>
    {/* Car Category */}
    <div className="mb-4">
        <label className="block font-semibold mb-2">Car Category</label>
        <Select
          options={categoriesOptions}
          onChange={handleCategoryChange}
          classNamePrefix="select"
          isClearable
        />
        {errors.basicCarInfo && 'category' in errors.basicCarInfo && typeof errors.basicCarInfo.category?.message === 'string' && (
          <p className="text-red-500">{errors.basicCarInfo.category.message}</p>
        )}
      </div>
      
      <div className="mb-4">
        <label htmlFor="make" className="block font-semibold mb-2">Make</label>
        <input
          id="make"
          className="w-full border border-gray-300 rounded p-2"
          {...register('basicCarInfo.make', { required: 'Make is required' })}
        />
        {errors.basicCarInfo && 'make' in errors.basicCarInfo && typeof errors.basicCarInfo.make?.message === 'string' && (
          <p className="text-red-500">{errors.basicCarInfo.make.message}</p>
        )}
      </div>
      
      <div className="mb-4">
        <label htmlFor="model" className="block font-semibold mb-2">Model</label>
        <input
          id="model"
          className="w-full border border-gray-300 rounded p-2"
          {...register('basicCarInfo.model', { required: 'Model is required' })}
        />
        {errors.basicCarInfo && 'model' in errors.basicCarInfo && typeof errors.basicCarInfo.model?.message === 'string' && (
          <p className="text-red-500">{errors.basicCarInfo.model.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="year" className="block font-semibold mb-2">Year</label>
        <select {...register('basicCarInfo.year', { required: true })} className="border rounded p-2 text-gray-700" required>
          {Array.from({ length: 30 }, (_, index) => {
            const year = new Date().getFullYear() - index; // Current year minus index
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
        {errors.basicCarInfo && 'year' in errors.basicCarInfo && typeof errors.basicCarInfo.year?.message === 'string' && (
          <p className="text-red-500">{errors.basicCarInfo.year.message}</p>
        )}
      </div>

      

      {/* Seat Count */}
      <div className="mb-4">
        <label htmlFor="seatCount" className="block font-semibold mb-2">Seat Count</label>
        <input
          id="seatCount"
          type="number"
          className="w-full border border-gray-300 rounded p-2"
          {...register('basicCarInfo.seatCount', { required: 'Seat Count is required', min: { value: 1, message: 'At least 1 seat is required' } })}
        />
        {errors.basicCarInfo && 'seatCount' in errors.basicCarInfo && typeof errors.basicCarInfo.seatCount?.message === 'string' && (
          <p className="text-red-500">{errors.basicCarInfo.seatCount.message}</p>
        )}
      </div>

      {/* Features */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Features</label>
        <Select
          options={featuresOptions}
          isMulti
          onChange={handleFeatureChange}
          classNamePrefix="select"
        />
        {errors.basicCarInfo && 'features' in errors.basicCarInfo && typeof errors.basicCarInfo.features?.message === 'string' && (
          <p className="text-red-500">{errors.basicCarInfo.features.message}</p>
        )}
      </div>
    </>
  );
};

export default BasicCarInfo;
