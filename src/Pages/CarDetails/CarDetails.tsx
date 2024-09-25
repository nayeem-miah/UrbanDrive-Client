import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import slide1 from '../../assets/slides/slide1.jpg';
import { FaStar } from 'react-icons/fa6';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { addDays, format } from 'date-fns';
import { DateRange } from 'react-date-range';


interface ICar {
    id: number;
    make: string;
    model: string;
    year: number;
    price: number;
    image: string;
    description: string;
    features: string[];
    category: string;
    rental_price_per_day: number;
    rental_duration: number;
    availability: boolean;
    total_price: number;
    membership: string;
    rating: number;
    review: string;
}

const CarDetails: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 2),
      key: 'selection'
    }
  ]);
  
  const [location, setLocation] = useState('Culver City, CA 90230');
const [showStartCalendar, setShowStartCalendar] = useState(false);
const [showEndCalendar, setShowEndCalendar] = useState(false);

const handleSelect = (ranges) => {
  setDateRange([ranges.selection]);
  setShowStartCalendar(false);
  setShowEndCalendar(false); // Automatically close both after selection
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

    const car = useLoaderData() as ICar;

    if (!car) return <div>Loading...</div>;

   

    return (
        <div>
            <section>
                <div
                    className="bg-cover bg-center h-[60vh] flex items-center justify-center relative overflow-hidden"
                    style={{
                        backgroundImage: `url(${slide1})`,
                        backgroundPositionY: `${scrollY * 0.5}px`
                    }}
                >
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="text-center z-10 flex flex-col px-4">
                        <p className="text-white text-sm sm:text-lg font-Merri font-bold">
                            Discover the perfect car for you
                        </p>
                        <h1 className="text-3xl mt-2 sm:mt-4 sm:text-4xl md:text-6xl font-bold text-white font-Playfair">
                            Rent a <span className='text-teal-400'>{car.make}</span>
                        </h1>
                        
                    </div>
                </div>
            </section>
            {/* Car Details */}
            <section className="bg-[#18181B] text-white">
            <div className="container mx-auto p-4">
  <div className="flex justify-between items-start">
    <div className="flex-1">
      <h1 className="text-3xl font-bold mb-2 text-white">Jeep Grand Cherokee 2017</h1>
      <div className="flex items-center mb-4">
        <span className="text-xl font-bold text-teal-500 mr-2">4.93</span>
        <FaStar className="w-5 h-5 fill-teal-500 text-teal-500" />
        <span className="text-gray-400 ml-1">(35 trips)</span>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4 text-gray-300">
        <div className="flex items-center">
          {/* ...Icon for MPG */}
          <span>22 MPG</span>
        </div>
        <div className="flex items-center">
          {/* ...Icon for Gas */}
          <span>Gas (Premium)</span>
        </div>
        {/* ...Other Car Details */}
      </div>
      <div className="mt-6 bg-gray-800 rounded-lg shadow p-4">
        <div className="flex items-center mb-4">
          <img src="https://via.placeholder.com/40" alt="Host" className="w-10 h-10 rounded-full mr-3" />
          <div>
            <h3 className="font-bold text-white">Tagor</h3>
            <p className="text-sm text-gray-400">All-Star Host</p>
          </div>
        </div>
        <p className="text-sm mb-2 text-gray-300">131 trips • Joined Jun 2021</p>
        <div className="flex items-center text-teal-500">
          <FaStar className="w-4 h-4 fill-teal-500 text-teal-500 mr-1" />
          <span className="font-bold mr-1">5.0</span>
        </div>
        <p className="text-sm text-gray-400 mt-2">
          <IoIosInformationCircleOutline className="w-4 h-4 inline mr-1" />
          All-Star Hosts like Tagor are the top-rated and most experienced hosts on Turo.
        </p>
        <a href="#" className="text-teal-500 text-sm">Learn more</a>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2 text-white">Description</h2>
        <p className="text-gray-300">
          Big and comfy 2017 Jeep Grand Cherokee... (description continues)
        </p>
      </div>
    </div>

    <div className="flex-1">
      <span className="text-3xl font-bold text-white">$191 total</span>
      <p className="text-sm text-gray-400">Price before taxes</p>

      {/* Reservation Section */}
      <div className="max-w-sm mx-auto bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <span className="text-2xl font-bold text-white">$191 total</span>
          <p className="text-sm text-gray-400">Price before taxes</p>
        </div>
        {/* Date Picker */}
        

        <div className="mb-4">
  <p className="text-sm font-semibold mb-1 text-white">Trip start</p>
  <div 
    className="flex justify-between items-center border p-2 rounded bg-gray-700 text-gray-300"
    onClick={() => setShowStartCalendar(!showStartCalendar)}
  >
    <span>{format(dateRange[0].startDate, 'MM/dd/yyyy')}</span>
    <span>{format(dateRange[0].startDate, 'h:mm a')}</span>
  </div>
  {showStartCalendar && (
    <DateRange
      editableDateInputs={true}
      onChange={handleSelect}
      moveRangeOnFirstSelection={false}
      ranges={dateRange}
      className="mb-4"
    />
  )}
</div>

<div className="mb-4">
  <p className="text-sm font-semibold mb-1 text-white">Trip end</p>
  <div 
    className="flex justify-between items-center border p-2 rounded bg-gray-700 text-gray-300"
    onClick={() => setShowEndCalendar(!showEndCalendar)}
  >
    <span>{format(dateRange[0].endDate, 'MM/dd/yyyy')}</span>
    <span>{format(dateRange[0].endDate, 'h:mm a')}</span>
  </div>
  {showEndCalendar && (
    <DateRange
      editableDateInputs={true}
      onChange={handleSelect}
      moveRangeOnFirstSelection={false}
      ranges={dateRange}
      className="mb-4"
    />
  )}
</div>

        <div className="mb-4">
          <p className="text-sm font-semibold mb-1 text-white">Pickup & return location</p>
          <select 
            value={location} 
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border p-2 rounded bg-gray-700 text-gray-300"
          >
            <option value="Culver City, CA 90230">Culver City, CA 90230</option>
          </select>
        </div>

        <button className="w-full bg-indigo-600 text-white py-2 rounded-md mb-4">
          Continue
        </button>
        {/* Cancellation Section */}
        <div className="flex items-center mb-4">
          <svg className="w-5 h-5 text-indigo-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
          </svg>
          <span className="text-sm font-semibold text-white">Free cancellation</span>
        </div>
        <p className="text-xs text-gray-400">Full refund before Sep 25, 10:00 AM</p>
        {/* ...Other details */}
      </div>
    </div>
  </div>
</div>

            </section>
        </div>
    );
};

export default CarDetails;