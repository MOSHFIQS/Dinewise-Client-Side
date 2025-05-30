import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaFacebookF, FaGoogle, FaGithub } from 'react-icons/fa';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';





const Login = () => {
    const { signInUser } = useContext(AuthContext)
    const { register, handleSubmit, watch, formState: { errors }, } = useForm()
    const [captchaInput, setCaptchaInput] = useState('')
    const [disable,setDisable] = useState(true)
    const location = useLocation()
    const navigate = useNavigate()
    console.log(location?.state?.from?.pathname)
    const from = location?.state?.from?.pathname || '/'

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])


    const onSubmit = (data) => {
        // console.log(data)
        const { email, password } = data
        console.log( email, password)
        signInUser(email, password)
            .then(result => {
                toast.success('signIn successful')
                navigate(from)
            }).catch((error) => {
                const errorMessage = error.code.replace("auth/", ""); // Remove "auth/" prefix
                toast.error(errorMessage)
            })

    }

    const handleCaptcha = (e) => {
        e.preventDefault(); // Prevent page reload when clicking the button

        if (validateCaptcha(captchaInput)) {
            setDisable(false); // Enable the login button
            return toast.success("Captcha validated successfully!");
        } else {
            setDisable(true); // Keep the login button disabled
            return toast.error("Captcha validation failed. Please try again.");
        }
    };
      




    return (
        <div
            style={{ backgroundImage: `url('/others/authentication.png')` }}
            className="min-h-screen flex items-center justify-center bg-gray-100 w-full bg-cover bg-center"
        >
            <div className="flex w-full container bg-transparent border-gray-300 border shadow-lg overflow-hidden">
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
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Login</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                {...register("email", { required: true })}
                                className="input w-full focus:outline-none"
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
                                {...register("password", { required: true })}
                                className="input w-full focus:outline-none"
                                placeholder="Enter your password"
                            />
                        </div>

                       {
                        disable && 
                            <div>
                                <div >
                                    <LoadCanvasTemplate />
                                </div>
                                <div className='flex gap-4'>
                                    <input
                                        type="text"
                                        id="captcha"
                                        required

                                        onChange={e => setCaptchaInput(e.target.value)}
                                        className="input focus:outline-none w-full"
                                        placeholder="Type here"
                                    />
                                    <button onClick={handleCaptcha} className='btn btn-error text-white  '>validate captcha</button>
                                </div>
                            </div>
                       }

                        <button
                            type="submit"
                             disabled={disable}
                            className="btn  w-full bg-white">
                            Sign In
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

export default Login;
