import Root from './../layouts/Root';
import {
  createBrowserRouter
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/", element: <Root />
  },
]);



export default router