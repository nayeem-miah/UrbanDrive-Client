import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { SyncLoader } from "react-spinners";
import useAuth from "../../../Hooks/useAuth";

interface CarData {
  _id: string;
  make: string;
  rental_price_per_day: number;
  availability: boolean;
  image: string;
}

const HostManageCars = () => {
  const axiosPublic = useAxiosPublic();
  const {user} = useAuth();
  const {
    data: TotalCar = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["Car"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/hostHistory/${user?.email}`);
      return res.data;
    },
  });
  console.log(TotalCar);

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SyncLoader color="#593cfb" size={18} />
      </div>
    );
  }
  return (
    <div>
      <div>
        <div className="mt-4">
          <h2 className="text-3xl font-bold mb-6 text-center underline">
            Manage Cars
          </h2>
        </div>
        {TotalCar.length === 0 ? (
          <div className="h-screen-minus-20px flex items-center justify-center">
            <h2 className="text-3xl font-bold">Any car haven't added yet...</h2>
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
                  <th>Price Per day</th>
                  <th className="text-center">Action</th>
                  {/* <th>Status</th> */}
                </tr>
              </thead>
              <tbody>
                {TotalCar.map((item: CarData, idx: number) => (
                  <tr key={item._id}>
                    <th>{idx + 1}</th>
                    <th>
                      <img
                        src={item?.image}
                        className="w-14 h-11 rounded-md"
                        alt="car image"
                      />
                    </th>
                    <td>{item?.make}</td>
                    <td>{item?.availability === true ? 'Available' : 'Unavailable'}</td>
                    <td className="font-bold">{item?.rental_price_per_day} Taka</td>
                    <td>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-error text-white mr-6"
                      >
                        Delete
                      </button>{" "}
                      <button className="btn btn-success text-white">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostManageCars;
