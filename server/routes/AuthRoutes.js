import { Router } from "express";
import { checkAuth, Login, logout, Register } from "../controllers/AuthControllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router()

router.post('/login' , Login);
router.post('/register' , Register);
router.get('/check-auth' , verifyToken , checkAuth)
router.post('/logout' , logout)


export default router