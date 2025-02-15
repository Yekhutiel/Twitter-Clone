import User from '../models/user.model.js';
import bcrypt from 'bcryptjs/dist/bcrypt.js';
import {generateTokenAndSetCookie} from '../lib/utils/generateToken.js'

export const signup = async (req,res) => {
    try {
        const {fullName, username, email, password} = req.body;

        console.log(req.body); // Log the entire request body
        
        console.log(`Fullname: ${fullName} \nUsername: ${username} \nemail: ${email} \npassword: ${password}`);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)){
            return res.status(400).json({error: "Invalid email format"});
        }

        const existingUser = await User.findOne({username});
        if(existingUser){
            return res.status(400).json({error: "Email already taken"});
        }

        const existingEmail = await User.findOne({email}); 
        if(existingEmail){
            return res.status(400).json({error: "User already exist"});
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword
        })

        if(newUser){
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg,
            })
        } else {
            res.status(400).json({error: "Invalid user data"});
        }
    }catch(error) {
        console.log("Error in signup controller", error.message);

        res.status(500).json({error: "Internal Server Error"});
    }
}

export const login = async (req, res) => {
    res.json({
        data: "You hit the login endpoint",
    })
}

export const logout = async (req, res) => {
    res.json({
        data: "Logged out ...",
        name: "Kevin :)"
    })
}