import {Router} from 'express'
import { GetAllStudents, yearWiseBranchStudentsCount } from '../controllers/StudentControllers.js';

const studentRoutes = Router() ;


studentRoutes.get('/all-students' , GetAllStudents) ;
studentRoutes.get('/get-year-wise-branch-count' , yearWiseBranchStudentsCount)

export default studentRoutes