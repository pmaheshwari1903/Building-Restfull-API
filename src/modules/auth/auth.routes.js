import {Router} from 'express'
import validate from '../../common/middlewares/validate.middleware.js'
import RegisterDto from '../auth/dto/register.dto.js'
import LoginDto from './dto/login.dto.js'
import forgotPasswordDto from './dto/forgotPassword.dto.js'
import resetPasswordDto from './dto/resetPassword.dto.js'
import * as controller from "./auth.controller.js"
// import { valid } from 'joi'
import { authenticate } from './auth.middleware.js'

const router = Router()

router.post("/register", validate(RegisterDto), controller.register)
router.post("/verifyEmail/:token", controller.verifyEmail)
router.post("/login",validate(LoginDto), controller.login)
router.post("/refresh-token", controller.refreshToken)
router.post("/logout", authenticate, controller.logout)
router.post("/forgotPassword", validate(forgotPasswordDto), controller.forgotPassword)
router.put("/resetPassword", validate(resetPasswordDto), controller.resetPassword)
router.get("/myProfile", authenticate, controller.myProfile)


export default router