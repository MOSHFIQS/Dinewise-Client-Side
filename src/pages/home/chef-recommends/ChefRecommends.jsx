import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/sectionTitle/SectionTitle';

const ChefRecommends = () => {
    const [menu, setMenu] = useState([])
    useEffect(() => {
        fetch(`${import.meta.env.VITE_BASE_URL}/menu`)
            .then(res => res.json())
            .then(data => setMenu(data))
    }, [])
    return (
        <div className=' '>
            <SectionTitle subHeading={'---Should Try---'} Heading={'Chef Recommends'}></SectionTitle>
            <div className='grid  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 justify-items-center gap-4'>
                {
                    menu.slice(6,10).map((sMenu, idx) => (
                        <div key={idx} className='text-center border w-full '>
                            <img src={sMenu.image} className='w-full object-cover' alt="" />
                            <div className=' p-2 xl:p-4 space-y-4'>
                                <h3 className='font-extrabold'>{sMenu.name}</h3>
                                <h6 className='text-gray-600'>{sMenu.recipe.slice(0, 60).split('').join('')}</h6>
                                <button className='border border-b-4 btn btn-outline hover:bg-black  hover:border-black'><span className='text-amber-400'>ADD TO CART</span></button>

                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default ChefRecommends;