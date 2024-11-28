import { Request, Response } from "express";
import { userSchema } from "../model/user.model";
import bcrypt from 'bcrypt';
import { generateJWTTokenAndSetCookie } from "../utils/Cookie";

const signUpController:any = async(req:Request,res:Response)=>{
  const {username,password} = req.body;
  console.log(username,password);
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const foundUser = await userSchema.findOne({username});
    if(foundUser) {
        return res.status(201).json({message: "Username already exists"});
    } else {
        const user = new userSchema({username: username, password: hashedPassword});
        await user.save();
        generateJWTTokenAndSetCookie(user._id,user.username, res);
        return res.status(201).json({message: "User registered!"});
    }

  } catch (error) {
    console.log(error);
    return res.status(404).json({
        message:'failed to sign up',
        success:false
    })
  }
}

export default signUpController;