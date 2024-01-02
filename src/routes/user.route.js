import { Router } from "express";
import { loggedOutUser, loginUser, refreshAccessToken, registerUser } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router=Router()

router.route("/registration").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser)



router.route("/login").post(loginUser)    


router.route("/logout").post(verifyJWT,loggedOutUser)
router.route("/refreshToken").post(refreshAccessToken)
export default router