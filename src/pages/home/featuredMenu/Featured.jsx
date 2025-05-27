import React from 'react';
import SectionTitle from '../../../components/sectionTitle/SectionTitle';

const Featured = () => {
    return (
        <div
            className="relative featured-item bg-fixed text-white py-16  overflow-hidden"
            style={{
                backgroundImage: "url('/home/featured.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/10 backdrop-blur-sm"></div>

            <div className="relative z-10">
                <SectionTitle subHeading="check it out" Heading="Featured Item" />

                <div className="md:flex justify-center items-center bg-black/70  p-6 text-justify lg:max-w-[80vw] container  mx-auto">
                    <div className="md:w-1/2">
                        <img
                            src="/home/featured.jpg"
                            alt="Featured"
                            className=" shadow-lg"
                        />
                    </div>

                    <div className="md:ml-10 md:w-1/2 mt-6 md:mt-0">
                        <p className="text-sm text-gray-300">Aug 20, 2029</p>
                        <h3 className="uppercase text-xl font-semibold mt-2">Where can I get some?</h3>
                        <p className="mt-4 text-gray-200 leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate expedita hic dolorem, iusto vel suscipit nam excepturi debitis magnam nostrum! Ut eum dignissimos culpa doloremque eligendi consectetur blanditiis laboriosam fugiat ea quia similique quam nisi reprehenderit numquam magnam nemo vitae cupiditate, atque maiores dicta minus pariatur. Perspiciatis nobis vero quas?
                        </p>
                        <button className="btn btn-outline border-0 border-b-4 mt-6 hover:bg-white hover:text-black transition-all duration-300">
                            Order Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;
