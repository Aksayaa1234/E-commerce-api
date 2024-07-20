const loginModel=require("../database/models/login");
const userModel=require("../database/models/user");
const paymentModel=require("../database/models/payment");

const userdetails=async(req,res)=>{
    try{
        if(!req.admin)
        {
            res.status(400);
            res.json({message:"invalid access"});
            return;
        }
        let userdata=await userModel.findOne({_id:req.body.userId},{__v:0});
        if(!userdata)
        {
            res.status(400);
            res.json({message:"invalid user id"});
            return;
        }
        let logindata=await loginModel.findOne({userId:req.body.userId},{_id:0,userId:0,__v:0,password:0});
        // let data=logindata+userdata;
        // console.log(data);
        res.status(200);
        res.json({message:"user details",user_data:userdata,login_data:logindata});
        return;
    }
    catch(err)
    {
        res.status(500);
        res.json({message:"server error"});
        return;
    }
}

const paymenthistory=async(req,res)=>{
    try{
        let data=await paymentModel.find({userId:req.body.userId},{__v:0,userId:0,_id:0}).populate([
            {path:"cartId",select:"productId qty -_id",populate:{path:"productId",select:"-__v -_id -stock -categoryId"}
        }
        ])
        if(!data)
        {
            res.status(400);
            res.json({message:"invalid user id or user have not purchased yet"});
            return;
        }
        res.status(200);
        res.json({data});
        return;
    }
    catch(err)
    {
        console.log(err);
        res.status(500);
        res.json({message:"server error"});
        return;
    }
}

const health_check=(req,res)=>{
    try{
        res.status(200);
        res.json({message:"server is running fine"});
        return;
    }
    catch(err)
    {
        res.status(500);
        res.json({message:"server error"});
        return;
    }
}

module.exports={userdetails,health_check,paymenthistory};