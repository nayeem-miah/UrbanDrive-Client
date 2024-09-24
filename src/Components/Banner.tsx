import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './style.css'
import slide1 from '../assets/slides/slide1.jpg'
import slide2 from '../assets/slides/slide2.jpg'
import slide3 from '../assets/slides/slide3.jpg'

import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
import Slide from './Slide';

const Banner: React.FC = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={'fade'}
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
          <Slide image={slide1} title='CAR RENTAL' model={'Volkswagen Jetta'} price={100}></Slide>
        </SwiperSlide>
        <SwiperSlide>
          <Slide image={slide2} title='CAR RENTAL' model={'Volkswagen Jetta'} price={100}></Slide>
        </SwiperSlide>
        <SwiperSlide>
          <Slide image={slide3} title='CAR RENTAL' model={'Volkswagen Jetta'} price={100}></Slide>
        </SwiperSlide>
        
      </Swiper>
    </>
  )
}

export default Banner