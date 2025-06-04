import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useAdmin from '../../hooks/useAdmin';
import Loading from '../../components/Loading';

const Dashboard = () => {
    
    const [isAdmin] = useAdmin()
    // const {admin} = isAdmin
    console.log(isAdmin)
    return (
        <div className='flex  gap-4 '>
            <div className='w-52 min-h-screen bg-gray-300 p-4 flex flex-col gap-4'>
                <h1 className='text-2xl font-mono mb-4'>Bistro Boss <br />Restaurant</h1>
                {
                    isAdmin

                        ?

                        <>
                            <ul className='space-y-4'>
                                <li><NavLink to={'/dashboard/cart'}>Admin Home</NavLink></li>

                                <li><NavLink to={'/dashboard/addItems'}>Add Items</NavLink></li>

                                <li><NavLink to={'/dashboard/cart'}>Manage Items</NavLink></li>

                                <li><NavLink to={'/dashboard/myCart'}>Manage Bookings</NavLink></li>

                                <li><NavLink to={'/dashboard/allUsers'}>All Users</NavLink></li>

                                <li><NavLink to={'/dashboard/cart'}>My Booking</NavLink></li>
                            </ul>
                        </>

                        :

                        <>
                            <ul className='space-y-4'>
                                <li><NavLink to={'/dashboard/cart'}>User Home</NavLink></li>

                                <li><NavLink to={'/dashboard/cart'}>Reservation</NavLink></li>

                                <li><NavLink to={'/dashboard/cart'}>Payment History</NavLink></li>

                                <li><NavLink to={'/dashboard/myCart'}>my cart</NavLink></li>

                                <li><NavLink to={'/dashboard/cart'}>Add Review</NavLink></li>

                                <li><NavLink to={'/dashboard/cart'}>My Booking</NavLink></li>

                            </ul>
                        </>
                }
                <ul className='space-y-4'>
                    <hr />
                    <li><NavLink to={'/'}>Home</NavLink></li>
                    <li><NavLink to={'/dashboard/cart'}>Menu</NavLink></li>
                    <li><NavLink to={'/dashboard/cart'}>Shop</NavLink></li>
                    <li><NavLink to={'/dashboard/cart'}>Contact</NavLink></li>
                </ul>

            </div>


            <div className='p-4 w-full'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;