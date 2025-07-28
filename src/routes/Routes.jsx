import Dashboard from '../layouts/dashboard/Dashboard';
import AllUsers from '../pages/dashboard/allUsers/AllUsers';
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
import PrivateRoute from './PrivateRoute';
import AddItems from '../pages/dashboard/AddItems';
import Payment from '../pages/dashboard/payment/Payment';
import AllPayments from '../pages/dashboard/allPayments/AllPayments';

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
    path: '/dashboard', element: <PrivateRoute><Dashboard /></PrivateRoute>, children: [
      { path: 'myCart', element: <MyCart /> },
      { path: 'payment', element: <Payment /> },

      // admin routes
      { path: 'allUsers', element: <AllUsers /> },
      { path: 'addItems', element: <AddItems /> },
      { path: 'allPayments', element: <AllPayments /> }
    ]
  }
]);



export default router