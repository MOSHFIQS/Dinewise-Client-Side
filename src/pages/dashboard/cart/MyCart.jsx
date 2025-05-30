import React from 'react';
import useCart from '../../../hooks/useCart';
import SectionTitle from '../../../components/sectionTitle/SectionTitle';

const MyCart = () => {
    const [cart] = useCart()
    console.log(cart)

    const totalPrice = cart.reduce((acc,curr) => {
        return acc+curr.price
    },0)

    console.log(totalPrice)
    return (
        <div className={''} >
            <SectionTitle  Heading={'Wanna Add More'} subHeading={'----My cart----'} />
        </div>
    );
};

export default MyCart;