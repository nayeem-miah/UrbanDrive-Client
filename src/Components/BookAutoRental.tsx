import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaCar, FaMapMarkerAlt } from 'react-icons/fa';
import car1 from '../assets/nissan.jpg';

const BookAutoRental: React.FC = () => {
  const { t } = useTranslation();
  const [carType, setCarType] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${car1})` }}>
      <div className="min-h-screen bg-black/60 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl">
          <div className="p-8">
            <div className="text-center mb-8 space-y-2">
              <h3 className="text-white/80 text-lg font-light tracking-wide">
                {t("rentNow")}
              </h3>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                {t("bookAutoRental")}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-white/80 text-sm font-medium">{t("chooseCarType")}</label>
                <div className="relative">
                  <select
                    value={carType}
                    onChange={(e) => setCarType(e.target.value)}
                    className="w-full h-14 bg-white/10 border border-white/20 rounded-lg text-white appearance-none px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 hover:bg-white/20"
                  >
                    
                    <option value="economy" className="bg-gray-800 text-white">{t("economyCars")}</option>
                    <option value="luxury" className="bg-gray-800 text-white">{t("luxuryCars")}</option>
                    <option value="sedan" className="bg-gray-800 text-white">{t("sedan")}</option>
                  </select>
                  <FaCar className="w-5 h-5 text-white/70 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-white/80 text-sm">{t("pickupLocation")}</label>
                <div className="relative">
                  <select
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full h-14 bg-white/10 border border-white/20 rounded-lg text-white appearance-none px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    <option value="uttora" className="bg-gray-800 text-white">{t("uttora")}</option>
                    <option value="mirpur-1" className="bg-gray-800 text-white">{t("mirpur1")}</option>
                    <option value="saver" className="bg-gray-800 text-white">{t("saver")}</option>
                    <option value="ajimpur" className="bg-gray-800 text-white">{t("ajimpur")}</option>
                    <option value="mirpur-2" className="bg-gray-800 text-white">{t("mirpur2")}</option>
                  </select>
                  <FaMapMarkerAlt className="w-4 h-4 text-white/70 absolute right-4 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            <Link to="/services" className="block mt-8">
              <button 
                className="w-full h-14 text-xl font-bold drop-shadow-lg backdrop-blur-lg bg-accent hover:bg-accent/60 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-orange/25 focus:outline-none focus:ring-2 focus:ring-orange/50"
              >
                {t("rentNowButton")}
              </button>
            </Link>

            <div className="mt-6 grid grid-cols-3 gap-4 text-center text-white/60 text-sm">
              <div className="space-y-1">
                <div className="font-semibold text-white">24/7</div>
                <div>{t("customerSupport")}</div>
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-white">100+</div>
                <div>{t("premiumVehicles")}</div>
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-white">{t("flexible")}</div>
                <div>{t("rentalOptions")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAutoRental;
