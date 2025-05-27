import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/sectionTitle/SectionTitle';
import MenuItem from '../../../components/shared/MenuItem';

const PopularMenu = () => {
    const [menu, setMenu] = useState([])
    useEffect(() => {
        fetch('menu.json')
        .then(res => res.json())
        .then(data => {
            const popularItems = data.filter(item => item.category == "popular")
            setMenu(popularItems)
        })
    }, [])
    return (
        <seciton>
            <SectionTitle subHeading={'----popular menu----'} Heading={'FROM OUR MENU'}></SectionTitle>
            <div className='grid  lg:grid-cols-2 w-full gap-5 '>
                {
                    menu.map((item,idx) => <MenuItem key={idx} item={item}/>)
                }
            </div>
        </seciton>
    );
};

export default PopularMenu;