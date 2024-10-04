/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import StepIndicator from './steps';
import useAuth from '../../Hooks/useAuth';
import EmailVerification from './EmailVerification';
import { steps } from '../../Components/steps/steps';
import Swal from 'sweetalert2';

type UserInfo = {
  email: string;
  phoneNumber: string;
  driversLicense: File | null;
  paymentMethod: string;
};

const OnboardCheckout: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: user?.email || '',
    phoneNumber: '',
    driversLicense: null,
    paymentMethod: '',
  });
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [skipEmailVerification, setSkipEmailVerification] = useState(false);
  const [skipDriversLicense, setSkipDriversLicense] = useState(false);

  useEffect(() => {
    if (user?.email) {
      setUserInfo((prevInfo) => ({
        ...prevInfo,
        email: user.email || '',
      }));
    }

    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/bookings/${bookingId}`);
        setBookingDetails(response.data);
      } catch (error) {
        console.error('Error fetching booking details:', error);
      }
    };

    fetchBookingDetails();
  }, [user, bookingId]);

  useEffect(() => {
    if (isEmailVerified || skipEmailVerification) {
      setCurrentStep(1);
    }
  }, [isEmailVerified, skipEmailVerification]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: files ? files[0] : value,
    }));
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSkipEmailVerification = () => {
    setSkipEmailVerification(true);
    handleNextStep();
  };

  const handleSkipDriversLicense = () => {
    setSkipDriversLicense(true);
    handleNextStep();
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/bookings/${bookingId}`, {
        ...userInfo,
        driversLicense: skipDriversLicense ? undefined : userInfo.driversLicense,
      });
  
      if (response.data.success) {
        Swal.fire({
          title: 'Booking Confirmed!',
          text: 'Your booking has been successfully confirmed.',
          icon: 'success',
          confirmButtonText: 'Go to Homepage',
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/');
          }
        });
      } else {
        console.error('Failed to update booking:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };
  

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <div>
            <EmailVerification email={userInfo.email} onVerified={() => setIsEmailVerified(true)} />
            <button onClick={handleSkipEmailVerification} className="mt-4 text-blue-600">Skip Email Verification</button>
          </div>
        );
      case 1:
        return (
          <input
            type="tel"
            name="phoneNumber"
            value={userInfo.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        );
      case 2:
        return (
          <div>
            <input
              type="file"
              name="driversLicense"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
            <button onClick={handleSkipDriversLicense} className="mt-4 text-blue-600">Skip Driver's License</button>
          </div>
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
        return bookingDetails ? (
          <div>
            <p>Please review your information and confirm.</p>
            <p>Start Date: {new Date(bookingDetails.startDate).toLocaleDateString()}</p>
            <p>End Date: {new Date(bookingDetails.endDate).toLocaleDateString()}</p>
            <p>Location: {bookingDetails.location}</p>
            <p>Total Cost: ${bookingDetails.totalCost}</p>
            <p>Phone Number: {userInfo.phoneNumber}</p>
            <p>Payment Method: {userInfo.paymentMethod}</p>
            <p>Driver's License: {skipDriversLicense ? 'Skipped' : userInfo.driversLicense ? 'Uploaded' : 'Not uploaded'}</p>
          </div>
        ) : (
          <p>Loading booking details...</p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-28 p-6 bg-white rounded-xl shadow-lg flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/3 lg:pr-6 lg:border-r">
        <StepIndicator steps={steps} currentStep={currentStep} />
      </div>
      <div className="w-full lg:w-2/3 lg:pl-6 mt-8 lg:mt-0">
        <h2 className="text-2xl font-bold mb-6">Complete Your Booking</h2>
        <div>{renderStepContent(currentStep)}</div>
        <div className="mt-8 flex justify-end">
          {currentStep > 0 && (
            <button
              onClick={handleNextStep}
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              {currentStep === steps.length - 1 ? 'Confirm' : 'Next'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardCheckout;
