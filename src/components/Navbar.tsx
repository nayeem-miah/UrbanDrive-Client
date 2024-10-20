import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { useTranslation } from "react-i18next";
import useRole from "../Hooks/useRole";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { SyncLoader } from "react-spinners";

type Role = "Admin" | "Host" | "User" | "";

const Navbar: React.FC = () => {
  const axiosPublic = useAxiosPublic();
  const [toggle, setToggle] = useState(false);

  const { user, logOut } = useAuth();
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<string>("");
  const [role]: [Role, boolean, boolean] = useRole();

  

  const { data: userData, isLoading, isFetching } = useQuery({
    queryKey: ["userdata", user?.email],
    queryFn: async () => {
      const response = await axiosPublic.get(`/user/${user?.email}`);
      return response.data;
    },
  });

  useEffect(() => {
    const savedLanguage = localStorage.getItem("i18nextLng");
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
      i18n.changeLanguage(savedLanguage);
    } else {
      setCurrentLanguage(i18n.language);
    }
  }, [i18n, currentLanguage]);

  const changeLanguage = (lng: string) => {
    setCurrentLanguage(lng);
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
  };

  const navLinks = [
    { id: "", title: t("home") },
    { id: "services", title: t("services") },
    { id: "about", title: t("about") },
    { id: "membership", title: t("memberships") },
    { id: "contact", title: t("Contact") },
  ];

  if (isLoading || isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SyncLoader color="#593cfb" size={isLoading ? 18 : 10} />
      </div>
    );
  }

  return (
    <nav className={`navbar px-10 fixed top-0 left-0 bg-primary z-50 transition-all duration-300 `}>
      <div className="navbar-start">
        <Link to="/" className="flex-shrink-0">
          <h2 className={`text-2xl font-bold text-center `}>
            Urban<span  className="text-white">Drive</span>
          </h2>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-Merri">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                to={`/${link.id}`}
                className={`text-lg text-white font-medium hover:text-white font-Merri`}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end">
        {/* Language Switcher - Desktop */}
        <div className="hidden lg:flex items-center">
          <button
            className={`font-bold ${
              currentLanguage === "en" 
                ? "text-secondary" 
                :  'text-white'
            }`}
            onClick={() => changeLanguage("en")}
          >
            English
          </button>
          <span className={`ml-2 mr-2 `}>|</span>
          <button
            className={`font-bold mr-3 ${
              currentLanguage === "bn" 
                ? "text-secondary" 
                :  'text-white'
            }`}
            onClick={() => changeLanguage("bn")}
          >
            বাংলা
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:block">
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full border-2 border-white">
                  <img
                    src={userData?.photoURL || user?.photoURL || ""}
                    className="rounded-full w-32 h-32"
                    alt="User avatar"
                  />
                </div>
              </label>
              <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base rounded-box w-52">
                <li><Link to="/update-user">{t("updateUser")}</Link></li>
                <li><Link to="/favorite">{t("Favorite")}</Link></li>
                <li><Link to="/booked">{t("Bookings")}</Link></li>
                <li><Link to="/profile">{t("Profile")}</Link></li>
                <li><Link to="/hostingForm">{t("becomeHost")}</Link></li>
                <li><Link to="/payment-history">{t("payment")}</Link></li>
                {role === "Admin" && (
                  <li><Link to="/dashboard/adminhome">{t("dashboard")}</Link></li>
                )}
                <li className="hover:text-red-600 transition-colors duration-300">
                  <a onClick={logOut}>{t("logout")}</a>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-500 to-navy-700 group-hover:from-teal-500 group-hover:to-navy-700 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-yellow-400 dark:focus:ring-yellow-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Sign Up
              </span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden z-50 relative w-6 h-6"
          onClick={() => setToggle(!toggle)}
        >
          <span className={`absolute h-0.5 w-full bg-current transform transition-all duration-300 ease-in-out ${toggle ? 'rotate-45 top-3' : 'rotate-0 top-1'}`} />
          <span className={`absolute h-0.5 w-full bg-current transform transition-all duration-300 ease-in-out ${toggle ? 'opacity-0 translate-x-3' : 'opacity-100'} top-3`} />
          <span className={`absolute h-0.5 w-full bg-current transform transition-all duration-300 ease-in-out ${toggle ? '-rotate-45 top-3' : 'rotate-0 top-5'}`} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-base-100 z-40 flex flex-col justify-center items-center transition-all duration-500 lg:hidden ${
          toggle ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Language Switcher - Mobile */}
        <div className="flex items-center mb-8">
          <button
            className={`font-bold ${currentLanguage === "en" ? "text-secondary" : "text-gray-800"}`}
            onClick={() => changeLanguage("en")}
          >
            English
          </button>
          <span className="mx-2 text-gray-800">|</span>
          <button
            className={`font-bold ${currentLanguage === "bn" ? "text-secondary" : "text-gray-800"}`}
            onClick={() => changeLanguage("bn")}
          >
            বাংলা
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <ul className="space-y-8 font-Merri text-center">
          {navLinks.map((link, index) => (
            <li
              key={link.id}
              className={`transform transition-all duration-300 ${
                toggle ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Link
                to={`/${link.id}`}
                className="text-4xl font-bold text-gray-800 hover:text-gray-600 transition-colors duration-300"
                onClick={() => setToggle(false)}
              >
                {link.title}
              </Link>
            </li>
          ))}

          {/* Mobile User Menu */}
          {user ? (
            <li className="space-y-4 text-center">
              <div className="avatar mb-4">
                <div className="w-24 rounded-full ring ring-primary">
                  <img src={userData?.photoURL || user?.photoURL || ""} alt="User avatar" />
                </div>
              </div>
              <Link
                to="/profile"
                className="block text-2xl font-bold text-gray-800 hover:text-gray-600"
                onClick={() => setToggle(false)}
              >
                {t("Profile")}
              </Link>
              <Link
                to="/booked"
                className="block text-2xl font-bold text-gray-800 hover:text-gray-600"
                onClick={() => setToggle(false)}
              >
                {t("Bookings")}
              </Link>
              <button
                onClick={() => {
                  logOut();
                  setToggle(false);
                }}
                className="text-2xl font-bold text-red-500 hover:text-red-600 transition-colors duration-300"
              >
                {t("logout")}
              </button>
            </li>
          ) : (
            <li
              className={`transform transition-all duration-300 ${
                toggle ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${navLinks.length * 100}ms` }}
            >
              <Link
                to="/login"
                onClick={() => setToggle(false)}
                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-500 to-navy-700 group-hover:from-teal-500 group-hover:to-navy-700 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-yellow-400 dark:focus:ring-yellow-800"
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Sign Up
                </span>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
