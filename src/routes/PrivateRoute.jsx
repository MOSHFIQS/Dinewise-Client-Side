import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()
    if(loading){
        return <Loading />
    }
    if(!user){
        return <Navigate to={'/login'}></Navigate>
    }
    return children
};

export default PrivateRoute;