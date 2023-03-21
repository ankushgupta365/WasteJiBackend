const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

//register

router.post("/register",async(req,res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    })
    try{
        const savedUser = await newUser.save();
        res.status(201).json({ message: "User Authenticated Successfully" })
    }catch(err){
        res.status(500).json(err);
    }
})

//login 
router.post("/login",async(req,res)=>{
    try{
        //finding user with provided username
        const user = await User.findOne({ username: req.body.username });
    
        //if user does not exist
        !user && res.status(401).json("Wrong credentials");

        //calling insatance method to comparehashed password
        const isMatch = user.comparePassword(req.body.password);
        
        !isMatch && res.status(401).json("Wrong credentials");

        //if every thing is okay then send the user details except password
        const accestoken = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE})
        const { password, ...others } = user._doc;
        res.status(201).json({...others,accestoken});
    } catch (error) {
        res.status(500).json(error);
    }
    
})

module.exports = router