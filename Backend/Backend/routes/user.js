const router = require("express").Router();
const {checkUser,verifyTokenAndAuthirization, verifyTokenAndAdmin }=require("./verifyToken");
const User = require("../models/User");
const bcrypt = require('bcrypt');
const Product = require("../models/Product");
const {asyncForEach} = require("sequential-async-foreach");


//UPDATE
router.put("/:id",checkUser ,async (req,res)=>{
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
router.get("/find/:id", checkUser ,async (req,res)=>{
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
router.get("/stats",checkUser,async (req,res)=>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth((date.getMonth() - 1)));//it gonna return us the last year
    try{
        const data = await User.aggregate([
            {$match:{createdAt: {$gte:lastMonth}}},
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

//product seller buyer date price 
router.get("/generateTransactionReport",checkUser,async (req,res)=>{
    try{
        const products = await Product.find({selled:true});
        var elements = [];
        await asyncForEach(products,async (product) => {
            var obj = {};
            obj['title'] = product.title;
            const seller = await User.findById(product.sellerId);
            obj['seller'] = seller.username;
            const buyer = await User.findById(product.buyerId);
            obj['buyer'] = buyer.username;
            obj['selledAt'] = product.selledAt;
            obj['price'] = product.price;
            elements.push(obj);
        });
        if(elements){
            res.status(200).json(elements);
        }
        else{
            res.status(200).json("there is no products");
        }
    }catch(err){
        res.status(500).json(err);
    }
});

//sport-clothes-food-homedevices-digitaldevices-other
router.get("/generateCategoriesReport",checkUser,async (req,res)=>{
    let sport = 0;
    let clothes = 0;
    let food = 0;
    let homedevices = 0;
    let digitaldevices = 0;
    let other = 0;
    try{
        const products = await Product.find({selled:true});
        await asyncForEach(products,async (product) => {
            const categories = product.categories;
            categories.forEach(category => {
                if(category === "sport"){
                    sport++;
                }
                else if(category === "clothes"){
                    clothes++;
                }
                else if(category === "food"){
                    food++;
                }
                else if(category === "homedevices"){
                    homedevices++;
                }
                else if(category === "digitaldevices"){
                    digitaldevices++;
                }
                else if(category === "other"){
                    other++;
                }
            });
        });
        const obj = {"sport":sport,"clothes":clothes,"food":food,"homedevices":homedevices,"digitaldevices":digitaldevices,"other":other};
        res.status(500).json(obj);
    }catch(err){
        res.status(500).json(err);
    }
});

// router.get("/generateMonthlyReport",checkUser,async (req,res)=>{

// });


module.exports = router ;
