const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const PickupSchema = mongoose.Schema({
    pincode: {type: String,required: true},
    address: {type: String,required:true},
    phone: {type: String,required: true,unique: true},
    userId: {type: mongoose.Schema.Types.ObjectId,required: true}
},{timestamps: true});

module.exports = mongoose.model("Pickup", PickupSchema);

