import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

import BMW from '../assets/bmw.jpg';
import Mercedes from '../assets/mercedes.jpg';
import Porsche from '../assets/porche.jpg';
import Toyota from '../assets/toyota.jpg';
import Nissan from '../assets/nissan.jpg';
import Jeep from '../assets/jeep.jpg';
import Ford from '../assets/ford.jpg';


interface Destination {
  name: string;
  // image : 
  image: string; // You can replace this with a React component if you're using SVG or images
}
// BrowseByDestination
const destinations: Destination[] = [
  { name: "BMW", image: BMW }, // Replace this with actual icons or images
  { name: "Mercedes", image: Mercedes },
  { name: "Porsche", image: Porsche },
  { name: "Toyota", image: Toyota },
  { name: "Nissan", image: Nissan },
  { name: "Jeep", image: Jeep },
  { name: "Ford", image: Ford },
];


const BrowseByCar: React.FC = () => {
    
return (
    <>
        <Swiper
        slidesPerView={1}
        spaceBetween={5}
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
             <div 
              className="relative h-48 w-full bg-cover bg-center rounded-lg overflow-hidden mt-10"
              style={{ backgroundImage: `url(${destination.image})` }}
            >
              {/* Overlay for text visibility */}
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-lg font-semibold">{destination.name}</h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
        
      </Swiper>
    </>
)    
}

export default BrowseByCar