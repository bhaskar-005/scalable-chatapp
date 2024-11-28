import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateJWTTokenAndSetCookie = (
  userId: any,
  username: string,
  res: Response
) => {

  const token = jwt.sign(
    { userId, username },
    process.env.JWT_SECRET! || "bhaskar",
    {
      expiresIn: "15d",
    }
  );

  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
    maxAge: 1000 * 60 * 60 * 60,
  });
};
