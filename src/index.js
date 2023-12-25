import connectDB from './db/mongoConnect'
import dotenv from 'dotenv'

dotenv.config({
    path:'./env'
})


connectDB()






// Approach 1st to connect mongoDb

/*
import express from "express";

const app=express()
const PORT=process.env.PORT||8000;


;(async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on('error',(error)=>{
            console.log("Error occur",error)
            throw error
        })

app.listen(process.env.PORT,()=>{
    console.log(`Server connected to ${PORT}`)
})

    } catch (error) {
        console.log('Error :',error)
        throw error;
    }
})()
*/

