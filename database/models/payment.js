const mongoose=require("mongoose");
require("../connect")

const paymentSchema=mongoose.Schema({
    date:{
        type:String,
        required:true
    },
    cartId:[{
        type:mongoose.Schema.ObjectId,
        ref:"cart",
        required:true
    }],
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:true
    }
})

const model=mongoose.model("payment",paymentSchema,"payment")

module.exports=model;