import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

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
    console.log(myHistory);

    return (
        <div>
            <h3 className="text-center">  {myHistory?.length}</h3>
        </div>
    );
};

export default PaymetHistory;