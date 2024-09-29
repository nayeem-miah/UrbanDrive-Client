import React from 'react';

interface BasicCarInfoProps {
  formData: {
    carCategory: string;
    make: string;
    model: string;
    seatCount: number;
    features: string[];
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleArrayInputChange: (name: string, value: string[]) => void;
  nextStep: () => void;
}

const BasicCarInfo: React.FC<BasicCarInfoProps> = ({ formData, handleInputChange, handleArrayInputChange, nextStep }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  // const handleFeatureChange = (feature: string) => {
  //   const updatedFeatures = formData.features.includes(feature)
  //     ? formData.features.filter(f => f !== feature)
  //     : [...formData.features, feature];
  //   handleArrayInputChange('features', updatedFeatures);
  // };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 shadow-md rounded-md">
      <div>
        <label htmlFor="carCategory" className="block text-sm font-medium text-gray-700">Car Category</label>
        <select
          id="carCategory"
          name="carCategory"
          value={formData.carCategory}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          required
        >
          <option value="">Select a category</option>
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Hatchback">Hatchback</option>
          <option value="Truck">Truck</option>
        </select>
      </div>

      <div>
        <label htmlFor="make" className="block text-sm font-medium text-gray-700">Make</label>
        <input
          type="text"
          id="make"
          name="make"
          value={formData.make}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          required
        />
      </div>

      <div>
        <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
        <input
          type="text"
          id="model"
          name="model"
          value={formData.model}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          required
        />
      </div>

      <div>
        <label htmlFor="seatCount" className="block text-sm font-medium text-gray-700">Seat Count</label>
        <input
          type="number"
          id="seatCount"
          name="seatCount"
          value={formData.seatCount}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          required
          min="1"
        />
      </div>

      <div>
        <span className="block text-sm font-medium text-gray-700">Features</span>
        <div className="mt-2 space-y-2">
          {['Bluetooth', 'Air Conditioning', 'USB Charging'].map((feature) => (
            <label key={feature} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                // checked={formData.features.includes(feature)}
                // onChange={() => handleFeatureChange(feature)}
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-700">{feature}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
      >
        Next
      </button>
    </form>
  );
};

export default BasicCarInfo;
