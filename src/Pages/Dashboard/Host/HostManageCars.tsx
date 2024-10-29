import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { SyncLoader } from "react-spinners";
import useAuth from "../../../Hooks/useAuth";
import React, { useState } from "react";

interface CarData {
  _id: string;
  make: string;
  rental_price_per_day: number;
  availability: boolean;
  image: string;
}

const HostManageCars = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [selectedCar, setSelectedCar] = useState<CarData | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data: TotalCar = [], refetch, isLoading } = useQuery({
    queryKey: ["Car"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/hostHistory/${user?.email}`);
      return res.data;
    },
  });
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/cars/delete/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Successfully deleted",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleEditClick = (car: CarData) => {
    setSelectedCar(car);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedCar) {
      try {
        await axiosPublic.put(`/car/update/${selectedCar._id}`, selectedCar);
        setIsEditModalOpen(false);
        refetch();
        Swal.fire("Updated!", "Car details have been updated.", "success");
      } catch (error) {
        Swal.fire("Error!", "Failed to update car details.", "error");
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSelectedCar((prevCar) => (prevCar ? { ...prevCar, [name]: value } : prevCar));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SyncLoader color="#593cfb" size={18} />
      </div>
    );
  }
  console.log(selectedCar);
  return (
    <div>
      <div className="mt-4">
        <h2 className="text-3xl font-bold mb-6 text-center underline">Manage Cars</h2>
      </div>
      {TotalCar.length === 0 ? (
        <div className="h-screen-minus-20px flex items-center justify-center">
          <h2 className="text-3xl font-bold">No car added yet...</h2>
        </div>
      ) : (
        <div className="overflow-x-auto border rounded mt-16">
          <table className="table font-medium">
            <thead className="bg-primary text-white">
              <tr className="text-base">
                <th>#</th>
                <th>Image</th>
                <th>Car Model</th>
                <th>Availability</th>
                <th>Price Per Day</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {TotalCar.map((item: CarData, idx: number) => (
                <tr key={item._id}>
                  <th>{idx + 1}</th>
                  <th>
                    <img src={item.image} className="w-14 h-11 rounded-md" alt="car" />
                  </th>
                  <td>{item.make}</td>
                  <td>{item.availability ? "Available" : "Unavailable"}</td>
                  <td className="font-bold">{item.rental_price_per_day} Taka</td>
                  <td>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-error text-white mr-6"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEditClick(item)}
                      className="btn btn-success text-white"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedCar && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="relative w-full max-w-md p-6 bg-white rounded-md shadow-lg">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 hover:bg-red-500 p-2 rounded"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold mb-4">Edit Car Details</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block font-bold mb-2">Car Model</label>
                <input
                  type="text"
                  name="make"
                  value={selectedCar.make}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold mb-2">Rental Price per Day</label>
                <input
                  type="number"
                  name="rental_price_per_day"
                  value={selectedCar.rental_price_per_day}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <button type="submit" className="btn btn-primary w-full text-white">
                Save updated
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostManageCars;
