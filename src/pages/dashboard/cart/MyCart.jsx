import React from 'react';
import useCart from '../../../hooks/useCart';
import SectionTitle from '../../../components/sectionTitle/SectionTitle';
import { RiDeleteBin6Line } from "react-icons/ri";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
const MyCart = () => {
    const axiosSecure = useAxiosSecure()
    const [,refetch] = useCart()

    const [cart] = useCart()
    console.log(cart)
    const totalPrice = cart.reduce((acc, curr) => {
        return acc + curr.price
    }, 0)



    const handleDeleteCart = (id) => {
        console.log(id)
        axiosSecure.delete(`/cart/${id}`)
        .then(res => {
            toast.success('order delete successfully')
            refetch()
        })

    }



    console.log(totalPrice)
    return (
        <div className={'max-w-[75vw] mx-auto '} >
            <SectionTitle Heading={'Wanna Add More'} subHeading={'----My cart----'} />
            <div className='bg-gray-100 p-1'>
                <div className='flex justify-between items-center  p-4  font-extrabold uppercase'>
                    <h4 className=''>total Orders {cart.length}</h4>
                    total Price ${totalPrice}
                    <button className='btn btn-error'>pay</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="table  mt-4">
                        {/* head */}
                        <thead className='bg-gray-300 '>
                            <tr>
                                <th>

                                </th>
                                <th>item image</th>
                                <th>item name</th>
                                <th>price</th>
                                <th>action</th>
                            </tr>
                        </thead>


                        {
                            cart.map((singleCart, idx) => (
                                <tbody className='' key={idx}>
                                    <tr>
                                        <th>
                                            <label>
                                                {idx + 1}
                                            </label>
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={singleCart.image} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">Hart Hagerty</div>
                                                    <div className="text-sm opacity-50">United States</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {singleCart.name}
                                        </td>
                                        <td>${singleCart.price}</td>
                                        <th>
                                            <button onClick={() => handleDeleteCart(singleCart._id)} className="btn btn-error text-white btn-sm" ><RiDeleteBin6Line size={20} /></button>
                                        </th>
                                    </tr>

                                </tbody>
                            ))
                        }




                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyCart;