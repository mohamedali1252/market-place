const mongoose=require("mongoose");
const ProductSchema=new mongoose.Schema(
    {
        title:{ type: String ,required:true, unique: true},
        desc:{ type: String ,required:true },
        img:{ type: String ,required:true},
        categories:{ type: Array},
        price:{ type: Number ,required:true},
        sellerId:{ type: String ,required:true},
        buyerId:{type:String,default:""},
        selledAt:{type:Date},
        quantity:{type:Number,default:1},
        selled:{type:Boolean,default:false} //if selled true,not selled false
    }
);



module.exports = mongoose.model("Product",ProductSchema);
 

