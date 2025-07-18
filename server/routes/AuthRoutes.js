import { Router } from "express";
import { checkAuth, getLeetcodeProfile, isPasswordValid, Login, logout, Register } from "../controllers/AuthControllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router()

router.post('/login' , Login);
router.post('/register' , Register);
router.get('/check-auth' , verifyToken , checkAuth)
router.post('/logout' , logout)
router.post('/validate-password' , isPasswordValid)
router.post('/get-leetcode-profile' , getLeetcodeProfile)
export default router