const router = require("express").Router();
const {checkUser,verifyTokenAndAuthirization, verifyTokenAndAdmin }=require("./verifyToken");
const Product = require("../models/Product");


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

//GET ALL PRODUCTS
router.get("/", verifyTokenAndAuthirization ,async (req,res)=>{ //in the link we write products?category=tshirt it will return all the products that have tshirt in the category data
    //products?new=true it will return the last 5 data sorted by createdAt
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try{
        let products ;
        if(qNew){
            products = await Product.find().sort({createdAt:-1}).limit(5);
        }else if(qCategory){
            products = await Product.find({categories:{
                $in:[qCategory]
            }});
        }else{
            products = await Product.find();
        }
        res.status(200).json(products);
    }catch(err){
        res.status(500).json(err);
    }
});




module.exports = router ;

