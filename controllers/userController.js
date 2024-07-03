const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// user registration
exports.registerUser = async(req,res)=>{
    const {name, email, password} = req.body;
    try {
        // check if user already exists
        const userExists = await User.findOne({email});
        if(userExists) {
            return res.status(400).json({message:"user already exists"})
        }

        //  hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        // generate jwt token
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn:"1h"
        });

        res.status(201).json({
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// user login
exports.loginUser = async(req,res)=>{
    const {email, password} = req.body;
    try {
        // check if user already exists
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message:"invalid credentials"})
        }

        //  check password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:"invalid"})
        } 

        // generate jwt token
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn:"1hr"
        });

        res.status(200).json({
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}