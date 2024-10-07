import React, { useState } from 'react';
import StepIndicator from '../../Components/steps/stepIndicator';
import { steps } from '../../Components/steps/HostSteps';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormData {
  basicCarInfo: { make: string; model: string; year: string };
  rentalDetails: { price: string; availability: string };
  locationAndPickupInfo: { address: string; instructions: string };
  hostInfo: { name: string; phone: string };
  membershipAndPlan: { plan: string };
  additionalInfo: { description: string };
}

const HostingCarForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formData, setFormData] = useState<FormData>({
    basicCarInfo: { make: '', model: '', year: '' },
    rentalDetails: { price: '', availability: '' },
    locationAndPickupInfo: { address: '', instructions: '' },
    hostInfo: { name: '', phone: '' },
    membershipAndPlan: { plan: '' },
    additionalInfo: { description: '' }
  });

  const handleInputChange = (step: keyof FormData, field: string, value: string) => {
    setFormData(prevData => ({
      ...prevData,
      [step]: {
        ...prevData[step],
        [field]: value
      }
    }));
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('Form submitted:', data);
    // Call the backend API here
    // TODO: Implement API call to submit form data
    setFormData(data);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <div className="mb-4">
              <label htmlFor="make" className="block font-semibold mb-2">Make</label>
              <input
                id="make"
                className="w-full border border-gray-300 rounded p-2"
                {...register('basicCarInfo.make', { required: 'Make is required' })}
                onChange={(e) => handleInputChange('basicCarInfo', 'make', e.target.value)}
              />
              {errors.basicCarInfo?.make && <p className="text-red-500">{errors.basicCarInfo.make.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="model" className="block font-semibold mb-2">Model</label>
              <input
                id="model"
                className="w-full border border-gray-300 rounded p-2"
                {...register('basicCarInfo.model', { required: 'Model is required' })}
                onChange={(e) => handleInputChange('basicCarInfo', 'model', e.target.value)}
              />
              {errors.basicCarInfo?.model && <p className="text-red-500">{errors.basicCarInfo.model.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="year" className="block font-semibold mb-2">Year</label>
              <input
                id="year"
                type="number"
                className="w-full border border-gray-300 rounded p-2"
                {...register('basicCarInfo.year', { required: 'Year is required' })}
                onChange={(e) => handleInputChange('basicCarInfo', 'year', e.target.value)}
              />
              {errors.basicCarInfo?.year && <p className="text-red-500">{errors.basicCarInfo.year.message}</p>}
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div className="mb-4">
              <label htmlFor="price" className="block font-semibold mb-2">Price per day</label>
              <input
                id="price"
                type="number"
                className="w-full border border-gray-300 rounded p-2"
                {...register('rentalDetails.price', { required: 'Price is required' })}
                onChange={(e) => handleInputChange('rentalDetails', 'price', e.target.value)}
              />
              {errors.rentalDetails?.price && <p className="text-red-500">{errors.rentalDetails.price.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="availability" className="block font-semibold mb-2">Availability</label>
              <input
                id="availability"
                className="w-full border border-gray-300 rounded p-2"
                {...register('rentalDetails.availability', { required: 'Availability is required' })}
                onChange={(e) => handleInputChange('rentalDetails', 'availability', e.target.value)}
              />
              {errors.rentalDetails?.availability && <p className="text-red-500">{errors.rentalDetails.availability.message}</p>}
            </div>
          </>
        );
      case 5:
        return (
          <>
            <div className="mb-4">
              <label htmlFor="description" className="block font-semibold mb-2">Additional Information</label>
              <textarea
                id="description"
                className="w-full border border-gray-300 rounded p-2"
                {...register('additionalInfo.description', { required: 'Description is required' })}
                onChange={(e) => handleInputChange('additionalInfo', 'description', e.target.value)}
              />
              {errors.additionalInfo?.description && <p className="text-red-500">{errors.additionalInfo.description.message}</p>}
            </div>
          </>
        );
      default:
        return <p className="text-gray-500">Step not implemented yet</p>;
    }
  };

  return (
    <div className="max-w-4xl mt-28 mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Host Your Car</h1>
      <div className="flex flex-col lg:flex-row justify-between">
      <div className="w-full lg:w-1/3 lg:pr-6 lg:border-r">
        <StepIndicator steps={steps} currentStep={currentStep} />
      </div>
      <div className="w-full lg:w-2/3 lg:pl-6 mt-8 lg:mt-0">
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        {renderStepContent()}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:bg-gray-300"
          >
            Previous
          </button>
          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Submit
            </button>
          )}
        </div>
      </form></div>
      </div>
    </div>
  );
};

export default HostingCarForm;