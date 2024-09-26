import React from 'react';
import { Fade } from 'react-awesome-reveal';
interface SlideProps {
  image: string;
  title: string; 
  model: string; 
  price: number; 
}

const Slide: React.FC<SlideProps> = ({ image, title, model, price }) => {
  return (
    <div
      className='relative w-full bg-center bg-cover h-[38rem]'
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
     
      <div className='absolute inset-0 bg-black/50'></div>
     
      <div className='relative z-10 flex justify-center items-center md:items-start lg:justify-start h-full p-8 md:p-16 lg:p-40'>
        <div className='text-left'>
          
          
          {/* <p className='text-sm font-Open text-teal-400 uppercase mb-2'>* Premium</p> */}
          
          
          <h1 className='text-5xl font-bold font-Playfair text-white md:text-7xl'>{title}</h1>


          
          <Fade direction="down" cascade>
          <p className='mt-4 text-2xl text-white'>
            {model} <span className='text-teal-400 font-Open'>${price}</span> / DAY
          </p>
          
          <div className='flex mt-8 space-x-4'>

          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-base sm:text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-500 to-navy-700 group-hover:from-teal-500 group-hover:to-navy-700 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-yellow-400 dark:focus:ring-yellow-800">
  <span className="relative px-3 sm:px-4 lg:px-8 py-2 sm:py-3 lg:py-[18px] transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 font-Open">
    View Details
  </span>
</button>

<button className="relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-base sm:text-lg font-medium text-teal-500 rounded-lg group hover:text-white border border-teal-500 focus:ring-4 focus:outline-none focus:ring-yellow-400 dark:focus:ring-yellow-800">
  <span className="relative px-3 sm:px-4 lg:px-8 py-2 sm:py-3 lg:py-[18px] transition-all ease-in duration-75 bg-transparent rounded-md group-hover:bg-teal-500 font-Open">
    Rent Now
  </span>
</button>

          </div>
          </Fade>
        </div>
      </div>
    </div>
  );
}

export default Slide;
