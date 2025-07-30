import { Helmet } from 'react-helmet-async';
import MenuItem from '../../components/shared/MenuItem';

const Menu = () => {
    return (
        <div className='w-full space-y-14 mb-14 '>
            <Helmet>
                <title>Bistro Boss || Menu</title>
            </Helmet>
            <MenuItem
                img={'/menu/mainBanner.png'}
                Heading={'Todays Offer'}
                subHeading={`---don't miss---`}
                category={'popular'}
                coverHeading={'OurMenu'}
                coverSubHeading={'would you like to try a dish ?'}
                className={'w-full'}
            />
            <MenuItem
                img={'/menu/dessert-bg.jpeg'}
                category={'dessert'}
                tabName={'dessert'}
                coverHeading={'Desserts'}
                coverSubHeading={`Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`}
                className={'w-full'}
            />
            <MenuItem
                img={'/menu/pizza-bg.jpg'}
                category={'pizza'}
                tabName={'pizza'}
                coverHeading={'PIZZA'}
                coverSubHeading={`Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`}
                className={'w-full'}
            />
            <MenuItem
                img={'/public/menu/salad-bg.jpg'}
                category={'salad'}
                tabName={'salad'}
                coverHeading={'SALAD'}
                coverSubHeading={`Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`}
                className={'w-full'}
            />
            <MenuItem
                img={'/public/menu/soup-bg.jpg'}
                category={'soup'}
                tabName={'soup'}
                coverHeading={'SOUP'}
                coverSubHeading={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}
                className={'w-full'}
            />
            <MenuItem
                img={'/public/menu/drinks-bg.jpg'}
                category={'drinks'}
                tabName={'drinks'}
                coverHeading={'DRINKS'}
                coverSubHeading={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}
                className={'w-full'}
            />



        </div>
    );
};

export default Menu;