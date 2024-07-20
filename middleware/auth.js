const jwt = require("jsonwebtoken")
const SECRET_KEY=process.env.SECRET_KEY

const auth=(req,res,next)=>{
    try{
        let token=req.cookies.key;
        if(!token)
        {
            res.status(400);
            res.json({message:"invalid token"});
            return;
        }
        let data= jwt.verify(token,SECRET_KEY);
        req["userId"]=data.id;
        req["admin"]=data.admin;
        next();
    }
    catch(err){
        res.status(500);
        res.json({message:"server error"});
        return;
    }
}

module.exports={auth}