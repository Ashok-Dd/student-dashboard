import { Router } from "express";
import { AddCourse, enrollInCourse, getAllCourses, getAllCoursesOfAStudent, getEnrolledCourses, RemoveCourse, sendCourseAndStudentsEnrolled } from "../controllers/CourseControllers.js";
import multer from "multer";
import { verifyToken } from "../middlewares/verifyToken.js";
const upload = multer({limits : {fileSize : 1024 * 1000}})

const courseRouter = Router()

courseRouter.post('/add-course' , upload.single('poster') , AddCourse)
courseRouter.get('/get-all-courses' , getAllCourses);
courseRouter.post('/remove' , verifyToken , RemoveCourse)
courseRouter.post('/enroll-student' , verifyToken , enrollInCourse);
courseRouter.get('/enrolled-courses' , verifyToken , getEnrolledCourses)
courseRouter.post('/get-all-courses-of-student' , getAllCoursesOfAStudent);
courseRouter.get('/get-students-course-status' , sendCourseAndStudentsEnrolled)


export default courseRouter