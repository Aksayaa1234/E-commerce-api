require("../connect.js")

const mongoose=require("mongoose")

const loginScheme=mongoose.Schema({
   email:{
        type:String,
        required:true,
        lowercase:true,
        trim:true, 
        unique:true
   },
   password:{
        type:String,
        required:true,
   },
   admin:{
        type:Boolean,
        default:false
   },
   userId:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:true
   }
})

const model=mongoose.model("login",loginScheme,"login");

module.exports=model;