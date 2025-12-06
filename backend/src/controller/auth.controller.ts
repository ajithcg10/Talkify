import { Request, Response } from "express";
import { isValidEmail } from "../validation/auth.validation";
import User from "../models/User";
import bcrypt from "bcryptjs";
import generateToken from "../lib/utils";

export const signup = async (req: Request, res: Response) => {
    console.log("BODY RECEIVED:", req.body);
    const { fullName, email, password } = req.body;

    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            fullName,
            password: hashedPassword
        });

        await newUser.save();

        generateToken(newUser._id.toString(), res);

        res.status(201).json({ user: {
            _id: newUser._id,
            email: newUser.email,
            fullName: newUser.fullName,
            profilePic: newUser.profilePic
        }});

    } catch (error) {
        console.error("Error in signup controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
