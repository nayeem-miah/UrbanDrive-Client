import React, { useState } from 'react';
import BasicCarInfo from '../../Components/steps/BasicCarInfo';



const HostCarListingForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Initialize with empty values for all fields
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
        return <BasicCarInfo formData={formData} handleInputChange={handleInputChange} handleArrayInputChange={handleArrayInputChange} nextStep={nextStep} />;
      
        return <ReviewConfirmation formData={formData} prevStep={prevStep} />;
      default:
        return <div>Form completed</div>;
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">List your car</h1>
      <div className="mb-4">
        Step {step} of 8
      </div>
      {renderStep()}
    </div>
  );
};

export default HostCarListingForm;