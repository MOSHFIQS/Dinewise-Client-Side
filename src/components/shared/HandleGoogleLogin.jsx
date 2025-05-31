import React from 'react';
import useAuth from '../../hooks/useAuth';
import { FaGoogle } from 'react-icons/fa';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const HandleGoogleLogin = () => {
    const { googleLogin } = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()

    const handleGoogle = () => {
        googleLogin()
            .then(result => {

                const userInfo = {
                    name: result?.user?.displayName,
                    email: result?.user?.email,
                    type: 'google'
                }
                console.log(userInfo)
                axiosPublic.post('/user', userInfo)
                    .then(res => {
                    })
                    .catch(err => {
                        return toast.error('something went wrong')
                    })
                navigate('/')
                toast.success('user login successfully')
            })
            .catch((error) => {
                const errorMessage = error.code.replace("auth/", ""); // Remove "auth/" prefix
                toast.error(errorMessage)
            })
    }
    return (
        <button className="bg-gray-100 border p-3 rounded-full hover:shadow">
            <FaGoogle onClick={handleGoogle} className="text-gray-600 text-lg" />
        </button>
    );
};

export default HandleGoogleLogin;