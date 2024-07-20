const mongoose=require("mongoose");
require("../connect")

const cartSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:true
    },
    productId:{
        type:mongoose.Schema.ObjectId,
        ref:"products",
        required:true
    },
    qty:{
        type:Number,
        min:1,
        default:1,
        required:true
    },
    checkout:{
        type:Boolean,
        require:true,
        default:false
    }
})

const model=mongoose.model("cart",cartSchema,"cart");

module.exports=model;