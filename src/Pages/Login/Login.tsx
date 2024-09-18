import React from 'react';

const LoginPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div
        className="relative flex flex-col m-6 space-y-8 bg-gray-800 shadow-2xl rounded-2xl md:flex-row md:space-y-0"
      >
        {/* left side */}
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold text-white font-Playfair">Welcome back</span>
          <span className="text-gray-400 mb-8 font-Open font-bold">
            Welcome back! Please enter your details
          </span>
          <div className="py-4">
            <span className="mb-2 text-md text-gray-300">Email</span>
            <input
              type="text"
              className="w-full p-2 bg-gray-700 border border-teal-500 rounded-md placeholder:font-light placeholder:text-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              name="email"
              id="email"
            />
          </div>
          <div className="py-4">
            <span className="mb-2 text-md text-gray-300">Password</span>
            <input
              type="password"
              name="pass"
              id="pass"
              className="w-full p-2 bg-gray-700 border border-teal-500 rounded-md placeholder:font-light placeholder:text-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="flex justify-between w-full py-4 text-gray-300">
            <div className="mr-24">
              <input type="checkbox" name="ch" id="ch" className="mr-2" />
              <span className="text-md">Remember me</span>
            </div>
            <span className="font-bold text-teal-500 hover:text-teal-300 cursor-pointer">Forgot password</span>
          </div>
          <button className="w-full bg-gradient-to-r from-teal-500 to-teal-700 text-white p-2 rounded-lg mb-6 hover:bg-teal-500 hover:from-teal-500 hover:to-teal-500">
            Sign in
          </button>
          <button className="w-full border border-teal-500 text-teal-500 text-md p-2 rounded-lg mb-6 hover:bg-teal-500 hover:text-white">
            Sign in with Google
          </button>
          <div className="text-center text-gray-400">
            Don't have an account? <span className="font-bold text-teal-500 hover:text-teal-300 cursor-pointer">Sign up</span>
          </div>
        </div>
        {/* right side */}
        <div className="relative">
          <img
            src="src/assets/pexels-hamann.jpg"
            alt="img"
            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />
          {/* text on image */}
          <div
            className="absolute hidden bottom-10 right-6 p-6 bg-gray-800 bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block"
          >
            <span className="text-white text-xl">
              Start planning your next trip
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
