import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

interface PaymentData {
  _id: string;
  transactionId: string;
  date: string;
  status: "Paid" | "pending";
}


const PaymetHistory = () => {
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    const { data: myHistory = [] } = useQuery({
        queryKey: ["myHistory"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/myHistory/${user?.email}`);
            return res.data;
        },
    });
    // console.log(myHistory);

    return (
      <div>
        <div>
          <div className="mt-8">
            <h2 className="text-3xl font-bold mb-6 text-center underline">
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
                <thead className="bg-[#076cec] text-white">
                  <tr className="text-base">
                    <th>#</th>
                    <th>Name</th>
                    <th>Transaction Id</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {myHistory.map((item : PaymentData, idx : number) => (
                    <tr key={item._id}>
                      <th>{idx + 1}</th>
                      <td>{user?.displayName}</td>
                      <td>{item.transactionId}</td>
                      <td>{item.date}</td>
                      {/* <td
                        className={`inline-flex items-center justify-center font-bold`}
                      >
                        <p
                          className={`font-medium rounded-lg ${
                            item?.status === "Paid" &&
                            "bg-emerald-100/60 p-2 text-emerald-500"
                          } ${
                            item?.status === "pending" &&
                            "text-yellow-500 p-2 font-bold bg-yellow-100/60"
                          }  `}
                        >
                          {item.status}
                        </p>
                      </td> */}
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

export default PaymetHistory;