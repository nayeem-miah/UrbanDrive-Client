import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { SyncLoader } from 'react-spinners';

const Membership: React.FC = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: membershipdata = [], // assuming it's an array of membership plans
    isLoading,
  } = useQuery({
    queryKey: ["memberships"],
    queryFn: async () => {
      const response = await axiosPublic.get("/memberships");
      // console.log('data:', response.data);
      return response.data; // ensure this returns an array
    },
  });

  return (
    <div className="mt-24 p-5">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800 font-Merri">
          Choose Your Membership Plan
        </h1>

        {/* Display loader while data is loading */}
        {isLoading ? (
          <div className="min-h-screen flex items-center justify-center">
            <SyncLoader color="#593cfb" size={10} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Map over the membership data and dynamically render plans */}
            {membershipdata.map((membership: any) => (
              <div key={membership._id} className="bg-[#fdfcfb] rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">
                  {membership.planName} {/* Render the plan name */}
                </h2>
                <p className="text-gray-600 mb-4">{membership.description}</p>
                <p className="text-xl font-bold text-gray-800 mb-4">
                  ${membership.price} / month
                </p>
                <ul className="list-disc list-inside mb-6 text-gray-600">
                  {membership.features.map((feature: string, index: number) => (
                    <li key={index}>{feature}</li> // Render each feature
                  ))}
                </ul>
                <Link to={`/membership-duration/${membership.planName}/${membership.price}`}>
                <button className="w-full bg-gradient-to-r from-[#3d83d3] to-[#a306fd] text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
                  Buy Now
                </button></Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Membership;
