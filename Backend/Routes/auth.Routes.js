import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import * as AuthController from "../controller/Auth.Controller.js"

const router = Router();

router.route('/signUp').post(
  upload.fields([
    {
      name: "userCoverPhoto",
      maxCount: 1
    }
  ]),
  AuthController.postSignUp
)

router.route('/login').post(AuthController.postLogin)

router.route('/logout').post(AuthController.logout);

router.route('/checkAuth').get(AuthController.checkLogin);

export default router 