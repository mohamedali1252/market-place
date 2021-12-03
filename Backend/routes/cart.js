const router = require("express").Router();
const {checkUser,verifyTokenAndAuthirization, verifyTokenAndAdmin }=require("./verifyToken");
const Cart = require("../models/Cart");

//CREATE
//replace with verifyTokenAndAdmin if the admin can create product
router.post("/", checkUser ,async( req,res)=>{ //everone can create product
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
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id,{
            $set:req.body,
        },{new:true});
        res.status(200).json(updatedCart);
    }catch(err){
        res.status(500).json(err);
    }
});

//DELETE

router.delete("/:id", checkUser ,async (req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted...");
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

