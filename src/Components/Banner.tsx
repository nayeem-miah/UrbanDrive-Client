import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './style.css'
import slide1 from '../assets/slides/zenigame-photo-oa-Z9-WEVW7g8-unsplash.png'
import slide2 from '../assets/slides/pavel-anoshin-7-NLF1j-VQTi-I-unsplash (1).png'
import slide3 from '../assets/slides/matt-henry-1n-Vbpp-FJl-s-unsplash.png'

import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
import Slide from './Slide';
import { useTranslation } from 'react-i18next';

const Banner: React.FC = () => {
  const {t} = useTranslation();
  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Slide
            image={slide1}
            title={t("CarRental")}
            model={"Land Cruiser"}
            price={t("1000")}
          ></Slide>
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={slide2}
            title={t("CarRental")}
            model={"Land Cruiser"}
            price={t("1000")}
          ></Slide>
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={slide3}
            title={t("CarRental")}
            model={"Land Cruiser"}
            price={t("1000")}
          ></Slide>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default Banner