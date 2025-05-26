import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../../components/shared/Cover';
import PopularMenu from '../home/popularMenu/PopularMenu';

const Menu = () => {
    return (
        <div className='w-full space-y-14 mb-14'>
            <Helmet>
                <title>Bistro Boss || Menu</title>
            </Helmet>
            <Cover heading={'Our Menu'} subHeading={'Would you like to try a dish?'} img={'/public/menu/banner3.jpg'}></Cover>
            <PopularMenu />
        </div>
    );
};

export default Menu;