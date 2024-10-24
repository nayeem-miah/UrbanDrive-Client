import React from "react";
import { FaPhone } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo/logo.png";
import { useTranslation } from "react-i18next";
const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const nabLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-bold hover:underline"
              : "font-bold hover:underline text-primary"
          }
        >
          {t("home")}
        </NavLink>

        <p className="pt-4 text-[#1f1e1e] font-medium">{t("welcome")}</p>
        <h3 className="text-[#1f1e1e] font-medium">
          {t("flexible_rental")}
        </h3>
        <h3 className="text-[#1f1e1e] font-medium">
          {t("seamless_booking")}
        </h3>
        <h2 className="text-[#1f1e1e] font-medium">
          {t("ready_to_drive")}
        </h2>
      </li>

      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-bold hover:underline"
              : "font-bold hover:underline text-primary"
          }
        >
          <h2>{t("about_urban_drive")}</h2>
        </NavLink>
        <h3 className="pt-4 text-[#1f1e1e] font-medium">
          {t("our_mission")}
        </h3>
        <h3 className="text-[#1f1e1e] font-medium">
          {t("discover_standard")}
        </h3>
        <Link
          to="/about"
          className="hover:text-blue-600 text-[#1f1e1e] font-medium hover:underline"
        >
          {t("explore_fleet")}
        </Link>
      </li>

      <li>
        <NavLink
          to="/Services"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-bold hover:underline "
              : "font-bold text-primary  hover:underline"
          }
        >
          {t("services")}
        </NavLink>
        <h3 className="pt-4 text-[#1f1e1e] font-medium">
          {t("premium_rentals")}
        </h3>
        <h3 className="text-[#1f1e1e] font-medium">
          {t("flexible_options")}
        </h3>
        <h3 className="text-[#1f1e1e] font-medium">
          {t("customer_support")}
        </h3>
      </li>

      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-bold hover:underline"
              : "font-bold hover:underline text-primary"
          }
        >
          {t("contact_us")}
        </NavLink>
        <p className=" pt-4 flex text-[#1f1e1e] font-medium items-center gap-1 hover:underline hover:text-blue-600 ">
          <span>
            <FaPhone />
          </span>{" "}
          {t("phone")}
        </p>
        <p className="  flex items-center gap-1 text-[#1f1e1e] font-medium hover:underline hover:text-blue-600 ">
          <span>
            <MdOutlineEmail />
          </span>{" "}
          {t("email")}
        </p>
        <p className="flex items-center gap-1 text-[#1f1e1e] font-medium">
          <span>
            <IoLocationSharp />
          </span>{" "}
          {t("location")}
        </p>
      </li>
    </>
  );

  return (
    <div>
      <div className=" bg-[#eeeded] ">
        <div className="px-4 py-12 mx-auto">
          <div className="md:flex md:-mx-3 md:items-center md:justify-between">
            <h1 className="text-xl font-semibold tracking-tight  md:mx-3 xl:text-2xl ">
              {t("newsletter")}
            </h1>

            <div className="mt-6 md:mx-3 shrink-0 md:mt-0 md:w-auto">
              <Link to={"/register"}>
                <p
                  aria-label="Sign up for newsletter"
                  className="bg-gradient-to-r from-primary to-secondary text-white p-2 rounded-lg mb-6 transition-colors duration-300 hover:bg-black hover:text-white font-medium flex justify-between items-center"
                >
                  <span>{t("sign_in")}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
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

            <p className="mt-4 text-sm text-black font-medium sm:mt-0">
              © UrbanDrive {currentYear}. {t("copyright")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
