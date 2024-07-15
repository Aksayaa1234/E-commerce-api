const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/E-commerce")
.then(()=>{
    console.log("db connected sucessfull ");
})
.catch((err)=>{
    console.log(err);
})