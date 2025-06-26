import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import Appointment from './pages/Appointment'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import Contact from './pages/Contact'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import About from './pages/About'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%] '>
      <Navbar/>
         <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/doctors' element={<Doctors/>}/>
          <Route path='/doctors/:speciality' element={<Doctors/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/my-appointment' element={<MyAppointments/>}/>
          <Route path='/my-profile' element={<MyProfile/>}/>
          <Route path='/appointment/:docId' element={<Appointment/>}/>
        
         </Routes>
    </div>
  )
}

export default App