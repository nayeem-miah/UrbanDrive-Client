import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { FaCheckCircle } from 'react-icons/fa';
import { FiMail, FiTag, FiUser, FiXCircle } from 'react-icons/fi';
import { FaCar } from 'react-icons/fa6';
// import { LuLoader2 } from 'react-icons/lu';
import { SyncLoader } from 'react-spinners';

interface PendingCar {
  _id: string;
  make: string;
  model: string;
  year: number;
  category: string;
  price_per_day: number;
 price: number;
name: string;
email: string;
features: string[];
seatCount: number;
description: string;
discount: number;
  image: string;
  status?: string;
}

const PendingCars: React.FC = () => {
  const [pendingCars, setPendingCars] = useState<PendingCar[]>([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    fetchPendingCars();
  }, []);

  const fetchPendingCars = async () => {
    try {
      const response = await axiosPublic.get('/hostCar');
      setPendingCars(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching pending cars:', error);
      setLoading(false);
    }
  };

  const handleApprove = async (carId: string) => {
    try {
      const carToApprove = pendingCars.find(car => car._id === carId);
      console.log('Found car to approve:', carToApprove);
      if (!carToApprove) {
        throw new Error('Car not found in pending list');
      }

      // Debug log the original car data
      console.log('Original car data:', carToApprove);

      const carData = {
        make: carToApprove.make,
        model: carToApprove.model,
        year: carToApprove.year,
        category: carToApprove.category,
        price: Number(carToApprove.price_per_day),
        price_per_day: Number(carToApprove.price_per_day),
        
        name: carToApprove.name,
        email: carToApprove.email,
     
        image: carToApprove.image,
        status: 'approved',
        availability: true,
        features: carToApprove.features || [],
        seatCount: carToApprove.seatCount || 4,
        trip_count: 0,
        date: new Date().getTime(),
        description: carToApprove.description || '',
        discount: carToApprove.discount || 0,
        averageRating: 0,
        reviewCount: 0,
        categoryAverages: {
          cleanliness: 0,
          communication: 0,
          comfort: 0,
          convenience: 0
        }
      };

      console.log('Car data to be sent:', carData);

      const addResponse = await axiosPublic.post('/cars', carData);
      console.log('Add response:', addResponse.data);

      const deleteResponse = await axiosPublic.delete(`/hostCar/${carId}`);
      console.log('Delete response:', deleteResponse.data);

      setPendingCars(prev => prev.filter(car => car._id !== carId));

      Swal.fire({
        title: 'Success!',
        text: 'Car has been approved and listed successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error('Error approving car:', error);
      if (error instanceof Error) {
        Swal.fire({
          title: 'Error!',
          text: `Failed to approve car: ${error.message}`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: `Failed to approve car: ${error}`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  };

  const handleReject = async (carId: string) => {
    try {
      await axiosPublic.delete(`/hostCar/${carId}`);
      setPendingCars(prev => prev.filter(car => car._id !== carId));
      
      Swal.fire({
        title: 'Rejected!',
        text: 'Car has been rejected',
        icon: 'info',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error('Error rejecting car:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to reject car',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <SyncLoader color="#003366" />
          <p className="text-[#1F2937] font-medium">Loading pending requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <FaCar className="w-8 h-8 text-[#003366]" />
          <h1 className="text-3xl font-bold text-[#1F2937]">Pending Vehicle Requests</h1>
        </div>

        {pendingCars.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <FaCar className="w-16 h-16 text-[#14B8A6] mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-[#1F2937] mb-2">No Pending Requests</h2>
            <p className="text-gray-500">All vehicle requests have been processed.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingCars.map((car) => (
              <div key={car._id} className="bg-white rounded-xl shadow-sm overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-md">
                <div className="relative">
                  <img 
                    src={car.image} 
                    alt={`${car.make} ${car.model}`} 
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-[#F59E0B] text-white px-3 py-1 rounded-full text-sm font-medium">
                    ${car.price_per_day}/day
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#003366] mb-4">
                    {car.make} {car.model} <span className="text-[#14B8A6]">({car.year})</span>
                  </h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-[#1F2937]">
                      <FiTag className="w-5 h-5 text-[#14B8A6]" />
                      <span>{car.category}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#1F2937]">
                      <FiUser className="w-5 h-5 text-[#14B8A6]" />
                      <span>{car.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#1F2937]">
                      <FiMail className="w-5 h-5 text-[#14B8A6]" />
                      <span className="text-sm">{car.email}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleApprove(car._id)}
                      className="flex items-center justify-center gap-2 bg-[#14B8A6] text-white px-4 py-2.5 rounded-lg hover:bg-[#0E8A7D] transition-colors"
                    >
                      <FaCheckCircle className="w-5 h-5" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(car._id)}
                      className="flex items-center justify-center gap-2 bg-white text-red-500 border-2 border-red-500 px-4 py-2.5 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <FiXCircle className="w-5 h-5" />
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PendingCars;
