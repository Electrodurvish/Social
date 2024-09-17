import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
//register user
export const register = async(req,res)=>
{
    try{
        const{
            firstName,
            lastName,
            email,
            password,
            picturepath,
            friends,
            location,
            occupation
        } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            picturepath,
            friends,
            location,
            occupation,
            viewedprofile:Math.floor(Math.random()*10000),
            impression:Math.floor(Math.random()*10000),

        });
        const savedUser=await newUser.save();
        res.status(201).json(savedUser)
    }
    catch(error)
    {
        console.log(error);
    }
}

//login user
export const login = async(req,res)=>
    {
        try{
            const {
                email,
                password
            } = req.body;
            const user = await User.findOne({email:email});
            if(!user)
            {
                return res.status(400).json("User not found");
            }
            const validPassword = await bcrypt.compare(password,user.password);
            if(!validPassword)
            {
                return res.status(400).json("Wrong password");
            }
            const token = jwt.sign({_id:user._id,email:user.email},process.env.SECRET_KEY);
            delete user.password;
            res.status(200).json({user,token});
        }
        catch(error)
        {
            console.log(error);
        }
    }
