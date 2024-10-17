/* eslint-disable @typescript-eslint/no-unused-vars */
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import MapComponent from "./MapComponent";
import { SyncLoader } from "react-spinners";
import useAuth from "../Hooks/useAuth";
import CarsData from "./CarsData";

const Cars: React.FC = () => {
  const axiosPublic = useAxiosPublic();
  const {user} =useAuth();
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [sortOption, setSortOption] = useState("");
  const [totalCars, setTotalCars] = useState([]);
  const [seatCount, setSeatCount] = useState<number | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [searchItem] = useState("");
  const [searchLocation] = useState('');
  const [cars,setCars] = useState([]);
 const [homePickup,setHomePickup]=useState("");
 const [permissionGranted, setPermissionGranted] = useState(false);

  const {
    data: cardata = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["car", currentPage, category, maxPrice, minPrice, sortOption,searchItem,homePickup],
    queryFn: async () => {
      const response = await axiosPublic.get("/cars", {
        params: {
          page: currentPage,
          limit: 6,
          category,
          minPrice,
          maxPrice,
          sort: sortOption,
          seatCount: seatCount,
          search:searchItem,
          lat: userLocation?.lat,
          lng: userLocation?.lng,
          location: searchLocation,
          maxDistance: 50000,
          homePickup:homePickup,
          
        },
      });
      setTotalPages(response.data.totalPages);
      setTotalCars(response.data.totalCars);
      // console.log(response.data.Cars)
      return response.data.Cars;
    },
  });
  const askForLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setPermissionGranted(true);
          // alert("Allow to use your location.");
          localStorage.setItem('locationPermission', 'granted');
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            alert("You have not given permission to use your location.");
          }
        }
      );
    } else {
      alert("Geolocation is not supported in this browser.");
    }
  };

 
   // Fetch user's current location
   const fetchCurrentLocation = () => {
    if (permissionGranted) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setUserLocation({ lat, lng });
        fetchCars(lat, lng, 5000);
        
      });
    } else {
      alert("Location permission not yet granted.");
    }
  };
  const fetchCars = async (lat: number, lng: number, maxDistance: number) => {
    try {
      const response = await axiosPublic.get("/SearchCars", {
        params: {
          lat,
          lng,
          maxDistance,
          location: "current",
        },
      });
      setCars(response.data);
      // console.log('allcars:',response.data) 
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };
  useEffect(() => {
    const savedPermission = localStorage.getItem('locationPermission');
    if (savedPermission === 'granted') {
      
      setPermissionGranted(true);
    } else {
    
      askForLocationPermission();
    }
  }, []);
useEffect(() => {
  if (userLocation || searchLocation) {
    refetch()
  }
}, [userLocation, searchLocation,]);



const fetchAllCars = async () => {
  try {
    const response = await axiosPublic.get("/SearchCars", {
      params: { location: "anywhere" },
    });
    setCars(response.data); 
  } catch (error) {
    console.error("Error fetching all cars:", error);
  }
};
const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const selectedValue = e.target.value;
  if (selectedValue === "current") {
    fetchCurrentLocation(); // Get current location and fetch cars
  } else if (selectedValue === "anywhere") {
    fetchAllCars(); // Fetch all cars from the server
  }
};



  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };
  const handleHomePickup = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHomePickup(e.target.value);
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
  };

  const handleSeatCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSeatCount(value ? Number(value) : null);
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
      <div className=" mb-6">
      <select
          className=" w-2/3 md:w-1/3 lg:w-1/3 border-b border-gray-300 focus:outline-none  p-3 h-12"
          id="locationSelect"
          value={userLocation ? JSON.stringify(userLocation) : ""}
          onChange={handleLocationChange}
        >where
          <option disabled value="">
            Select By Location
          </option>
          <option value="current">Current Location</option>
          <option value="anywhere">Anywhere</option>
        </select>
    </div>
      <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8 gap-4 lg:gap-6">
        <select
          className="select w-full border border-gray-300  rounded-2xl p-3 h-12 focus:outline-none"
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
          className="select w-full border border-gray-300 rounded-2xl p-3 h-12 focus:outline-none"
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
          className="select w-full border border-gray-300  rounded-2xl p-3 h-12 focus:outline-none"
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
          className="select w-full border border-gray-300  rounded-2xl p-3 h-12 focus:outline-none"
          value={homePickup} // Set the current selected value
          onChange={handleHomePickup} // Handle change
        >
          <option disabled value="">
            Home-PickUp
          </option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          
        </select>

        <select
          className="select w-full border border-gray-300  rounded-2xl p-3 h-12 focus:outline-none"
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
        <div className="min-h-screen flex items-center justify-center">
          <SyncLoader color="#593cfb" size={10} />
        </div>
      ) : (
        <div className="ml-1 lg:ml-2">
          <p className="text-2xl font-bold  mt-4 lg:mt-8">
            {totalCars} + cars available
          </p>
          <div className="grid mt-5 grid-cols-1  lg:grid-cols-2 gap-4 lg:gap-6 mb-5 ">
            <div className="overflow-y-auto h-[calc(100vh-100px)] pr-4">
              <CarsData cars ={cardata}></CarsData>
            </div>

            <div className="z-0 h-[calc(100vh-50px)] sticky top-0">
              <MapComponent cars={cars} userLocation={userLocation} />
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