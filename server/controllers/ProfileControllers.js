import { Student } from "../models/StudentModel.js"

export const uploadProfile = async (req , res) => {
    try {
        if(!req.file) {
            return res.status(200).json({message : "File is Required !" , success : false})
        }
        let user = await Student.findById(req.userId);
        
        user.profile = req.file.buffer.toString("base64");
        await user.save();

        return res.status(200).json({success : true , user , message : "Profile Updated Successfully ."});
    } catch (error) {
        return res.status(500).json({message : "Failed to upload profile" , success : false});
    }
}


export const RemoveProfile = async (req , res) => {
    try {
        let user = await Student.findById(req.userId);        
        user.profile = ''
        await user.save();
        return res.status(200).json({success : true , user , message : "Profile removed successfully ..."})
    } catch (error) {
        return res.status(400).json({success:false , message : "Internal server error .."})   
    }
}

export const updatePersonalDetails = async(req , res) => {
    try {
        const {fatherName , motherName , phNo , parentPhNo , address} = req.body ;
        if(!fatherName || !motherName || !phNo || !address) {
            return res.status(200).json({success : false , message : "Fill every field ..."})
        }
        let user = await Student.findById(req.userId) ;
        user.fatherName = fatherName ;
        user.motherName = motherName ;
        user.phNo = phNo ;
        user.parentPhNo = parentPhNo ;
        user.address = address ;
        await user.save() ;
        return res.status(200).json({success : true , user , message : "Personal details updated sucessfully .."});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success : false , message : "Internal server issue .."}) ;
    }
}


export const updateAcademicDetails = async(req , res) => {
    try {
        const {schoolName , intermediate , btech , leetcodeUid , githubUid} = req.body ;
        if(!schoolName || !intermediate || !btech) {
            return res.status(200).json({success : false , message : "Fill every field ..."})
        }
        let user = await Student.findById(req.userId) ;
        user.schoolName = schoolName ;
        user.intermediate = intermediate ;
        user.btech = btech ;
        user.leetcodeUid = leetcodeUid ;
        user.githubUid = githubUid ;
        await user.save() ;
        return res.status(200).json({success : true , user , message : "Academic details updated sucessfully .."});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success : false , message : "Internal server issue .."}) ;
    }
}


export const isPersonalInfoUpdated = async(req , res) => {
    try {
        const user = await Student.findById(req.userId)
        if (user.fatherName){
            return res.status(200).json({success : true})
        }
        return res.status(200).json({success : false})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success : false , message : "Internal server issue.."})
    }
}


export const isAcademicInfoUpdated = async(req , res) => {
    try {
        const user = await Student.findById(req.userId)
        if (user.schoolName){
            return res.status(200).json({success : true})
        }
        return res.status(200).json({success : false})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success : false , message : "Internal server issue.."})
    }
}


export const getStudentById = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await Student.findOne({ studentId });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }

        return res.status(200).json({
            success: true,
            student,
        });
    } catch (error) {
        console.error("Error fetching student:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while fetching student",
        });
    }
};
