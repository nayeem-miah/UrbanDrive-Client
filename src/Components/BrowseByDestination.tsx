import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import dhaka from "../assets/dhaka.jpg";
import chittagong from "../assets/chittagong.png";
import sylhet from "../assets/sylet.jpg";
import mymenshing from "../assets/mymensingh.png";
import rongpur from "../assets/rongpur.png";
import rajshahi from "../assets/rajshahi.jpg";
import { useTranslation } from "react-i18next";

interface Destination {
  name: string;
  image: string;
}

const BrowseByDestination: React.FC = () => {
  const { t } = useTranslation();
  const destinations: Destination[] = [
    { name: t("Dhaka"), image: dhaka },
    { name: t("Chittagong"), image: chittagong },
    { name: t("Rajshahi"), image: rajshahi },
    { name: t("Rongpur"), image: rongpur },
    { name: t("Sylhet"), image: sylhet },
    { name: t("Mymensingh"), image: mymenshing },
  ];
  return (
    <>
      <div className="text-center">
        <h2 className="text-4xl font-bold relative inline-block mt-20 mb-10 font-Merri">
          {t("browseByDestination")}
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
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default BrowseByDestination;
