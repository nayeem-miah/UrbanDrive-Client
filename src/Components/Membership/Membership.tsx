/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { SyncLoader } from 'react-spinners';
import { useTranslation } from 'react-i18next';
// interface MembershipState {
//   planName: string;
//   price: number;
// }
const Membership: React.FC = () => {
  const axiosPublic = useAxiosPublic();
  const {t} = useTranslation();

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
  // console.log(membershipdata)
  return (
    // <div className="mt-24 p-5">
    //   <div className="container mx-auto px-4">
    //     <h1 className="text-4xl font-bold text-center mb-10 text-gray-800 font-Merri">
    //       {t("choose_membership_plan")} {/* Translatable text */}
    //     </h1>

    //     {/* Display loader while data is loading */}
    //     {isLoading ? (
    //       <div className="min-h-screen flex items-center justify-center">
    //         <SyncLoader color="#593cfb" size={10} />
    //       </div>
    //     ) : (
    //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    //         {/* Map over the membership data and dynamically render plans */}
    //         {membershipdata.map((membership: any) => (
    //           <div
    //             key={membership._id}
    //             className="bg-[#fdfcfb] rounded-lg shadow-lg p-6"
    //           >
    //             <h2 className="text-2xl font-bold mb-4 text-gray-700">
    //               {t(`membership.${membership.planName}`)}{" "}
    //               {/* Dynamically translate the plan name */}
    //             </h2>
    //             <p className="text-gray-600 mb-4">
    //               {t(`membership.${membership.description}`)}{" "}
    //               {/* Dynamically translate the description */}
    //             </p>
    //             <p className="text-xl font-bold text-gray-800 mb-4">
    //             {membership.price}<span className='text-xl font-extrabold'>৳</span> / {t("month")}{" "}
    //               {/* Use translated "month" */}
    //             </p>
    //             {/* <ul className="list-disc list-inside mb-6 text-gray-600">
    //               {membership.features.map((feature: string, index: number) => (
    //                 <li key={index}>{t(`membership.features.${feature}`)}</li> // Dynamically translate features
    //               ))}
    //             </ul> */}
    //             <Link
    //               to={`/membership-duration/${membership.planName}/${membership.price}`}
    //             >
    //               <button className="w-full bg-gradient-to-r from-[#3d83d3] to-[#a306fd] text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
    //                 {t("buy_now")} {/* Translatable Buy Now button */}
    //               </button>
    //             </Link>
    //           </div>
    //         ))}
    //       </div>
    //     )}
    //   </div>
    // </div>
    <div className="mt-24 p-5">
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800 font-Merri">
        {t("choose_membership_plan")} {/* Translatable text */}
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
            <div
              key={membership._id}
              className="bg-[#fdfcfb] rounded-lg shadow-lg p-6 flex flex-col h-full"
            >
              <div className=' text-2xl font-bold mb-4 text-gray-800'>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                {t(`${membership.planName}`)}{" "}
                {/* Dynamically translate the plan name */}
              </h2>
              <p className="text-2xl font-bold text-gray-800 mb-4 ">
                {membership.price}<span className='text-xl font-extrabold'>৳</span> / {t("month")}
                {/* Use translated "month" */}
              </p>

<<<<<<< HEAD
        {/* Display loader while data is loading */}
        {isLoading ? (
          <div className="min-h-screen flex items-center justify-center">
            <SyncLoader color="#593cfb" size={10} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Map over the membership data and dynamically render plans */}
            {membershipdata.map((membership: any) => (
              <div
                key={membership._id}
                className="bg-[#fdfcfb] rounded-lg shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold mb-4 text-gray-700">
                  {t(`membership.${membership.planName}`)}{" "}
                  {/* Dynamically translate the plan name */}
                </h2>
                <p className="text-gray-600 mb-4">
                  {t(`membership.${membership.description}`)}{" "}
                  {/* Dynamically translate the description */}
                </p>
                <p className="text-xl font-bold text-gray-800 mb-4">
                  ${membership.price} / {t("month")}{" "}
                  {/* Use translated "month" */}
                </p>
                <ul className="list-disc list-inside mb-6 text-gray-600">
                  {membership?.features?.map((feature: string, index: number) => (
                    <li key={index}>{t(`membership.features.${feature}`)}</li> // Dynamically translate features
                  ))}
                </ul>
                <Link
                  to={`/membership-duration/${membership.planName}/${membership.price}`}
                >
                  <button className="w-full bg-gradient-to-r from-[#3d83d3] to-[#a306fd] text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
                    {t("buy_now")} {/* Translatable Buy Now button */}
                  </button>
                </Link>
=======
>>>>>>> a0f9d26fe2b9d9cdbf36aab3cc5cceec29bbbb8b
              </div>
              <div className="flex-grow mb-4">
              <p className="text-gray-600 mb-4">
                {t(`membership.${membership.description}`)}{" "}
                {/* Dynamically translate the description */}
              </p>
             
              <p className="text-gray-600 mb-2 font-bold">
                {membership.discount} {t("discount")}
              </p>
              <p className="text-gray-600 mb-2 font-bold">
                {t("tissueFree")}
              </p>
              
              <p className="text-gray-600 mb-2">
  <span className="font-bold">{t("cardamage_responsibility")}:</span> {membership.carDamageResponsibility}
</p>
{membership.specialOffer ? (
  <p className="text-gray-600 mb-2">
    <span className="font-bold">{t("special_offer")}:</span> {membership.specialOffer}
  </p>
) : null}
              {membership.additionalServices && (
                <div className="text-gray-800 mb-4">
                  <h3 className="font-semibold">{t("additional_services")}:</h3>
                  <ul className="list-disc list-inside">
                    {Object.entries(membership.additionalServices).map(([key, value]) => (
                      <li key={key}>  {String(value)}</li>
                    ))}
                  </ul>
                </div>
              )}

              </div>
              
              
              <Link
                   to={`/membership-duration/${membership.planName}/${membership.price}`}
              >
                <button className="w-full bg-gradient-to-r from-[#3d83d3] to-[#a306fd] text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
                  {t("buy_now")} {/* Translatable Buy Now button */}
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
  );
};

export default Membership;


