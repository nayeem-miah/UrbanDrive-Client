import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { SyncLoader } from "react-spinners";

interface PaymentData {
  _id: string;
  name: string;
  planName: string;
  date: string;
  purchaseDate: string;
  expiryDate: string;
  amount: number;
}

const ManageMemberShip = () => {
  const axiosPublic = useAxiosPublic();
  const { data: memberShip = [],isLoading } = useQuery({
    queryKey: ["all-membership"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/all-membership`);
      return res.data;
    },
  });
  // console.log(myHistory);
  const formatDate = (dateString: string) => {
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
            Manage Membership
          </h2>
        </div>
        {memberShip.length === 0 ? (
          <div className="h-screen-minus-20px flex items-center justify-center">
            <h2 className="text-3xl font-bold">
              Any Membership purchased yet...
            </h2>
          </div>
        ) : (
          <div className="overflow-x-auto border rounded mt-16">
            <table className="table font-medium">
              <thead className="bg-primary text-white">
                <tr className="text-base">
                  <th>#</th>
                  <th>Name</th>
                  <th>Membership plan</th>
                  <th>Purchased Date</th>
                  <th>Expiry Date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {memberShip.map((item: PaymentData, idx: number) => (
                  <tr key={item._id}>
                    <th>{idx + 1}</th>
                    <td>{item?.name || "Roksana"}</td>
                    <td>{item?.planName}</td>
                    <td>{formatDate(item?.purchaseDate)}</td>
                    <td>{formatDate(item?.expiryDate)}</td>
                    <td className="font-bold">{item?.amount}$</td>
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

export default ManageMemberShip;
