import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
const RelatedDoctors = ({ speciality, docId }) => {

    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    const [relDoc, setRelDoc] = useState([])

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
            setRelDoc(doctorsData)
        }
    }, [doctors, speciality, docId])

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-[#262626]'>
    <h1 className='text-3xl font-medium'>Top Doctors to book</h1>
    <p className='sm:w-1/3 text-center text-sm'>
        Simply browse through our extensive list of trusted doctors.
    </p>
    {/* Grid layout for doctor cards */}
    <div className='w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5 px-3 sm:px-0'>
        {relDoc.map((item, index) => (
            <div
                onClick={() => {
                    navigate(`/appointment/${item._id}`)
                    scrollTo(0, 0)
                }}
                className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
                key={index}
            >
                <img className='bg-[#EAEFFF] w-full h-60 object-cover' src={item.image} alt="" />
                <div className='p-4'>
                    <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-500'}`}>
                        <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'}  rounded-full`}></p>
                        <p>{item.available ? 'Available' : 'Not Available'}</p>
                    </div>
                    <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
                    <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
                </div>
            </div>
        ))}
    </div>
    <button
        onClick={() => {
            navigate('/doctors')
        }}
        className='bg-[#EAEFFF] text-gray-600 px-12 py-3 rounded-full mt-10'
    >
        more
    </button>
</div>

    )
}

export default RelatedDoctors