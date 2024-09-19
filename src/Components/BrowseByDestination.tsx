import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

import london from '../assets/lodon.jpg';
import miami from '../assets/miami.jpg';
import newWork from '../assets/newWork.jpg';
import paris from '../assets/paris.jpg';
import sydney from '../assets/sydney.jpg';
import los from '../assets/losangeles.jpg';
import toronto from '../assets/toronto.jpg';


interface Destination {
  name: string;
  // image : 
  image: string; // You can replace this with a React component if you're using SVG or images
}
// BrowseByDestination
const destinations: Destination[] = [
  { name: "Los Angeles", image: los }, // Replace this with actual icons or images
  { name: "Miami", image: miami },
  { name: "New Work", image: newWork },
  { name: "Paris", image: paris },
  { name: "Sydney", image: sydney },
  { name: "London", image: london },
  { name: "Toronto", image: toronto },
];



const BrowseByDestination: React.FC = () => {
    
return (
    <>
        <Swiper
        slidesPerView={1}
        spaceBetween={7}
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
              className="relative h-48 w-full bg-cover bg-center rounded-lg overflow-hidden"
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

export default BrowseByDestination;