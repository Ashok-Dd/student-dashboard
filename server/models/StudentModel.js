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
  branch: {
    type : String ,
    enum : ['CSE' , "EEE" , 'ECE' , 'IT' , 'CSD' , 'MECH' , 'CIVIL'],
    required : true 
  },
  year : {
    type : Number ,
    min : 1 ,
    max : 4 ,
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
  fatherName : {
    type : String ,
    default : null ,
    required : false 
  },
  motherName : {
    type : String ,
    default : null ,
    required : false 
  },
  phNo : {
    type : String ,
    default : null ,
    required : false 
  },
  parentPhNo : {
    type : String ,
    default : null ,
    required : false 
  },
  address : {
    type : String ,
    default : null ,
    required : false 
  },
  schoolName : {
    type : String ,
    default : null ,
    required : false 
  },
  intermediate : {
    type : String ,
    default : null ,
    required : false 
  },
  btech : {
    type : String ,
    default : null ,
    required : false 
  },
  leetcodeUid : {
    type : String ,
    default : null ,
    required : false 
  },
  githubUid : {
    type : String ,
    default : null ,
    required : false 
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'course'
    }
  ],
})


export const Student = mongoose.model('student' , StudentSchema);


