const mongoose=require("mongoose");
require("../connect.js");

const productSchema=mongoose.Schema({
    name:{
        type:String,
        lowercase:true,
        required:true,
        trim:true
    },
    discription:{
        type:String,
        lowercase:true,
        required:true
    },
    stock:{
        type:Number,
        min:0,
        default:1,
        required:true
    },
    price:{
        type:Number,
        required:true,
        default:0,
        min:0
    },
    categoryId:{
        type:mongoose.Schema.ObjectId,
        required:true
    }
})

const model=mongoose.model("products",productSchema,"products");

module.exports=model;