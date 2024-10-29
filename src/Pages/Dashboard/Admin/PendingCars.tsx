import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { SyncLoader } from 'react-spinners';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

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
      <div className="min-h-screen flex items-center justify-center">
        <SyncLoader color="#593cfb" size={18} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6">Pending Cars for Approval</h2>
      
      {pendingCars.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No pending cars for approval</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingCars.map((car) => (
            <div key={car._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src={car.image} 
                alt={`${car.make} ${car.model}`} 
                className="w-full h-48 object-cover"
              />
              
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  {car.make} {car.model} ({car.year})
                </h3>
                
                <div className="space-y-2 mb-4">
                  <p className="text-gray-600">Category: {car.category}</p>
                  <p className="text-gray-600">Price: ${car.price_per_day}/day</p>
                  <p className="text-gray-600">Host: {car.name || 'N/A'}</p>
                  <p className="text-gray-600">Email: {car.email || 'N/A'}</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleApprove(car._id)}
                    className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(car._id)}
                    className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingCars;
