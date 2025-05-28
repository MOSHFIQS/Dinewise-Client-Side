import React from 'react';
import { FaFacebookF, FaGoogle, FaGithub } from 'react-icons/fa';

const SignUp = () => {
    return (
        <div
            style={{ backgroundImage: `url('/others/authentication.png')` }}
            className="min-h-screen flex items-center justify-center bg-gray-100 w-full bg-cover bg-center"
        >
            <div className="flex w-full flex-row-reverse container bg-transparent border-gray-300 border shadow-lg overflow-hidden">
                {/* Left Side - Illustration */}
                <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8">
                    <img
                        src="/others/authentication2.png" // Adjusted path for Vite/React
                        alt="Illustration"
                        className="max-w-full h-auto"
                    />
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full lg:w-1/2 p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">SignUp</h2>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                                name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="mt-1 w-full p-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                                placeholder="Type here"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1 w-full p-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                                placeholder="Type here"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="mt-1 w-full p-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                                placeholder="Enter your password"
                            />
                        </div>


                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-orange-400 to-orange-300 text-white font-bold rounded-lg hover:from-orange-500 hover:to-orange-400 transition-all"
                        >
                            Sign Up
                        </button>

                        <p className="text-center text-sm text-gray-600">
                            New here?{' '}
                            <a href="#" className="text-orange-500 font-semibold hover:underline">
                                Create a New Account
                            </a>
                        </p>

                        <div className="flex items-center justify-center space-x-4 pt-4">
                            <button className="bg-gray-100 border p-3 rounded-full hover:shadow">
                                <FaFacebookF className="text-gray-600 text-lg" />
                            </button>
                            <button className="bg-gray-100 border p-3 rounded-full hover:shadow">
                                <FaGoogle className="text-gray-600 text-lg" />
                            </button>
                            <button className="bg-gray-100 border p-3 rounded-full hover:shadow">
                                <FaGithub className="text-gray-600 text-lg" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
