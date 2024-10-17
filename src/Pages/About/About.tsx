import React, { useEffect, useState } from "react";
import member1 from "../../assets/About-us/member1.jpg";
import member2 from "../../assets/About-us/member2.jpg";
import member3 from "../../assets/About-us/member3.jpg";

import "./style.css";
import { useTranslation } from "react-i18next";

const AboutUs: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const {t} = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);

  const teamMembers = [
    { name: "John Doe", role: "CEO & Founder", image: member1 },
    { name: "Jane Smith", role: "COO", image: member2 },
    { name: "Mike Johnson", role: "CTO", image: member3 },
  ];

  return (
    <div className="about-us">
      {/* About Us Section */}
      <div className="">
        <div className="background-container flex items-center justify-center overflow-hidden">
          <div className="overlay"></div>
          <div className="text-center content flex flex-col px-4">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white font-Playfair">
              {t("about_us.title")}{" "}
              {/* <span className="text-primary">{t("about_us.title")}</span> */}
            </h1>
            <p className="text-white mt-4 sm:mt-8 text-sm sm:text-lg font-Merri font-bold w-full sm:w-3/4 mx-auto">
              {t("about_us.description")}
            </p>
            <p className="text-white mt-8 sm:mt-16 text-sm sm:text-lg font-Merri font-bold">
              {t("about_us.learn_more")}
            </p>
          </div>
          <div className="absolute bottom-10 transform -translate-x-1/2 left-1/2 h-5">
            <div className="arrow"></div>
          </div>
        </div>
      </div>

      {/* Our Vision Section */}
      <section className="py-12 sm:py-16 px-4 md:px-16">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-black font-Playfair">
            {t("vision.title")}
          </h2>
          <p className="mt-4 sm:mt-6 text-center max-w-3xl mx-auto text-base sm:text-lg text-gray-500 font-Merri">
            {t("vision.description")}
          </p>
        </div>
      </section>

      {/* Our Values Section */}
      <section
        className="py-24 sm:py-36 px-4 md:px-16 background-container"
        style={{ backgroundAttachment: "fixed" }}
      >
        <div className="overlay"></div>
        <div className="container mx-auto content">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-white font-Playfair">
            {t("values.title")}
          </h2>
          <p className="mt-4 sm:mt-6 text-center max-w-3xl mx-auto text-base sm:text-lg text-white font-Merri">
            {t("values.description")}
          </p>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="py-12 sm:py-16 px-4 md:px-16">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-black font-Playfair">
            {t("team.title")}
          </h2>
          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member text-center">
                <img
                  src={member.image}
                  alt={`${member.name}`}
                  className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full object-cover"
                />
                <h3 className="text-lg sm:text-xl font-bold mt-4 text-black">
                  {member.name}
                </h3>
                <p className="text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section
        className="py-12 sm:py-16 px-4 md:px-16 background-container"
        style={{ backgroundAttachment: "fixed" }}
      >
        <div className="overlay"></div>
        <div className="container mx-auto content">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-white font-Playfair">
            {t("story.title")}
          </h2>
          <p className="mt-4 sm:mt-6 max-w-3xl mx-auto text-base sm:text-lg text-center text-white font-Merri">
            {t("story.description")}
          </p>
        </div>
      </section>

      {/* Our Core Values Section */}
      <section className="py-12 sm:py-16 px-4 md:px-16">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-black font-Playfair">
            {t("core_values.title")}
          </h2>
          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {["integrity", "trust", "honesty"].map((value) => (
              <div
                key={value}
                className="value-item text-center border-primary border-2 px-4 py-6 rounded"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-black font-Merri">
                  {t(`core_values.values.${value}`)}
                </h3>
                <p className="mt-2 sm:mt-4 text-gray-500 font-Open">
                  {t("core_values.description", {
                    value: t(`core_values.values.${value}`),
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="border-primary border-2" />

      {/* Get in Touch Section */}
      <section className="py-12 sm:py-16 px-4 md:px-16">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black font-Playfair">
            {t("get_in_touch.title")}
          </h2>
          <p className="mt-4 sm:mt-6 max-w-3xl mx-auto text-base sm:text-lg text-gray-500">
            {t("get_in_touch.description", { email: t("get_in_touch.email") })}
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
