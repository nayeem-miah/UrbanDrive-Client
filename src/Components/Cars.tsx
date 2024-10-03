/* eslint-disable @typescript-eslint/no-unused-vars */
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { MdOutlineDiscount } from "react-icons/md";
import { MdOutlineStar } from "react-icons/md";
import { FaAward } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MapComponent from "./MapComponent";




const Cars: React.FC = () => {
  const axiosPublic = useAxiosPublic();
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [sortOption, setSortOption] = useState("");
  const [totalCars, setTotalCars] = useState([]);
  const [seatCount, setSeatCount] = useState<number | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [searchItem,setSearchItem] = useState("");
  const [searchLocation, setSearchLocation] = useState('');

  interface Car {
    _id: string;
    name: string;
    image: string;
    review: string;
    availability: boolean;
    model: string;
    category: string;
    price: number;
    date: number;
    description: string;
    discount: number;
    rating: number;
    trip_count: number;
    make: string;
    seatCount: number;
  }

  const {
    data: cardata = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["car", currentPage, category, maxPrice, minPrice, sortOption,searchItem],
    queryFn: async () => {
      const response = await axiosPublic.get("/cars", {
        params: {
          page: currentPage,
          limit: 6,
          category: category,
          minPrice: minPrice,
          maxPrice: maxPrice,
          sort: sortOption,
          seatCount: seatCount,
          search:searchItem,
          lat: userLocation?.lat,
          lng: userLocation?.lng,
          location: searchLocation,
          maxDistance: 50000,
        },
      });
      setTotalPages(response.data.totalPages);
      setTotalCars(response.data.totalCars);
      return response.data.Cars;
    },
  });

  // useEffect(() => {
  //   // Get user location
  //   getCurrentLocation();
  //   // Fetch car data
  //   fetchCars();
  // }, []);

   // Fetch user's current location
   useEffect(() => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            setUserLocation({
                lng: position.coords.longitude,
                lat: position.coords.latitude,
            });
        });
    }
}, []);

