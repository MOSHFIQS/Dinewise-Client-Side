import { Parallax } from 'react-parallax';
import { Link } from 'react-router-dom';

const Cover = ({ coverHeading, coverSubHeading, img, tabName }) => {
    return (
        <Parallax
            bgImage={img}
            blur={{ min: -15, max: 15 }}
            strength={-200}
            className='w-full'
        >

            <div className='w-full text-center uppercase text-gray-600  font-mono border  lg:py-60 md:py-48 p-4 xl:py-72 '>
                <div className='border max-w-5xl mx-auto p-10 bg-black/60 backdrop-blur-xl text-white space-y-4'>
                    <h1 className='text-5xl'>{coverHeading}</h1>
                    <p className=''>{coverSubHeading}</p>
                    <Link to={`/ourShop/?${tabName}`} className='btn  btn-sm border-b-4 hover:bg-black hover:text-white hover:border-black'>Find More</Link>
                </div>
            </div>
        </Parallax>
    );
};

export default Cover;