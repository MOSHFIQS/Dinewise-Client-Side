import axios from 'axios';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000' // Corrected baseURL (capital L)
});

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;
