import validater from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import razorpay from 'razorpay'
import crypto from "crypto";
// Api to register uder

const registerUser = async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        if(!name||!password||!email){
            return res.json({success:false,message:'Missing Details'})
        }
      
    if(!validater.isEmail(email)){
         return res.json({success:false,message:'Enter a valid details'})
    }    
    if(password.length < 8){
         return res.json({success:false,message:'Enter a strong password'})
    } 
    // hashing user password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password,salt)
      const userData = {
        name,email, password:hashedPassword
      }

      const newUser = new userModel(userData)
      const user = await newUser.save()
      //_id property 

      const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
      res.json({success:true,token})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
// api for login user

const loginUser = async (req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({email})
        if(!user){
           return res.json({success:false,message:"user does not exist"})
        }
        const isMatch = await bcrypt.compare(password,user.password)

        if(isMatch){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        }else{
            res.json({success:false,message:"Invalid Credentials"})
        }

    } catch (error) {
         console.log(error)
        res.json({success:false,message:error.message})
    }
}

// api to get user profile data

const getProfile = async(req,res)=>{
 try {
      const userId = req.userId
      const userData = await userModel.findById(userId).select('-password')
      res.json({success:true,userData})

 } catch (error) {
     console.log(error)
    res.json({success:false,message:error.message})
 }
}

//api to update user progile

const updateProfile = async(req,res)=>{
 try {
    const {name,phone,address, dob,gender} = req.body
    const imageFile = req.file
    const userId = req.userId; 
    if(!name ||!phone|| !dob|| !gender){
     return res.json({success:false,message:"data missing"})
    }
    await userModel.findByIdAndUpdate(userId,{name,phone, address:JSON.parse(address),dob,gender})
   if(imageFile){
    //upload to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
    const imageURl = imageUpload.secure_url;
    await userModel.findByIdAndUpdate(userId,{image:imageURl}) 
   }
   res.json({success:true,message:"profile Updated"})

 } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})  
 }
}

// api to book appointmrnt

const bookAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const { docId, slotTime, slotDate } = req.body;

    const doc = await doctorModel.findById(docId);
    if (!doc || !doc.available) {
      return res.json({ success: false, message: 'Doctor not available' });
    }

    // atomic slot booking to avoid race condition
   const updateResult = await doctorModel.findOneAndUpdate(
  { _id: docId, [`slots_booked.${slotDate}`]: { $ne: slotTime } },
  { $push: { [`slots_booked.${slotDate}`]: slotTime } },
  { new: true }
);


    if (!updateResult) {
      return res.json({ success: false, message: 'Slot already booked' });
    }

    const user = await userModel.findById(userId).select('-password');
    const docData = { ...doc._doc };
    delete docData.slots_booked;

    const newAppointment = new appointmentModel({
      userId,
      docId,
      slotDate,
      slotTime,
      userData: user,
      docData,
      amount: doc.fees,
      date: Date.now(),
    });

    await newAppointment.save();

    res.json({ success: true, message: 'Appointment booked' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// api to get user appointment fr frontend

const listAppointment = async(req,res)=>{
  try {
   const userId = req.userId;
   const appointments = await appointmentModel.find({userId})
   res.json({success:true,appointments})
  } catch (error) {
     console.error(error);
    res.json({ success: false, message: error.message });
  }
}
//api to cancel appointment

const cancelAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized action" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    // Release doctor slot
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);
    const slots_booked = doctorData.slots_booked || {};

    if (slots_booked[slotDate]) {
      slots_booked[slotDate] = slots_booked[slotDate].filter((e) => e !== slotTime);

      // Remove the key if no slots left on that date
      if (slots_booked[slotDate].length === 0) {
        delete slots_booked[slotDate];
      }

      await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    }

    res.json({ success: true, message: "Appointment cancelled" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
}

const razorpayInstance = new razorpay({
  key_id:process.env.RAZORPAY_KEY_ID,
  key_secret:process.env.ROZARPAY_KEY_SECRET
})
// api to make payment using razorpay

const paymentRazorpay = async(req,res)=>{

  try {
    const {appointmentId} = req.body
const appointmentData = await appointmentModel.findById(appointmentId)
if(!appointmentData || appointmentData.cancelled){
  return res.json({success:false,message:"Appointment Cancelled or not found"})
}
// creating options for pay
const options  = {
  amount:appointmentData.amount *100,
  currency : process.env.CURRENCY,
  receipt:appointmentId

}

//creation of an order
const order = await razorpayInstance.orders.create(options)
res.json({success:true,order})

  }catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
}
//api to verify payment of pay


const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    // 1. Generate expected signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.ROZARPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    // 2. Compare signatures
    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    // 3. Fetch the Razorpay order to get appointment ID from receipt
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    const appointmentId = orderInfo.receipt;

    // 4. Optional: Verify payment status (but not necessary if signature is valid)
    const paymentInfo = await razorpayInstance.payments.fetch(razorpay_payment_id);
    if (paymentInfo.status !== 'captured') {
      return res.status(400).json({ success: false, message: "Payment not captured" });
    }

    // 5. Update appointment as paid
    await appointmentModel.findByIdAndUpdate(appointmentId, { payment: true });

    return res.json({ success: true, message: "Payment successful" });

  } catch (error) {
    console.error("Payment verification failed:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {registerUser,loginUser,getProfile,updateProfile,bookAppointment,listAppointment,cancelAppointment,paymentRazorpay,verifyRazorpay}