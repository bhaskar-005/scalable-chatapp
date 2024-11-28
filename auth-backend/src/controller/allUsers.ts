import { Request, Response } from "express";
import { userSchema } from "../model/user.model";

const allUsers:any = async(req:Request,res:Response)=>{
    try {
        const users = await userSchema.find().select('-password')
        return res.status(200).json(users);

    } catch(error) {
        console.log(error);
        return res.status(500).json({message: "Login failed!"});
    }
}
export default allUsers;