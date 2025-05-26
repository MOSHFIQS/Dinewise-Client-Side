import { Parallax } from 'react-parallax';

const Cover = ({ heading, subHeading, img }) => {
    return (
        <Parallax
            bgImage={img}
            blur={{ min: -15, max: 15 }}
            strength={-200}
        >

            <div  className='w-full text-center uppercase text-gray-600  font-mono border  lg:py-60 md:py-48 p-4 xl:py-72 '>
                <div className='border max-w-5xl mx-auto p-10 bg-black/60 backdrop-blur-xl text-white'>
                    <h1 className='text-5xl'>{heading}</h1>
                    <p className=''>{subHeading}</p>
                </div>
            </div>
        </Parallax>
    );
};

export default Cover;