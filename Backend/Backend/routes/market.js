const router = require("express").Router();
const {checkUser, verifyTokenAndAdmin }=require("./verifyToken");
const Market = require("../models/Market");
const Product = require("../models/Product");
const {asyncForEach} = require("sequential-async-foreach");




//CREATE
//replace with verifyTokenAndAdmin if the admin can create product
router.post("/", checkUser ,async( req,res)=>{ //everone can create product
    const neworder = new Market(req.body);
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
router.put("/:userId/:productId",checkUser ,async (req,res)=>{
    try{
        const updatedMarket = await Market.findOneAndUpdate({userId:req.params.userId},{
            $push:{productId2:req.params.productId}
        },{new:true});
        res.status(200).json(updatedMarket);
    }catch(err){
        res.status(500).json(err);
    }
});




//GET ALL PRODUCTS OF THE MARKET
router.get("/getMyProducts/:userid", checkUser ,async (req,res)=>{
    try{
        const market = await Market.findOne({userId:req.params.userid});
        const IDs = market.productId1;
        var products = [];
        await asyncForEach(IDs, async (ID) => {
            var obj = {};
            const product = await Product.findById(ID);
            obj['title'] = product.title;
            obj['categories'] = product.categories;
            obj['price'] = product.price;
			obj['img']=product.img;
            products.push(obj);
        });
        if(products){
            res.status(200).json(products);
        }
        else{
            res.status(200).json("there is no products");
        }
    }catch(err){
        res.status(500).json(err);
    }
});

//GET ALL PRODUCTS OF THE MARKET
router.get("/getOthersProduct/:userid", checkUser ,async (req,res)=>{
    try{
        const market = await Market.findOne({userId:req.params.userid});
        const IDs = market.productId2;
        var products = [];
        await asyncForEach(IDs, async (ID) => {
            var obj = {};
            const product = await Product.findById(ID);
            obj['title'] = product.title;
            obj['categories'] = product.categories;
            obj['price'] = product.price;
			obj['img']=product.img;
            products.push(obj);
        });
        if(products){
            res.status(200).json(products);
        }
        else{
            res.status(200).json("there is no products");
        }
    }catch(err){
        res.status(500).json(err);
    }
});
//DELETE

router.delete("/:id", checkUser ,async (req,res)=>{
    try{
        await Market.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted...");
    }catch(err){
        res.status(500).json(err);
    }
});

//GET USER ORDERS 
router.get("/find/:id", checkUser ,async (req,res)=>{
    try{
        const orders = await Market.find({userId:req.params.id});
        res.status(200).json(orders);
    }catch(err){
        res.status(500).json(err);
    }
});

//GET ALL ORDERS
router.get("/",verifyTokenAndAdmin,async (req,res)=>{
    try{
        const orders = await Market.find();
        res.status(200).json(orders);
    }catch(err){
        res.status(500).json(err);
    }
});


module.exports = router ;

