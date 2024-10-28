import { NavLink, Outlet } from "react-router-dom";
import { FaCoins, FaHome, FaUserAlt } from "react-icons/fa";
import { TfiLayoutGrid2 } from "react-icons/tfi";
import { RiAdvertisementLine } from "react-icons/ri";
import { MdCardMembership, MdPayment } from "react-icons/md";
import { AiFillMedicineBox } from "react-icons/ai";
import { FaCarRear } from "react-icons/fa6";
import { TbBrandBooking } from "react-icons/tb";
import { SyncLoader } from "react-spinners";
import useRole from "../Hooks/useRole";
import React from "react";

type Role = "Admin" | "Host" | "";

const Dashboard: React.FC = () => {
  const [role, isPending]: [Role, boolean, boolean] = useRole();

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SyncLoader color="#593cfb" size={18} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 bg-primary shadow-lg">
        <div className="px-6 py-8">
          <h2 className="text-2xl font-bold text-white text-center">
            <span className="text-accent">U</span>rban
            <span className="text-accent">Drive</span>
          </h2>
        </div>

        <nav className="px-4 py-4">
          {role === "Admin" && (
            <div className="space-y-2">
              <NavLink
                to="/dashboard/adminHome"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <TfiLayoutGrid2 className="w-4 h-4" />
                Overview
              </NavLink>

              <NavLink
                to="/dashboard/manageUser"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <FaUserAlt className="w-4 h-4" />
                Manage Users
              </NavLink>

              <NavLink
                to="/dashboard/cars"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <FaCarRear className="w-4 h-4" />
                Manage Cars
              </NavLink>

              <NavLink
                to="/dashboard/paymentHistory"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <FaCoins className="w-4 h-4" />
                Payment History
              </NavLink>

              <NavLink
                to="/dashboard/bookings"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <TbBrandBooking className="w-4 h-4" />
                Bookings
              </NavLink>

              <NavLink
                to="/dashboard/manageMemberShip"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <MdCardMembership className="w-4 h-4" />
                Manage Membership
              </NavLink>
            </div>
          )}

          {role === "Host" && (
            <div className="space-y-2">
              <NavLink
                to="/dashboard/hostOverview"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <TfiLayoutGrid2 className="w-4 h-4" />
                Overview
              </NavLink>

              <NavLink
                to="/dashboard/myCars"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <FaCarRear className="w-4 h-4" />
                Manage Cars
              </NavLink>

              <NavLink
                to="/dashboard/hostManageBookings"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <AiFillMedicineBox className="w-4 h-4" />
                Manage Bookings
              </NavLink>

              <NavLink
                to="/dashboard/hostPayments"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <MdPayment className="w-4 h-4" />
                Payment History
              </NavLink>

              <NavLink
                to="/dashboard/requestAdvertise"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <RiAdvertisementLine className="w-4 h-4" />
                Manage Advertisements
              </NavLink>
            </div>
          )}

          <div className="mt-8 pt-8 border-t border-white/10">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-white/80 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <FaHome className="w-4 h-4" />
              Home
            </NavLink>
          </div>
        </nav>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;