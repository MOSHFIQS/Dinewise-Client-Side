import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cover from '../../../components/shared/Cover';
import OrderPanel from '../../../components/shared/OrderPanel';

const OurShop = () => {
    const { search } = useLocation();
    const navigate = useNavigate();

    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks'];
    const filteredSearch = search.slice(1); // Get 'salad', 'pizza', etc.
    const filteredSearchTabIndex = categories.indexOf(filteredSearch);

    const [tabIndex, setTabIndex] = useState(filteredSearchTabIndex >= 0 ? filteredSearchTabIndex : 0);
    const [menu, setMenu] = useState([]);

    // When tabIndex changes, fetch menu items
    useEffect(() => {
        fetch(`${import.meta.env.VITE_BASE_URL}/menu`)
            .then(res => res.json())
            .then(allMenu => {
                const specificMenu = allMenu.filter(item => item.category === categories[tabIndex]);
                setMenu(specificMenu);
            });
    }, [tabIndex]);


    // When the URL changes, update tabIndex
    useEffect(() => {
        if (filteredSearchTabIndex >= 0) {
            setTabIndex(filteredSearchTabIndex);
        }
    }, [filteredSearchTabIndex]);

    // When a tab is clicked, update both tabIndex and URL
    const handleTabSelect = (index) => {
        setTabIndex(index);
        navigate(`?${categories[index]}`);  // this will updating the URL when a tab is selected. but without the navigate it also show the data 
    };

    return (
        <div className="w-full">

            <Cover
                coverHeading={'OUR SHOP'}
                coverSubHeading={'Would you like to try a dish?'}
                img={'/shop/banner2.jpg'}
            />

            <Tabs selectedIndex={tabIndex} onSelect={handleTabSelect}>
                <TabList className="flex gap-2 w-full justify-center flex-wrap  py-10 text-2xl font-extrabold" >
                    <Tab className={'btn btn-ghost'}>SALAD</Tab>
                    <Tab className={'btn btn-ghost'}>PIZZA</Tab>
                    <Tab className={'btn btn-ghost'}>SOUP</Tab>
                    <Tab className={'btn btn-ghost'}>DESSERTS</Tab>
                    <Tab className={'btn btn-ghost'}>DRINKS</Tab>
                </TabList>

                <TabPanel><OrderPanel items={menu} /></TabPanel>
                <TabPanel><OrderPanel items={menu} /></TabPanel>
                <TabPanel><OrderPanel items={menu} /></TabPanel>
                <TabPanel><OrderPanel items={menu} /></TabPanel>
                <TabPanel><OrderPanel items={menu} /></TabPanel>
            </Tabs>
        </div>
    );
};

export default OurShop;
