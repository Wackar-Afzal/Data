const jwt =require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const asynHandler=require("express-async-handler");
const {User}=require("../models/userModel");


// @desc    Register new user
// @routes  Post /api/users
// acess    Public
const registerUser=asynHandler(async(req,res)=>{

    const {name,email,password,person}=req.body;

    if(!name|| !email || !password || !person){
        res.status(400)
        throw new Error("Please add all feild")
    }

    // check if user exit
    const userExits=await User.findOne({email})
    if(userExits){
        res.status(400)
        throw new Error("User already exit")
    }

    // Hashpassword
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)

    // create user
    const user =await User.create({
        name,
        email,
        password:hashedPassword,
        person
    })
    if(user){
        res.status(201).json({
        _id:user.id,
        name:user.name,
        email:user.email,
        person:user.person,
        token:generateToken(user._id),
        // password:user.password
    })
    }else{
        res.status(400)
        throw new Error("invalid user data")
    }
})

// @desc    Authenticate
// @routes  Post /api/users/login
// acess    Public
const loginUser=asynHandler(async(req,res)=>{

    const {email,password,person}=req.body;
    if(!email || !password){
        res.status(400)
        throw new Error("invalid credentials or missing some feilds")
    }
    const user=await User.findOne({email})

    if(user && (await bcrypt.compare(password,user.password))){
        console.log(user)
        res.status(201).json({
        _id:user.id,
        name:user.name,
        email:user.email,
        person:user.person,
        token:generateToken(user._id),
    })
    }else{
        res.status(400)
        throw new Error("invalid credentials")
    }
})


// @desc    Get user data
// @routes  Get /api/users/me
// acess    Private
const getMe=asynHandler(async(req,res)=>{
    console.log(req.user)
    res.status(200).json(req.user)
})

// generate Jwt 
const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"30d",
    })
}


module.exports={
    registerUser,
    loginUser,
    getMe
}