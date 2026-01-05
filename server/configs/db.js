import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        mongoose.connection.on('connected', ()=> console.log("Database is Connected"));
        await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`,{ serverSelectionTimeoutMS: 60000 })
    }catch (error){
        console.log(error);
    }
}

export default connectDB;