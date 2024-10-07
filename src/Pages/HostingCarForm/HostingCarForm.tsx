import React, { useState } from 'react';
import StepIndicator from '../../Components/steps/stepIndicator';
import { steps } from '../../Components/steps/HostSteps';



const HostingCarForm = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
      basicCarInfo: { make: '', model: '', year: '' },
      rentalDetails: { price: '', availability: '' },
      locationAndPickupInfo: { address: '', instructions: '' },
      hostInfo: { name: '', phone: '' },
      membershipAndPlan: { plan: '' },
      additionalInfo: { description: '' }
    });
  
    const handleInputChange = (step: string, field: string, value: string) => {
      setFormData(prevData => ({
        ...prevData,
        [step]: {
          ...prevData[step as keyof typeof prevData],
          [field]: value
        }
      }));
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
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
      // Here you would typically send the data to your backend
    };
  
    const renderStepContent = () => {
      switch (currentStep) {
        case 0:
          return (
            <>
              <label htmlFor="make">Make</label>
              <input
                id="make"
                value={formData.basicCarInfo.make}
                onChange={(e) => handleInputChange('basicCarInfo', 'make', e.target.value)}
              />
              <label htmlFor="model">Model</label>
              <input
                id="model"
                value={formData.basicCarInfo.model}
                onChange={(e) => handleInputChange('basicCarInfo', 'model', e.target.value)}
              />
              <label htmlFor="year">Year</label>
              <input
                id="year"
                value={formData.basicCarInfo.year}
                onChange={(e) => handleInputChange('basicCarInfo', 'year', e.target.value)}
              />
            </>
          );
        case 1:
          return (
            <>
              <label htmlFor="price">Price per day</label>
              <input
                id="price"
                value={formData.rentalDetails.price}
                onChange={(e) => handleInputChange('rentalDetails', 'price', e.target.value)}
              />
              <label htmlFor="availability">Availability</label>
              <input
                id="availability"
                value={formData.rentalDetails.availability}
                onChange={(e) => handleInputChange('rentalDetails', 'availability', e.target.value)}
              />
            </>
          );
        // Add cases for the remaining steps...
        case 5:
          return (
            <>
              <label htmlFor="description">Additional Information</label>
              <textarea
                id="description"
                value={formData.additionalInfo.description}
                onChange={(e) => handleInputChange('additionalInfo', 'description', e.target.value)}
              />
            </>
          );
        default:
          return <p>Step not implemented yet</p>;
      }
    };
  
    return (
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Host Your Car</h1>
        <StepIndicator steps={steps} currentStep={currentStep} />
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="mb-4">{renderStepContent()}</div>
          <div className="flex justify-between mt-4">
            <button type="button" onClick={handlePrevious} disabled={currentStep === 0}>
              Previous
            </button>
            {currentStep < steps.length - 1 ? (
              <button type="button" onClick={handleNext}>
                Next
              </button>
            ) : (
              <button type="submit">Submit</button>
            )}
          </div>
        </form>
      </div>
    );
  };
  
  export default HostingCarForm;