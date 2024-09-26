import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
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
// import useAuth from '../../Hooks/useAuth';




const CarDetails: React.FC = () => {
  
  // const user = useAuth();

  const ratingsData: RatingData[] = [
    { label: 'Cleanliness', value: 3.0 },
    
    { label: 'Communication', value: 2.0 },
    { label: 'Convenience', value: 5.0 },
    
  ];

  const [scrollY, setScrollY] = useState(0);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 2),
      key: 'selection'
    }
  ]);
  
  const [location, setLocation] = useState('Current Location');
  const [showCalendar, setShowCalendar] = useState(false); 
  const [totalCost, setTotalCost] = useState(0);
 

  const calculateTotalCost = (start: Date, end: Date) => {
    const days = differenceInDays(end, start) + 1; 
    return days * car.rental_price_per_day;
  };

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

  useEffect(() => {
    
    const initialTotalCost = calculateTotalCost(dateRange[0].startDate, dateRange[0].endDate);
    setTotalCost(initialTotalCost);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


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
            backgroundImage: `url(${car.image ? car.image : slide1})`,
            backgroundPositionY: `${scrollY * 0.5}px`
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="text-center z-10 flex flex-col px-4">
            <p className="text-white text-sm sm:text-lg font-Merri font-bold">
              Discover the perfect car for you
            </p>
            <h1 className="text-3xl mt-2 sm:mt-4 sm:text-4xl md:text-6xl font-bold text-white font-Playfair">
              Rent a <span className="text-teal-400">{car.make}</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Car Details */}
      <section className="bg-white text-gray-800">
  <div className="max-w-5xl mx-auto p-4">
    <div className="flex justify-between items-start gap-20">
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">
          {car.make} <span className="text-gray-600">{"(" + car.category + ")"}</span>
        </h1>
        <p className="text-gray-600 mb-4">{car.model}</p>
        <div className="flex items-center mb-4">
          <span className="text-xl font-bold text-indigo-600 mr-2">{car.rating}</span>
          <FaStar className="w-5 h-5 fill-indigo-600" />
          <span className="text-gray-600 ml-1">(35 trips)</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 text-gray-800">
          <div className="flex items-center">
            <FaGasPump className="w-5 h-5 mr-2" /> <span>22 MPG</span>
          </div>
          <div className="flex items-center">
            <MdElectricCar className="w-5 h-5 mr-2" /><span>Gas (Premium)</span>
          </div>
          <div className="flex items-center">
            <GiCarDoor className="w-5 h-5 mr-2" /><span>4 Doors</span>
          </div>
          <div className="flex items-center">
            <GiCarSeat className="w-5 h-5 mr-2" /><span>5 Seats</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-4 text-indigo-600 text-center">Hosted By</h1>
        <div className="mt-6 bg-gray-100 rounded-lg shadow-lg p-4">
          <div className="flex items-center mb-4">
            <img src="https://via.placeholder.com/40" alt="Host" className="w-10 h-10 rounded-full mr-3" />
            <div>
              <h3 className="font-bold text-gray-800">Name</h3>
              <p className="text-sm text-gray-600">All-Star Host</p>
            </div>
          </div>
          <p className="text-sm mb-2 text-gray-600">131 trips • Joined Jun 2021</p>
          <div className="flex items-center text-indigo-600">
            <FaStar className="w-4 h-4 fill-indigo-600 mr-1" />
            <span className="font-bold mr-1">5.0</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            <IoIosInformationCircleOutline className="w-4 h-4 inline mr-1" />
            All-Star Hosts like Name are the top-rated and most experienced hosts on UrbanDrive.
          </p>
          <a href="#" className="text-indigo-600 text-sm">Learn more</a>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2 text-gray-800">Description</h2>
          <p className="text-gray-600">Family road trip or backcountry adventure? Experience it in a Subaru rental. Rev up your taste for adventure and make your mark regardless of the weather conditions. Flexible configurations, seamless connectivity, award-winning safety, and comfortable handling are just the beginning. Rent one for an extended test drive, and see why Turo guests can’t get enough of all that Subaru love.</p>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2 text-gray-800">Features</h2>
          <p className="text-gray-600">
            {car.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </p>
        </div>

        
      </div>

      <div className="flex-1">
        <span className="text-3xl font-bold text-indigo-600 text-center">${car.rental_price_per_day}/day</span>
        <p className="text-sm text-gray-600">Price before taxes</p>

        <div className="mx-auto bg-gray-100 p-6 rounded-lg shadow-lg text-gray-800">
          <div className="mb-4">
            <span className="text-2xl font-bold">${totalCost}</span>
            <p className="text-sm text-gray-600">Total for {differenceInDays(dateRange[0].endDate, dateRange[0].startDate) + 1} days</p>
          </div>

          <div className="mb-4">
            <p className="text-sm font-semibold mb-1">Trip dates</p>
            <div className="flex justify-between items-center border border-gray-300 p-2 rounded cursor-pointer bg-gray-200" onClick={() => setShowCalendar(!showCalendar)}>
              <span>{format(dateRange[0].startDate, 'MM/dd/yyyy')} - {format(dateRange[0].endDate, 'MM/dd/yyyy')}</span>
            </div>
          </div>

          {showCalendar && (
            <DateRange
              editableDateInputs={true}
              onChange={handleSelect}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
              className="mb-4"
              rangeColors={['#4F46E5']}
              color="#4F46E5"
            />
          )}

          <div className="mb-4">
            <p className="text-sm font-semibold mb-1">Pickup & return location</p>
            <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full border border-gray-300 p-2 rounded bg-gray-200 text-gray-800">
              <option value="">Select location</option>
              <option value="uttora">Uttora</option>
              <option value="dhaka">Dhaka</option>
            </select>
          </div>

          <button className="w-full bg-indigo-600 text-white py-2 rounded-md mb-4 hover:bg-indigo-700 transition-colors">Continue</button>

          <div className="flex items-center mb-4">
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
  </div>
</section>


    </div>
  );
};

export default CarDetails;
