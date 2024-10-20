import React from 'react';
import { motion } from 'framer-motion';
import carRental from "../assets/bannercar.jpg";
import { TbArrowUpRight } from "react-icons/tb";
import { useTranslation } from 'react-i18next';

const CarRental: React.FC = () => {
  const {t} = useTranslation();
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1  gap-4 md:grid-cols-2 lg:grid-cols-2 mx-auto mt-6 ml-2 mr-2 lg:gap-20 lg:ml-12 lg:mr-12 lg:p-10 md:ml-10 md:mr-10 md:p-6 md:gap-12">
        {/* First div: Content animates from top */}
        <motion.div
          className="mx-auto justify-center items-center"
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
        >
          <h3 className="text-amber-600 font-bold tracking-wider mt-1 ml-2 font-lato"></h3>
          <motion.h1
            className="font-bold text-4xl font-lato mt-6 bg-gradient-to-r from-[#3d83d3] to-[#a306fd] text-transparent bg-clip-text"
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
          >
            {t("rentalheading")} <br />
            <span className="bg-gradient-to-r from-[#3d83d3] to-[#a306fd] text-transparent bg-clip-text">
              {t("rentalheading2")}
            </span>
          </motion.h1>
          <motion.p
            className="mt-4 font-lato text-[#504e4b]"
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
          >
            {t("renatalsubheading")}
          </motion.p>

          <motion.div
            className="flex flex-col gap-2 mt-4"
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
          >
            <div className="flex items-center">
              <div className="h-10 w-10 flex items-center justify-center bg-gradient-to-r from-[#3d83d3] to-[#a306fd] rounded-full">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="ml-3 text-[#42413e] font-lato">
                {t("feature1")}
              </span>
            </div>
            <div className="flex items-center">
              <div className="h-10 w-10 flex items-center justify-center bg-gradient-to-r from-[#3d83d3] to-[#a306fd] rounded-full">
                <svg
                  className="w-6 h-6 text-white "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="ml-3 text-[#3d3c39] font-lato">
                {t("feature2")}
              </span>
            </div>
          </motion.div>
          <motion.button
            className="flex   outline-none  bg-gradient-to-r from-[#3d83d3] to-[#a306fd] text-white p-2 rounded-lg mb-6  font-medium mt-4"
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
          >
            {t("readMore")}
            <TbArrowUpRight className="text-xl ml-2" />
          </motion.button>
        </motion.div>

        {/* Second div: Image animates from the bottom */}
        <motion.div
          className=""
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeInOut" }}
        >
          <img
            className="h-[470px] w-[420px] rounded-3xl transition-transform duration-300 group-hover:scale-105"
            src={carRental}
            alt="carRental"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default CarRental;
