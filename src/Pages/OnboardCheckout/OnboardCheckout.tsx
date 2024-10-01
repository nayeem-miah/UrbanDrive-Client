import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import StepIndicator from './steps';


export const steps = [
  { id: 'verify', title: 'Verify Email', description: 'We sent a verification link to your email. Click the link to continue.' },
  { id: 'mobile', title: 'Mobile Number', description: 'Enter your mobile number' },
  { id: 'license', title: 'Driver License', description: 'Upload your driver license' },
  { id: 'payment', title: 'Payment Method', description: 'Add your payment method' },
  { id: 'confirmation', title: 'Confirmation', description: 'Finish It!' },
];

const OnboardCheckout: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [userInfo, setUserInfo] = useState({
    email: '',
    phoneNumber: '',
    driversLicense: null as File | null,
    paymentMethod: '',
  });

  useEffect(() => {
    // Simulating email verification
    const timer = setTimeout(() => {
      setCurrentStep(1);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (name: string, value: string | File) => {
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      Object.entries(userInfo).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value as string);
        }
      });

      const response = await axios.put(`http://localhost:8000/bookings/${bookingId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.data.success) {
        navigate('/booking-confirmation');
      } else {
        console.error('Failed to update booking with user info');
      }
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <EmailVerificationStep />;
      case 1:
        return <MobileNumberStep value={userInfo.phoneNumber} onChange={(value) => handleChange('phoneNumber', value)} />;
      case 2:
        return <DriverLicenseStep onChange={(file) => handleChange('driversLicense', file)} />;
      case 3:
        return <PaymentMethodStep value={userInfo.paymentMethod} onChange={(value) => handleChange('paymentMethod', value)} />;
      case 4:
        return <ConfirmationStep userInfo={userInfo} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-8 text-center">Complete Your Booking</h2>
      <StepIndicator steps={steps} currentStep={currentStep} />
      <div className="mt-8">
        {renderStepContent(currentStep)}
      </div>
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleNextStep}
          className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          {currentStep === steps.length - 1 ? 'Confirm' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default OnboardCheckout;