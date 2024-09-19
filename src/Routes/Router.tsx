import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import LoginPage from "../Pages/Login/Login";
import ErrorPage from "../Pages/ErrorPage";

const router = createBrowserRouter([
    {
      path: "/",
      element:<Main/>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        {
            path : '/',
            element : <Home/>
        }
      ]
      
    },
    {
      path: "/login",
      element:<LoginPage></LoginPage>
    }

  ]);
  export default router