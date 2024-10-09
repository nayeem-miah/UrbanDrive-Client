import { IoPersonSharp } from "react-icons/io5";
import person from "../../../assets/person.png"
import { FaCarRear } from "react-icons/fa6";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { SyncLoader } from "react-spinners";

const AdminHome: React.FC =() => {
  const axiosSecure = useAxiosPublic();
  const { data = [] ,isLoading } = useQuery({
    queryKey: ["query-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      // console.log(res.data);
      return res.data;
    },
  });

  // console.log(data)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SyncLoader color="#593cfb" size={18} />
      </div>
    );
  }
    return (
      <div className="text-2xl">
        <div className="mt-3">
          <h2 className="text-3xl font-bold mb-4 text-left mt-2 font-Merri">Overview</h2>
        </div>
        <>
          <div className="stats mt-3">
            <div className="stat space-y-3 bg-green-400">
              <div className="stat-figure text-secondary">
                <img className="w-11 h-11" src={person} alt="" />
              </div>
              <div className="stat-title font-bold text-white">
                Total Car Owner
              </div>
              <div className="stat-value">{data?.hostCount}</div>
            </div>

            <div className="stat space-y-3 bg-blue-500">
              <div className="stat-figure text-secondary">
                <IoPersonSharp className="w-11 h-11" />
              </div>
              <div className="stat-title text-white font-bold">
                Total Passenger
              </div>
              <div className="stat-value">{data?.passengerCount}</div>
            </div>
            <div className="stat space-y-3 bg-red-400 w-[275px]">
              <div className="stat-figure text-secondary">
                <FaCarRear className="w-11 h-11" />
              </div>
              <div className="stat-title text-white font-bold">Total Car</div>
              <div className="stat-value">{data?.carCount}</div>
            </div>
          </div>
        </>
        <div className="mt-3">
          <h2 className="text-xl font-bold mb-4 text-left mt-2">Recent car bookings</h2>
        </div>

      </div>
    );
}

export default AdminHome;