import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    studentId: {
    type: String,
    required: true,
  },
  name : {
    type : String,
    required : true 
  } ,
  email : {
    type : String ,
    required : true,
  },
  password : {
    type : String ,
    required : true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  year : {
    type : Number ,
    required : true
  } ,
  cgpa :{
    type : Number ,
    min : 0,
    max : 10 ,
    default : 0
  } ,
  profile :{
    type : String ,
    required : false ,
    default : null
  } ,
})
export const Student = mongoose.model('student' , StudentSchema);
