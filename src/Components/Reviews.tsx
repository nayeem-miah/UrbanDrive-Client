import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
// import { useEffect, useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import Aayman from '../assets/revi/aayman.jpg'
import Ruksana from '../assets/revi/juksana.jpg'
import Najmul from '../assets/revi/nasmul.jpg'
import Nayem from '../assets/revi/nayem.jpg'
import Zihad from '../assets/revi/zahid.jpg'
import { useTranslation } from 'react-i18next';



const Reviews: React.FC = () => {
  const { t } = useTranslation();
 

  return (
    <div className="bg-background py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary font-Merri mb-2">
            {t("reviewTitle")}
          </h2>
          <p className="text-text">{t("reviewDescription")}</p>
        </div>
        <Swiper
          navigation={true}
          loop={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {[
            { img: Aayman, name: "Aayman Alfee Rahman", rating: 5 },
            { img: Ruksana, name: "Roksana Sikder", rating: 4 },
            { img: Najmul, name: "Nazmul Hosan", rating: 5 },
            { img: Nayem, name: "NA YE EM", rating: 5 },
            { img: Zihad, name: "Zihad Hasan", rating: 4 },
          ].map((review, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img src={review.img} alt={review.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="md:w-2/3 p-8">
                    <Rating style={{ maxWidth: 120 }} value={review.rating} readOnly className="mb-4" />
                    <h2 className="text-2xl font-bold text-primary mb-2">{review.name}</h2>
                    <p className="text-text mb-4">
                      <span className="font-semibold text-secondary">{t('clientSay')}:</span>
                    </p>
                    <p className="text-text italic">
                      "UrbanDrive is the best service I have ever used. The customer support is outstanding, and the product itself is top-notch. I couldn't be happier!"
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Reviews;
