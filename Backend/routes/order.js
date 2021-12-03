const router = require("express").Router();
const {checkUser, verifyTokenAndAdmin }=require("./verifyToken");
const Order = require("../models/Order");

//CREATE
//replace with verifyTokenAndAdmin if the admin can create product
router.post("/", checkUser ,async( req,res)=>{ //everone can create product
    const neworder = new Order(req.body);
    try{
        Order.collection.dropIndexes(function (err, results) {
            if(err){
                res.status(500).json("error in saving order");
            }
        });
        const savedorder = await neworder.save();
        res.status(200).json(savedorder);

    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }

});

//UPDATE
router.put("/:id",checkUser ,async (req,res)=>{
    try{
        const updatedorder = await Order.findByIdAndUpdate(req.params.id,{
            $set:req.body,
        },{new:true});
        res.status(200).json(updatedorder);
    }catch(err){
        res.status(500).json(err);
    }
});

//DELETE

router.delete("/:id", checkUser ,async (req,res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted...");
    }catch(err){
        res.status(500).json(err);
    }
});

//GET USER ORDERS 
router.get("/find/:id", checkUser ,async (req,res)=>{
    try{
        const orders = await Order.find({userId:req.params.id});
        res.status(200).json(orders);
    }catch(err){
        res.status(500).json(err);
    }
});

//GET ALL ORDERS
router.get("/",verifyTokenAndAdmin,async (req,res)=>{
    try{
        const orders = await Order.find();
        res.status(200).json(orders);
    }catch(err){
        res.status(500).json(err);
    }
});


module.exports = router ;

