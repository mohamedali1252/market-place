const mongoose=require("mongoose");


const MarketSchema=new mongoose.Schema(
    {
        userId:{ type: String ,required:true,unique:true},
        productId1:{type:Array},
        productId2:{type:Array}
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model("Market",MarketSchema);
 

