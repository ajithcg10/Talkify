import jwt from "jsonwebtoken";
import { Response } from "express";


const generateToken = (userId:string, res: Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "5d",
  });

  res.cookie("jwt", token, {
    maxAge: 5 * 24 * 60 * 60 * 1000, // FIX: should be maxAge (capital A)
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production", // optional but recommended
  });

  return token;
};

export default generateToken;
