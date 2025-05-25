import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Order = () => {
    return (
        <div className="max-w-[90vw] mx-auto p-4 overflow-hidden">
            <div className='text-center w-full flex items-center justify-center flex-col pb-12'>
                <h5 className='text-center text-yellow-500'>---From 11:00am to 10:00pm---</h5>
                <hr className='w-80 border-2 border-gray-300' />
                <h1 className='text-2xl uppercase py-3'>order online</h1>
                <hr className='w-80 border-2 border-gray-300' />
            </div>
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
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/home/slide2.jpg" alt="Slide 2" className="w-full sm:h-auto object-contain h-60   rounded" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/home/slide3.jpg" alt="Slide 3" className="w-full sm:h-auto object-contain h-60   rounded" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/home/slide4.jpg" alt="Slide 4" className="w-full sm:h-auto object-contain h-60   rounded" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/home/slide5.jpg" alt="Slide 5" className="w-full sm:h-auto object-contain h-60   rounded" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Order;
