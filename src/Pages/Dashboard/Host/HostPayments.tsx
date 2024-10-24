import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";


interface PaymentData {
  _id: string;
  cus_name: string;
  paymentId: string;
  tran_date: string;
  card_type: string;
}

const HostPayments = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const { data: myHistory = [] } = useQuery({
    queryKey: ["myHistory"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/hostHistory/${user?.email}`);
      return res.data;
    },
  });
  // console.log(myHistory)
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 mb-10">
        <div className="">
          <h2 className="text-3xl font-bold mb-6 text-center underline mt-4">
            Payment History
          </h2>
        </div>
        {myHistory.length === 0 ? (
          <div className="h-screen-minus-20px flex items-center justify-center">
            <h2 className="text-3xl font-bold">
              You have not purchased anything yet...
            </h2>
          </div>
        ) : (
          <div className="overflow-x-auto border rounded mt-16">
            <table className="table font-medium">
              <thead className="bg-primary text-white">
                <tr className="text-base">
                  <th>#</th>
                  <th>Name</th>
                  <th>Transaction type</th>
                  <th>Transaction Id</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {myHistory.map((item: PaymentData, idx: number) => (
                  <tr key={item._id}>
                    <th>{idx + 1}</th>
                    <td>{item?.cus_name}</td>
                    <td>{item?.card_type}</td>
                    <td>{item?.paymentId}</td>
                    <td>{formatDate(item?.tran_date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default HostPayments;
