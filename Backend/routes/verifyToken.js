const jwt = require("jsonwebtoken");
const User = require("../models/User");


const checkUser =  (req,res,next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,process.env.JWT_SEC, async (err,decodedToken)=>{
            if(err){
                //res.redirect('/login');
                res.status(403).json("Token is not valid!");
            }
            else{
                //req.user=user;
                req.user = decodedToken;
                next();
            }

        });
    }
    else{
        res.status(403).json("You are not authenticated!!");
    }
};




const verifyTokenAndAuthirization = (req,res,next)=>{
    checkUser(req,res,()=>{
        if(req.user.id===req.params.id || req.user.isAdmin ){
            next();
        }else{
            res.status(403).json("You are not allowed to do that!");
        }
    });
};


const verifyTokenAndAdmin = (req,res,next)=>{
    checkUser(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }else{
            res.status(403).json("You are not allowed to do that!!");
        }
    });
};






module.exports = {checkUser,verifyTokenAndAuthirization,verifyTokenAndAdmin} ;