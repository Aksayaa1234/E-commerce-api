const mongoose=require("mongoose");
require("../connect")

const cartSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    productId:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    qty:{
        type:Number,
        min:1,
        default:1,
        required:true
    }
})

const model=mongoose.model("cart",cartSchema,"cart");

module.exports=model;