import mongoose from "mongoose";
import { DB_NAME } from "./constant";
import 'dotenv/config'

const connectDB= async()=>{
    try {
      const connectionInstance=  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
      console.log(`\n MongoDb connected !! DB HOST : ${connectionInstance.connection.host}`)
    

    } catch (error) {
        console.log('Error :',error)
        process.exit(1);
    }
}

export default connectDB