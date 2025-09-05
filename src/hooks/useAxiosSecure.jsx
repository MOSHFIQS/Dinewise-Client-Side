import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

// Use environment variable for flexibility
const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOutUser } = useAuth();
    const interceptorSet = useRef(false); // Prevents multiple interceptor attachments

    useEffect(() => {
        if (!interceptorSet.current) {
            // Request interceptor to add auth token
            axiosSecure.interceptors.request.use(
                (config) => {
                    const token = localStorage.getItem('access-token');
                    if (token) {
                        config.headers.Authorization = `Bearer ${token}`;
                    }
                    return config;
                },
                (err) => Promise.reject(err)
            );

            // Response interceptor to handle 401/403
            axiosSecure.interceptors.response.use(
                (res) => res,
                async (err) => {
                    const status = err?.response?.status;
                    if (status === 401 || status === 403) {
                        await logOutUser();
                        navigate('/login');
                    }
                    return Promise.reject(err);
                }
            );

            interceptorSet.current = true;
        }
    }, [navigate, logOutUser]);

    return axiosSecure;
};

export default useAxiosSecure;
