import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import SectionTitle from '../../../components/sectionTitle/SectionTitle';

const Order = () => {
    return (
        <div className="w-full  overflow-hidden">
            <SectionTitle subHeading={'---From 11:00am to 10:00pm---'} Heading={'order online'}> </SectionTitle>
            <Swiper
                spaceBetween={20}
                pagination={{ clickable: true }}
                modules={[Pagination]}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                className="w-full"
                breakpoints={{
                    280: { slidesPerView: 2 },
                    480: { slidesPerView: 3 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                    1280: { slidesPerView: 5 },
                }}
            >
                <SwiperSlide>
                    <img src="/home/slide1.jpg" alt="Slide 1" className="w-full sm:h-auto object-contain h-60   rounded" />
                    <h3 className="text-4xl uppercase text-center -mt-16 text-white">Salads</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/home/slide4.jpg" alt="Slide 2" className="w-full sm:h-auto object-contain h-60   rounded" />
                     <h3 className="text-4xl uppercase text-center -mt-16 text-white">Salads</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/home/slide3.jpg" alt="Slide 3" className="w-full sm:h-auto object-contain h-60   rounded" />
                     <h3 className="text-4xl uppercase text-center -mt-16 text-white">Salads</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/home/slide4.jpg" alt="Slide 4" className="w-full sm:h-auto object-contain h-60   rounded" />
                     <h3 className="text-4xl uppercase text-center -mt-16 text-white">Salads</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/home/slide5.jpg" alt="Slide 5" className="w-full sm:h-auto object-contain h-60   rounded" />
                     <h3 className="text-4xl uppercase text-center -mt-16 text-white">Salads</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/home/slide2.jpg" alt="Slide 5" className="w-full sm:h-auto object-contain h-60   rounded" />
                     <h3 className="text-4xl uppercase text-center -mt-16 text-white">Salads</h3>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Order;
