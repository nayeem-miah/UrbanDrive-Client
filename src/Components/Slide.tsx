import React from "react";
import { Fade } from "react-awesome-reveal";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
interface SlideProps {
  image: string;
  title: string;
  model: string;
  price: string;
}

const Slide: React.FC<SlideProps> = ({ image, title, model, price }) => {
  const {t} = useTranslation();
  return (
    <div
      className="relative mt-10 w-full bg-center bg-cover h-[38rem]"
      style={{
        backgroundImage: `url(${image})`,
      }}
      aria-label={title}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-60"></div>

      <div className="relative z-10 flex justify-center items-center md:items-start lg:justify-start h-full p-8 md:p-16 lg:p-40">
        <div className="text-left">
          <h1 className="text-5xl font-bold font-Playfair text-white md:text-7xl mb-4">
            {title}
          </h1>

          <Fade direction="down" cascade>
            <p className="mt-4 text-2xl text-white font-Open mb-6">
              {model} 
              <span className="bg-primary rounded-lg px-2 ml-2">
                ৳{price}
              </span>
              <span className="text-sm ml-2">/ {t("day")}</span>
            </p>

            <div className="flex mt-8 space-x-4">
              <Link to="/cars" className="group">
                <button className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden text-lg text-white bg-primary rounded-lg font-bold transition duration-300 ease-in-out transform group-hover:scale-105 group-hover:bg-white group-hover:text-primary">
                  {t("view_details")}
                </button>
              </Link>

              <Link to="/services" className="group">
                <button className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden text-lg text-primary bg-white rounded-lg font-bold transition duration-300 ease-in-out transform group-hover:scale-105 group-hover:bg-primary group-hover:text-white border-2 border-primary">
                  {t("browse_cars")}
                </button>
              </Link>
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
};

export default Slide;
