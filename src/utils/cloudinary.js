import {v2 as cloudinary} from 'cloudinary';
import { response } from 'express';
import fs from 'fs'
          
cloudinary.config({ 
  cloud_name: 'process.env.CLOUDINARY_CLOUD_NAME', 
  api_key: 'process.env.CLOUDINARY_API_KEY', 
  api_secret: 'process.env.CLOUDINARY_API_SECRET' 
});

// Give the file path in method

const uploadCloudinary=async (localFilePath)=>{
     try {
        if (!localFilePath)return null

        // upload the file on cloudiary
        response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        console.log("File has been uploaded",response)
     } catch (error) {
        // remove the file from the server if file is not uploaded to cloudinary
        fs.unlinkSync(localFilePath)
        return null;
        
     }
}

export {uploadCloudinary}

// cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });