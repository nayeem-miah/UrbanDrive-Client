import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { SyncLoader } from "react-spinners";

interface bookings {
  _id: string;
  cus_email: string;
  cus_phoneNumber: string;
  startDate: string;
  endDate: string;
  location : string;
  amount: number,
  status: string
}

const AllBookings = () => {
  const axiosPublic = useAxiosPublic();
  const { data: allBookings = [], isLoading } = useQuery({
    queryKey: ["allBookings"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/allBookings`);
      return res.data;
    },
  });
  console.log(allBookings);
  const formatDate = (dateString : string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
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
            All Bookings
          </h2>
        </div>
        {allBookings.length === 0 ? (
          <div className="h-screen-minus-20px flex items-center justify-center">
            <h2 className="text-3xl font-bold">
              Any Bookings haven't done yet...
            </h2>
          </div>
        ) : (
          <div className="overflow-x-auto border rounded mt-16">
            <table className="table table-xs font-medium">
              <thead className="bg-primary text-white">
                <tr className="text-base">
                  <th>#</th>
                  <th>User</th>
                  <th>Location</th>
                  <th>Phone Number</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                {allBookings.map(
                  (item: bookings, idx: number) =>
                    item.status === "Success" && (
                      <tr key={item._id}>
                        <th>{idx + 1}</th>
                        <td>{item?.cus_email}</td>
                        <td>{item?.location}</td>
                        <td>{item?.cus_phoneNumber}</td>
                        <td>{formatDate(item?.startDate)}</td>
                        <td>{formatDate(item?.endDate)}</td>
                        <td className="font-bold">{item?.amount}৳</td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBookings;
