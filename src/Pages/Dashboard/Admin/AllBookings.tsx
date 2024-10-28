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
      const res = await axiosPublic.get(`/bookings-data`);
      return res.data;
    },
  });
  // console.log(allBookings);
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
    <div className="bg-background text-text font-poppins">
      <div className="mt-4">
        <h2 className="text-3xl font-bold mb-6 text-primary">
          All Bookings
        </h2>
      </div>
      {allBookings.length === 0 ? (
        <div className="h-screen-minus-20px flex items-center justify-center">
          <h2 className="text-3xl font-bold">
            No bookings have been made yet...
          </h2>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-200">
                  <th className="pb-3 text-[#003366]">#</th>
                  <th className="pb-3 text-[#003366]">User</th>
                  <th className="pb-3 text-[#003366]">Location</th>
                  <th className="pb-3 text-[#003366]">Phone Number</th>
                  <th className="pb-3 text-[#003366]">Start Date</th>
                  <th className="pb-3 text-[#003366]">End Date</th>
                  <th className="pb-3 text-[#003366]">Cost</th>
                </tr>
              </thead>
              <tbody>
                {allBookings.map(
                  (item: bookings, idx: number) =>
                    item.status === "Success" && (
                      <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4">{idx + 1}</td>
                        <td className="py-4">{item?.cus_email}</td>
                        <td className="py-4">{item?.location}</td>
                        <td className="py-4">{item?.cus_phoneNumber}</td>
                        <td className="py-4">{formatDate(item?.startDate)}</td>
                        <td className="py-4">{formatDate(item?.endDate)}</td>
                        <td className="py-4 font-bold">{item?.amount}৳</td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBookings;
