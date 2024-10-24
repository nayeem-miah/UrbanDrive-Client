import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";


interface PaymentData {
  _id: string;
  name: string;
  transactionId: string;
  date: string;
  status: "Paid" | "pending";
}

const ManagePaymentHistory = () => {
  const axiosPublic = useAxiosPublic();
  const { data: paymentHistory = [] } = useQuery({
    queryKey: ["paymentHistory"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/paymentHistory`);
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
  return (
    <div className="bg-background text-text font-poppins">
      <div className="mt-4">
        <h2 className="text-3xl font-bold mb-6 text-primary">
          Payment History
        </h2>
      </div>
      {paymentHistory.length === 0 ? (
        <div className="h-screen-minus-20px flex items-center justify-center">
          <h2 className="text-3xl font-bold">
            You have not purchased anything yet...
          </h2>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-200">
                  <th className="pb-3 text-[#003366]">#</th>
                  <th className="pb-3 text-[#003366]">Name</th>
                  <th className="pb-3 text-[#003366]">Transaction Id</th>
                  <th className="pb-3 text-[#003366]">Date</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((item: PaymentData, idx: number) => (
                  <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4">{idx + 1}</td>
                    <td className="py-4">{item?.name}</td>
                    <td className="py-4">{item?.transactionId}</td>
                    <td className="py-4">{formatDate(item?.date)}</td>
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

export default ManagePaymentHistory;
