import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './style.css'
import slide4 from '../assets/slides/slide7.png'
import slide5 from '../assets/slides/slide8.jpg'
import slide6 from '../assets/slides/slide9.jpg'

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
            image={slide4}
            title={t("CarRental")}
            model={"Land Cruiser"}
            price={t("1000")}
          ></Slide>
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={slide5}
            title={t("CarRental")}
            model={"Land Cruiser"}
            price={t("1200")}
          ></Slide>
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={slide6}
            title={t("CarRental")}
            model={"Land Cruiser"}
            price={t("1300")}
          ></Slide>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default Banner
