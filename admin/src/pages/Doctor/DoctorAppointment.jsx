import React, { useEffect, useContext } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointment = () => {
  const { dToken, appointments, getAppointments,cancelAppointment,completeAppointment } = useContext(DoctorContext);
  const { calculateAge } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
        {/* Header Row */}
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b font-semibold bg-gray-50'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Data Rows */}
        {appointments .map((item, index) => (
          <div
            key={index}
            className='grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] items-center gap-1 py-3 px-6 border-b'
          >
            <p>{index + 1}</p>

            {/* Patient */}
            <div className='flex items-center gap-2'>
              <img
                src={item.userData.image}
                alt={item.userData.name}
                className='w-8 h-8 rounded-full object-cover'
              />
              <p>{item.userData.name}</p>
            </div>

            {/* Payment */}
            <p>{item.payment ? 'Online' : 'Cash'}</p>

            {/* Age */}
            <p>{calculateAge(item.userData.dob)} yrs</p>

            {/* Date & Time */}
            <p>
              {item.slotDate} | {item.slotTime}
            </p>

            {/* Fees */}
            <p>₹{item.amount}</p>

              {
                item.cancelled
                ? <p className='text-red-400 text-xs font-medium'> Cancelled</p>
                :item.iscompleted
                ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                :  <div className='flex gap-2'>
              <img
              onClick={()=>cancelAppointment(item._id)}
                src={assets.cancel_icon}
                alt="Cancel"
                className='w-6 cursor-pointer hover:opacity-70'
              />
              <img
              onClick={()=>completeAppointment(item._id)}
                src={assets.tick_icon}
                alt="Done"
                className='w-6 cursor-pointer hover:opacity-70'
              />
            </div>
             }
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointment;
