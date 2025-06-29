import mongoose from "mongoose";
const connectDB = async()=>{
    
    mongoose.connect.on('connected',()=>console.log("DATABASE CONNECTED"))

   await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`)
}
export default connectDB;