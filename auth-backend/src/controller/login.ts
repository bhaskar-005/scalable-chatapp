import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { userSchema } from "../model/user.model";
import { generateJWTTokenAndSetCookie } from "../utils/Cookie";

const loginController:any = async(req:Request,res:Response)=>{
    try {
        const {username, password} = req.body;
        const foundUser = await userSchema.findOne({username});
        const hashedPassword = await bcrypt.hash(password, 10);

        if(!foundUser) {
            const user = new userSchema({
              username: username,
              password: hashedPassword,
            });
            await user.save();
            generateJWTTokenAndSetCookie(user._id, user.username, res);
            return res.status(201).json({_id: user._id, username: user.username});
        } else {
            const passwordMatch = await bcrypt.compare(password, foundUser?.password);
            if(!passwordMatch) {
                return res.status(401).json({message: "Auth failed,wrong password"});
            }
            generateJWTTokenAndSetCookie(foundUser._id, foundUser.username, res);
            return res.status(201).json({_id: foundUser._id, username: foundUser.username});
        }

    } catch(error) {
        console.log(error);
        return res.status(500).json({message: "Login failed!"});
    }
}
export default loginController;