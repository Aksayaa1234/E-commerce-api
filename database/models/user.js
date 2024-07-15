const mongoose=require("mongoose")
require("../connect.js")

const userSchema=mongoose.Schema({
    name:{
        type:String,
        lowercase:true,
        required:true,
        trim:true
    },
    age:{
        type:Number,
        min:10,
        max:70,
        required:true
    },
    location:{
        type:String,
        lowercase:true,
        trim:true,
        required:true
    },
    pincode:{
        type:Number,
        required:true,
        default:640000
    },
    // key:{
    //     type:String,
    //     require:true
    // }
})

const model=mongoose.model("user",userSchema,"user")

module.exports=model;