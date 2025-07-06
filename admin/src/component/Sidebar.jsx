import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  return (
    <div className="min-h-screen bg-white border-r">
      {aToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 h-14 transition-all duration-200 ${
                isActive
                  ? "bg-[#F2F3FF] border-r-4 border-indigo-500 text-indigo-600 font-semibold"
                  : "text-gray-700"
              }`
            }
            to={"/admin-dashboard"}
          >
            <img src={assets.home_icon} alt="" />
            <p  className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-3 h-14 transition-all duration-200 ${
                isActive
                  ? "bg-[#F2F3FF] border-r-8 border-indigo-500 text-indigo-600 font-semibold"
                  : "text-gray-700"
              }`
            }
            to={"/all-appointments"}
          >
            <img src={assets.appointment_icon} alt="" />
            <p  className="hidden md:block">Appointments</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 h-14 transition-all duration-200 ${
                isActive
                  ? "bg-[#F2F3FF] border-r-4 border-indigo-500 text-indigo-600 font-semibold"
                  : "text-gray-700"
              }`
            }
            to={"/add-doctor"}
          >
            <img src={assets.add_icon} alt="" />
            <p>Add Doctor</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 h-14 transition-all duration-200 ${
                isActive
                  ? "bg-[#F2F3FF] border-r-4 border-indigo-500 text-indigo-600 font-semibold"
                  : "text-gray-700"
              }`
            }
            to={"/doctor-list"}
          >
            <img src={assets.people_icon} alt="" />
            <p>Doctors List</p>
          </NavLink>
        </ul>
      )}
      {dToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 h-14 transition-all duration-200 ${
                isActive
                  ? "bg-[#F2F3FF] border-r-4 border-indigo-500 text-indigo-600 font-semibold"
                  : "text-gray-700"
              }`
            }
            to={"/doctor-dashboard"}
          >
            <img src={assets.home_icon} alt="" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-3 h-14 transition-all duration-200 ${
                isActive
                  ? "bg-[#F2F3FF] border-r-8 border-indigo-500 text-indigo-600 font-semibold"
                  : "text-gray-700"
              }`
            }
            to={"/doctor-appointment"}
          >
            <img src={assets.appointment_icon} alt="" />
            <p  className="hidden md:block">Appointments</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 h-14 transition-all duration-200 ${
                isActive
                  ? "bg-[#F2F3FF] border-r-4 border-indigo-500 text-indigo-600 font-semibold"
                  : "text-gray-700"
              }`
            }
            to={"/doctor-profile"}
          >
            <img src={assets.people_icon} alt="" />
            <p className="hidden md:block">Doctors Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
