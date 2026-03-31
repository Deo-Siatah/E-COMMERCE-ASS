const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const User = require("../models/UserProfile");


exports.signup = async(req,res) => {
    try {

    const {username,password,email} = req.body;

    const EmailExists = await User.exists({email});
    if (EmailExists) return res.status(400).json({message: 'Email already exists'});

    const hashed =await  bcrypt.hash(password,10);
    const user = await User.create({username,email,password:hashed});

    const token = jwt.sign({id: user._id,username: user.username},process.env.JWT_SECRET,{
        expiresIn:'1h'
    })
    res.status(201).json({
  token,
        message: "Signup Successful",
        user: { id: user._id, username: user.username, email: user.email }
        });

} catch (error) {
    res.status(500).json({message: "Signup failed", error: error.message})
}
}

exports.login = async(req,res) => {
    try {
        const {email,password} = req.body;

        const user = await User.findOne({email}).lean();
        if (!user) return res.status(404).json({message: "User Not Found"});

        const match = await bcrypt.compare(password,user.password);
        if (!match) return res.status(401).json({message: "Incorrect Password"});

        const token = jwt.sign({
            id:user._id,username:user.username
        },process.env.JWT_SECRET,{
            expiresIn:'1h'
        });
        res.status(201).json({token, message:"Login Successful"});

    } catch(error) {
        res.status(500).json({message: "Login failed",error: error.message})
    }
}