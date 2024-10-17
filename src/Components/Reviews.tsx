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

// Define the shape of a review object
// interface Review {
//   _id: string;
//   image: string;
//   name: string;
//   details: string;
//   rating: number;
// }

const Reviews: React.FC = () => {
  const {t} = useTranslation();
  // const [reviews, setReviews] = useState<Review[]>([]); // Set the type of reviews

  // useEffect(() => {
  //   fetch('https://b9a12-server-side-rafaulgoni.vercel.app/reviews')
  //     .then(res => res.json())
  //     .then((data: Review[]) => { // Explicitly typing the data from API response
  //       setReviews(data);
  //     })
  //     .catch(err => console.error('Error fetching reviews:', err));
  // }, []);

  return (
    <div className="mt-4">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          <h2 className="text-4xl font-bold relative inline-block mt-20 font-Merri">
            {t("reviewTitle")}
          </h2>
          <p className="text-[#88837a] mt-1">C{t("reviewDescription")}</p>
          {/* <div className="ml-2 space-y-1">
            <p className="text-[#fff] font-semibold">Testimonials</p>
            <h1 className="text-4xl text-amber-600 font-bold"></h1>
          </div> */}
        </div>
        <div className="pt-4 pb-4">
          <div className="mt-5">
            <Swiper
              navigation={true}
              loop={true}
              modules={[Navigation]}
              className="mySwiper"
            >
              <SwiperSlide>
                <div className="card md:card-side bg-base-100 border max-w-[900px] mx-auto">
                  <figure className="w-96 mx-auto">
                    <img src={Aayman} alt={"Aayman Alfee"} />
                  </figure>
                  <div className="card-body">
                    <Rating style={{ maxWidth: 180 }} value={5} readOnly />
                    <h2 className="card-title text-3xl">
                      <span className="font-bold">{t("name")}:</span>{" "}
                      {"Aayman Alfee Rahman"}
                    </h2>
                    <p>
                      <span className="font-bold text-primary">
                        {t('clientSay')}:{" "}
                      </span>
                      <br />
                      <span className="text-[#88837a]">
                        {
                          "This is by far the best service I have ever used. The customer support is outstanding, and the product itself is top-notch. I couldn't be happier!"
                        }
                      </span>
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="card md:card-side bg-base-100 border max-w-[900px] mx-auto">
                  <figure className="w-96 mx-auto">
                    <img src={Ruksana} alt={"Roksana Sikder"} />
                  </figure>
                  <div className="card-body">
                    <Rating style={{ maxWidth: 180 }} value={4} readOnly />
                    <h2 className="card-title text-3xl">
                      <span className="font-bold">{t("name")}</span>{" "}
                      {"Roksana Sikder"}
                    </h2>
                    <p>
                      <span className="font-bold text-amber-600">
                        {t('clientSay')}:{" "}
                      </span>
                      <br />
                      <span className="text-[#88837a]">
                        {
                          "UrbanDrive best service I have ever used. The customer support is outstanding, and the product itself is top-notch. I couldn't be happier!"
                        }
                      </span>
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="card md:card-side bg-base-100 border max-w-[900px] mx-auto">
                  <figure className="w-96 mx-auto">
                    <img src={Najmul} alt={"Nazmul Hossain"} />
                  </figure>
                  <div className="card-body">
                    <Rating style={{ maxWidth: 180 }} value={5} readOnly />
                    <h2 className="card-title text-3xl">
                      <span className="font-bold">{t("name")}</span> {"Nazmul Hosan"}
                    </h2>
                    <p>
                      <span className="font-bold text-amber-600">
                        {t('clientSay')}:{" "}
                      </span>
                      <br />
                      <span className="text-[#88837a]">
                        {
                          "UrbanDrive best service I have ever used. The customer support is outstanding, and the product itself is top-notch. I couldn't be happier!"
                        }
                      </span>
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="card md:card-side bg-base-100 border max-w-[900px] mx-auto">
                  <figure className="w-96 mx-auto">
                    <img src={Nayem} alt={"NA YE EM"} />
                  </figure>
                  <div className="card-body">
                    <Rating style={{ maxWidth: 180 }} value={5} readOnly />
                    <h2 className="card-title text-3xl">
                      <span className="font-bold">{t("name")}</span> {"NA YE EM"}
                    </h2>
                    <p>
                      <span className="font-bold text-amber-600">
                        {t('clientSay')}:{" "}
                      </span>
                      <br />
                      <span className="text-[#88837a]">
                        {
                          "UrbanDrive best service I have ever used. The customer support is outstanding, and the product itself is top-notch. I couldn't be happier!"
                        }
                      </span>
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="card md:card-side bg-base-100 border max-w-[900px] mx-auto">
                  <figure className="w-96 mx-auto">
                    <img src={Zihad} alt={"Md Zihad"} />
                  </figure>
                  <div className="card-body">
                    <Rating style={{ maxWidth: 180 }} value={4} readOnly />
                    <h2 className="card-title text-3xl">
                      <span className="font-bold">{t("name")}</span> {"Zihad Hasan"}
                    </h2>
                    <p>
                      <span className="font-bold text-amber-600">
                        {t('clientSay')}:{" "}
                      </span>
                      <br />
                      <span className="text-[#88837a]">
                        {
                          "UrbanDrive best service I have ever used. The customer support is outstanding, and the product itself is top-notch. I couldn't be happier!"
                        }
                      </span>
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              {/* {
                reviews.map(review => (
                  <SwiperSlide key={review._id}>
                    <div className="card md:card-side bg-base-100 border max-w-[900px] mx-auto">
                      <figure className='w-96 sm:w-full'>
                        <img src={review.image} alt={review.name} />
                      </figure>
                      <div className="card-body">
                        <Rating
                          style={{ maxWidth: 180 }}
                          value={review.rating}
                          readOnly
                        />
                        <h2 className="card-title text-3xl"><span className='font-bold'>{t("name")}</span> {review.name}</h2>
                        <p>
                          <span className='font-bold text-amber-600'>One of the best words ever written for me:</span>
                          <br />
                          <span className='text-[#88837a]'>{review.details}</span>
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              } */}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
