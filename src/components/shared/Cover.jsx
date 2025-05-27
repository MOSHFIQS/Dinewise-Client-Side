import { Parallax } from 'react-parallax';

const Cover = ({ coverHeading, coverSubHeading, img }) => {
    return (
        <Parallax
            bgImage={img}
            blur={{ min: -15, max: 15 }}
            strength={-200}
            className='w-full'
        >

            <div  className='w-full text-center uppercase text-gray-600  font-mono border  lg:py-60 md:py-48 p-4 xl:py-72 '>
                <div className='border max-w-5xl mx-auto p-10 bg-black/60 backdrop-blur-xl text-white'>
                    <h1 className='text-5xl'>{coverHeading}</h1>
                    <p className=''>{coverSubHeading}</p>
                </div>
            </div>
        </Parallax>
    );
};

export default Cover;