import { Router } from "express";
import { addStudent, adminLogin, adminRegister, removeStudent } from "../controllers/AuthControllers.js";

const adminRouter = Router();

adminRouter.post('/login' , adminLogin) ;
adminRouter.post('/register' , adminRegister);
adminRouter.post('/add-student' , addStudent);
adminRouter.post('/remove-student' , removeStudent)

export default adminRouter