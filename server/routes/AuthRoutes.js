import { Router } from "express";
import { checkAuth, ContactUs, forgetPassword, getLeetcodeProfile, isPasswordValid, isPasswordValidToRemoveStudent, Login, logout, Register, sendGenderStatus, sendOtp, sendYearData } from "../controllers/AuthControllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router()

router.post('/login' , Login);
router.post('/register' , Register);
router.get('/check-auth' , verifyToken , checkAuth)
router.post('/logout' , logout)
router.post('/validate-password' , isPasswordValid)
router.post('/to-remove-student-validate-password', verifyToken , isPasswordValidToRemoveStudent)
router.post('/get-leetcode-profile' , getLeetcodeProfile)
router.get('/get-year-data' , sendYearData) ;
router.get('/get-gender-status' , sendGenderStatus) ;
router.post('/contact-us' , ContactUs) ;
router.post('/send-otp' , sendOtp) 
router.post('/forget-password' , forgetPassword) ;




export default router