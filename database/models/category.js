const mongoose=require("mongoose");
require("../connect")

const categorySchema=mongoose.Schema({
    category:{
        type:String,
        require:true,
        trim:true,
        lowercase:true
    }
})

const model=mongoose.model("category",categorySchema,"category");

module.exports=model;