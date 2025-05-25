import Home from '../pages/home/Home';
import Root from './../layouts/Root';
import {
  createBrowserRouter
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/", element: <Root />, children: [
      { path: '/', element: <Home /> }
    ]
  },
]);



export default router