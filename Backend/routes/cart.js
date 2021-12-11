const router = require("express").Router();
const {checkUser,verifyTokenAndAuthirization, verifyTokenAndAdmin }=require("./verifyToken");
const Cart = require("../models/Cart");
const User = require("../models/User");


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
        const updatedCart = await Cart.findOneAndUpdate({userId:req.params.id},{
            $push:req.body,
        },{new:true});
        res.status(200).json(updatedCart);
    }catch(err){
        res.status(500).json(err);
    }
});
//cart in register


//GET TOTAL OF THE CART
router.get("/getTotal/:userid", checkUser ,async (req,res)=>{
    try{
        const cart = await Cart.findOne({userId:req.params.userid});
        const products = cart.products;
        var price = 0;
        await asyncForEach(products, async (product) => {
            const quantity = product.quantity;
            const pro = await Product.findById(product.productId);
            price += (pro.price * quantity);
        });
        res.status(200).json(price);
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

//DELETE THE CART PRODUCT
router.delete("/updateproduct/:userid/:productid", checkUser ,async (req,res)=>{
    try{
        const product = await Cart.findOneAndUpdate({userId:req.params.userid},{ $pull: { products : { productId: req.params.productid} } },{new:true});
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

const Product = require("../models/Product");
const {asyncForEach} = require("sequential-async-foreach");





//GET ALL PRODUCTS OF THE CART
router.get("/getCARTProducts/:userid", checkUser ,async (req,res)=>{
    try{
        const cart = await Cart.findOne({userId:req.params.userid});
        const products = cart.products;
        var elements = [];
        await asyncForEach(products, async (product) => {
            var obj = {};
            const pro = await Product.findById(product.productId);
			obj['_id'] = pro._id;
            obj['title'] = pro.title;
            obj['img'] = pro.img;
            obj['price'] = pro.price;
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


module.exports = router ;

