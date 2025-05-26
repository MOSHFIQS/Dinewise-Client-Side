import React from 'react';

const MenuItem = ({item}) => {
    const {image,price,recipe,name} = item

    return (
        <div className='uppercase flex  gap-5 border p-4 items-center text-gray-600'>
            <img style={{borderRadius:'0 200px 200px 200px'}} src={image} className='w-24 h-24 object-cover' alt="" />
            <div className='space-y-2'>
                <h3 className='font-bold'>{name}-------------</h3>
                <h3>{recipe}</h3>
                <h3>{price}</h3>
            </div>
        </div>
    );
};

export default MenuItem;