import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import LoginPage from "../Pages/Login/Login";
import AboutUs from "../Pages/About/About";

import ErrorPage from "../Pages/ErrorPage";
import Registration from "../Pages/Login/Registration/Registration";
import Contact from "../Pages/Contact/Contact";
import CarList from "../Pages/CarList/CarList";

const router = createBrowserRouter([
    {
      path: "/",
      element:<Main/>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        {
            path : '/',
            element : <Home/>
        },
        {
            path : '/about',
            element : <AboutUs></AboutUs>
        },
        {
          path : '/contact',
          element: <Contact></Contact>
        },
        {
          path : '/services',
          element: <CarList></CarList>
          
        }
      ]

    },
    {
      path: "/login",
      element:<LoginPage></LoginPage>
    },
    {
      path: "/register",
      element:<Registration></Registration>
    }

  ]);
  export default router