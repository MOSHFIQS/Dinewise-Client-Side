import React, { useContext } from 'react';
import { FaFacebookF, FaGithub } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../providers/AuthProvider';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import HandleGoogleLogin from '../../components/shared/HandleGoogleLogin';

const SignUp = () => {
    const { signUpUser } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';

    const onSubmit = (data) => {
        const { name, email, password } = data;
        const userInfo = { name, email, password, type: 'email and password' };

        signUpUser(email, password)
            .then(() => {
                axiosPublic.post('/user', userInfo).then(() => {
                    toast.success('Sign up successful');
                    navigate(from);
                });
            })
            .catch((error) => {
                const errorMessage = error.code.replace('auth/', '');
                toast.error(errorMessage);
            });
    };

    return (
        <div
            style={{ backgroundImage: `url('/others/authentication.jpg')` }}
            className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 relative"
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60 z-0"></div>

            {/* SignUp form container */}
            <div className="relative z-10 w-full max-w-[80vw] bg-black/50 p-8 backdrop-blur-md text-red-400 shadow rounded-md border border-white">
                <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold">
                            Name
                        </label>
                        <input
                            type="text"
                            {...register("name", { required: "Name is required" })}
                            className="w-full px-4 py-2 border text-white rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            placeholder="Your name"
                        />
                        {errors.name && <p className="text-sm text-red-400 mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Email field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold">
                            Email
                        </label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            className="w-full px-4 py-2 border text-white rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            placeholder="you@example.com"
                        />
                        {errors.email && <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold">
                            Password
                        </label>
                        <input
                            type="password"
                            {...register("password", { required: "Password is required" })}
                            className="w-full px-4 py-2 border text-white rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            placeholder="••••••••"
                        />
                        {errors.password && <p className="text-sm text-red-400 mt-1">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 rounded-md font-semibold bg-indigo-600 hover:bg-indigo-700 transition text-white"
                    >
                        Sign Up
                    </button>

                    <p className="text-center text-sm text-white/70 mt-2">
                        Already have an account?{' '}
                        <Link to="/login" className="text-amber-400 font-semibold hover:underline">
                            Login
                        </Link>
                    </p>
                </form>

                <div className="flex justify-center items-center gap-4 pt-6">
                    <button className="p-3 bg-white border rounded-full hover:shadow-md transition cursor-pointer">
                        <FaFacebookF className="text-blue-600 text-lg" />
                    </button>
                    <HandleGoogleLogin />
                    <button className="p-3 bg-white border rounded-full hover:shadow-md transition cursor-pointer">
                        <FaGithub className="text-gray-800 text-lg" />
                    </button>
                </div>
            </div>
        </div>
    );
    }


export default SignUp;
