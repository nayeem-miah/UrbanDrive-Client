import React, { useState } from 'react';
import BasicCarInfo from '../../Components/steps/BasicCarInfo';

const steps = [
  { label: 'Personal Info', status: 'completed' },
  { label: 'Education', status: 'completed' },
  { label: 'Company', status: 'pending' },
  { label: 'Testing', status: 'pending' },
  { label: 'Review', status: 'pending' },
];

const HostCarListingForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    carCategory: '',
    make: '',
    model: '',
    seatCount: 0,
    features: [],
    rentalPrice: 0,
    rentalDuration: '',
    discount: 0,
    availability: true,
    city: '',
    pickupPoint: '',
    openingHours: '',
    hostName: '',
    hostEmail: '',
    carImages: [],
    membershipType: '',
    planType: '',
    description: '',
    carTripCount: 0,
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayInputChange = (name: string, value: string[]) => {
    setFormData({ ...formData, [name]: value });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <BasicCarInfo
            formData={formData}
            handleInputChange={handleInputChange}
            handleArrayInputChange={handleArrayInputChange}
            nextStep={nextStep}
          />
        );
      case 2:
        return <div>Step 2 Content</div>; // Replace with the next form step component
      default:
        return <div>Form completed</div>;
    }
  };

  const getStepStatus = (index: number) => {
    if (index < step) return 'completed';
    if (index === step) return 'active';
    return 'pending';
  };

  return (
    <div className="max-w-screen-lg mx-auto px-4 mt-10 font-[sans-serif]">
      <h1 className="text-3xl font-bold mb-6">List your car</h1>

      <div className="flex items-start max-md:flex-col gap-y-6 gap-x-3 mb-6">
        {steps.map((item, index) => {
          const status = getStepStatus(index + 1);
          return (
            <div key={index} className="w-full">
              <div className={`w-full h-1 rounded-xl ${status === 'completed' || status === 'active' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <div className="mt-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={`shrink-0 ${status === 'completed' ? 'fill-green-500' : 'fill-gray-400'}`} viewBox="0 0 24 24">
                  <g>
                    <path d="M9.7 11.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l3 3c.2.2.4.3.7.3s.5-.1.7-.3l7-8c.3-.5.3-1.1-.2-1.4-.4-.3-1-.3-1.3.1L12 13.5z" />
                    <path d="M21 11c-.6 0-1 .4-1 1 0 4.4-3.6 8-8 8s-8-3.6-8-8c0-2.1.8-4.1 2.3-5.6C7.8 4.8 9.8 4 12 4c.6 0 1.3.1 1.9.2.5.2 1.1-.1 1.3-.7s-.2-1-.7-1.2h-.1c-.8-.2-1.6-.3-2.4-.3C6.5 2 2 6.5 2 12.1c0 2.6 1.1 5.2 2.9 7 1.9 1.9 4.4 2.9 7 2.9 5.5 0 10-4.5 10-10 .1-.6-.4-1-.9-1z" />
                  </g>
                </svg>
                <div className="ml-2">
                  <h6 className={`text-base font-bold ${status === 'completed' ? 'text-green-500' : 'text-gray-400'}`}>{item.label}</h6>
                  <p className={`text-xs ${status === 'completed' ? 'text-green-500' : 'text-gray-400'}`}>
                    {status === 'completed' ? 'Completed' : status === 'active' ? 'In Progress' : 'Pending'}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {renderStep()}
    </div>
  );
};

export default HostCarListingForm;
