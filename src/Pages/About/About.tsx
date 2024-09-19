import React, { useEffect, useState } from 'react';
import slide1 from '../../assets/slides/slide1.jpg';
import slide2 from '../../assets/slides/slide2.jpg';
import slide3 from '../../assets/slides/slide3.jpg';
import member1 from '../../assets/About-us/member1.jpg';
import member2 from '../../assets/About-us/member2.jpg';
import member3 from '../../assets/About-us/member3.jpg';

import './style.css'

const AboutUs: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const teamMembers = [
    { name: "John Doe", role: "CEO & Founder", image: member1 },
    { name: "Jane Smith", role: "COO", image: member2 },
    { name: "Mike Johnson", role: "CTO", image: member3 },
  ];

  return (
    <div className="about-us">
      <section 
        className="bg-cover bg-center h-screen flex items-center justify-center relative overflow-hidden"
        style={{ 
          backgroundImage: `url(${slide1})`,
          backgroundPositionY: `${scrollY * 0.5}px`
        }}
      >
        <div className="absolute inset-0 bg-black opacity-25"></div>
        <div className="text-center z-10 flex flex-col px-4">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white font-Playfair">About <span className='text-teal-400'>Us</span></h1>
          <p className='text-white mt-4 sm:mt-8 text-sm sm:text-lg font-Merri font-bold w-full sm:w-3/4 mx-auto'>Our mission is to be the leading car rental provider,
          delivering exceptional service, prioritizing safety, and offering unparalleled convenience to our customers, making every journey a memorable one.</p>
          <p className="text-white mt-8 sm:mt-16 text-sm sm:text-lg font-Merri font-bold">Learn more about our journey and values.</p>
        </div>
        <div className="field absolute bottom-10 transform -translate-x-1/2 left-1/2 h-5">
          <div className="arrow"></div>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 md:px-16 bg-[#111010]">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-white font-Playfair">Our <span className='text-teal-400'>Vision</span></h2>
          <p className="mt-4 sm:mt-6 text-center max-w-3xl mx-auto text-base sm:text-lg text-gray-300 font-Merri">
          To become the leading car rental company known for quality, innovation, and commitment to our customers and community.
          </p>
        </div>
      </section>

      <section 
        className="py-24 sm:py-36 px-4 md:px-16 relative bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${slide2})`,
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-white font-Playfair">Our <span className='text-teal-400'>Values</span></h2>
          <p className="mt-4 sm:mt-6 text-center max-w-3xl mx-auto text-base sm:text-lg text-white font-Merri">
            To provide exceptional car rental services that exceed customer expectations, ensuring convenience, reliability, and satisfaction in every journey.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 md:px-16 bg-[#111010]">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-white font-Playfair">Meet Our <span className='text-teal-400'>Team</span></h2>
          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member text-center">
                <img src={member.image} alt={`${member.name}`} className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full object-cover" />
                <h3 className="text-lg sm:text-xl font-bold mt-4 text-white">{member.name}</h3>
                <p className="text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section 
        className="py-12 sm:py-16 px-4 md:px-16 relative bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${slide3})`,
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-white font-Playfair">Our Story</h2>
          <p className="mt-4 sm:mt-6 max-w-3xl mx-auto text-base sm:text-lg text-center text-white font-Merri">
            Founded in 2024, UrbanDrive has quickly grown to become a trusted name in car rentals, known for our dedication to customer service and high-quality vehicles.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 md:px-16 bg-[#111010]">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-white font-Playfair">Our Core <span className='text-teal-400'>Values</span></h2>
          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {['Integrity', 'Trust', 'Honesty'].map((value) => (
              <div key={value} className="value-item text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-white font-Merri">{value}</h3>
                <p className="mt-2 sm:mt-4 text-gray-400 font-Open">We act with {value.toLowerCase()} in all that we do.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <hr className='border-teal-500 border-2' />

      <section className="py-12 sm:py-16 px-4 md:px-16 bg-[#111010]">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white font-Playfair">Get in Touch</h2>
          <p className="mt-4 sm:mt-6 max-w-3xl mx-auto text-base sm:text-lg text-gray-300">
            Have questions? Reach out to us at <a href="mailto:info@urbandrive.com" className="text-teal-400 hover:text-teal-300">info@urbandrive.com</a>.
          </p>
        </div>
      </section>
    </div>
  );    
};

export default AboutUs;