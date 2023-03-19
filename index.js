const express = require('express')
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')

mongoose.connect(process.env.MONGO_URI)
                .then(()=>{console.log("Db connection successful")})
                .catch((err)=>{console.log(err)})

app.use(express.json());
app.use(cors());
app.use("/api/auth",authRoute)
app.use("/api/user",userRoute)
app.listen(process.env.PORT || 5000, ()=>{
    console.log("Backend server is running..");
})