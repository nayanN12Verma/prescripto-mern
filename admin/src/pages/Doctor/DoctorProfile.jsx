import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorProfile = () => {
  const { dToken, setProfileData, profileData, getProfileData } = useContext(DoctorContext);
  const { backendUrl } = useContext(DoctorContext);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (dToken) getProfileData();
  }, [dToken]);

  const updateProfile = async () => {
    try {
     const updateData={
        address:profileData.address,
        fees:profileData.fees,
        available:profileData.available
     }

      const { data } = await axios.post(
        `${backendUrl}/api/doctor/update`,
        updateData,  
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success('Profile updated!');
        setIsEdit(false);
        getProfileData(); // Refresh with latest
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return profileData && (
    <div className='flex flex-col gap-4 m-5'>
      <div>
        <img
          className='bg-indigo-500/80 w-full sm:max-w-64 rounded-lg'
          src={profileData.image}
          alt='doctor-profile'
        />
      </div>

      <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>

        {/* Name */}
        <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>
          {profileData.name}
        </p>

        {/* Degree & Experience */}
        <div className='flex items-center gap-2 mt-1 text-gray-600'>
          <p>{profileData.degree} - {profileData.speciality}</p>
          <button className='py-0.5 px-2 border text-xs rounded-full'>
            {profileData.experience}
          </button>
        </div>

        {/* About */}
        <div className='mt-3'>
          <p className='font-medium text-sm text-neutral-800'>About:</p>
          {isEdit ? (
            <textarea
              className='text-sm text-gray-600 mt-1 border rounded px-2 py-1 w-full'
              value={profileData.about}
              onChange={(e) =>
                setProfileData((prev) => ({ ...prev, about: e.target.value }))
              }
            />
          ) : (
            <p className='text-sm text-gray-600 mt-1'>{profileData.about}</p>
          )}
        </div>

        {/* Fees */}
        <p className='text-gray-600 font-medium mt-4'>
          Appointment Fees:{' '}
          {isEdit ? (
            <input
              type='number'
              className='border px-2 py-1 rounded w-24 ml-2'
              value={profileData.fees}
              onChange={(e) =>
                setProfileData((prev) => ({ ...prev, fees: e.target.value }))
              }
            />
          ) : (
            <span className='text-gray-800'>${profileData.fees}</span>
          )}
        </p>

        {/* Address */}
        <div className='mt-4'>
          <p className='font-medium'>Address:</p>
          {isEdit ? (
            <div className='flex flex-col gap-2 mt-1'>
              <input
                type='text'
                placeholder='Line 1'
                className='border rounded px-2 py-1'
                value={profileData.address.line1}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
              />
              <input
                type='text'
                placeholder='Line 2'
                className='border rounded px-2 py-1'
                value={profileData.address.line2}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
              />
            </div>
          ) : (
            <p className='text-sm text-gray-600'>
              {profileData.address.line1}
              <br />
              {profileData.address.line2}
            </p>
          )}
        </div>

        {/* Availability */}
        <div className='flex items-center gap-2 pt-4'>
          <input
            type='checkbox'
            id='available'
            checked={profileData.available}
            disabled={!isEdit}
            onChange={(e) =>
              setProfileData((prev) => ({
                ...prev,
                available: e.target.checked,
              }))
            }
          />
          <label htmlFor='available'>Available</label>
        </div>

        {/* Buttons */}
        <div className='flex gap-4 mt-6'>
          {isEdit ? (
            <>
              <button
                onClick={updateProfile}
                className='px-4 py-1 bg-indigo-500 text-white rounded-full text-sm hover:bg-indigo-600'
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEdit(false)}
                className='px-4 py-1 border text-sm rounded-full hover:bg-gray-100'
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className='px-4 py-1 border border-indigo-500 text-sm rounded-full hover:bg-indigo-500 hover:text-white transition-all'
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
