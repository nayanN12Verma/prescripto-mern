import doctorModel from "../models/doctorModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"

const changeAvailability = async(req,res)=>{
    try {
       
        const {docId} = req.body
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId,{available:!docData.available})
        res.json({success:true ,message:'Availability Changed'})
    } catch (error) {
        console.log(error)
         res.json({success:false, message:error.message})
    }
}
  const doctorList = async (req,res)=>{
    try {
        const doctors = await doctorModel.find({}).select(['-password','-email'])
        res.json({success:true,doctors})
    } catch (error) {
         console.log(error)
         res.json({success:false, message:error.message})
    }
}
// api for doctor login 
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// api to get docappointmr=ent for doctor panel

const appointsmentDoctor = async(req,res)=>{
    try {
        const docId = req.docId; 
        const appointments = await appointmentModel.find({docId})
        res.json({success:true,appointments})

    } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
    }
}

// api to mark appointment completed

const appointmentComplete = async(req,res)=>{
    try {
        const docId = req.docId; 
        const {appointmentId} = req.body

        const appointmentData = await appointmentModel.findById({appointmentId})
         if(appointmentData && appointmentData.docId === docId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true})
            return res.json({success:true,message:"Appointment cancel "})
         }else{
            return res.json({success:false,message:"Mark failed "})
         }
    } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });  
    }
}

// api to cancel appointment completed

const appointmentCancel = async(req,res)=>{
    try {
        const docId = req.docId; 
        const {appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)
         if(appointmentData && appointmentData.docId === docId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
            return res.json({success:true,message:"Appointment cancelled "})
         }else{
            return res.json({success:false,message:"Cancellation failed "})
         }
    } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });  
    }
}

// api to get doctor data for doctor panel 

const doctorDashboard = async(req,res)=>{
    try {
           const docId = req.docId; 
           const appointments = await appointmentModel.find({docId})
           let earning = 0;
           appointments.map((item)=>{
            if(item.isCompleted || item.payment){
                earning += item.amount
            }
           })

           let patient = [];
           appointments.map((item)=>{
            if(patient.includes(item.userId)){
                patient.push(item.userId)
            }
           })

           const dashData = {
            earning,appointments:appointments.length,
            patients:patient.length,
            latestAppointments: appointments.reverse().slice(0,5)
           }

           res.json({success:true,dashData})

    } catch (error) {
         console.log(error);
    res.json({ success: false, message: error.message });
    }
}
//api to get docProfile for docPanel

const doctorProfile = async(req,res)=>{
    try {
            const docId = req.docId; 
            const profileData = await doctorModel.findById(docId).select('-password');
            res.json({success:true ,profileData})
    } catch (error) {
          console.log(error);
    res.json({ success: false, message: error.message });
    }
}
//api to  update docProgile data from docpanel

const updateDoctorProfile = async(req,res)=>{
    try {
        const docId = req.docId; 
        const {fees,address,available} = req.body;
        await doctorModel.findByIdAndUpdate(docId,{fees,address,available})
        res.json({success:true, message:"Profile Upadated"})
    } catch (error) {
          console.log(error);
    res.json({ success: false, message: error.message });
    }
}
export {changeAvailability,doctorList,
    loginDoctor,appointsmentDoctor,
    appointmentComplete,appointmentCancel,
    doctorDashboard,updateDoctorProfile,doctorProfile}