import { asyncHandler } from "../utils/asyncHandler.js";
import { Apierror } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";
const registerUser= asyncHandler(async(req,res)=>{
    // get user detail from frontend or postman
    // validation- not empty
    // check if user already exist:username, email
    // chck for images and then avatar
    // upload to cloudinary
    // creaate user object for mongodb-create entry in db
    // remove password and refresh token field from repomnse
    // check  for user creation 
    // return response
   
   
   const {fullname, email, username, password}= req.body
   console.log("email :",email)
   console.log("fullname :",fullname)
   console.log("username :",username)
   console.log("password :",password)
   
   if(
    [fullname, email, username, password].some((field)=>
        field?.trim()==="")
    )
   {
    throw new Apierror(400, "All fields are required")
   }

//    validation from db
const existedUser= await User.findOne({
    $or:[{username}, {email}]
}
)
console.log("this is existed user:",existedUser)

if(existedUser){
    throw new Apierror(409, "User already exist")
}
// file handling


const avatarLocalPath = req.files?.avatar?.[0]?.path;


const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
console.log("This is req.file:",req.files);


// verify image and avatar is uploaded or not

if(!avatarLocalPath){
    throw new Apierror(400,"Avatar image path is required")
}

// upload file on cloudinary

const avatar=await uploadCloudinary(avatarLocalPath)
const coverImage=await uploadCloudinary(coverImageLocalPath)

// again verify avatar is uploaded tocloudiary?
if(!avatar){
    throw new Apierror(400,"Avatar image is not uploaded to cloudinary")
}


// // make entry on DB as object

const user=await User.create({
    fullname,
    avatar:avatar.url,
    coverImage:coverImage?.url||"",
    email,
    password,
    username:username.toLowerCase()
})
// // check user is created or not by finding him and remove password and refresh token

const createdUser=await User.findById(user._id).select(
    "-password -refreshToken"
)

if(!createdUser){
    throw new Apierror(500, "user is not created")
}


// // return response


   
    res.status(200).json(
       new apiResponse(200,createdUser,"User Created successfully")
    )
})


export {registerUser}