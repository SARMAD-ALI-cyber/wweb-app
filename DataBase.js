import { config } from 'dotenv';

config();
import mongoose from 'mongoose';

const uri="mongodb://localhost:27017/FoodDilievryApp"

const connectDB= async () =>{
    try {
        await mongoose.connect(uri)
        console.log("Connection Successful!")
    } catch (error) {
        console.log("Connection Faliure: ",error.message)
    }




}
export{connectDB}
