import createToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";


export const signUp = async (req, res) => {
    try {
                
        const { name, userName, email, password } = req.body;

        const checkUserByUserName = await User.findOne({ userName });
        if (checkUserByUserName) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const checkUserByEmail = await User.findOne({ email });
        if (checkUserByEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            userName,
            email,
            password: hashedPassword
        });

        const token = await createToken(user._id);

        res.cookie("token", token,{
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            sameSite: "Strict",
            secure: false
        })

      return  res.status(201).json({ user });

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ message: `Signup error: ${error.message}` });
    }
     
}



export const login = async (req, res) => {
    try {
        const {  email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

       
        const token = await createToken(user._id);

        res.cookie("token", token,{
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            sameSite: "Strict",
            secure: false
        })

      return  res.status(200).json({ user });

    } catch (error) {
        return res.status(500).json({ message: `Login error: ${error.message}` });
    }
     
}


export const logOut = async (req, res) => {
    try{
        res.clearCookie("token")
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        return res.status(500).json({ message: `Logout error: ${error.message}` });
    }
}