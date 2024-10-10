import React from "react";
import { FaPhone } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import logo from '../assets/logo/logo.png'
const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    const nabLinks = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "text-[#3a37e4]  font-bold hover:underline" : "font-bold hover:underline text-[#3a37e4]"
                    }
                >
                    Home
                </NavLink>

                <p className="pt-4 text-[#1f1e1e] font-medium">Welcome to UrbanDrive.</p>
                <h3 className="text-[#1f1e1e] font-medium">Flexible Rental Plans.</h3>
                <h3 className="text-[#1f1e1e] font-medium">Seamless Booking Process.</h3>
                <h2 className="text-[#1f1e1e] font-medium">Ready to Drive in Style?</h2>
            </li>

            <li>
                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        isActive ? "text-[#3a37e4] font-bold hover:underline" : "font-bold hover:underline text-[#3a37e4]"
                    }
                >
                    <h2>About UrbanDrive</h2>
                </NavLink>
                <h3 className="pt-4 text-[#1f1e1e] font-medium">Our Mission UrbanDrive.</h3>
                <h3 className="text-[#1f1e1e] font-medium">Discover a new standard in car rentals with UrbanDrive. </h3>
                <Link to='/about' className="hover:text-blue-600 text-[#1f1e1e] font-medium hover:underline">Explore Our Fleet.</Link>
            </li>


            <li>
                <NavLink
                    to="/Services"
                    className={({ isActive }) =>
                        isActive ? "text-[#3a37e4] font-bold hover:underline " : "font-bold text-[#3a37e4]  hover:underline"
                    }
                >
                    Services
                </NavLink>
                <h3 className="pt-4 text-[#1f1e1e] font-medium">Premium Car Rentals.</h3>
                <h3 className="text-[#1f1e1e] font-medium">Flexible Rental Options.</h3>
                <h3 className="text-[#1f1e1e] font-medium">24/7 Customer Support.</h3>
            </li>
            <li>
                <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                        isActive ? "text-[#3a37e4] font-bold hover:underline" : "font-bold hover:underline text-[#3a37e4]"
                    }
                >
                    Contact us
                </NavLink>
                <p className=" pt-4 flex text-[#1f1e1e] font-medium items-center gap-1 hover:underline hover:text-blue-600 "><span><FaPhone /></span> +8801849317388

                </p>
                <p className="  flex items-center gap-1 text-[#1f1e1e] font-medium hover:underline hover:text-blue-600 "><span><MdOutlineEmail /></span>  info@urbandrive.com</p>
                <p className="flex items-center gap-1 text-[#1f1e1e] font-medium"><span><IoLocationSharp /></span> Dhaka,Bangladesh.</p>
            </li>
        </>
    )
    return (
      <div>
        <div className=" bg-[#eeeded] ">
          <div className="px-4 py-12 mx-auto">
            <div className="md:flex md:-mx-3 md:items-center md:justify-between">
              <h1 className="text-xl font-semibold tracking-tight  md:mx-3 xl:text-2xl ">
                Subscribe to our newsletter to get updates.
              </h1>

              <div className="mt-6 md:mx-3 shrink-0 md:mt-0 md:w-auto">
                <Link to={"/register"}>
                  <p
                    aria-label="Sign up for newsletter"
                    className="bg-gradient-to-r from-[#3d83d3] to-[#a306fd] text-white p-2 rounded-lg mb-6 transition-colors duration-300 hover:bg-black hover:text-white font-medium flex justify-between items-center"
                  >
                    <span>Sign in Now</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </p>
                </Link>
              </div>
            </div>

            <hr className="my-6  border-[#817c7c]  md:my-10 dark:border-gray-700" />

            <div
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
                     text-white list-none"
            >
              {nabLinks}
            </div>

            <hr className="my-6 border-[#817c7c] md:my-10 dark:border-gray-700" />

            <div className="flex flex-col items-center justify-between sm:flex-row text-white">
              <p aria-label="UrbanDrive" className="flex">
                <img
                  className="w-28 h-20 rounded-md"
                  loading="lazy"
                  src={logo}
                  alt="UrbanDrive"
                />
              </p>

              <p className="mt-4 text-sm text-[#1f1e1e] font-medium sm:mt-0 dark:text-gray-300">
                © UrbanDrive {currentYear}. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Footer;
