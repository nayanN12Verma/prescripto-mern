import React, { useContext, useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {AppContext} from '../context/AppContext'

const Doctors = () => {
  const navigate = useNavigate();
  const {speciality} = useParams()
  const [showFilter, setShowFilter] = useState(false)
  const {doctors} = useContext(AppContext)
  const [filterDoc, setFilterDoc] = useState([]);
  

 useEffect(() => {
  if (speciality) {
    setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
  } else {
    setFilterDoc(doctors);
  }
}, [doctors, speciality]);

  return (
  
    <div>
     <p className='text-gray-600'>Browse through the doctors specialist.</p>
     <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
      <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-indigo-500 text-white' :''}`} onClick={()=>setShowFilter(prev => !prev)}>Filters</button>
      <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
        <p onClick={()=>speciality === 'Genral physician'? navigate('/doctors'):navigate('/doctors/General physician')}className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded cursor-pointer`}>General physician</p>
        <p onClick={()=>speciality === 'Gynecologist'? navigate('/doctors'):navigate('/doctors/Gynecologist')}className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded cursor-pointer`}>Gynecologist</p>
        <p onClick={()=>speciality === 'Dermatologist'? navigate('/doctors'):navigate('/doctors/Dermatologist')}className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded cursor-pointer`}>Dermatologist</p>
        <p onClick={()=>speciality === 'Pediatricians'? navigate('/doctors'):navigate('/doctors/Pediatricians')}className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded cursor-pointer`}>Pediatricians</p>
        <p onClick={()=>speciality === 'Neurologist'? navigate('/doctors'):navigate('/doctors/Neurologist')}className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded cursor-pointer`}>Neurologist</p>
        <p onClick={()=>speciality === 'Gastroenterologist'? navigate('/doctors'):navigate('/doctors/Gastroenterologist')}className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded cursor-pointer`}>Gastroenterologist</p>
      </div>
      <div className='w-full grid grid-cols-5 gap-4 gap-y-6'>
        {
          filterDoc.map((item,index)=>(
            <div  onClick={()=>navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                <img className='bg-blue-50' src={item.image} alt="" />
                <div className='p-4'>
                      <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' :'text-gray-500'}`}>
                            <p className={`w-2 h-2 ${item.available ? 'bg-green-500' :'bg-gray-500'}  rounded-full`}></p><p>{item.available ?'Available': 'Not Available'}</p>
                            </div>
                        <div>
                            <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                            <p className='text-gray-600 text-sm'>{item.speciality}</p>
                        </div>
                    
                </div>
            </div>
          ))
        }
      </div>
     </div>
    </div>
  )
}

export default Doctors