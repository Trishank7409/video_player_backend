import mongooose,{Schema} from "mongoose"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const userSchema=new Schema({

    username:{
        type:String,
        require:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        lowercase:true,
        trim:true,
        
    },
    fullname:{
        type:String,
        require:true,
        index:true,
        trim:true,
        
    },
    avatar:{
        type:String,
        require:true,

    },
    coverImage:{
        type:String, //Cloudinary URL

    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:{
        type:String,
        required:[true,"Password is require"]
    },
    refreshToken:{
        type:String

    }


},{timestamps:true})

// Encrypt the password before saving it.
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password=bcrypt.hash(this.password,10)
    next()
})

// Compare the user written password to encrypted password
userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

// Generate the access token
userSchema.methods.generateAccessToken= function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname
        },process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// Generate the Refresh Token
userSchema.methods.generateRefreshToken= function(){
    return jwt.sign(
        {
            _id:this._id,
            
        },process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User=mongoose.model("User",userSchema)