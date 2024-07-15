const mongoose=require("mongoose");
require("../connect")

const paymentSchema=mongoose.Schema({
    date:{
        type:date,
        required:true
    },
    cartId:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        required:true
    }
})

const model=mongoose.model("payment",paymentSchema,"payment")

module.exports(model);