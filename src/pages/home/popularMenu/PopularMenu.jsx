import SectionTitle from '../../../components/sectionTitle/SectionTitle';
import MenuItem from '../../../components/shared/MenuItem';

const PopularMenu = () => {
    return (
        <seciton>
            <SectionTitle subHeading={'----popular menu----'} Heading={'FROM OUR MENU'}></SectionTitle>
            <MenuItem category={"pizza"}></MenuItem>
        </seciton>
    );
};

export default PopularMenu;