import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="m-5 space-y-8">
        {/* Summary Cards */}
        <div className="flex gap-6 flex-wrap">
          {/* Doctors Card */}
          <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-md min-w-[200px]">
            <img src={assets.doctor_icon} alt="Doctors" className="w-10 h-10" />
            <div>
              <p className="text-xl font-semibold">{dashData.doctors}</p>
              <p className="text-sm text-gray-500">Doctors</p>
            </div>
          </div>

          {/* Appointments Card */}
          <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-md min-w-[200px]">
            <img
              src={assets.appointments_icon}
              alt="Appointments"
              className="w-10 h-10"
            />
            <div>
              <p className="text-xl font-semibold">{dashData.appointment}</p>
              <p className="text-sm text-gray-500">Appointments</p>
            </div>
          </div>

          {/* Patients Card */}
          <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-md min-w-[200px]">
            <img
              src={assets.patients_icon}
              alt="Patients"
              className="w-10 h-10"
            />
            <div>
              <p className="text-xl font-semibold">{dashData.patients}</p>
              <p className="text-sm text-gray-500">Patients</p>
            </div>
          </div>
        </div>

        {/* Latest Appointments Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium mb-4">Latest Appointments</h2>
          <div className="space-y-4">
            {dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-3"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.docData.image}
                    alt="Doctor"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">Dr. {item.docData.name}</p>
                    <p className="text-xs text-gray-500">
                      Booking on {item.slotDate}
                    </p>
                  </div>
                </div>
                {item.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium">
                    Completed
                  </p>
                ) : (
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className="w-10 cursor-pointer"
                    src={assets.cancel_icon}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
