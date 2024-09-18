import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import LoginPage from "../Pages/Login/Login";

const router = createBrowserRouter([
    {
      path: "/",
      element:<Main/>,
      errorElement:<></>,
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