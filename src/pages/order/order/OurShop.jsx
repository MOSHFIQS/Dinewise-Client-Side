import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
import Cover from '../../../components/shared/Cover';
import { useEffect, useState } from 'react';
import OrderPanel from '../../../components/shared/OrderPanel';

const OurShop = () => {
    const [menu, setMenu] = useState([]);
    const [category, setCategory] = useState('salad');

    useEffect(() => {
        fetch('menu.json')
            .then(res => res.json())
            .then(allMenu => {
                const specificMenu = allMenu.filter(menuData => menuData.category === category);
                setMenu(specificMenu);
            });
    }, [category]);

    return (
        <div className="w-full">
            <Cover
                coverHeading={'OUR SHOP'}
                coverSubHeading={'would you like to try a dish ?'}
                img={'/shop/banner2.jpg'}
            />

            <Tabs>
                <TabList className="flex gap-4 w-full justify-center py-10 text-2xl font-extrabold">
                    <Tab onClick={() => setCategory('salad')}>SALAD</Tab>
                    <Tab onClick={() => setCategory('pizza')}>PIZZA</Tab>
                    <Tab onClick={() => setCategory('soup')}>SOUP</Tab>
                    <Tab onClick={() => setCategory('dessert')}>DESSERTS</Tab>
                    <Tab onClick={() => setCategory('drinks')}>DRINKS</Tab>
                </TabList>

                <TabPanel>
                    <OrderPanel items={menu}></OrderPanel>
                </TabPanel>
                <TabPanel>
                    <OrderPanel items={menu}></OrderPanel>
                </TabPanel>
                <TabPanel>
                    <OrderPanel items={menu}></OrderPanel>
                </TabPanel>
                <TabPanel>
                    <OrderPanel items={menu}></OrderPanel>
                </TabPanel>
                <TabPanel>
                    <OrderPanel items={menu}></OrderPanel>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default OurShop;
