import React, { useEffect, useState } from 'react';




const MenuItem = ({category}) => {
    const [menu, setMenu] = useState([])
    useEffect(() => {
        fetch('menu.json')
            .then(res => res.json())
            .then(data => {
                const popularItems = data.filter(item => item.category == category)
                setMenu(popularItems)
            })
    }, [])

    return (
        <div className='uppercase flex  gap-5 border p-4 items-center text-gray-600'>
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