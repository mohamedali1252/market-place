const router = require("express").Router();
const {checkUser,verifyTokenAndAdmin }=require("./verifyToken");
const Cart = require("../models/Cart");
const User = require("../models/User");


//CREATE

router.post("/", checkUser ,async( req,res)=>{ 
    const newcart = new Cart(req.body);
    try{
        const savedCart = await newcart.save();
        res.status(200).json(savedCart);

    }catch(err){
        res.status(500).json(err);
    }

});

//UPDATE
router.put("/:id",checkUser ,async (req,res)=>{
    try{
        const updatedCart = await Cart.findOneAndUpdate({userId:req.params.id},{
            $push:req.body,
        },{new:true});
        res.status(200).json(updatedCart);
    }catch(err){
        res.status(500).json(err);
    }
});
//cart in register




//DELETE
router.delete("/:id", checkUser ,async (req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted...");
    }catch(err){
        res.status(500).json(err);
    }
});

//DELETE THE CART PRODUCT
router.delete("/updateproduct/:userid/:productid", checkUser ,async (req,res)=>{
    try{
        const product = await Cart.findOneAndUpdate({userid:req.params.userid},{ $pull: { products : { productId: req.params.productid} } },{new:true});
        res.status(200).json(product);
    }catch(err){
        res.status(500).json(err);
    }
});



//GET USER CART 
router.get("/find/:userId", checkUser ,async (req,res)=>{
    try{
        const cart = await Cart.findOne({userId:req.params.userId});
        res.status(200).json(cart);
    }catch(err){
        res.status(500).json(err);
    }
});


//GET ALL
router.get("/",verifyTokenAndAdmin,async (req,res)=>{
    try{
        const carts = await Cart.find();
        res.status(200).json(carts);
    }catch(err){
        res.status(500).json(err);
    }
});


module.exports = router ;

