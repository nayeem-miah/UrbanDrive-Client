import React, { useState } from 'react';
import StepIndicator from '../../Components/steps/stepIndicator';
import { steps } from '../../Components/steps/HostSteps';
import { useForm, FormProvider } from 'react-hook-form';
import BasicCarInfo from './steps/BasicCarInfo';
import RentalDetails from './steps/RentalDetails';
import AdditionalInfo from './steps/AdditionalInfo';


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
  const methods = useForm<FormData>();
  const { trigger, handleSubmit } = methods;

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    // Call the backend API here
  };

  const handleNext = async () => {
    let isValid = true;

    switch (currentStep) {
      case 0:
        isValid = await trigger(['basicCarInfo.make', 'basicCarInfo.model', 'basicCarInfo.year']);
        break;
      case 1:
        isValid = await trigger(['rentalDetails.price', 'rentalDetails.availability']);
        break;
      case 5:
        isValid = await trigger(['additionalInfo.description']);
        break;
      default:
        break;
    }

    if (isValid && currentStep < steps.length - 1) {
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
        return <BasicCarInfo />;
      case 1:
        return <RentalDetails />;
      case 5:
        return <AdditionalInfo />;
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
          <FormProvider {...methods}>
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
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default HostingCarForm;
