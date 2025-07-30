import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import '../../styles/main-slide.css'


const Banner = () => {
    return (
        <Carousel
            autoPlay={true}
            className='main-slide text-center '
        >
            <div >
                <img className='mt-[65px] md:mt-0 xl:h-[850px] xl:object-cover    ' src="/home/banner1.png" />

            </div>
            <div >
                <img className='mt-[65px] md:mt-0 xl:h-[850px] xl:object-cover    ' src="/home/banner2.png" />

            </div>
            <div >
                <img className='mt-[65px] md:mt-0 xl:h-[850px] xl:object-cover    ' src="/home/banner3.png" />

            </div>
            <div >
                <img className='mt-[65px] md:mt-0 xl:h-[850px] xl:object-cover    ' src="/home/banner4.png" />

            </div>
            <div >
                <img className='mt-[65px] md:mt-0 xl:h-[850px] xl:object-cover    ' src="/home/banner5.png" />

            </div>
            <div >
                <img className='mt-[65px] md:mt-0 xl:h-[850px] xl:object-cover    ' src="/home/banner6.png" />

            </div>
        </Carousel>
    );
};


export default Banner;