import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

// Define the shape of a review object
interface Review {
  _id: string;
  image: string;
  name: string;
  details: string;
  rating: number;
}

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]); // Set the type of reviews

  useEffect(() => {
    fetch('https://b9a12-server-side-rafaulgoni.vercel.app/reviews')
      .then(res => res.json())
      .then((data: Review[]) => { // Explicitly typing the data from API response
        setReviews(data);
      })
      .catch(err => console.error('Error fetching reviews:', err));
  }, []);

  return (
    <div className='bg-[#111010] mt-10'>
      <div className="container mx-auto pt-16">
        <div className='border-l-4 border-amber-600 pb-2'>
          <div className='ml-2 space-y-1'>
            <p className='text-[#fff] font-semibold'>Testimonials</p>
            <h1 className='text-4xl text-amber-600 font-bold'>What Clients Say</h1>
            <p className='max-w-[600px] text-[#88837a]'>
              Client reviews drive UrbanDrive to deliver better and more efficient service.
            </p>
          </div>
        </div>
        <div className="pt-4 pb-4">
          <div className='mt-5'>
            <Swiper navigation={true} loop={true} modules={[Navigation]} className="mySwiper">
              {
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
                        <h2 className="card-title text-3xl"><span className='font-bold'>Name:</span> {review.name}</h2>
                        <p>
                          <span className='font-bold text-amber-600'>One of the best words ever written for me:</span>
                          <br />
                          <span className='text-black'>{review.details}</span>
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              }
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
