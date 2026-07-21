const User= require("../models/user")
const bcrypt= require("bcryptjs")
const jwt= require("jsonwebtoken")

const registerUser= async(req, res)=>{
    try{
        const{name, email, password}= req.body

        const existingUser= await User.findOne({email});

        if(existingUser){
            return res.status(400).json({message: "User Already Exists"})
        }

        const hashedPassword= await bcrypt.hash(password, 10)

        const user= new User({
            name,
            email,
            password: hashedPassword
        })

        await user.save()

        res.status(201).json({message:"User registered", user:{id:user._id, name: user.name, email: user.email}})

    }catch(error){
        res.status(500).json({message:error.message})
    }
}

const loginUser= async(req, res)=>{
    try{
        const{email, password}= req.body

        const user= await User.findOne({email})

        if(!user){
            return res.status(401).json({message: "Invalid email or password"})
        }
        
        const isMatch= await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(401).json({message: "Invalid email or password"})
        }

        const token= jwt.sign({id: user._id},process.env.SECRETKEY,{expiresIn: "1d"})

        res.status(200).json({message:"login successful", token})

    }catch(error){
        res.status(500).json({message:error.message})
    }
}

module.exports={registerUser, loginUser}