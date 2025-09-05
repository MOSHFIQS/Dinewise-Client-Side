import { Helmet } from 'react-helmet-async';
import MenuItem from '../../components/shared/MenuItem';

const Menu = () => {
    return (
        <div className='w-full space-y-14 mb-14 '>
            <Helmet>
                <title>Dinewise || Menu</title>
            </Helmet>
            <MenuItem
                img={'/menu/mainBanner.png'}
                Heading={'Todays Offer'}
                subHeading={`---don't miss---`}
                category={'popular'}
                coverHeading={'Our Menu'}
                coverSubHeading={'Discover today’s special offers, crafted fresh with love and packed with irresistible flavor just for you to enjoy.'}
                className={'w-full'}
            />
            <MenuItem
                img={'/menu/dessert-bg.jpeg'}
                category={'dessert'}
                tabName={'dessert'}
                coverHeading={'Desserts'}
                coverSubHeading={`Treat yourself to our delicious desserts, made with rich ingredients to satisfy every sweet craving you have today.`}
                className={'w-full'}
            />
            <MenuItem
                img={'/menu/pizza-bg.jpg'}
                category={'pizza'}
                tabName={'pizza'}
                coverHeading={'PIZZA'}
                coverSubHeading={`Enjoy our mouthwatering pizzas topped with premium ingredients, baked to perfection in a traditional stone-fired oven.`}
                className={'w-full'}
            />
            <MenuItem
                img={'/public/menu/salad-bg.jpg'}
                category={'salad'}
                tabName={'salad'}
                coverHeading={'SALAD'}
                coverSubHeading={`Refresh your senses with our healthy, vibrant salads made from the freshest greens and seasonal vegetables every day.`}
                className={'w-full'}
            />
            <MenuItem
                img={'/public/menu/soup-bg.jpg'}
                category={'soup'}
                tabName={'soup'}
                coverHeading={'SOUP'}
                coverSubHeading={`Savor the warmth and comfort of our flavorful soups, slow-cooked to bring out rich, authentic taste in every bowl.`}
                className={'w-full'}
            />
            <MenuItem
                img={'/public/menu/drinks-bg.jpg'}
                category={'drinks'}
                tabName={'drinks'}
                coverHeading={'DRINKS'}
                coverSubHeading={`Quench your thirst with our refreshing selection of drinks, from icy coolers to handcrafted specialty beverages and more.`}
                className={'w-full'}
            />
        </div>
    );
};

export default Menu;
