import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import '../../styles/main-slide.css'


const Banner = () => {
    return (
        <Carousel
            autoPlay={true}
            className='main-slide text-center'
        >
            <div >
                <img className='mt-[65px] md:mt-0 xl:h-[850px] xl:object-cover   ' src="/home/01.jpg" />

            </div>
            <div >
                <img className='mt-[65px] md:mt-0 xl:h-[850px] xl:object-cover   ' src="/home/02.jpg" />

            </div>
            <div >
                <img className='mt-[65px] md:mt-0 xl:h-[850px] xl:object-cover   ' src="/home/03.png" />

            </div>
            <div >
                <img className='mt-[65px] md:mt-0 xl:h-[850px] xl:object-cover   ' src="/home/04.jpg" />

            </div>
        </Carousel>
    );
};


export default Banner;