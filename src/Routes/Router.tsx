import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import LoginPage from "../Pages/Login/Login";
import AboutUs from "../Pages/About/About";
import ErrorPage from "../Pages/ErrorPage";
import Registration from "../Pages/Login/Registration/Registration";
import Contact from "../Pages/Contact/Contact";
import CarDetails from "../Pages/CarDetails/CarDetails";
import Cars from "../Components/Cars";
import PaymentPage from "../Components/PaymentSystem/PaymentPage";
import Dashboard from "../Layouts/Dashboard";
import OnboardCheckout from "../Pages/OnboardCheckout/OnboardCheckout";
import HostingCarForm from "../Pages/HostingCarForm/HostingCarForm";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import ManagePaymentHistory from "../Pages/Dashboard/Admin/ManagePaymentHistory";
import TotalCarList from "../Pages/Dashboard/Admin/TotalCarList";
import MembershipDuration from "../Components/Membership/MembershipDuration";
import AllBookings from "../Pages/Dashboard/Admin/AllBookings";
import ManageMemberShip from "../Pages/Dashboard/Admin/ManageMemberShip";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      
      {
        path: "/cars/:id",
        element: <CarDetails></CarDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:8000/cars/${params.id}`),
      },
      {
        path: "/cars",
        element: <Cars></Cars>,
      },
      {
        path: "/about",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/services",
        element: <Cars></Cars>,
      },
      {
        path: "/hostingForm",
        element: <HostingCarForm></HostingCarForm>,
      },
      {
        path: "/cars/:id",
        element: <CarDetails></CarDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:8000/cars/${params.id}`),
      },
      {
        path: "/checkout/:bookingId",
        element: <OnboardCheckout></OnboardCheckout>,
      },
      {
        path: "/cars",
        element: <Cars></Cars>,
      },
      {
        path: "/membership-duration/:planName/:price",
        element:<MembershipDuration></MembershipDuration>,
      },
      {
        path: "/payment/:planName/:totalPrice",
        element: <PaymentPage></PaymentPage>,
      },
      {
        path: "/payment/:totalPrice",
        element: (
          // <PrivetRouts>
          <PaymentPage></PaymentPage>
          // </PrivetRouts>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/register",
    element: <Registration></Registration>,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "adminhome",
        element: <AdminHome />,
      },
      {
        path: "manageUser",
        element: <ManageUsers />,
      },
      {
        path: "paymentHistory",
        element: <ManagePaymentHistory/>
      },
      {
        path: 'cars',
        element: <TotalCarList/>
      },
      {
        path: 'bookings',
        element: <AllBookings/>
      },
      {
        path: 'manageMemberShip',
        element: <ManageMemberShip/>
      }
    ],
  },
]);
export default router