useEffect(() => {
  if (userLocation || searchLocation) {
    refetch()
  }
}, [userLocation, searchLocation,]);



  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    refetch();
  };
  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "0-50") {
      setMinPrice(0);
      setMaxPrice(50);
    } else {
      const [min, max] = value.split("-").map(Number);
      setMinPrice(min);
      setMaxPrice(max);
    }
    console.log("Price Range:", minPrice, maxPrice);
  };
  const handleSeatCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "") {
      setSeatCount(null);
    } else {
      setSeatCount(Number(value));
    }
    refetch(); // Refetch when seat count changes
  };
  useEffect(() => {
    refetch();
  }, [minPrice, maxPrice, category, currentPage, sortOption, seatCount]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value);
    refetch(); // Refetch when the search term changes
  };

  // const formatDate = (dateString: number) => {
  //   const date = new Date(dateString);
  //   return date.toLocaleDateString("en-GB"); 
  // };

  // const handleNextPage = () => {
  //   if (currentPage < totalPages) {
  //     setCurrentPage(currentPage + 1);
  //     refetch(); 
  //   }
  // };

  // const handlePreviousPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //     refetch();
  //   }
  // };
  // console.log(totalCars);
  // console.log(formatDate(123));
  // console.log(handleNextPage());
  // console.log(handlePreviousPage());

  return (
    <div className="mt-10 pt-4 md:mt-12 md:p-5 lg:mt-16 lg:pt-8">
      {/* Filters */}
        {/* Search Bar */}
        <div className="mb-6">
         {/* সার্চ বক্স */}
      <input
        type="text"
        placeholder="লোকেশন দিয়ে সার্চ করুন"
        value={searchLocation}
        onChange={(e) => setSearchLocation(e.target.value)}
      />
        
      </div>
      <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-6 gap-4 lg:gap-6">
        <select
          className="select w-full border border-gray-300  rounded-2xl p-3 h-12"
          value={category} // Set the current selected value
          onChange={handleCategoryChange} // Handle change
        >
          <option disabled value="">
            Select by Category
          </option>
          <option value="Electric">Electrice</option>
          <option value="suv">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Luxury">Luxury</option>
          <option value="Truck">Truck</option>
        </select>

        <select
          className="select w-full border border-gray-300 rounded-2xl p-3 h-12"
          value={seatCount ?? ""}
          onChange={handleSeatCountChange}
        >
          <option disabled value="">
            Select by Seats
          </option>
          <option value="4">4 or more</option>
          <option value="5">5 or more</option>
          <option value="6">6 or more</option>
          <option value="7">7 or more</option>
          <option value="8">8 or more</option>
        </select>

        <select
          className="select w-full border border-gray-300  rounded-2xl p-3 h-12"
          value={minPrice && maxPrice ? `${minPrice}-${maxPrice}` : ""}
          onChange={handlePriceRangeChange}
        >
          <option disabled value="">
            Select By Price Range
          </option>
          <option value="0-50">$0 - $50</option>
          <option value="51-100">$51 - $100</option>
          <option value="101-200">$101 - $200</option>
          <option value="201-500">$201 - $500</option>
          <option value="501-1000">$501 - $1000</option>
          <option value="1001-Infinity">Above $1000</option>
        </select>

        <select
          className="select w-full border border-gray-300  rounded-2xl p-3 h-12"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)} // Handle sorting change
        >
          <option disabled value="">
            Sort by
          </option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="date-desc">Date Added: Newest First</option>
          <option value="date-asc">Date Added: Oldest First</option>
        </select>
      </div>

      {/* Loading Spinner */}
      {isLoading ? (
        <div className="flex justify-center items-center mt-10">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <div className="ml-1 lg:ml-2">
          <p className="text-2xl font-bold  mt-4 lg:mt-8">
            {totalCars} + cars available
          </p>
          <div className="grid mt-5 grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-5 ">

          <div className="overflow-y-auto h-[calc(100vh-100px)] pr-4">
          {Array.isArray(cardata) && cardata.length > 0 ? (
            <div  className="grid mt-5 grid-cols-1  gap-4 lg:gap-6 ">
              {cardata.map((car: Car) => (
                <Link to={`/cars/${car._id}`}>
                  <div
                    key={car._id}
                    className="card lg:card-side bg-base-100 shadow-xl rounded-2xl group"
                  >
                    <figure className="w-full lg:w-[50%]">
                      <img
                        className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                        src={car.image}
                        alt={car.name}
                      />
                    </figure>
                    <div className="card-body w-full lg:w-2/3 flex-1">
                      <h2 className="card-title">{car.model}</h2>
                      <p className="text-ellipsis">{car.description.slice(0,80)}....</p>
                      {car.rating > 0 ? (
                        <p className="flex gap-1">
                          {car.rating}
                          <MdOutlineStar className="text-[#f0bb0c] mt-1" /> (
                          {car.trip_count} trips){" "}
                          <FaAward className="mt-1 text-primary font-bold" />{" "}
                          <span className="font-bold">All-Star-Host</span>
                        </p>
                      ) : (
                        <p>New listing</p>
                      )}
                      <p className="flex gap-1">
                        <FaMapLocationDot className="mt-1" />
                        {car.make}
                      </p>
                      {car.discount > 0 ? (
                        <span className="flex gap-1 text-[#0f923b] ">
                          <MdOutlineDiscount className="mt-1" /> Discount:{" "}
                          {car.discount}%
                        </span>
                      ) : (
                        <p></p>
                      )}

                      <div className="card-actions justify-end">
                        <span className="text-primary font-bold text-xl">
                          ${car.price}/day
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
             
            </div>
          ) : (
            <p>No cars available</p>
          )}
          </div>
          
          <div className="z-0 h-[calc(100vh-50px)] sticky top-0">
          {userLocation && (
        <MapComponent cars={totalCars} userLocation={userLocation} />
      )}
          </div>
          </div>
          
        </div>
      )}

      {/* Pagination */}
      <div className="mx-auto text-center m-16">
        <button
          className="btn btn-active btn-primary mr-4 rounded-md"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          {" "}
          Page {currentPage} of {totalPages}{" "}
        </span>
        <button
          className="btn btn-active btn-primary ml-4 rounded-md"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Cars;