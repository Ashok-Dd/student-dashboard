import { Router } from "express";
import { addStudent, adminLogin, adminRegister } from "../controllers/AuthControllers.js";

const adminRouter = Router();

adminRouter.post('/login' , adminLogin) ;
adminRouter.post('/register' , adminRegister);
adminRouter.post('/add-student' , addStudent);


export default adminRouter