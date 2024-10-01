import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import StepIndicator from './steps';

export const steps = [
  { id: 'verify', title: 'Verify Email', description: 'We sent a verification link to your email.' },
  { id: 'mobile', title: 'Mobile Number', description: 'Enter your mobile number' },
  { id: 'license', title: 'Driver License', description: 'Upload your driver license' },
  { id: 'payment', title: 'Payment Method', description: 'Add your payment method' },
  { id: 'confirmation', title: 'Confirmation', description: 'Review and confirm your information' },
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
    const timer = setTimeout(() => {
      setCurrentStep(1);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
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
        console.error('Failed to update booking');
      }
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <p>Verifying your email...</p>;
      case 1:
        return (
          <input
            type="tel"
            name="phoneNumber"
            value={userInfo.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            className="w-full px-3 py-2 border rounded-md"
          />
        );
      case 2:
        return (
          <input
            type="file"
            name="driversLicense"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        );
      case 3:
        return (
          <input
            type="text"
            name="paymentMethod"
            value={userInfo.paymentMethod}
            onChange={handleChange}
            placeholder="Enter payment details"
            className="w-full px-3 py-2 border rounded-md"
          />
        );
      case 4:
        return <p>Please review your information and confirm.</p>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-28 p-6 bg-white rounded-xl shadow-lg flex flex-col lg:flex-row">
      {/* Left side - Step Indicator */}
      <div className="w-full lg:w-1/3 lg:pr-6 lg:border-r">
        <StepIndicator steps={steps} currentStep={currentStep} />
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-2/3 lg:pl-6 mt-8 lg:mt-0">
        <h2 className="text-2xl font-bold mb-6">Complete Your Booking</h2>
        <div>{renderStepContent(currentStep)}</div>
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleNextStep}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            {currentStep === steps.length - 1 ? 'Confirm' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardCheckout;
