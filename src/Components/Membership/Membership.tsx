/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { SyncLoader } from 'react-spinners';
import { useTranslation } from 'react-i18next';

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

  return (
    <div className="mt-24 p-5 bg-background">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-10 text-primary font-Merri">
          {t("choose_membership_plan")} {/* Translatable text */}
        </h1>

        {/* Display loader while data is loading */}
        {isLoading ? (
          <div className="min-h-screen flex items-center justify-center">
            <SyncLoader color="#003366" size={10} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Map over the membership data and dynamically render plans */}
            {membershipdata.map((membership: any) => (
              <div
                key={membership._id}
                className="bg-white rounded-lg shadow-lg p-6 border border-secondary transition-transform hover:scale-105"
              >
                <h2 className="text-2xl font-bold mb-4 text-primary font-Playfair">
                  {t(`membership.${membership.planName}`)}{" "}
                  {/* Dynamically translate the plan name */}
                </h2>
                <p className="text-text mb-4 font-Open">
                  {t(`membership.${membership.description}`)}{" "}
                  {/* Dynamically translate the description */}
                </p>
                <p className="text-xl font-bold text-primary mb-4 font-poppins">
                  ${membership.price} / {t("month")}{" "}
                  {/* Use translated "month" */}
                </p>
                <ul className="list-disc list-inside mb-6 text-text font-lato">
                  {/* {membership.features.map((feature: string, index: number) => (
                    <li key={index}>{t(`membership.features.${feature}`)}</li> // Dynamically translate features
                  ))} */}
                </ul>
                <Link
                  to={`/membership-duration/${membership.planName}/${membership.price}`}
                >
                  <button className="w-full bg-accent text-white font-bold py-2 px-4 rounded hover:bg-opacity-90 transition-colors font-poppins">
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
