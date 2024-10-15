import React, { useState } from 'react';
import StepIndicator from '../../Components/steps/stepIndicator';
import { steps } from '../../Components/steps/HostSteps';
import { useForm, FormProvider } from 'react-hook-form';
import BasicCarInfo from './steps/BasicCarInfo';
import RentalDetails from './steps/RentalDetails';
import AdditionalInfo from './steps/AdditionalInfo';
import LocationAndPickupInfo from './steps/LocationAndPickupInfo';
import HostInformation from './steps/HostInformation';
import Membership from './steps/Membership';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';


interface FormData {
  basicCarInfo: { make: string; model: string; year: string };
  rentalDetails: { price: string; availability: string };
  locationAndPickupInfo: { city: string; pickupPoint: string; openingHours: { start: string; end: string } };
  hostInfo: { name: string; phone: string };
  membershipAndPlan: { plan: string };
  additionalInfo: { description: string };
}

const HostingCarForm: React.FC = () => {
  const axiosPublic = useAxiosPublic();
  const [currentStep, setCurrentStep] = useState(0);
  const methods = useForm<FormData>();
  const { trigger, handleSubmit } = methods;

  const onSubmit = async (data: FormData) => {
    console.log('Form submitted:', data);
   try {
    const response = await axiosPublic.post('http://localhost:8000/hostCar', data);
    console.log('Car hosted successfully:', response.data);
    Swal.fire({
      title: 'Car Hosted Successfully',
      text: 'Your car has been successfully hosted.',
      icon: 'success',
      confirmButtonText: 'Home'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/';
      }
    });
  } catch (error) {
    console.error('Error hosting car:', error);
  }
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
      case 2:
        isValid = await trigger(['locationAndPickupInfo.city', 'locationAndPickupInfo.pickupPoint', 'locationAndPickupInfo.openingHours.start', 'locationAndPickupInfo.openingHours.end']);
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
      case 2:
        return <LocationAndPickupInfo />;
      case 3:
        return <HostInformation />;
      case 4:
        return <Membership/>;
      case 5:
        return <AdditionalInfo />;
      default:
        return <p className="text-gray-500">Step not implemented yet</p>;
    }
  };

  return (
    <div className="max-w-4xl mt-28 mb-24 mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 font-Playfair text-center">Host Your Car</h1>
      <hr className="border-2 border-gray-300 mb-6" />
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="w-full lg:w-1/3 lg:pr-6 lg:border-r ">
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
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-300 transition-all duration-300 ease-in-out"
                >
                  <span className="mr-2">←</span> Previous
                </button>
                {currentStep < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all duration-300 ease-in-out"
                  >
                    Next <span className="ml-2">→</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 ease-in-out"
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



