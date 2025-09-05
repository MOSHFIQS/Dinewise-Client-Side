
import MenuItem from '../../../components/shared/MenuItem';

const PopularMenu = () => {
    return (
        <section>
            <MenuItem
                category={"offered"}
                coverHeading={'Dinewise'}
                coverSubHeading={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero accusamus laborum deserunt ratione dolor officiis praesentium! Deserunt magni aperiam dolor eius dolore at, nihil iusto ducimus incidunt quibusdam nemo.'}
                subHeading={'hello this is very good'}
                Heading={'wow nice reciepe'}
                img={'/menu/drinks-bg.jpg'}
            >
            </MenuItem>
        </section>
    );
};

export default PopularMenu;