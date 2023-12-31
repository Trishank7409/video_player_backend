import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.js";
const router=Router()

router.route("/registration").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coveImage",
            maxCount:1
        }
    ]),
    registerUser)
export default router