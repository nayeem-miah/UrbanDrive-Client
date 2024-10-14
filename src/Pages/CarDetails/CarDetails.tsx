/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import {  useLoaderData, useNavigate } from 'react-router-dom';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import slide1 from '../../assets/slides/slide1.jpg';
import { FaGasPump, FaStar } from 'react-icons/fa6';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { addDays, differenceInDays, format } from 'date-fns';
import { DateRange, RangeKeyDict } from 'react-date-range';
import { MdElectricCar } from 'react-icons/md';
import { GiCarDoor, GiCarSeat } from 'react-icons/gi';
import { motion } from 'framer-motion';
import { ICar, RatingData } from '../../Types/car';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAuth from '../../Hooks/useAuth';
import { SyncLoader } from 'react-spinners';
import { useQuery } from '@tanstack/react-query';
import { Rating } from '@smastrom/react-rating';
import ReviewForm from '../../Components/ReviewForm/ReviewForm';





const CarDetails: React.FC = () => {
  const navigate = useNavigate();
  const car = useLoaderData() as ICar;
  const {user} = useAuth();
  const ratingsData: RatingData[] = [
    { label: 'Cleanliness', value: 3.0 },
    { label: 'Communication', value: 2.0 },
    { label: 'Convenience', value: 5.0 },

  ];

  const { data: reviews = [], refetch: refetchReviews } = useQuery({
    queryKey: ['reviews', car._id],
    queryFn: async () => {
      const response = await axiosPublic.get(`/reviews/${car._id}`);
      return response.data;
    }
  });

  const [scrollY, setScrollY] = useState(0);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 2),
      key: 'selection'
    }
  ]);

  const axiosPublic = useAxiosPublic();
  const [location, setLocation] = useState('Current Location');
  const [showCalendar, setShowCalendar] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [perDayCost, setPerDayCost] = useState(0);
  const [includedDriver, setIncludedDriver] = useState(false);

  


  const calculateTotalCost = (start: Date, end: Date) => {
    const days = differenceInDays(end, start) + 1;
    let cost = days * car.rental_price_per_day;
  
    if (includedDriver) {
      cost += cost * 0.2; 
    }
  
    return cost;
  };

  useEffect(() => {
    
    const newTotalCost = calculateTotalCost(dateRange[0].startDate, dateRange[0].endDate);
    setTotalCost(newTotalCost);
    setPerDayCost(includedDriver ? car.rental_price_per_day * 1.2 : car.rental_price_per_day); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange, includedDriver]);




  const handleSelect = (ranges: RangeKeyDict) => {
    const selection = ranges.selection;
    if (selection.startDate && selection.endDate) {
      setDateRange([{
        startDate: selection.startDate,
        endDate: selection.endDate,
        key: 'selection'
      }]);
      const newTotalCost = calculateTotalCost(selection.startDate, selection.endDate);
      setTotalCost(newTotalCost);
    }
  };


  const handleContinue = async () => {
    try {
      const bookingData = {
        user_email: user?.email,
        userName: user?.displayName, 
        carId: car._id.toString(),
        startDate: dateRange[0].startDate,
        endDate: dateRange[0].endDate,
        location: location,
        totalCost: totalCost,
        includedDriver: includedDriver
      };

      const response = await axiosPublic.post('http://localhost:8000/bookings', bookingData);
      
      if (response.data.success && response.data.bookingId) {
        navigate(`/checkout/${response.data.bookingId}`);
      } else {
        console.error('Failed to create booking:', response.data.message || 'Unknown error');
       
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  if (!car) return (
    <div className="min-h-screen flex items-center justify-center">
      <SyncLoader color="#593cfb" size={18} />
    </div>
  );
  // const handlePrice = () => {
  //   const price = totalCost;
  //   navigate(`/payment/${price}`);
  // };

  const handleReviewSubmitted = () => {
    refetchReviews();
  };

  return (
    <div>
      <section>
  <div
    className="bg-cover bg-center h-[60vh] flex items-center justify-center relative overflow-hidden"
    style={{
      backgroundImage: `url(${slide1})`,
      backgroundPositionY: `${scrollY * 0.5}px`,
      willChange: "transform"
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-b from-gray-800 via-transparent to-gray-900 opacity-80"></div>
    <div className="text-center z-10 flex flex-col px-4">
      <p className="text-white text-sm sm:text-lg font-bold">
        Discover the perfect car for you
      </p>
      <h1 className="text-3xl mt-2 sm:mt-4 sm:text-4xl md:text-6xl font-bold text-white">
        Rent a <span className="text-teal-400">{car.make}</span>
      </h1>

    </div>
  </div>
</section>


      {/* Car Details */}
      <section className="bg-white text-gray-800">
  <div className="max-w-6xl mx-auto p-8">
    <div className="flex flex-col md:flex-row justify-between items-start gap-20">
      {/* Left Section */}
      <div className="flex-1">
        <h1 className="text-4xl font-extrabold mb-2 font-merri text-gray-900">
          {car.make} <span className="text-gray-500">{"(" + car.category + ")"}</span>
        </h1>
        <p className="text-lg text-gray-600 mb-4 font-lato">{car.model}</p>

        <div className="flex items-center mb-6">
          <span className="text-2xl font-bold text-indigo-600 mr-2">{car.rating}</span>
          <FaStar className="w-6 h-6 fill-indigo-600" />
          <span className="text-gray-600 ml-1">({car.trip_count} trips)</span>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 text-gray-800">
          <div className="flex items-center">
            <FaGasPump className="w-6 h-6 mr-3 text-indigo-600" /> <span>22 MPG</span>
          </div>
          <div className="flex items-center">
            <MdElectricCar className="w-6 h-6 mr-3 text-indigo-600" /><span>Gas (Premium)</span>
          </div>
          <div className="flex items-center">
            <GiCarDoor className="w-6 h-6 mr-3 text-indigo-600" /><span>4 Doors</span>
          </div>
          <div className="flex items-center">
            <GiCarSeat className="w-6 h-6 mr-3 text-indigo-600" /><span>{car.seatCount} Seats</span>
          </div>
        </div>

        {/* Description */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-3 text-gray-800">Description</h2>
          <p className="text-gray-600 leading-relaxed">{car.description}</p>
        </div>

        {/* Features */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-3 text-gray-800">Features</h2>
          <ul className="text-gray-600 list-disc pl-5">
            {car.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        {/* Hosted By Section */}
        <h1 className="text-2xl font-bold mb-6 mt-12 text-indigo-600">Hosted By</h1>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center mb-6">
            <img src="https://via.placeholder.com/80" alt="Host" className="w-16 h-16 rounded-full mr-4" />
            <div>
              <h3 className="font-semibold text-gray-800">{car.name}</h3>
              <p className="text-sm text-gray-600">All-Star Host</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">131 trips • {car.date}</p>
          <div className="flex items-center text-indigo-600">
            <FaStar className="w-5 h-5 fill-indigo-600 mr-1" />
            <span className="font-bold mr-1">5.0</span>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            <IoIosInformationCircleOutline className="w-4 h-4 inline mr-1" />
            All-Star Hosts like Name are the top-rated and most experienced hosts on UrbanDrive.
          </p>
          <a href="#" className="text-indigo-600 text-sm underline">Learn more</a>
        </div>
      </div>

      {/* Right Section (Pricing and Booking) */}
      <div className="flex-1">
        <span className="text-4xl font-bold text-indigo-700 mb-4 block">{perDayCost.toFixed(2)}/day</span>
        <p className="text-sm text-gray-600 mb-6">Price before taxes</p>

        <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-gray-800">
          <div className="mb-6">
            <span className="text-2xl font-bold">${totalCost}</span>
            <p className="text-sm text-gray-600">Total for {differenceInDays(dateRange[0].endDate, dateRange[0].startDate) + 1} days</p>
          </div>

          {/* Trip Dates */}
          <div className="mb-6">
            <p className="text-sm font-semibold mb-1">Trip dates</p>
            <div
              className="flex justify-between items-center border border-gray-300 p-3 rounded cursor-pointer bg-gray-200"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              <span>{format(dateRange[0].startDate, 'MM/dd/yyyy')} - {format(dateRange[0].endDate, 'MM/dd/yyyy')}</span>
            </div>
          </div>

          {/* Include Driver */}
          <div className='mb-6 flex items-center'>
            <input
              type="checkbox"
              checked={includedDriver}
              onChange={(e) => setIncludedDriver(e.target.checked)}
              className='w-5 h-5 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500'
            />
            <span className='text-gray-800 text-sm ml-2'>Include driver (+20% total cost)</span>
          </div>

          {includedDriver && (
            <div className="mb-6">
              <p className="text-sm text-gray-600">Driver fee (20% of base cost)</p>
              <span className="font-bold">${(totalCost - totalCost / 1.2).toFixed(2)}</span>
            </div>
          )}

          {/* Calendar */}
          {showCalendar && (
            <DateRange
              editableDateInputs={true}
              onChange={handleSelect}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
              className="mb-6"
              rangeColors={['#4F46E5']}
              color="#4F46E5"
            />
          )}

          {/* Location */}
          <div className="mb-6">
            <p className="text-sm font-semibold mb-1">Pickup & return location</p>
            <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full border border-gray-300 p-3 rounded bg-gray-200 text-gray-800">
              <option value="">Select location</option>
              <option value="uttara">Uttara</option>
              <option value="Gazipur">Dhaka</option>
              <option value="Gulshan">Gulshan</option>
              <option value="Badda">Badda</option>
              <option value="Khilkhet">Khilkhet</option>
              <option value="Airport">Airport</option>
            </select>
          </div>

          {/* Continue Button */}
          <button onClick={handleContinue} className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-2 rounded-md hover:bg-indigo-800 transition-colors">
            Continue
          </button>

          {/* Cancellation Policy */}
          <div className="flex items-center mt-6">
            <svg className="w-5 h-5 text-indigo-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
            </svg>
            <p className="text-sm text-gray-600">Free cancellation before Sep 28</p>
          </div>
        </div>
      </div>
    </div>
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg mt-6">
          <div className="text-2xl font-bold mb-4">Ratings </div>
          <div className="text-5xl text-indigo-600 font-bold">3.5</div>
          <div className="text-gray-500 mb-6">(94 ratings)</div>

          {ratingsData.map((rating, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between mb-2">
                <span>{rating.label}</span>
                <span>{rating.value}</span>
              </div>
              <motion.div
                className="h-2 bg-gray-300 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(rating.value / 5) * 100}%` }}
                transition={{ duration: 1.5 }}
              >
                <div className="h-full bg-indigo-600 rounded-full"></div>
              </motion.div>
            </div>
          ))}

          {/* <div className="mt-6">
            <div className="font-semibold">Reviews</div>
            <div className="mt-4 space-y-4"></div>
          </div> */}
        </div>
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
  <h2 className="text-3xl font-bold mb-6">Reviews</h2>
  {reviews.length > 0 ? (
    <div className="space-y-6">
      {reviews.map((review: any) => (
        <div key={review._id} className="bg-gray-100 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Rating style={{ maxWidth: 100 }} value={review.rating} readOnly />
            <span className="ml-2 font-bold text-gray-700">{review.userName}</span>
          </div>
          <p className="text-gray-600">{review.comment}</p>
          <p className="text-sm text-gray-500 mt-2">{new Date(review.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-600">No reviews yet. Be the first to review this car!</p>
  )}
  
  {user ? (
    <ReviewForm carId={car._id} onReviewSubmitted={handleReviewSubmitted} />
  ) : (
    <p className="mt-6 text-gray-600">Please log in to leave a review.</p>
  )}
</div>

  </div>
</section>


    </div>
  );
};

export default CarDetails;