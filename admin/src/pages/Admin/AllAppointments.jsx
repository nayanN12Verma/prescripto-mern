import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext'; 
import {assets} from '../../assets/assets'

const AllAppointment = () => {
  const { aToken, appointments, getAllAppointments,cancelAppointment } = useContext(AdminContext);
  const { calculateAge } = useContext(AppContext); // ✅ this must exist in your provider

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className='w-full max-w-6xl m-5 '>
      <p className='mb-3 text-lg font-medium'>All Appointment</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>patient</p>
          <p>age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {Array.isArray(appointments) &&
          appointments.map((item, index) => (
            <div key={index} className="grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b">
              <p>{index + 1}</p>
              <div className="flex gap-2 items-center">
                <img src={item.userData.image} alt="" className="w-8 h-8 rounded-full" />
                <p>{item.userData.name}</p>
              </div>
              <p>{calculateAge(item.userData.dob)} yrs</p>
              <p>{item.slotDate} | {item.slotTime}</p>
              <p>{item.docData.name}</p>
              <p>₹{item.amount}</p>
              {
                item.cancelled 
                ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                : item.isCompleted
                ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                : <img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon}/>
              }
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllAppointment;
