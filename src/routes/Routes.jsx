import Home from '../pages/home/Home';
import Menu from '../pages/Menu/Menu';
import Root from './../layouts/Root';
import {
  createBrowserRouter
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/", element: <Root />, children: [
      { path: '/', element: <Home /> },
      { path: '/menu', element: <Menu /> },
    ]
  },
]);



export default router