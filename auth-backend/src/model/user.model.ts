import mongoose from "mongoose";

interface User extends mongoose.Document{
    username:string,
    password:string
}
const userModel = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true})

export const userSchema = mongoose.model<User>('User',userModel);
