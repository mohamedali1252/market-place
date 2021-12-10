const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Market = require("../models/Market");
const Cart = require("../models/Cart");




//handle errors
const handleErrors = (err)=>{
    console.log(err.message,err.code);
    let errors = {username:'',email:'',password:'',mess:''};   
    if (err.code === 11000 ){
            errors.mess = 'this username or email is already used';
            return errors;
    }
    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path]=properties.message;
        });
    }
    if (err.message === 'incorrect username'){
        errors.username = 'incorrect username';
    }

    if (err.message === 'incorrect password'){
        errors.password = 'incorrect password';
    }
    return errors;
};



const maxAge = 1 * 24 * 60 * 60;
const createToken  = (user)=>{
    return jwt.sign({
        id:user._id,
        isAdmin:user.isAdmin
    },process.env.JWT_SEC,{
        expiresIn: maxAge 
    });
};

module.exports.register_get = (req,res)=>{
    res.render('signup');
};



module.exports.register_post = async (req,res)=>{
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:req.body.password
        });

        try{
            const savedUser= await newUser.save();
            const newMarket = new Market({
                userId:savedUser._id
            });
            const newCart = new Cart({
                userId:savedUser._id
            });
            const savedMarket = await newMarket.save();
            const savedCart = await newCart.save();
            const token = createToken (savedUser);
            res.cookie('jwt',token, {httpOnly:true,maxAge: maxAge*1000});
            res.status(201).json({id:savedUser._id,token});//success
        }catch(err){
            const errors = handleErrors(err);
            res.status(500).json({errors});
        }

};


module.exports.login_post = async (req,res)=>{
    const {username,password}=req.body;

    try{
        const user = await User.login(username,password);
        const token = createToken (user);
        res.cookie('jwt',token, {httpOnly:true,maxAge: maxAge*1000});
        res.status(200).json({user:user._id,token});
    }catch(err){
        const errors = handleErrors(err);

        res.status(400).json({errors});
    }
};


module.exports.logout_get = (req,res)=> {
    res.cookie('jwt','',{maxAge:1});
    res.status(200).json('Logged out');
};