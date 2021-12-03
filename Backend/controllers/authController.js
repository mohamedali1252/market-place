const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
//to set cookie res.cookie('cookie-name',value);
//session cookie means that whenever we close the browser then the cookie will be deleted
//to get cookie, it will be sended with every req in handlers becasue we use cookie-parser
//const cookies = req.cookies;


//const {verifyToken,verifyTokenAndAuthirization, verifyTokenAndAdmin }=require("../routes/verifyToken");

//handle errors
const handleErrors = (err)=>{
    console.log(err.message,err.code);//err.message will return the error we have //err.code will return the error if the value is not unique
    let errors = {username:'',email:'',password:'',mess:''};   
    //duplicate error code
    if (err.code === 11000 ){
            errors.mess = 'this username or email is already used';
            return errors;
    }
    //validation errors
    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path]=properties.message;
        });
    }

    //incorrect username
    if (err.message === 'incorrect username'){
        errors.username = 'incorrect username';
    }

    //incorrect password
    if (err.message === 'incorrect password'){
        errors.password = 'incorrect password';
    }
    return errors;
};



const maxAge = 1 * 24 * 60 * 60; //to be in seconds
const createToken  = (user)=>{
    return jwt.sign({
        id:user._id,
        isAdmin:user.isAdmin //this is the payload that the token will be generated based on
    },process.env.JWT_SEC,{
        expiresIn: maxAge //it will expire in 1 day
    });
};

module.exports.register_get = (req,res)=>{
    //res.render('register'); //automatically it will look into the views folder for file called register
    res.render('signup');
};


module.exports.login_get = (req,res)=>{
    res.render('login');//automatically it will look into the views folder for file called login
};

module.exports.register_post = async (req,res)=>{
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:req.body.password
        });
        try{
            const savedUser= await newUser.save();//to save the newUser in the DB
            const token = createToken (savedUser);
            res.cookie('jwt',token, {httpOnly:true,maxAge: maxAge*1000});
            res.status(201).json({id:savedUser._id});//success
        }catch(err){
            const errors = handleErrors(err);
            res.status(500).json({errors});
        }

};







module.exports.login_post = async (req,res)=>{
    const {username,password}=req.body;

    try{
        const user = await User.login(username,password);
        //const accessToken = createToken (user);
        //const {password, ...others}= user._doc; //to send everything but not the password
        const token = createToken (user);
        res.cookie('jwt',token, {httpOnly:true,maxAge: maxAge*1000});
        res.status(200).json({user:user._id});
    }catch(err){
        const errors = handleErrors(err);

        res.status(400).json({errors});
    }
};


module.exports.logout_get = (req,res)=> {
    res.cookie('jwt','',{maxAge:1});//we replace the cookie in the client side with an empty one with very short maxAge
    //res.redirect('/homepage');//redirect them to the homepage after logging out
    res.status(200).json('Logged out');
};