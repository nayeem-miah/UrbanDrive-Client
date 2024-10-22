import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAuth from '../../Hooks/useAuth';
import toast from 'react-hot-toast';
import { ImSpinner9 } from 'react-icons/im';

const MembershipDuration: React.FC = () => {
  const axiosPublic = useAxiosPublic()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { planName, price } = useParams<{ planName: string; price: string }>();
  const [duration, setDuration] = useState<number>(1);
  const parsedPrice = price ? parseFloat(price) : NaN;
  // const calculatedPrice = price * duration;

  const calculatedPrice = parsedPrice * duration;

  const handleDurationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDuration(Number(event.target.value));
  };

  // payment function

  const paymentInfo = {
    price: calculatedPrice,
    currency: 'BDT',
    email: user?.email,
    name: user?.displayName,
    planName: planName,
    purchaseDate: new Date(),
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  }

  const handleSubmitPayment = async () => {
    setIsLoading(true)
    try {
      // post request
      const { data } = await axiosPublic.post("/create-payment", paymentInfo);
      const redirectUrl = data.paymentUrl;
      // console.log(redirectUrl);
      if (redirectUrl) {
        window.location.replace(redirectUrl)
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error posting payment info:", error);
      toast.error(error.message);
    }finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container lg:mt-16 mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        {planName} Select the duration for the membership
      </h1>
      <label className="block mb-4 text-lg font-bold text-gray-700">
        How many months do you want to buy?
      </label>
      <select
        value={duration}
        onChange={handleDurationChange}
        className="block w-2/3 p-2 border rounded-lg mb-4"
      >
        <option value={1}>1 Month</option>
        <option value={3}>3 Month</option>
        <option value={6}>6 Month</option>
        <option value={12}>1 Year</option>
      </select>

      <p className="text-xl font-bold text-gray-700">
        TotalPrice: ${calculatedPrice}
      </p>

      {/* <Link to={`/payment/${planName}/${calculatedPrice}`}> */}
        <button onClick={handleSubmitPayment}  className={`w-2/3 bg-gradient-to-r from-[#3d83d3] to-[#a306fd] text-white font-bold py-2 px-4 rounded mt-4 ${isLoading ? ' cursor-not-allowed' : ''}` } disabled={isLoading} >
         {
          isLoading? <ImSpinner9  size={28} className="animate-spin m-auto text-green-600" />:  "Payment"
         }
        </button>
      {/* </Link> */}
    </div>
  );
};

export default MembershipDuration;
