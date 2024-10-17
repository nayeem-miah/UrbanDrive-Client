import React, { useEffect, useState } from 'react';
import { MdEmail, MdLocationOn, MdAccessTime } from 'react-icons/md';
import './style.css';
import { useTranslation } from 'react-i18next';

const Contact: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const {t} = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY]);

  const contactInfo = [
    { icon: <MdEmail size={32} />, title: t('contact.email'), content: 'info@urbandrive.com' },
    { icon: <MdLocationOn size={32} />, title: t('contact.address'), content: 'Dhaka, Bangladesh' },
    { icon: <MdAccessTime size={32} />, title: 'Opening Hours', content: 'Mon-Sun: 8 AM - 7 PM' },
  ];

  return (
    <div className="contact">
      <section className="relative">
        <div
          className="background-container h-[60vh] flex items-center justify-center relative overflow-hidden"
          style={{
            // backgroundImage: `url(${slide1})`,
          }}
        >
          <div className="text-center z-10 flex flex-col px-4">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white">
              {t("contact.heading")}
            </h1>
            <p className="text-white mt-4 sm:mt-8 text-sm sm:text-lg">
              {t("contact.description")}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 mt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="rounded-lg p-6 shadow-lg transform hover:scale-105 hover:shadow-xl bg-white hover:bg-primary group"
              >
                <div className="flex flex-col items-center justify-center text-center group-hover:text-[#18181B]">
                  <div className="mb-4 text-primary group-hover:text-[#18181B]">
                    {item.icon}
                  </div>
                  <h2 className="text-lg font-bold mt-2">{item.title}</h2>
                  {item.title === t("contact.email") ? (
                    <a
                      href={`mailto:${item.content}`}
                      className="text-sm hover:text-[#18181B]"
                    >
                      {item.content}
                    </a>
                  ) : (
                    <p className="text-sm">{item.content}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-black mb-8 text-center">
            {t("contact.get_in_touch")}
          </h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder={t("contact.name_placeholder")}
                    className="w-full p-3 border rounded-lg text-black"
                  />
                  <input
                    type="email"
                    placeholder={t("contact.email_placeholder")}
                    className="w-full p-3 border rounded-lg text-black"
                  />
                  <input
                    type="tel"
                    placeholder={t("contact.number_placeholder")}
                    className="w-full p-3 border rounded-lg text-black"
                  />
                  <input
                    type="text"
                    placeholder={t("contact.subject_placeholder")}
                    className="w-full p-3 border rounded-lg text-black"
                  />
                </div>
                <textarea
                  placeholder={t("contact.message_placeholder")}
                  rows={5}
                  className="w-full p-3 mt-4 border rounded-lg text-black"
                ></textarea>
                <button
                  type="submit"
                  className="w-full px-4 py-2 mt-4 bg-gradient-to-r from-[#3d83d3] to-[#a306fd] text-white font-bold rounded hover:bg-blue-600"
                >
                  {t("contact.submit")}
                </button>
              </form>
            </div>

            <div className="w-full md:w-1/2">
              <div className="h-[400px] rounded-2xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14599.241897333992!2d90.41001779011839!3d23.82533761273339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1727014318933!5m2!1sen!2sbd"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
              <div className="mt-2 text-white flex justify-center">
                <p>{t("contact.dhaka_location")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="pt-24 mt-10 sm:py-36 px-4 md:px-16 background-container2"
        style={{
          // backgroundImage: `url(${slide2})`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container mx-auto content">
          <p className="text-primary text-lg text-center mb-2 tracking-wider">
            {t("rentYourCar")}
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-white">
            {t("contact.interested_renting")}
          </h2>
          <p className="mt-4 sm:mt-6 text-center max-w-3xl mx-auto text-base text-gray-500">
            {t("contact.dont_hesitate")}
          </p>

          <div className="flex justify-center mt-8 pb-4 space-x-4">
            <button className="hover:text-primary px-2 hover:bg-white mb-2 overflow-hidden text-base text-white bg-primary rounded-lg font-bold">
              {t("contact.live_chat")}
            </button>

            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-base font-medium text-white rounded-lg group hover:text-white border-2 border-primary">
              <span className="relative px-4 py-2 bg-transparent rounded-md group-hover:bg-primary">
                {t("contact.rent_now")}
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
