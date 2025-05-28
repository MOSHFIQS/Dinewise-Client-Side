import Home from '../pages/home/Home';
import Menu from '../pages/Menu/Menu';
import OurShop from '../pages/order/order/OurShop';
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
    ]
  },
]);



export default router