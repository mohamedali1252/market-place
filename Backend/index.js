const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const userRoute=require("./routes/user");
const authRoute=require("./routes/auth");
const productRoute=require("./routes/product");
const orderRoute=require("./routes/order");
const cartRoute=require("./routes/cart");


//middelware to serve the css files 
//public folder, put the css files in it
//this folder is public so we can reach it from anywhere
app.use(express.static("public"));
app.use(express.json()); //to handle the json requests
app.use(cookieParser());
app.set('view engine','ejs');


dotenv.config(); //this is for .env

/* *******************connecting to database*********************** */

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DB connection is sucessful");
    app.listen(process.env.PORT || 5000,()=>{ 
        //if there is not port number in .env file then it will use 5000 as port number
        console.log("Backend server is running");
    });
}).catch((err)=>{console.log(err);});//this is so secret
/* ************************************************************* */

//app.use('*',checkID);
app.use("/api/user",userRoute);
app.use("/auth",authRoute);
app.use("/api/products",productRoute);
app.use("/api/orders",orderRoute);
app.use("/api/cart",cartRoute);




