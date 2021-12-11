const router = require("express").Router();
const {checkUser,verifyTokenAndAuthirization, verifyTokenAndAdmin }=require("./verifyToken");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const User = require("../models/User");
const Market = require("../models/Market");
const {asyncForEach} = require("sequential-async-foreach");


//CREATE
//replace with verifyTokenAndAdmin if the admin can create product
router.post("/", checkUser ,async( req,res)=>{ //everone can create product
    const newproduct = new Product(req.body);
    try{
        Product.collection.dropIndexes(function (err, results) {
            if(err){
                res.status(500).json("error in saving product");
            }
        });
        const savedProduct = await newproduct.save();
        const saveToMarket = await Market.findOneAndUpdate({userId:savedProduct.sellerId},
            {$push:{productId1:savedProduct._id}},{new:true});
        res.status(200).json(savedProduct);
    }catch(err){
        res.status(500).json(err);
    }
});

//UPDATE
router.put("/:id",checkUser ,async (req,res)=>{
    try{
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id,{
            $set:req.body,
        },{new:true});
        res.status(200).json(updatedProduct);
    }catch(err){
        res.status(500).json(err);
    }
});



//UPDATE WHEN ORDER
router.put("/confirmPayment/:userid",checkUser ,async (req,res)=>{
    let error = false;
    let errors = [];
    try{
        const UserBalance = await User.findById(req.params.userid).balance;
        const foundedProduct = await Cart.findOne({userId:req.params.userid});
        const products = foundedProduct.products;
        console.log(products);
        let totalPrice = 0;
        await asyncForEach( products ,async (product) => {
            const productId =  product.productId;
            const quantity = product.quantity;
            const savedProduct = await Product.findById(productId);
            const total = (savedProduct.price) * quantity;
            totalPrice += total;
            if(savedProduct.quantity < quantity){
                let e = "the quantity for " +savedProduct.title +" exceed the maximim limit";
                errors.push(e);
                error = true;
            }
        });

        if (totalPrice>UserBalance){
            errors.push("your balance isn't enough for this transaction");
        }
        else{
            if(!error){
                var datetime = new Date();
                var date = datetime.toISOString().slice(0,10);
                await asyncForEach( products ,async (product) => {
                    const productId =  product.productId;
                    const quantity = product.quantity;
                    const savedProduct = await Product.findById(productId);
                    const seller =  savedProduct.sellerId;
                    const total = (savedProduct.price) * quantity;
                    await User.findByIdAndUpdate(seller,{$inc:{balance:total}});
                    const newProduct1 = await Product.findByIdAndUpdate(productId,
                    {$inc:{quantity:-quantity}},{new:true});
                    const newq = newProduct1.quantity;
                    if(newq === 0){
                         await Product.findByIdAndUpdate(productId,{$set:{buyerId:req.params.userid,quantity:quantity,selled:true,selledAt:date}});
                    }
                    else{
                         const newproduct = new Product({
                             title:newProduct1.title,
                             desc:newProduct1.desc,
                             img:newProduct1.img,
                             categories:newProduct1.categories,
                             size:newProduct1.size,
                             color:newProduct1.color,
                             price:newProduct1.price,
                             sellerId:newProduct1.sellerId,
                             buyerId:req.params.userid,
                             selledAt:date,
                             quantity:quantity,
                             selled:true
                         });
                         await newproduct.save();
                    }
                    await User.findByIdAndUpdate(req.params.userid,{$inc:{balance:-total}});
                    await Cart.findOneAndDelete({userId:req.params.userid});
                    const newcart = new Cart({userId:req.params.userid});
                    const savedCart = await newcart.save();
                 });
                 res.status(200).json("the transaction was successfull");
            }
        }
        res.status(200);
    }catch(err){

        res.status(500).json(err);
    }
});

//DELETE

router.delete("/:id", checkUser ,async (req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...");
    }catch(err){
        res.status(500).json(err);
    }
});

//GET PRODUCT  
router.get("/find/:id", checkUser ,async (req,res)=>{
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    }catch(err){
        res.status(500).json(err);
    }
});

//GET ALL THE SOLD PRODUCTS
router.get("/findSoldProducts/:id", checkUser ,async (req,res)=>{
    try{
        const products = await Product.find({sellerId:req.params.id,selled:true});
        if(products){
            res.status(200).json(products);
        }else{
            res.status(200).json("no products");
        }
    }catch(err){
        res.status(500).json(err);
    }
});


//GET ALL THE BUYED PRODUCTS
router.get("/findBuyedProducts/:id", checkUser ,async (req,res)=>{
    try{
        const products = await Product.find({buyerId:req.params.id,selled:true});
        if(products){
            res.status(200).json(products);
        }else{
            res.status(200).json("no products");
        }
    }catch(err){
        res.status(500).json(err);
    }
});

//GET ALL PRODUCT  
router.get("/findAllProducts", checkUser ,async (req,res)=>{
    try{

        const products = await Product.find();
        if(products){
            res.status(200).json(products);
        }
        else {
            res.status(200).json("there is no products");
        }
    }catch(err){
        res.status(500).json(err);
    }
});

//GET PRODUCTS by name or categories
router.get("/", checkUser ,async (req,res)=>{ //in the link we write products?category=tshirt it will return all the products that have tshirt in the category data
    //products?new=true it will return the last 5 data sorted by createdAt
    // const qNew = req.query.new;
    const qCategory = req.query.category;
    const qProductName = req.query.name;
    try{
        let products ;
        // if(qNew){
        //     products = await Product.find().sort({createdAt:-1}).limit(5);
        // }
        if(qCategory){
            products = await Product.find({categories:{
                $in:[qCategory]
            }});
        }else if(qProductName){
            products = await Product.find({title:{
                $in:[qProductName]
            }});
        }
        else{
            res.status(500).json("nothing to find");
        }
        res.status(200).json(products);
    }catch(err){
        res.status(500).json(err);
    }
});



module.exports = router ;

