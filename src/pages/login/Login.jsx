import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaFacebookF, FaGoogle, FaGithub } from 'react-icons/fa';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HandleGoogleLogin from '../../components/shared/HandleGoogleLogin';

const Login = () => {
    const { signInUser } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [captchaInput, setCaptchaInput] = useState('');
    const [disable, setDisable] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location?.state?.from?.pathname || '/';

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const onSubmit = (data) => {
        const { email, password } = data;
        signInUser(email, password)
            .then(() => {
                toast.success('Welcome back! You are now signed in.');
                navigate(from);
            })
            .catch((error) => {
                const errorMessage = error.code.replace("auth/", "");
                toast.error(errorMessage);
            });
    };

    const handleCaptcha = (e) => {
        e.preventDefault();
        if (validateCaptcha(captchaInput)) {
            setDisable(false);
            return toast.success("Captcha validated!");
        } else {
            setDisable(true);
            return toast.error("Incorrect captcha. Please try again.");
        }
    };

    return (
        <div
            style={{ backgroundImage: `url('/others/authentication.jpg')` }}
            className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
        >
            <div className="absolute inset-0 bg-black/60 z-0"></div>
            <div className="relative z-10 w-full max-w-[80vw] bg-black/50 p-8 backdrop-blur-md text-red-400 shadow rounded-md border border-white">
                <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...register("email", { required: true })}
                            className="w-full px-4 py-2 border text-white  rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 "
                            placeholder="you@example.com"
                        />
                        {errors.email && <p className="text-sm text-red-400 mt-1">Email is required</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            {...register("password", { required: true })}
                            className="w-full px-4 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 border-white  text-white "
                            placeholder="••••••••"
                        />
                        {errors.password && <p className="text-sm text-red-400 mt-1">Password is required</p>}
                    </div>

                    {disable && (
                        <div>
                            <LoadCanvasTemplate />
                            <div className="flex gap-3 mt-2">
                                <input
                                    type="text"
                                    onChange={e => setCaptchaInput(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border border-white rounded-md focus:outline-none text-white "
                                    placeholder="Type the characters shown"
                                />
                                <button
                                    onClick={handleCaptcha}
                                    className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 focus:ring-2 focus:ring-amber-300 transition"
                                >
                                    Validate
                                </button>
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={disable}
                        className={`w-full py-2 rounded-md font-semibold transition ${disable
                                ? 'bg-gray-500/70 text-gray-300 cursor-not-allowed'
                                : 'bg-indigo-600 hover:bg-indigo-700'
                            }`}
                    >
                        Sign In
                    </button>

                    <p className="text-center text-sm text-white/70 mt-2">
                        New here?{' '}
                        <Link to={'/signup'} className="text-amber-400 font-semibold hover:underline">
                            Create an Account
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
};

export default Login;
