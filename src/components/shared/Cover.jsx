import { Parallax } from 'react-parallax';
import { Link } from 'react-router-dom';

const Cover = ({ coverHeading, coverSubHeading, img, tabName }) => {
    return (
        <Parallax
            bgImage={img}
            blur={{ min: -15, max: 15 }}
            strength={300}
            className="w-full h-[600px] flex items-center justify-center"
        >
            
            <div className="w-full px-4 text-center text-white uppercase font-sans">
                
                <div className="max-w-4xl mx-auto bg-black/50 backdrop-blur-xl border border-white/20 rounded p-10 shadow space-y-6 transition-all duration-500 hover:py-20 hover:bg-black/80 hover:scale-x-125 ">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-wider drop-shadow-md ">
                        {coverHeading}
                    </h1>
                    <p className="text-sm md:text-base font-bold text-gray-300 tracking-widest ">
                        {coverSubHeading}
                    </p>
                    <Link
                        to={`/ourShop/?${tabName}`}
                        className="inline-block mt-4 px-6 py-2 text-sm font-semibold tracking-wide border border-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 rounded-full"
                    >
                        Find More
                    </Link>
                </div>
            </div>
        </Parallax>
    );
};

export default Cover;
