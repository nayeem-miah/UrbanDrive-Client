import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

type Role = "Admin" | "Host" | "";

const useRole = (): [Role, boolean, boolean] => {
  const { user, loading } = useAuth();
  const axiosPublic = useAxiosPublic();

  const {
    data: role = "", 
    isFetching: isPending, 
    isLoading,
  } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !loading, 
    queryFn: async (): Promise<Role> => {
      const { data } = await axiosPublic(`/user/${user?.email}`);
      return data.role as Role;
    },
  });

  return [role, isPending, isLoading];
};

export default useRole;
