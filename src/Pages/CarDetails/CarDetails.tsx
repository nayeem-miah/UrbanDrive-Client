/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { ICar } from '../../Types/car';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAuth from '../../Hooks/useAuth';
import { SyncLoader } from 'react-spinners';
import { useQuery } from '@tanstack/react-query';
import { Rating, Star } from '@smastrom/react-rating';
import ReviewForm from '../../Components/ReviewForm/ReviewForm';





const CarDetails: React.FC = () => {
  const navigate = useNavigate();
  const car = useLoaderData() as ICar;
  const {user} = useAuth();




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
  const [page, setPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);


  const { data: reviewsData = { reviews: [], currentPage: 1, totalPages: 1, totalReviews: 0 }, 
        refetch: refetchReviews,
        isLoading } = useQuery({
  queryKey: ['reviews', car._id, page],
  queryFn: async () => {
    const response = await axiosPublic.get(`/reviews/${car._id}?page=${page}&limit=5`);
    return response.data;
  }
});

  const handleNextPage = () => {
    if (page < reviewsData.totalPages) {
      setPage(prev => prev + 1);
    }
  };
  // const handleNextPage =()=>{
  //   if(page < totalPages){
  //     setPage(page + 1);
  //   }
  // }

  const handlePrevPage =()=>{
    if(page > 1){
      setPage(prev => prev -1);
    }
  }


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
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
    {/* Left Section */}
    <div className="flex-1 w-full lg:w-2/3">
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h1 className="text-4xl font-extrabold mb-2 text-gray-900">
          {car.make} {car.model}
        </h1>
        <p className="text-lg text-gray-600 mb-4">{car.category}</p>

        <div className="flex items-center mb-6">
          <span className="text-2xl font-bold text-indigo-600 mr-2">{car.averageRating.toFixed(1)}</span>
          <FaStar className="w-6 h-6 fill-indigo-600" />
          <span className="text-gray-600 ml-1">({car.reviewCount} reviews)</span>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6 text-gray-800">
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
            <FaGasPump className="w-8 h-8 text-indigo-600 mb-2" />
            <span className="text-sm font-medium">22 MPG</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
            <MdElectricCar className="w-8 h-8 text-indigo-600 mb-2" />
            <span className="text-sm font-medium">Gas (Premium)</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
            <GiCarDoor className="w-8 h-8 text-indigo-600 mb-2" />
            <span className="text-sm font-medium">4 Doors</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
            <GiCarSeat className="w-8 h-8 text-indigo-600 mb-2" />
            <span className="text-sm font-medium">{car.seatCount} Seats</span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-3 text-gray-800">Description</h2>
          <p className="text-gray-600 leading-relaxed">{car.description}</p>
        </div>

        {/* Features */}
        <div>
          <h2 className="text-2xl font-bold mb-3 text-gray-800">Features</h2>
          <ul className="grid grid-cols-2 gap-2">
            {car.features.map((feature, index) => (
              <li key={index} className="flex items-center text-gray-600">
                <svg className="w-4 h-4 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Hosted By Section */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-indigo-600">Hosted By</h2>
        <div className="flex items-center mb-6">
          <img src="https://via.placeholder.com/80" alt="Host" className="w-16 h-16 rounded-full mr-4" />
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">{car.name}</h3>
            <p className="text-sm text-gray-600">All-Star Host</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4">131 trips • Joined {car.date}</p>
        <div className="flex items-center text-indigo-600 mb-4">
          <FaStar className="w-5 h-5 fill-indigo-600 mr-1" />
          <span className="font-bold mr-1">5.0</span>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          <IoIosInformationCircleOutline className="w-4 h-4 inline mr-1" />
          All-Star Hosts like {car.name} are the top-rated and most experienced hosts on UrbanDrive.
        </p>
        <a href="#" className="text-indigo-600 text-sm font-medium hover:underline">Learn more</a>
      </div>
    </div>

    {/* Right Section (Pricing and Booking) */}
    <div className="flex-1 w-full lg:w-1/3 sticky top-10">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <span className="text-4xl font-bold text-indigo-700 mb-2 block">{perDayCost.toFixed(2)} BDT/day</span>
        <p className="text-sm text-gray-600 mb-6">Price before taxes</p>

        <div className="mb-6">
          <span className="text-2xl font-bold text-gray-900">{totalCost} BDT</span>
          <p className="text-sm text-gray-600">Total for {differenceInDays(dateRange[0].endDate, dateRange[0].startDate) + 1} days</p>
        </div>

        {/* Trip Dates */}
        <div className="mb-6">
          <p className="text-sm font-semibold mb-2">Trip dates</p>
          <div
            className="flex justify-between items-center border border-gray-300 p-3 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <span>{format(dateRange[0].startDate, 'MMM dd, yyyy')} - {format(dateRange[0].endDate, 'MMM dd, yyyy')}</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Include Driver */}
        <div className='mb-6 flex items-center'>
          <input
            type="checkbox"
            id="includeDriver"
            checked={includedDriver}
            onChange={(e) => setIncludedDriver(e.target.checked)}
            className='w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500'
          />
          <label htmlFor="includeDriver" className='text-gray-700 text-sm ml-2 cursor-pointer'>Include driver (+20% total cost)</label>
        </div>

        {includedDriver && (
          <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
            <p className="text-sm text-gray-600">Driver fee (20% of base cost)</p>
            <span className="font-bold text-indigo-600">${(totalCost - totalCost / 1.2).toFixed(2)}</span>
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
          <p className="text-sm font-semibold mb-2">Pickup & return location</p>
          <select 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            className="w-full border border-gray-300 p-3 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
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
        <button 
          onClick={handleContinue} 
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Continue
        </button>

        {/* Cancellation Policy */}
        <div className="flex items-center mt-6">
          <svg className="w-5 h-5 text-indigo-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <p className="text-sm text-gray-600">Free cancellation before Sep 28</p>
        </div>
      </div>
    </div>
  </div>
</div>

    {/* Ratings */}
<div className="p-6 bg-white rounded-lg shadow-lg mt-8">
  <h2 className="text-3xl font-bold mb-4 text-indigo-600 text-center">Overall Ratings</h2>
  
  {/* Average Rating */}
  <div className="flex justify-center items-center mb-6">
    <p className="text-6xl font-extrabold text-indigo-600">
      {car.averageRating.toFixed(1)}
    </p>
    <div className="ml-4">
      <p className="text-lg text-gray-500">({car.reviewCount} reviews)</p>
    </div>
  </div>
  
  {/* Category Ratings */}
  <div className="space-y-4">
    {Object.entries(car.categoryRatings || {}).map(([label, value], index) => (
      <div key={index} className="mb-2">
        <div className="flex justify-between items-center text-gray-700 font-medium mb-1">
          <span>{label.charAt(0).toUpperCase() + label.slice(1)}</span>
          <span>{Number(value).toFixed(1)} / 5</span>
        </div>
        <motion.div
          className="h-2 bg-gray-200 rounded-full overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: `${(Number(value) / 5) * 100}%` }}
          transition={{ duration: 1.5 }}
        >
          <div className="h-full bg-indigo-600 rounded-full"></div>
        </motion.div>
      </div>
    ))}
  </div>
</div>


        {/* Reviews */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
  <h2 className="text-3xl font-bold mb-6 text-indigo-600 text-center">Customer Reviews</h2>

  {isLoading ? (
    <div className="min-h-screen flex items-center justify-center">
      <SyncLoader color="#4F46E5" size={18} />
    </div>
  ) : reviewsData.reviews.length > 0 ? (
    <div className="space-y-4">
      {reviewsData.reviews.map((review: any) => (
        <div key={review._id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
          
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <Rating style={{ maxWidth: 100 }} value={review.rating} readOnly itemStyles={{ 
                itemShapes: Star, 
                activeFillColor: '#4F46E5', 
                inactiveFillColor: '#CBD5E1' 
              }} />
              <span className="ml-3 font-semibold text-lg text-gray-800">{review.userName}</span>
            </div>
            <p className="text-sm text-gray-500">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>

          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-3 ">
            {Object.entries(review.ratingDetails).map(([key, value]) => (
              <div key={key} className="text-center">
                <p className="text-sm text-gray-600 font-semibold">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </p>
                <p className="text-indigo-600 text-xl font-bold">{value as number}/5</p>
              </div>
            ))}
          </div>

          {/* Review Comment */}
          <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
        </div>
      ))}

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-between items-center">
        <button 
          onClick={handlePrevPage} 
          disabled={page === 1}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md disabled:bg-gray-400 hover:bg-indigo-700 transition duration-200"
        >
          Previous
        </button>
        <span className="text-gray-700 font-medium text-base">Page {page} of {reviewsData.totalPages}</span>
        <button 
          onClick={handleNextPage} 
          disabled={page === reviewsData.totalPages}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md disabled:bg-gray-400 hover:bg-indigo-700 transition duration-200"
        >
          Next
        </button>
      </div>
    </div>
  ) : (
    <p className="text-lg text-gray-600 text-center">No reviews yet. Be the first to review this car!</p>
  )}

  {/* Review Form or Login Prompt */}
  {user ? (
    <div className="mt-10">
      <ReviewForm carId={car._id.toString()} onReviewSubmitted={handleReviewSubmitted} />
    </div>
  ) : (
    <p className="mt-6 text-lg text-gray-600 text-center">Please log in to leave a review.</p>
  )}
</div>




  </div>
</section>


    </div>
  );
};

export default CarDetails;
