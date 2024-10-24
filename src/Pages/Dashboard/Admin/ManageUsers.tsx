import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ClipLoader, SyncLoader } from "react-spinners";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface RoleOption {
  role: string;
}

const ManageUsers = () => {
    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(false);

  const {
    refetch,
    data: users = [],
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/user");
      return res.data;
    },
  });

  const options: RoleOption[] = [
    { role: "Admin" },
    { role: "Host" },
    { role: "User" },
  ];

  const handleChange = (role: string, id: string) => {
    setLoading(true);
    axiosPublic.patch(`/users/admin/${id}`, { role }).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
      }
      setLoading(false);
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SyncLoader color="#003366" size={18} />
      </div>
    );
  }

  return (
    <div className="bg-background text-text font-poppins">
      <div className="mt-4">
        <h2 className="text-3xl font-bold mb-6 text-primary">
          Manage Users
        </h2>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="pb-3 text-[#003366]">#</th>
                <th className="pb-3 text-[#003366]">Name</th>
                <th className="pb-3 text-[#003366]">Email</th>
                <th className="pb-3 text-[#003366]">Current Role</th>
                <th className="pb-3 text-[#003366]">Update Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item, idx) => (
                <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4">{idx + 1}</td>
                  <td className="py-4">{item.name}</td>
                  <td className="py-4">{item.email}</td>
                  <td className="py-4">
                    {loading ? (
                      <ClipLoader color="#003366" size={18} />
                    ) : (
                      <span className="font-medium text-secondary">{item.role}</span>
                    )}
                  </td>
                  <td className="py-4">
                    <select
                      className="bg-white border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-secondary"
                      defaultValue={item.role}
                      onChange={(e) => handleChange(e.target.value, item._id)}
                    >
                      {options.map((opt, idx) => (
                        <option key={idx}>{opt.role}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
