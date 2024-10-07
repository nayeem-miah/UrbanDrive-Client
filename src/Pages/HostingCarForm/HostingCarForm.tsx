import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BasicCarInfo from '../../Components/steps/BasicCarInfo';
import StepIndicator from '../../Components/steps/stepIndicator';
import RentalDetails from '../../Components/steps/RentalDetails';


const HostCarListingForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    ... (initialize your form data here)
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const renderStep = () => {
    const props = { formData, handleInputChange, nextStep, prevStep, onSubmit: () => {} };
    switch (step) {
      case 1: return <BasicCarInfo {...props} />;
      case 2: return <RentalDetails {...props}></RentalDetails>;
      case 3: return <div>Step 3</div>;
      default: return <div>Form completed</div>;
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">List your car</h1>
      <StepIndicator currentStep={step} />
      <div className="mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HostCarListingForm;