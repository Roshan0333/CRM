import mongoose from "mongoose";

export const connectDB = async () => {
  
    await mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log('Database connected successfully');
    }).catch((error)=>{
        console.log('Error while connecting to database', error);
    });
};

export default connectDB;