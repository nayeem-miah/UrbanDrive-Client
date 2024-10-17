import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { useTranslation } from "react-i18next";
// import logo from "../assets/urbandrive-high-resolution-logo-transparent.png";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [toggle, setToggle] = useState(false);
  const { user, logOut } = useAuth();
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<string>(""); 

  // Use useEffect to set the language on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("i18nextLng"); 
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage); 
      i18n.changeLanguage(savedLanguage);
    } else {
      setCurrentLanguage(i18n.language);
    }
  }, [i18n, currentLanguage]);

  // Function to change language
  const changeLanguage = (lng: string) => {
    setCurrentLanguage(lng); 
    i18n.changeLanguage(lng); 
    localStorage.setItem("i18nextLng", lng);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

   const navLinks = [
     { id: "", title: t("home") },
     { id: "services", title: t("services") },
     { id: "about", title: t("about") },
     { id: "contact", title: t("Contact") },
   ];

  return (
    <nav
      className={`navbar px-10 drop-shadow-lg fixed top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-primary shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="navbar-start">
        <Link to="/" className="flex-shrink-0">
          <h2 className="text-2xl font-bold text-center">UrbanDrive</h2>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-Merri">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                to={`/${link.id}`}
                className={`text-lg font-bold ${
                  isScrolled ? "text-white" : "text-primary"
                } hover:text-black`}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        {/* Desktop  */}
        <div className="flex items-center">
          <button
            className={`font-bold  ${
              currentLanguage === "en" ? " text-secondary" : "text-white"
            }`}
            onClick={() => changeLanguage("en")}
          >
            English
          </button>
          <span className="ml-2 mr-2">|</span>
          <button
            className={`font-bold mr-3  ${
              currentLanguage === "bn" ? " text-secondary" : "text-white"
            }`}
            onClick={() => changeLanguage("bn")}
          >
            বাংলা
          </button>
        </div>
        <div className="hidden lg:block">
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full border-2 border-white">
                  <img
                    src={user?.photoURL || "/placeholder-avatar.jpg"}
                    alt="User Avatar"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/update-user" className="justify-between">
                    {t("updateUser")}
                  </Link>
                </li>
                <li>
                  <Link to="/hostingForm">{t("becomeHost")}</Link>
                </li>
                <li className="">
                  <Link to="/dashboard/paymentHistory">{t("dashboard")}</Link>
                </li>
                <li className="hover:text-red-600 transition-colors duration-300">
                  <a onClick={logOut}>{t("logout")}</a>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <>
                <button className="" onClick={() => changeLanguage("en")}>
                  English
                </button>
                <span className="ml-2 mr-2">|</span>
                <button className="mr-5" onClick={() => changeLanguage("bn")}>
                  বাংলা
                </button>
              </>
              <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg hover:text-white dark:text-white">
                <span className="w-full bg-gradient-to-r from-[#3d83d3] to-[#a306fd] text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
                  <Link to="/login">Login</Link>
                </span>
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden z-50 relative w-6 h-6"
          onClick={() => setToggle(!toggle)}
        >
          <span
            className={`absolute h-0.5 w-full bg-current transform transition-all duration-300 ease-in-out ${
              toggle ? "rotate-45 top-3" : "rotate-0 top-1"
            }`}
          />
          <span
            className={`absolute h-0.5 w-full bg-current transform transition-all duration-300 ease-in-out ${
              toggle ? "opacity-0 translate-x-3" : "opacity-100"
            } top-3`}
          />
          <span
            className={`absolute h-0.5 w-full bg-current transform transition-all duration-300 ease-in-out ${
              toggle ? "-rotate-45 top-3" : "rotate-0 top-5"
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-base-100 z-40 flex flex-col justify-center items-center transition-all duration-500 lg:hidden ${
          toggle ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <ul className="space-y-8 font-Merri">
          {navLinks.map((link, index) => (
            <li
              key={link.id}
              className={`transform transition-all duration-300 ${
                toggle
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Link
                to={`/${link.id}`}
                className="text-4xl font-bold text-black hover:text-gray-600 transition-colors duration-300"
                onClick={() => setToggle(false)}
              >
                {link.title}
              </Link>
            </li>
          ))}

          {/* Mobile User Actions */}
          {user ? (
            <>
              <li
                className={`transform transition-all duration-300 ${
                  toggle
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${navLinks.length * 100}ms` }}
              >
                <Link
                  to="/update-user"
                  className="text-4xl font-bold text-blue-500 hover:text-blue-600 transition-colors duration-300"
                  onClick={() => setToggle(false)}
                >
                  Update User
                </Link>
              </li>
              <li
                className={`transform transition-all duration-300 ${
                  toggle
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${(navLinks.length + 1) * 100}ms` }}
              >
                <button
                  onClick={() => {
                    logOut();
                    setToggle(false);
                  }}
                  className="text-4xl font-bold text-red-500 hover:text-red-600 transition-colors duration-300"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li
              className={`transform transition-all duration-300 ${
                toggle
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${navLinks.length * 100}ms` }}
            >
              <Link
                to="/login"
                onClick={() => setToggle(false)}
                className="w-full bg-gradient-to-r from-[#3d83d3] to-[#a306fd] text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
