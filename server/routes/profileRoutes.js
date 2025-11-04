import { Router } from "express"
import { getStudentById, isAcademicInfoUpdated, isPersonalInfoUpdated, RemoveProfile, updateAcademicDetails, updatePersonalDetails, uploadProfile } from "../controllers/ProfileControllers.js";
import multer from "multer";
import { verifyToken } from "../middlewares/verifyToken.js";
const profileRoutes = Router() ;
const upload = multer({
  limits: { fileSize: 50 * 1024 * 1024 } // 50 MB
});


profileRoutes.post('/upload-profile', verifyToken , upload.single('profile') , uploadProfile);
profileRoutes.put('/remove-profile' , verifyToken , RemoveProfile)
profileRoutes.post('/update-personal-details' , verifyToken , updatePersonalDetails) ;
profileRoutes.post('/update-academic-details' , verifyToken , updateAcademicDetails) ;
profileRoutes.get('/is-personal-info-updated' , verifyToken , isPersonalInfoUpdated)
profileRoutes.get('/is-academic-info-updated' , verifyToken , isAcademicInfoUpdated)
profileRoutes.get('/get-student/:id' , getStudentById)

export default profileRoutes ;