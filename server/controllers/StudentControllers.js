import { Student } from "../models/StudentModel.js";


export const GetAllStudents = async(req , res) => {
    try {
        const students = await Student.find() ;
        return res.status(200).json({success : true , students})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success : false , message : "Internal server issue"});
    }
}


export const yearWiseBranchStudentsCount = async(req , res) => {
    try {
        const students = await Student.find() ;
        let obj = {
            "1st" : [
                {branch : "CSE" , students : 0},
                {branch : "ECE" , students : 0},
                {branch : "EEE" , students : 0},
                {branch : "MECH" , students : 0},
                {branch : "CIVIL" , students : 0},
                {branch : "IT" , students : 0},
                {branch : "CSD" , students : 0},
            ] ,
            "2nd" : [
                {branch : "CSE" , students : 0},
                {branch : "ECE" , students : 0},
                {branch : "EEE" , students : 0},
                {branch : "MECH" , students : 0},
                {branch : "CIVIL" , students : 0},
                {branch : "IT" , students : 0},
                {branch : "CSD" , students : 0},
            ] ,
            "3rd" : [
                {branch : "CSE" , students : 0},
                {branch : "ECE" , students : 0},
                {branch : "EEE" , students : 0},
                {branch : "MECH" , students : 0},
                {branch : "CIVIL" , students : 0},
                {branch : "IT" , students : 0},
                {branch : "CSD" , students : 0},
            ] ,
            "4th" : [
                {branch : "CSE" , students : 0},
                {branch : "ECE" , students : 0},
                {branch : "EEE" , students : 0},
                {branch : "MECH" , students : 0},
                {branch : "CIVIL" , students : 0},
                {branch : "IT" , students : 0},
                {branch : "CSD" , students : 0},
            ]
        }


        students.map((student) => {
            if(student.year === 1){
                if(student.branch === 'CSE') {
                    obj["1st"][0].students += 1 
                }else if(student.branch === 'ECE'){
                    obj["1st"][1].students += 1 
                }else if(student.branch === 'EEE'){
                    obj["1st"][2].students += 1 
                }else if(student.branch === 'MECH'){
                    obj["1st"][3].students += 1 
                }else if(student.branch === 'CIVIL'){
                    obj["1st"][4].students += 1 
                }else if(student.branch === 'IT'){
                    obj["1st"][5].students += 1 
                }else if(student.branch === 'CSD'){
                    obj["1st"][6].students += 1 
                }
            }
            else if(student.year === 2){
                if(student.branch === 'CSE') {
                    obj["2nd"][0].students += 1 
                }else if(student.branch === 'ECE'){
                    obj["2nd"][1].students += 1 
                }else if(student.branch === 'EEE'){
                    obj["2nd"][2].students += 1 
                }else if(student.branch === 'MECH'){
                    obj["2nd"][3].students += 1 
                }else if(student.branch === 'CIVIL'){
                    obj["2nd"][4].students += 1 
                }else if(student.branch === 'IT'){
                    obj["2nd"][5].students += 1 
                }else if(student.branch === 'CSD'){
                    obj["2nd"][6].students += 1 
                }
            }
            else if(student.year === 3){
                if(student.branch === 'CSE') {
                    obj["3rd"][0].students += 1 
                }else if(student.branch === 'ECE'){
                    obj["3rd"][1].students += 1 
                }else if(student.branch === 'EEE'){
                    obj["3rd"][2].students += 1 
                }else if(student.branch === 'MECH'){
                    obj["3rd"][3].students += 1 
                }else if(student.branch === 'CIVIL'){
                    obj["3rd"][4].students += 1 
                }else if(student.branch === 'IT'){
                    obj["3rd"][5].students += 1 
                }else if(student.branch === 'CSD'){
                    obj["3rd"][6].students += 1 
                }
            }
            else{
                if(student.branch === 'CSE') {
                    obj["4th"][0].students += 1 
                }else if(student.branch === 'ECE'){
                    obj["4th"][1].students += 1 
                }else if(student.branch === 'EEE'){
                    obj["4th"][2].students += 1 
                }else if(student.branch === 'MECH'){
                    obj["4th"][3].students += 1 
                }else if(student.branch === 'CIVIL'){
                    obj["4th"][4].students += 1 
                }else if(student.branch === 'IT'){
                    obj["4th"][5].students += 1 
                }else if(student.branch === 'CSD'){
                    obj["4th"][6].students += 1 
                }
            }
        })

    return res.status(200).json({success : true , obj})

    } catch (error) {
        console.log(error);
        return res.status(500).json({success : false , message : "Internal server issue ..."})
    }
}

