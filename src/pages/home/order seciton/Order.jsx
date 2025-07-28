import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import SectionTitle from '../../../components/sectionTitle/SectionTitle';

const categories = [
    { img: '/home/slide1.jpg', title: 'Salads' },
    { img: '/home/slide2.jpg', title: 'Soups' },
    { img: '/home/slide3.jpg', title: 'Pizzas' },
    { img: '/home/slide4.jpg', title: 'Desserts' },
    { img: '/home/slide5.jpg', title: 'Drinks' },
    { img: '/home/slide4.jpg', title: 'Specials' },
];

const Order = () => {
    return (
        <div className="w-full overflow-hidden py-10">
            <SectionTitle
                subHeading="--- From 11:00am to 10:00pm ---"
                Heading="Order Online"
            />
            <Swiper
                spaceBetween={20}
                pagination={{ clickable: true }}
                modules={[ Autoplay]}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                className="w-full"
                breakpoints={{
                    280: { slidesPerView: 1 },
                    480: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                    1280: { slidesPerView: 5 },
                }}
            >
                {categories.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative group">
                            <img
                                src={item.img}
                                alt={item.title}
                                className="w-full h-60 sm:h-72 md:h-80 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute bottom-0 w-full bg-black bg-opacity-60 py-4 transition-transform duration-300 group-hover:scale-105">
                                <h3 className="text-white text-xl md:text-2xl font-bold uppercase text-center tracking-wide">
                                    {item.title}
                                </h3>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Order;
