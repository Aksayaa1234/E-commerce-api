const express=require("express")
const bcrypt=require("bcrypt");
const {v4}=require("uuid");
const jwt = require("jsonwebtoken")

const port=3000;
const app=express();
const secret_key="abcd@1234";

const loginModel=require("./database/models/login");
const userModel=require("./database/models/user");
const cookieParser = require("cookie-parser");

const auth=async(req,res,next)=>{
    try
    {
        if(!req.headers["authorization"])
        {
            res.status(400);
            res.json({message:"please give email and password"});
            return;
        }
        let authdata=req.headers["authorization"].split(" ")[1]
        let str=atob(authdata);
        let [email,password]=str.split(":");
        let userData=await loginModel.findOne({email:email})
        if(!userData)
        {
            res.status(400);
            res.json({message:"wrong email"})
            return;
        }
        if(await bcrypt.compareSync(password,userData.password))
        {
            next()
            return;
        }
        res.status(400);
        res.json({message:"invalid password"});
    }
    catch(err)
    {
        console.log(err);
        res.status(500);
        res.json({message:err});
    }
}

const auth2=async(req,res,next)=>{
    try{
        let key=req.query.key;
        let data=await userModel.findOne({key:key})
        if(!data)
        {
            res.status(400);
            res.json({message:"invalid key"});
            return;
        }
        req["user"]=data._id;
        next();
    }
    catch(err)
    {
        res.status(500);
        res.json({message:"server error"});
    }
}

const auth3=async(req,res,next)=>{
    try{
        let token=req.cookies.key;
        if(!token)
        {
            res.status(400);
            res.json({message:"invalid user"});
            return;
        }
        let data=jwt.verify(token,secret_key);
        if(!data)
        {
            res.status(400);
            res.json({message:"invalid user"});
            return;
        }
        req.userId=data.id;
        req.admin=data.admin;
        // console.log(data);
        next();
    }
    catch(err)
    {
        res.status(500);
        res.json({message:"server error"});
        return;
    }
}

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser())

app.post("/basic_auth",auth,(req,res)=>{
    res.json({message:"valid user"});
})

app.post("/api_key",auth2,(req,res)=>{
    res.json({message:"valid user"});
})

app.post("/jwt",auth3,(req,res)=>{
    res.json({message:"valid user",data:req.userId});
})

app.post("/signup",async(req,res)=>{
    try{
        let data=await loginModel.findOne({email:req.body.email})
        
        if(data)
        {
            res.status(400);
            res.json({message:"email already exist"});
            return;
        }
        let key=v4();
        let user=new userModel({name:req.body.name,age:req.body.age,location:req.body.location,pincode:req.body.pincode,key:key})
        let userData=await user.save()
        let password=await bcrypt.hash(req.body.password,10)
        let login=new loginModel({email:req.body.email,password:password,userId:userData._id})
        await login.save()
        res.status(200)
        res.json({message:"user added"})
    }
    catch(err){
        console.log(err)
        res.status(500)
        res.json({message:"invalid"})
    }
})

app.post("/login",async(req,res)=>{
    try{
        let data=await loginModel.findOne({email:req.body.email});
        if(!data)
        {
            res.status(400);
            res.json({message:"email id does not exist"});
            return;
        }
        if(await bcrypt.compare(req.body.password,data.password))
        {
            let token=jwt.sign({id:data.userId,admin:data.admin},secret_key);
            res.cookie("key",token);
            res.status(200);
            res.json({message : "valid user"})
            return;
        }
        res.status(400);
        res.json({message:"invalid password"});
    }
    catch(err)
    {
        console.log(err)
        res.status(500)
        res.json({message:"invalid"})
    }
})

app.get("/health_check",(req,res)=>{
    res.json({message:"running fine"})
})

app.listen(port,()=>{
    console.log(`server is running in port ${port}`)
});