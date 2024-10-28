import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { SyncLoader } from "react-spinners";

interface CarData {
  _id: string;
  make: string;
  name: string;
  date: string;
  image: string
}

const TotalCarList = () => {
  const axiosPublic = useAxiosPublic();
  const { data: TotalCar = [],refetch, isLoading } = useQuery({
    queryKey: ["Car"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/totalCars`);
      return res.data;
    },
  });
  console.log(TotalCar);

 const handleDelete = (id : string) => {
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

 if (isLoading) {
   return (
     <div className="min-h-screen flex items-center justify-center">
       <SyncLoader color="#593cfb" size={18} />
     </div>
   );
 }
  return (
    <div className="bg-background text-text font-poppins">
      <div className="mt-4">
        <h2 className="text-3xl font-bold mb-6 text-primary">
          Manage Cars
        </h2>
      </div>
      {TotalCar.length === 0 ? (
        <div className="h-screen-minus-20px flex items-center justify-center">
          <h2 className="text-3xl font-bold">Any car haven't added yet...</h2>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-200">
                  <th className="pb-3 text-[#003366]">#</th>
                  <th className="pb-3 text-[#003366]">Image</th>
                  <th className="pb-3 text-[#003366]">Name</th>
                  <th className="pb-3 text-[#003366]">Car Model</th>
                  <th className="pb-3 text-[#003366]">Action</th>
                </tr>
              </thead>
              <tbody>
                {TotalCar.map((item: CarData, idx: number) => (
                  <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4">{idx + 1}</td>
                    <td className="py-4">
                      <img src={item?.image} className="w-14 h-11 rounded-md" alt="car image" />
                    </td>
                    <td className="py-4">{item?.name}</td>
                    <td className="py-4">{item?.make}</td>
                    <td className="py-4">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-error text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TotalCarList;
