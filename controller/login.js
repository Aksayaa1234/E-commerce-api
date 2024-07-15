//const express=require("express")
const loginModel=require("../database/models/login")
const userModel=require("../database/models/user")
const jwt = require("jsonwebtoken")
const bcrypt=require("bcrypt");
const SECRET_KEY="abcd@1234";

const signup=async(req,res)=>{
    try{
        let data=await userModel.findOne({email:req.body.email})
        if(data)
        {
            res.status(400);
            res.json({message:"email already exist"});
            return;
        }
        let user=new userModel({name:req.body.name,age:req.body.age,location:req.body.location,pincode:req.body.pincode})
        let userData=await user.save();
        let password=await bcrypt.hash(req.body.password,10);
        let login=new loginModel({email:req.body.email,password:password,admin:req.body.admin,userId:userData._id})
        await login.save()
        res.status(200);
        res.json({message:"user added"});
        return;
    }
    catch(err)
    {
        console.log(err)
        res.status(500)
        res.json({message:"server error"});
    }
}

const login=async(req,res)=>{
    try{
        let data=await loginModel.findOne({email:req.body.email})
        if(!data)
        {
            res.status(400)
            res.json({message:"invalid email"});
            return;
        }
        if(await bcrypt.compare(req.body.password,data.password))
        {
            let token=jwt.sign({id:data.userId,admin:data.admin},SECRET_KEY);
            res.cookie("key",token);
            res.status(200)
            res.json({message:"valid user"});
            return;
        }
        res.status(400);
        res.json({message:"wrong password"});
        return;
    }
    catch(err)
    {
        res.status(500);
        res.json({message:"server error"});
        return;
    }
}

module.exports={signup,login};