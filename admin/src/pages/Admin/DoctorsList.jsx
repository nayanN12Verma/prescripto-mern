import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'

const DoctorsList = () => {
  const {doctors,aToken,getAllDoctors,changeAvailability} = useContext(AdminContext)
  useEffect(()=>{
if(aToken){
  getAllDoctors()
}
  },[aToken])
  return (
    <div className='m-5 max-h-[90] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>
        All doctors
      </h1>
      <div className=' w-full flex flex-wrap gap-4 pt-5 gap-y-6 '>
        {
          doctors.map((item)=>(
           <div key={item._id} className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer'>
            <img className='bg-indigo-50 group hover:bg-indigo-500 transition-all duration-500' src={item.image}></img>
            <div className=' p-4'>
              <p className='text-neutral-800 text-sm'>{item.name}</p>
              <p>{item.speciality}</p>
              <div className='mt-2 flex items-center gap-1 text-sm'>
                <input onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.available} />
                <p>Available</p>
              </div>
            </div>
           </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorsList