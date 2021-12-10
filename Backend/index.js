const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const userRoute=require("./routes/user");
const authRoute=require("./routes/auth");
const productRoute=require("./routes/product");
const marketRoute=require("./routes/market");
const cartRoute=require("./routes/cart");



app.use(express.json()); 
app.use(cookieParser());
app.set('view engine','ejs');




dotenv.config(); 

const url = 'mongodb://127.0.0.1:21010/shop';
mongoose.connect(process.env.MONGO_URL_LOCAL || url , { useNewUrlParser: true });

const db = mongoose.connection;

db.once('open', _ => {
    app.listen(process.env.PORT || 5000,()=>{ 
        console.log("Backend server is running");
    });
});
db.on('error', err => {
    console.error('connection error:', err)
});


app.use("/api/user",userRoute);
app.use("/auth/",authRoute);
app.use("/api/products",productRoute);
app.use("/api/market",marketRoute);
app.use("/api/cart",cartRoute);





