import React from 'react';
import { Link } from 'react-router-dom';
import errorpage from '../assets/errorpage.jpg'

const ErrorPage: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen text-center overflow-hidden">
      {/* 404 Image (Centering the Image) */}
      <div className="relative">
        <img
          src={errorpage} 
          alt="404"
          className="max-w-full w-[300px] md:w-[800px] lg:w-[900px]" // Responsive image sizing
        />
      </div>

      <div className="absolute top-[75%] md:top-[76%] lg:top-[80%] xl:top-[90%] 2xl:top-[90%] transform -translate-y-1/2 text-gray-600 z-20">
        <Link to="/">
          <button className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-3xl hover:bg-purple-700 focus:outline-none">
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
