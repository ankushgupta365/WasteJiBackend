const router = require('express').Router();
const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require("./verifyToken")
const bcrypt = require("bcryptjs");
const Pickup = require('../models/PickupDetail');

//in all the routes below we have used verifyTokenAnd... middleware which are imported from a file, which basically calls next fxn after getting jsonwebtoken from the headers and verifying it. if next fxn within them is called then the async fxn get it's turn to run

router.post("/",async(req,res)=>{
    const newPickup = new Pickup(req.body);
    try {
        const savedPickup = await newPickup.save();
        res.status(201).json(savedPickup)
    } catch (error) {
        res.status(500).json(error);
    }
})
router.get("/",async(req,res)=>{
    try {
        const allPickups = await Pickup.find({});

        res.status(200).json(allPickups);
     
    } catch (error) {
        res.status(500).json(error);
    }
    
})
router.get("/:id",verifyTokenAndAuthorization,async(req,res)=>{
    try {
        const singlepickup = await Pickup.findById(req.params.id);
        res.status(200).json(singlepickup);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.delete("/:id",verifyTokenAndAuthorization,async(req,res)=>{
    try {
        const deletedPickup = await Pickup.findOneAndDelete(req.params.id);
        res.status(200).json(deletedPickup)
    } catch (error) {
        res.status(500).json(error);
    }
})
module.exports = router