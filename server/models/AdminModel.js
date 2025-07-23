import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : true
    } ,
    email : {
        type : String ,
        required : true
    },
    password : {
        type : String ,
        required : true 
    },
    isAdmin : {
        type : Boolean ,
        default : true
    }
})

export const Admin = mongoose.model('admin' , AdminSchema)