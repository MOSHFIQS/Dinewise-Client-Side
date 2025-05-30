import Dashboard from '../layouts/dashboard/Dashboard';
import MyCart from '../pages/dashboard/cart/MyCart';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Menu from '../pages/Menu/Menu';
import OurShop from '../pages/order/order/OurShop';
import SignUp from '../pages/signup/SignUp';
import Root from './../layouts/Root';
import {
  createBrowserRouter
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/", element: <Root />, children: [
      { path: '/', element: <Home /> },
      { path: '/menu', element: <Menu /> },
      { path: '/ourShop', element: <OurShop /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <SignUp /> },
    ]
  },
  {
    path: '/dashboard', element: <Dashboard />, children: [
      { path: 'myCart',element:<MyCart></MyCart> }
    ]
  }
]);



export default router