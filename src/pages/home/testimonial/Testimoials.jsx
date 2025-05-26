import { useEffect, useState } from 'react';
import SectionTitle from '../../../components/sectionTitle/SectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Rating from 'react-rating';
import { FaStar, FaRegStar, FaQuoteLeft } from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('/reviews.json')
            .then(res => res.json())
            .then(data => setReviews(data));
    }, []);

    return (
        <section className="max-w-[100vw] md:max-w-3xl mx-auto p-4 text-center">
            <SectionTitle
                subHeading="---What Our Clients Say---"
                Heading="TESTIMONIALS"
            />
            <Swiper
                spaceBetween={20}
                pagination={{ clickable: true }}
                navigation={true}
                loop={true}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                modules={[Pagination, Navigation, Autoplay]}
                className="w-full"
                breakpoints={{
                    280: { slidesPerView: 1 },
                }}
            >
                {reviews.map((review, index) => (
                    <SwiperSlide
                        key={index}
                        className="flex flex-col items-center justify-center gap-4 p-8"
                    >
                        <Rating
                            initialRating={review.rating}
                            readonly
                            emptySymbol={<FaRegStar className="text-2xl text-gray-300" />}
                            fullSymbol={<FaStar className="text-2xl text-yellow-500" />}
                            fractions={2}
                        />
                        <FaQuoteLeft className="text-6xl text-center w-full my-6" />
                        <p className="text-gray-700 text-base sm:text-lg italic px-10">
                            {review.details}
                        </p>
                        <h4 className="mt-4 font-bold text-xl text-yellow-600">
                            {review.name}
                        </h4>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Testimonials;
