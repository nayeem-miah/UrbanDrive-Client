import React from 'react';
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import MapComponent from "./MapComponent";
import { SyncLoader } from "react-spinners";
import CarsData from "./CarsData";
import { useTranslation } from "react-i18next";
// import Filter from "./Filter";


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
  const [searchItem] = useState("");
  const [searchLocation] = useState('');
  const [cars,setCars] = useState([]);
  const [homePickup,setHomePickup]=useState("");
  const {t} = useTranslation();
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    category: "",
    seatCount: "",
    priceRange: "",
    homePickup: "",
    sortOption: "",
  });


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
        console.log('lat:',lat,'lng:',lng)
        
      });
    } else {
      alert("Location permission not yet granted.");
    }
  };
  // console.log('User Location:', userLocation);

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
      console.log('allcars:',response.data) 
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
    setSelectedFilters(prev => ({ ...prev, priceRange: value }));
  };

  const handleSeatCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSeatCount(value ? Number(value) : null);
    setSelectedFilters(prev => ({ ...prev, seatCount: value }));
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
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 mt-10">Find Your Perfect Ride</h1>
          <p className="text-gray-600">Discover and book the perfect car for your next adventure</p>
        </div> */}

        {/* Location Select */}
        

        {/* Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-16 mb-2">
        <select
            className="w-full p-3 bg-white border border-accent rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
            id="locationSelect"
            value={userLocation ? JSON.stringify(userLocation) : ""}
            onChange={handleLocationChange}
          >
            <option disabled value="">{t("locationSelect.selectPlaceholder")}</option>
            <option value="current">{t("locationSelect.currentLocation")}</option>
            <option value="anywhere">{t("locationSelect.anywhere")}</option>
          </select>
          <select
            className="w-full p-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
            value={category}
            onChange={handleCategoryChange}
          >
            <option disabled value="">{t("categorySelect.selectPlaceholder")}</option>
            <option value="Electric">{t("categorySelect.electric")}</option>
            <option value="suv">{t("categorySelect.suv")}</option>
            <option value="Sedan">{t("categorySelect.sedan")}</option>
            <option value="Luxury">{t("categorySelect.luxury")}</option>
            <option value="Truck">{t("categorySelect.truck")}</option>
          </select>

          <select
            className={`w-full p-3 bg-white border rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 ${
              selectedFilters.seatCount ? 'border-primary bg-blue-50' : 'border-gray-200'
            }`}
            value={seatCount ?? ""}
            onChange={handleSeatCountChange}
          >
            <option disabled value="">{t("seatSelect.selectPlaceholder")}</option>
            <option value="4">{t("seatSelect.fourOrMore")}</option>
            <option value="5">{t("seatSelect.fiveOrMore")}</option>
            <option value="6">{t("seatSelect.sixOrMore")}</option>
            <option value="7">{t("seatSelect.sevenOrMore")}</option>
            <option value="8">{t("seatSelect.eightOrMore")}</option>
          </select>

          <select
            className={`w-full p-3 bg-white border rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 ${
              selectedFilters.priceRange ? 'border-primary bg-blue-50' : 'border-gray-200'
            }`}
            value={minPrice && maxPrice ? `${minPrice}-${maxPrice}` : ""}
            onChange={handlePriceRangeChange}
          >
            <option disabled value="">{t("priceSelect.selectPlaceholder")}</option>
            <option value="0-50">{t("priceSelect.range0to50")}</option>
            <option value="51-100">{t("priceSelect.range51to100")}</option>
            <option value="101-200">{t("priceSelect.range101to200")}</option>
            <option value="201-500">{t("priceSelect.range201to500")}</option>
            <option value="501-1000">{t("priceSelect.range501to1000")}</option>
            <option value="1001-Infinity">{t("priceSelect.above1000")}</option>
          </select>

          <select
            className={`w-full p-3 bg-white border rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 ${
              selectedFilters.homePickup ? 'border-primary bg-blue-50' : 'border-gray-200'
            }`}
            value={homePickup}
            onChange={handleHomePickup}
          >
            <option disabled value="">{t("homePickup.selectPlaceholder")}</option>
            <option value="yes">{t("homePickup.yes")}</option>
            <option value="no">{t("homePickup.no")}</option>
          </select>

          <select
            className={`w-full p-3 bg-white border rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 ${
              selectedFilters.sortOption ? 'border-primary bg-blue-50' : 'border-gray-200'
            }`}
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option disabled value="">{t("sortOptions.selectPlaceholder")}</option>
            <option value="price-asc">{t("sortOptions.priceAsc")}</option>
            <option value="price-desc">{t("sortOptions.priceDesc")}</option>
            <option value="date-desc">{t("sortOptions.dateDesc")}</option>
            <option value="date-asc">{t("sortOptions.dateAsc")}</option>
          </select>
        </div>

        {/* Loading Spinner */}
        {isLoading ? (
          <div className="min-h-[60vh] flex items-center justify-center">
            <SyncLoader color="#003366" size={12} />
          </div>
        ) : (
          <div>
            <p className="text-2xl  font-bold text-text mb-6">
             Browse {totalCars}+ cars
            </p>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="overflow-y-auto  h-[calc(100vh-100px)] pr-4 space-y-6">
                <CarsData cars={cardata} />
              </div>
              <div className="h-[calc(100vh-100px)] sticky top-0 rounded-lg overflow-hidden shadow-lg">
                <MapComponent cars={cars} userLocation={userLocation} />
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-4 my-8">
          <button
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition-colors"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-text font-lato">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition-colors"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cars;
