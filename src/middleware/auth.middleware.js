
import { User } from "../models/user.model.js";
import { Apierror } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import  Jwt  from "jsonwebtoken";


export const verifyJWT=asyncHandler(async(req,res,next)=>{
try {
      const token=  req.cookies?.accessToken||req.header("Authorization")?.replace("Bearer ","")
    
      if(!token){
        throw new Apierror(402,"Unautorised access")
      }
    const decodedJWT=Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
    const user=User.findById(decodedJWT?._id).select("-refreshToken -password")
    
    if(!user){
        throw new Apierror(403,"Invalid access token")
    }
    
    req.user=user
    next()
} catch (error) {
    throw new Apierror(401,error?.message||"Invalid requst")
}

})