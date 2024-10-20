import { useTranslation } from 'react-i18next';
import car1 from '../assets/nissan.jpg';
import { Link } from 'react-router-dom';
const BookAutoRental: React.FC = () => {
  const {t} = useTranslation();
  return (
    <div
      className="relative min-h-screen bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${car1})` }}
    >
      {" "}
      {/* Add your image URL */}
      <div className="bg-black bg-opacity-50 min-h-screen flex flex-col justify-center items-center">
        <div className="text-center">
          <h3 className=" lg:mt-10  tracking-wider font-lato text-white">
            {t("rentNow")}
          </h3>
          <h2 className="mt-4 lg:mb-8 text-3xl font-extrabold font-lato text-white">
            {t("bookAutoRental")}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 ml-2 mr-2 md:bg-gray-900 md:bg-opacity-75 md:p-4 lg:grid-cols-6 gap-3 lg:gap-6 mt-6 mb-6 lg:bg-gray-900 lg:bg-opacity-75 p-8 rounded-full">
          <select className="select w-full max-w-xs bg-transparent text-white border rounded-full p-3 h-12">
            <option disabled value="">
              {t("chooseCarType")}
            </option>
            <option className="text-black" value="economy">
              {t("economyCars")}
            </option>
            <option className="text-black" value="luxury">
              {t("bookAutoRental")}
            </option>
            {/* <option className="text-black" value="sport">
              Sport Cars
            </option> */}
            <option className="text-black" value="sedan">
              {t("sedan")}
            </option>
          </select>

          <select className="select w-full max-w-xs bg-transparent text-white border rounded-full p-3 h-12">
            <option className="text-black" disabled value="">
              {t("pickupLocation")}
            </option>
            <option className="text-black" value="uttora">
              {t("uttora")}
            </option>
            <option className="text-black" value="mirpur-1">
              {t("mirpur1")}
            </option>
            <option className="text-black" value="saver">
              {t("saver")}
            </option>
            <option className="text-black" value="ajimpur">
              {t("ajimpur")}
            </option>
            <option className="text-black" value="mirpur-2">
              {t("mirpur2")}
            </option>
          </select>

          <input
            id="pickup-date"
            type="date"
            className="block w-full max-w-xs  shadow-sm sm:text-sm bg-transparent text-white rounded-full p-3 h-12"
            // min={todayDate}
          />

          <select className="select w-full max-w-xs bg-transparent text-white border rounded-full p-3 h-12">
            <option disabled value="">
              {t("dropOffLocation")}
            </option>
            <option className="text-black" value="uttora">
              {t("uttora")}
            </option>
            <option className="text-black" value="mirpur-1">
              {t("mirpur1")}
            </option>
            <option className="text-black" value="saver">
              {t("saver")}
            </option>
            <option className="text-black" value="ajimpur">
              {t("ajimpur")}
            </option>
            <option className="text-black" value="mirpur-2">
              {t("mirpur2")}
            </option>
          </select>

          <input
            id="return-date"
            type="date"
            className="block w-full max-w-xs  shadow-sm sm:text-sm bg-transparent text-white rounded-full p-3 h-12"
            // min={todayDate}
          />
          <Link to="/services">
            <input
              id=""
              type="button"
              className="block w-full max-w-xs shadow-sm sm:text-sm bg-gradient-to-r from-[#694ce9] to-[#9d10d4] font-bold  text-white border-none rounded-full p-3 h-12 cursor-pointer"
              value={t("rentNowButton")}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookAutoRental;