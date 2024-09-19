import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

interface Destination {
  name: string;
  icon: string; // You can replace this with a React component if you're using SVG or images
}
// BrowseByDestination
const destinations: Destination[] = [
  { name: "Los Angeles", icon: "🌴" }, // Replace this with actual icons or images
  { name: "Honolulu", icon: "🏝️" },
  { name: "Paris", icon: "🗼" },
  { name: "Sydney", icon: "🌉" },
  { name: "London", icon: "🕰️" },
  { name: "Toronto", icon: "🗼" },
];


const BrowseByCar: React.FC = () => {
    
return (
    <>
        <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          '@0.00': {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          '@0.75': {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          '@1.00': {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          '@1.50': {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {destinations.map((destination, index) => (
          <SwiperSlide key={index}>
            {/* <div className="border rounded-lg p-6 flex flex-col items-center">
              <div className="text-6xl mb-4">{destination.icon}</div>
              <h3 className="text-lg font-semibold">{destination.name}</h3>
            </div> */}
          </SwiperSlide>
        ))}
        
      </Swiper>
    </>
)    
}

export default BrowseByCar