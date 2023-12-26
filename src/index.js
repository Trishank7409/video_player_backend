import connectDB from './db/mongoConnect.js'
import dotenv from 'dotenv'
import { app } from './app.js'
dotenv.config({
    path:'./env'
})


connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log("Serveer is stated")
    })
})
.catch((e)=>{
    console.log("Error occur at connection", e)
})





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

