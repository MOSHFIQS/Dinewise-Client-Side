import React, { useEffect, useState } from 'react';
import SectionTitle from './../sectionTitle/SectionTitle';
import Cover from './Cover';

const MenuItem = ({ category, Heading, subHeading, coverHeading, coverSubHeading, img, tabName }) => {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BASE_URL}/menu`)
            .then(res => res.json())
            .then(data => {
                const specificItems = data.filter(item => item.category === category);
                setMenu(specificItems);
            });
    }, [category]);

    return (
        <div className="flex flex-col items-center w-full gap-10">
            <Cover
                coverHeading={coverHeading}
                coverSubHeading={coverSubHeading}
                img={img}
                tabName={tabName}
            />

            {(Heading || subHeading) && (
                <SectionTitle Heading={Heading} subHeading={subHeading} />
            )}

            <div className="grid gap-6 w-full sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4">
                {menu.map((item, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded border border-gray-300 overflow-hidden hover:shadow transition-shadow duration-300 flex flex-col sm:flex-row items-start p-4 gap-4 "
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-28 h-28 object-cover rounded-full border-2 border-black hover:scale-105 duration-200"
                        />
                        <div className="flex flex-col justify-between space-y-2">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {item.name}
                                </h3>
                                <p className="text-gray-500 text-sm">{item.recipe}</p>
                            </div>
                            <div className="text-orange-500 font-bold text-lg">
                                ${item.price}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenuItem;
