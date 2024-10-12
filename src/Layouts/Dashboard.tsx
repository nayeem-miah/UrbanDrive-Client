import { NavLink, Outlet } from "react-router-dom";
// import img from "../assets/urbandrive-high-resolution-logo.png";
import { FaCoins, FaHome, FaUserAlt } from "react-icons/fa";
import { TfiLayoutGrid2 } from "react-icons/tfi";
// import { HiOutlineDocumentReport } from "react-icons/hi";
import useRole from "../Hooks/useRole";
import { RiAdvertisementLine } from "react-icons/ri";
import { MdCardMembership, MdPayment } from "react-icons/md";
// import { ClipLoader } from "react-spinners";
import { AiFillMedicineBox } from "react-icons/ai";
import React from "react";
import { FaCarRear } from "react-icons/fa6";
import { TbBrandBooking } from "react-icons/tb";

type Role = "Admin" | "Host" | "User" | "";

const Dashboard: React.FC = () => {
  const [role, isPending]: [Role, boolean, boolean] = useRole();

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {/* <ClipLoader color="#076cec" size={50} /> */}
      </div>
    );
  }

  console.log(role)
  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-primary pt-8">
        <div>
          {/* <img className="ml-2 w-[70px] lg:w-[80px]" src={img} alt="logo" /> */}
          <h2 className="text-2xl font-bold text-center">
            <span className="text-white">U</span>rban
            <span className="text-white">Drive</span>
          </h2>
          <ul className="menu space-y-1 mt-3 text-base font-medium">
            {/* Admin Section */}
            {role === "Admin" && (
              <>
                <li>
                  <NavLink to="/dashboard/adminHome">
                    <TfiLayoutGrid2 />
                    Overview
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageUser">
                    <FaUserAlt />
                    Manage users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/cars">
                    <FaCarRear />
                    Manage Cars
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/paymentHistory">
                    <FaCoins /> Payment History
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/bookings">
                    <TbBrandBooking />
                    Bookings
                  </NavLink>
                </li>
                <li className="mb-2">
                  <NavLink to="/dashboard/manageMemberShip">
                    <MdCardMembership /> Manage Membership
                  </NavLink>
                </li>
              </>
            )}

            {/* Host Section */}
            {role === "Host" && (
              <>
                <li>
                  <NavLink to="/dashboard/sellerHome">
                    <AiFillMedicineBox />
                    Seller Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageMedicine">
                    <AiFillMedicineBox />
                    Manage Medicines
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/paymentHistory">
                    <MdPayment />
                    Payment history
                  </NavLink>
                </li>
                <li className="mb-2">
                  <NavLink to="/dashboard/requestAdvertise">
                    <RiAdvertisementLine /> Manage banner advertise
                  </NavLink>
                </li>
              </>
            )}

            {/* User Section */}
            {role === "User" && (
              <>
                <li className="mb-2">
                  <NavLink to="/dashboard/paymentHistory">
                    <MdPayment />
                    Payment history
                  </NavLink>
                </li>
              </>
            )}

            <hr />

            <li>
              <NavLink to="/">
                <FaHome /> Home
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-1 p-4 lg:p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
