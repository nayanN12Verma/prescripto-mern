import React, { useState } from 'react'
import { assets } from '/src/assets/assets.js';
import { NavLink, useNavigate } from 'react-router-dom'


const Navbar = () => {
   const navigate = useNavigate();
   const[showMenu,setShowMenu] = useState(false);
   const[token,setToken] = useState(true);

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-4 border-b border-b-gray-400' >
        <img onClick={()=>{navigate('/')}} className='w-44 cursor-pointer' src={assets.logo} alt=""/>
        <ul className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink 
         to='/' 
             className={({ isActive }) => isActive ? "active-link py-1" : "py-1"}
         > 
             HOME
        <div className="underline"></div>
        </NavLink>

        <NavLink 
         to='/doctors' 
             className={({ isActive }) => isActive ? "active-link py-1" : "py-1"}
         > 
             ALL DOCTOR
        <div className="underline"></div>
        </NavLink>
        <NavLink 
         to='/about' 
             className={({ isActive }) => isActive ? "active-link py-1" : "py-1"}
         > 
             ABOUT
        <div className="underline"></div>
        </NavLink>
        <NavLink 
         to='/contact' 
             className={({ isActive }) => isActive ? "active-link py-1" : "py-1"}
         > 
             CONTACT
        <div className="underline"></div>
        </NavLink>
        
        </ul>
        <div className='flex items-center gap-4 '>
        {
            token
            ?<div className='flex items-center gap-2 cursor-pointer group relative '>
                <img className='w-8 rounded-full' src={assets.profile_pic} alt="profile_pic"/>
                <img className='w-2.5 ' src={assets.dropdown_icon} alt="dropdown_icon"/>
                <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                    <div className='min-w-48 bg-stone-200 rounded flex flex-col gap-4 p-4'>
                        <p onClick={()=>navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                        <p onClick={()=>navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                        <p onClick={()=>setToken(false)} className='hover:text-black cursor-pointer'>Logout</p>
                    </div>
                </div>
            </div>
            : <button onClick={()=>navigate("/login")} className='bg-blue-500 text-white px-8 py-3 rounded-full font-light hidden md:block cursor-pointer'>Create account</button>
        }
         </div>
    </div>
  )
}

export default Navbar