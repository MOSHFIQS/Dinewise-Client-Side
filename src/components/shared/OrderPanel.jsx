

const OrderPanel = ({items}) => {
    return (
        <div className=" max-w-[85vw] mx-auto grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-4 p-4">
            {items.map((sMenu, idx) => (
                <div key={idx} className="relative text-center border w-full">
                    <img src={sMenu.image} className="w-full h-48 object-cover" alt={sMenu.name} />
                    <h4 className=" p-2 absolute bg-black text-white top-0 right-0">${sMenu.price}</h4>
                    <div className="p-4 space-y-4">
                        <h3 className="font-extrabold text-lg">{sMenu.name}</h3>
                        <p className="text-gray-600 text-sm">{sMenu.recipe.slice(0, 60)}...</p>
                        <button className="border border-b-4 btn btn-outline hover:bg-black hover:border-black">
                            <span className="text-amber-400">ADD TO CART</span>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderPanel;