const mongoose=require("mongoose");


const OrderSchema=new mongoose.Schema(
    {
        products:[
            {
                productId:{type:String},
                quantity:{type:Number,default:1}
            }
        ],
        cost:{type:Number,required:true},
        address:{type:Object,required:true},//becasue stripe library will return object after authintication
        status:{type:String,default:"pending"},
        userId:{ type: String ,required:true}
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model("Order",OrderSchema);
 

