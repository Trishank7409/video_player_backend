import mongoose,{ Schema } from "mongoose";

const likesSchema= new Schema({
    likedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    video: {
        type: Schema.Types.ObjectId,
        ref: "Video",
        required: true
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        required: true
    },
    tweet: {
        type: Schema.Types.ObjectId,
        ref: "Tweet",
        required: true
    }

})

export const Likes= mongoose.model("Likes",{likesSchema})