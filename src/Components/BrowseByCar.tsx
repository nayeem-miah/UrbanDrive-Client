import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

import Hyundai from "../assets/Hyundai.png";
import Nissan from "../assets/nissan.png";
// import Nissan2 from '../assets/nissan2.png';
import Suzuki from "../assets/suzuki.jpg";
import Toyota from "../assets/toyota.jpg";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface Destination {
  name: string;
  image: string;
}

const BrowseByCar: React.FC = () => {
  const { t } = useTranslation();
  const destinations: Destination[] = [
    { name: t("toyota"), image: Toyota },
    { name: t("honda"), image: Hyundai },
    { name: t("nissan"), image: Nissan },
    { name: t("suzuki"), image: Suzuki },
  ];
  return (
    <>
      <div className="text-center">
        <h2 className="text-4xl font-bold relative inline-block mt-20 mb-10 font-Merri">
          {t("browseByCar")}
        </h2>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={5}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          "@0.75": {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          "@1.00": {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          "@1.50": {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {destinations.map((destination, index) => (
          <SwiperSlide key={index}>
            <Link to="/services">
              <div
                className="relative h-48 w-full bg-cover bg-center rounded-lg overflow-hidden mt-10"
                style={{ backgroundImage: `url(${destination.image})` }}
              >
                {/* Overlay for text visibility */}
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-lg font-semibold">
                    {destination.name}
                  </h3>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default BrowseByCar;
