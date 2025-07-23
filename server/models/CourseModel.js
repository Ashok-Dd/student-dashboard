import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    title : {
        type : String ,
        required : true 
    },
    startDate : {
        type : Date ,
        required : true
    } ,
    endDate : {
        type : Date ,
        required : true 
    } ,
    instructor : {
        type : String ,
        required : true 
    },
    studentsEnrolled : {
        type : Number ,
        default : 0
    } ,
    poster : {
        type : String ,
        required : false
    }
})

export const Course = mongoose.model('course' , CourseSchema)