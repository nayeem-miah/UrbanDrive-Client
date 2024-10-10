import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

import Hyundai from '../assets/Hyundai.png';
import Nissan from '../assets/nissan.png';
import Nissan2 from '../assets/nissan2.png';
import Tata from '../assets/tata.png';
import Suzuki from '../assets/suzuki.jpg';
import Toyota from '../assets/toyota.jpg';



interface Destination {
  name: string;
  image: string; 
}


const destinations: Destination[] = [
  { name: "Hyundai", image:Hyundai }, 
  { name: "Nissan", image: Nissan },
  { name: "Tata", image: Tata},
  { name: "Suzuki", image: Suzuki},
  { name: "Toyota", image: Toyota },

  { name: "Nissan", image: Nissan2 },
  

];


const BrowseByCar: React.FC = () => {
    
return (
  <>
    <div className='text-center'>
      <h2 className="text-4xl font-bold relative inline-block mt-20 mb-10 font-Playfair">
        Browse By Cars
        <span className="block w-full h-4 bg-purple-200 absolute bottom-0 left-0 z-[-1]" />
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
}

export default BrowseByCar