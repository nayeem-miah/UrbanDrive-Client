import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import car1 from '../assets/nissan.jpg';
import { Link } from 'react-router-dom';

const BookAutoRental: React.FC = () => {
  const { t } = useTranslation();
  const [carType, setCarType] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');

  return (
    <div
      className="relative h-[60vh] bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${car1})` }}
    >
      <div className="bg-black bg-opacity-50 h-full flex flex-col justify-center items-center">
        <div className="text-center mb-8">
          <h3 className="tracking-wider font-lato text-white text-xl">
            {t("rentNow")}
          </h3>
          <h2 className="mt-4 text-4xl font-extrabold font-lato text-white">
            {t("bookAutoRental")}
          </h2>
        </div>

        <div className="bg-primary bg-opacity-75 p-8 rounded-3xl w-full max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <select 
              className="select w-full bg-transparent text-white border border-white rounded-full p-3 h-12 focus:outline-none focus:ring-2 focus:ring-accent"
              value={carType}
              onChange={(e) => setCarType(e.target.value)}
            >
              <option disabled value="">
                {t("chooseCarType")}
              </option>
              <option className="text-black" value="economy">
                {t("economyCars")}
              </option>
              <option className="text-black" value="luxury">
                {t("luxuryCars")}
              </option>
              <option className="text-black" value="sedan">
                {t("sedan")}
              </option>
            </select>

            <select 
              className="select w-full bg-transparent text-white border border-white rounded-full p-3 h-12 focus:outline-none focus:ring-2 focus:ring-accent"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
            >
              <option className="text-black" disabled value="">
                {t("pickupLocation")}
              </option>
              <option className="text-black" value="uttora">
                {t("uttora")}
              </option>
              <option className="text-black" value="mirpur-1">
                {t("mirpur1")}
              </option>
              <option className="text-black" value="saver">
                {t("saver")}
              </option>
              <option className="text-black" value="ajimpur">
                {t("ajimpur")}
              </option>
              <option className="text-black" value="mirpur-2">
                {t("mirpur2")}
              </option>
            </select>

            <Link to="/services" className="md:col-span-2">
              <button
                className="w-full bg-accent text-white font-bold rounded-full p-3 h-12 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent hover:bg-opacity-90"
              >
                {t("rentNowButton")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAutoRental;
