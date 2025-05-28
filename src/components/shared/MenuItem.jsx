import React, { useEffect, useState } from 'react';
import SectionTitle from './../sectionTitle/SectionTitle';
import Cover from './Cover';




const MenuItem = ({ category, Heading, subHeading, coverHeading, coverSubHeading, img, tabName }) => {
    const [menu, setMenu] = useState([])
    useEffect(() => {
        fetch(`${import.meta.env.VITE_BASE_URL}/menu`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const specificItems = data.filter(item => item.category == category)
                setMenu(specificItems)
            })
    }, [])

    return (
        <div className='uppercase flex  gap-5  items-center text-gray-600 flex-col w-full'>
            <Cover coverHeading={coverHeading} coverSubHeading={coverSubHeading} img={img} tabName={tabName}></Cover>
            {
                !(Heading && subHeading) == '' && < SectionTitle Heading={Heading} subHeading={subHeading}></SectionTitle>
            }
            <div className='grid  lg:grid-cols-2 w-full gap-5 '>
                {
                    menu.map((item, idx) => <div key={idx} className='border flex items-center  p-4 gap-4'>
                        <img style={{ borderRadius: '0 200px 200px 200px' }} src={item.image} className='w-24 h-24 object-cover' alt="" />
                        <div className='space-y-2'>
                            <h3 className='font-bold'>{item.name}-------------</h3>
                            <h3>{item.recipe}</h3>
                            <h3>{item.price}</h3>
                        </div>
                    </div>
                    )
                }
            </div>

        </div>
    );
};

export default MenuItem;