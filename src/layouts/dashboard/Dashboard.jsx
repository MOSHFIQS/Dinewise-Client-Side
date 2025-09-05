import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../../hooks/useAdmin';
import { FaBars } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(prev => !prev);
    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">

            {/* Topbar (Mobile only) */}
            <div className="lg:hidden flex items-center justify-between bg-gray-800 text-white px-4 py-3 shadow-md z-20">
                <h1 className="text-xl font-bold">Dinewise</h1>
                <button onClick={toggleSidebar}>
                    {isSidebarOpen ? <IoClose size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-screen w-56 bg-gray-900 text-gray-50 uppercase p-4 z-30 transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0 lg:static lg:block`}>

                <h1 className="text-xl font-mono mb-6 mt-4 lg:mt-0">Dinewise<br />Restaurant</h1>

                <ul className="space-y-4 text-lg font-medium">
                    {isAdmin ? (
                        <>
                            <li><NavLink to="/dashboard/cart" onClick={closeSidebar}>Admin Home</NavLink></li>
                            <li><NavLink to="/dashboard/addItems" onClick={closeSidebar}>Add Items</NavLink></li>
                            <li><NavLink to="/dashboard/cart" onClick={closeSidebar}>Manage Items</NavLink></li>
                            <li><NavLink to="/dashboard/myCart" onClick={closeSidebar}>Manage Bookings</NavLink></li>
                            <li><NavLink to="/dashboard/allUsers" onClick={closeSidebar}>All Users</NavLink></li>
                            <li><NavLink to="/dashboard/allPayments" onClick={closeSidebar}>All Payments</NavLink></li>
                        </>
                    ) : (
                        <>
                            <li><NavLink to="/dashboard/cart" onClick={closeSidebar}>User Home</NavLink></li>
                            <li><NavLink to="/dashboard/cart" onClick={closeSidebar}>Reservation</NavLink></li>
                            <li><NavLink to="/dashboard/cart" onClick={closeSidebar}>Payment History</NavLink></li>
                            <li><NavLink to="/dashboard/myCart" onClick={closeSidebar}>My Cart</NavLink></li>
                            <li><NavLink to="/dashboard/cart" onClick={closeSidebar}>Add Review</NavLink></li>
                            <li><NavLink to="/dashboard/cart" onClick={closeSidebar}>My Booking</NavLink></li>
                        </>
                    )}
                </ul>

                <hr className="my-6" />

                <ul className="space-y-4 text-lg font-medium">
                    <li><NavLink to="/" onClick={closeSidebar}>Home</NavLink></li>
                    <li><NavLink to="/dashboard/cart" onClick={closeSidebar}>Menu</NavLink></li>
                    <li><NavLink to="/dashboard/cart" onClick={closeSidebar}>Shop</NavLink></li>
                    <li><NavLink to="/dashboard/cart" onClick={closeSidebar}>Contact</NavLink></li>
                </ul>
            </div>

            {/* Sidebar backdrop (mobile only) */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0  bg-opacity-30 z-20 lg:hidden"
                    onClick={closeSidebar}
                ></div>
            )}

            {/* Main Content */}
            <div className="flex-1 p-4 mt-4 lg:mt-0 z-10">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
