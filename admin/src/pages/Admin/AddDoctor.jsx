import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 year');
  const [fees, setFees] = useState('');
  const [speciality, setSpeciality] = useState('General physician');
  const [education, setEducation] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [about, setAbout] = useState('');

  const {backendUrl,aToken} = useContext(AdminContext)

  const handleImageChange = (e) => {
    setDocImg(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can use FormData here to prepare the payload for API submission.
    try {
      if(!docImg){
        return toast.error("Image not selected")
      }
      const formData = new FormData()
      formData.append('image',docImg)
      formData.append('name',name)
      formData.append('email',email)
      formData.append('password',password)
      formData.append('experience',experience)
      formData.append('fees',Number(fees))
      formData.append('about',about)
      formData.append('speciality',speciality)
      formData.append('degree',education)
      formData.append('address',JSON.stringify({line1:address1,line2:address2}))


      //console
      formData.forEach((value,key)=>{
        console.log(`${key} : ${value}`)
      })

      const { data } = await axios.post(`${backendUrl}/api/admin/add-doctor`,formData,{headers:{aToken}})
      if(data.success){
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setEducation('')
        setAddress1('')
        setAddress2('')
        setFees('')
      } else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="m-6 w-full">
      <p className="mb-5 text-2xl font-semibold text-gray-700">Add Doctor</p>

      <div className="bg-white px-8 py-10 border border-gray-200 rounded-lg w-full max-w-5xl max-h-[85vh] overflow-y-auto shadow-sm">
        {/* Upload Section */}
        <div className="flex items-center gap-4 mb-8 text-gray-600">
          <label htmlFor="doc-img">
            <img
              className="w-16 h-16 bg-gray-100 rounded-full cursor-pointer object-cover"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Upload Doctor"
            />
          </label>
          <input onChange={handleImageChange} type="file" id="doc-img" hidden />
          <p>
            <span className="font-medium">Upload doctor picture</span>
            <br />
            JPG, PNG (max 2MB)
          </p>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col lg:flex-row gap-10 text-gray-700">
          {/* Left column */}
          <div className="flex-1 flex flex-col gap-4">
            <div>
              <label className="block mb-1">Doctor Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="border border-gray-300 rounded px-3 py-2 w-full" type="text" placeholder="Name" required />
            </div>
            <div>
              <label className="block mb-1">Doctor Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="border border-gray-300 rounded px-3 py-2 w-full" type="email" placeholder="Email" required />
            </div>
            <div>
              <label className="block mb-1">Doctor Password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} className="border border-gray-300 rounded px-3 py-2 w-full" type="password" placeholder="Password" required />
            </div>
            <div>
              <label className="block mb-1">Experience</label>
              <select value={experience} onChange={(e) => setExperience(e.target.value)} className="border border-gray-300 rounded px-3 py-2 w-full">
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i} value={`${i + 1} year`}>{`${i + 1} Year`}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1">Fees</label>
              <input value={fees} onChange={(e) => setFees(e.target.value)} className="border border-gray-300 rounded px-3 py-2 w-full" type="number" placeholder="Fees" required />
            </div>
          </div>

          {/* Right column */}
          <div className="flex-1 flex flex-col gap-4">
            <div>
              <label className="block mb-1">Speciality</label>
              <select value={speciality} onChange={(e) => setSpeciality(e.target.value)} className="border border-gray-300 rounded px-3 py-2 w-full">
                <option>General physician</option>
                <option>Gynecologist</option>
                <option>Dermatologist</option>
                <option>Pediatricians</option>
                <option>Neurologist</option>
                <option>Gastroenterologist</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Education</label>
              <input value={education} onChange={(e) => setEducation(e.target.value)} className="border border-gray-300 rounded px-3 py-2 w-full" type="text" placeholder="Education" required />
            </div>
            <div>
              <label className="block mb-1">Address</label>
              <input value={address1} onChange={(e) => setAddress1(e.target.value)} className="border border-gray-300 rounded px-3 py-2 w-full mb-2" type="text" placeholder="Address 1" />
              <input value={address2} onChange={(e) => setAddress2(e.target.value)} className="border border-gray-300 rounded px-3 py-2 w-full" type="text" placeholder="Address 2" />
            </div>
          </div>
        </div>

        {/* About & Submit */}
        <div className="mt-6">
          <label className="block mb-1">About Me</label>
          <textarea value={about} onChange={(e) => setAbout(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded resize-none" placeholder="Write about the doctor" rows={4} required />
        </div>

        <div className="mt-6">
          <button type="submit" className="bg-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-600 transition-all cursor-pointer">
            Add Doctor
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;
