
import { useEffect } from 'react';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';
import useAuth from './../../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import useCart from '../../hooks/useCart';

const OrderPanel = ({ items }) => {
    const { user } = useAuth()
    // console.log(user)
    const [, refetch] = useCart()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const location = useLocation()

    const handleCart = (orderedMenu) => {
        if (!user) {
           return navigate('/login', { state: { from: location } })
        }
        // console.log(orderedMenu)
        const orderDetails = {
            menuId: orderedMenu._id,
            name: orderedMenu.name,
            email: user?.email,
            recipe: orderedMenu.recipe,
            image: orderedMenu.image,
            price: orderedMenu.price,
            category: orderedMenu.category
        }
        // console.log(orderDetails)
        axiosSecure.post('/cart', orderDetails)
            .then(res => {
                toast.success('order successful')
                 refetch()
            })
            .catch(err => {
                toast.error('something went wrong 😭😭😭')
            })
    }

    
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
                            <span onClick={() => handleCart(sMenu)} className="text-amber-400">ADD TO CART</span>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderPanel;