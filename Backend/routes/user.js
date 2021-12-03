const router = require("express").Router();
const {verifyTokenAndAuthirization, verifyTokenAndAdmin }=require("./verifyToken");
const User = require("../models/User");
const bcrypt = require('bcrypt');


//UPDATE
router.put("/:id",verifyTokenAndAuthirization ,async (req,res)=>{
    if(req.body.password){
        const salt = await bcrypt.genSalt();
        req.body.password = await bcrypt.hash(req.body.password,salt);
    }
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            },{new:true});
            res.status(200).json(updatedUser);
        }catch(err){
            res.status(500).json(err);
        }

});

//DELETE

router.delete("/:id", verifyTokenAndAuthirization ,async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
    }catch(err){
        res.status(500).json(err);
    }
});

//GET USER
router.get("/find/:id", verifyTokenAndAdmin ,async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password, ...others}= user._doc;
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
});

//GET ALL USERS
// router.get("/", verifyTokenAndAdmin ,async (req,res)=>{
//     try{
//         const users = await User.find(req.params.id);
//         const {password, ...others}= users._doc;
//         res.status(200).json(others);
//     }catch(err){
//         res.status(500).json(err);
//     }
// });


//GET USER STATS

router.get("/stats",verifyTokenAndAdmin,async (req,res)=>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));//it gonna return us the last year
    try{
        const data = await User.aggregate([
            {$match:{createdAt: {$gte:lastYear}}},
            {
                $project:{
                    month : {$month : "$createdAt"}
                }
            },
            {
                $group: {
                    _id: "$month",
                    total:{$sum :1 }
                }
            }
        ]);
        res.status(200).json(data);
    }catch(err){
        res.status(500).json(err);

    }

});

module.exports = router ;
