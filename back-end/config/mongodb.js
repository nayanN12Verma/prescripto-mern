import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`);

    console.log("✅ DATABASE CONNECTED"); 

    // Optional (secondary logging)
    mongoose.connection.on('error', (err) => {
      console.error("❌ DATABASE CONNECTION ERROR:", err);
    });

  } catch (err) {
    console.error("❌ MONGODB CONNECTION FAILED:", err);
    process.exit(1);
  }
};

export default connectDB;
