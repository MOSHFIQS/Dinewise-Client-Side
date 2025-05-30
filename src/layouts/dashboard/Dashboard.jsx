import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
    return (
        <div className='flex  gap-4 '>
            <div className='w-52 min-h-screen bg-gray-300 p-4 flex flex-col gap-4'>
                <h1 className='text-2xl font-mono mb-4'>Bistro Boss <br />Restaurant</h1>
                <ul className='space-y-4'>
                    <li><NavLink to={'/dahsboard/cart'}>User Home</NavLink></li>

                    <li><NavLink to={'/dahsboard/cart'}>Reservation</NavLink></li>

                    <li><NavLink to={'/dahsboard/cart'}>Payment History</NavLink></li>

                    <li><NavLink to={'/dashboard/myCart'}>my cart</NavLink></li>

                    <li><NavLink to={'/dahsboard/cart'}>Add Review</NavLink></li>

                    <li><NavLink to={'/dahsboard/cart'}>My Booking</NavLink></li>
                    <hr />
                    <li><NavLink to={'/'}>Home</NavLink></li>
                    <li><NavLink to={'/dahsboard/cart'}>Menu</NavLink></li>
                    <li><NavLink to={'/dahsboard/cart'}>Shop</NavLink></li>
                    <li><NavLink to={'/dahsboard/cart'}>Contact</NavLink></li>
                </ul>

            </div>


            <div className='p-4 w-full'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;