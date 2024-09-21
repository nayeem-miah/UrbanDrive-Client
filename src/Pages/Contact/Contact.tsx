import React, { useEffect, useState } from 'react';
import slide1 from '../../assets/slides/slide1.jpg';
import { MdEmail, MdLocationOn, MdAccessTime } from 'react-icons/md';

const Contact: React.FC = () => {
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

  const contactInfo = [
    { icon: <MdEmail size={32} />, title: 'Email us', content: 'info@urbandrive.com' },
    { icon: <MdLocationOn size={32} />, title: 'Our address', content: 'Dhaka, Bangladesh' },
    { icon: <MdAccessTime size={32} />, title: 'Opening Hours', content: 'Mon-Sun: 8 AM - 7 PM' },
  ];

  return (
    <div className='contact'>
      <section className='relative'>
        <div
          className="bg-cover bg-center h-[60vh] flex items-center justify-center relative overflow-hidden"
          style={{
            backgroundImage: `url(${slide1})`,
            backgroundPositionY: `${scrollY * 0.5}px`
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="text-center z-10 flex flex-col px-4">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white font-Playfair">
              Contact <span className='text-teal-400'>Us</span>
            </h1>
            <p className="text-white mt-4 sm:mt-8 text-sm sm:text-lg font-Merri font-bold">
              Get in touch with us for any inquiries
            </p>
          </div>
        </div>
        
        <div className='absolute bottom-0 left-0 right-0 transform translate-y-1/2'>
          <div className='container mx-auto px-4'>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6'>
              {contactInfo.map((item, index) => (
                <div 
                  key={index}
                  className={`rounded-lg p-6 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl bg-[#18181B] hover:bg-teal-400 group`}
                >
                  <div className="flex flex-col items-center justify-center text-center group-hover:text-[#18181B]">
                    <div className="mb-4 transition-colors duration-300 text-teal-400 group-hover:text-[#18181B]">
                      {item.icon}
                    </div>
                    <h2 className="text-lg font-bold mt-2">{item.title}</h2>
                    {item.title === 'Email us' ? (
                      <a 
                        href={`mailto:${item.content}`} 
                        className="text-sm  hover:text-[#18181B]"
                      >
                        {item.content}
                      </a>
                    ) : item.title === 'Our address' ? (
                      <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${(item.content)}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sm  hover:text-[#18181B]"
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
        </div>
      </section>
      
      <div className="h-[30vh]"></div>
    </div>
  );
};

export default Contact;
