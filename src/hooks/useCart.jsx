import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query'

const useCart = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const { refetch, isPending, error, data: cart = [] } = useQuery({
        queryKey: ['cart',user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/cart?email=${user?.email}`)
            return res.data
        }
    })
    return [cart, refetch]
};

export default useCart;