const cartModel=require("../database/models/cart")
const productsModel=require("../database/models/products");
const { checkout } = require("../route/product");

const addcart=async(req,res)=>{
    try{
        let data=await productsModel.findOne({_id:req.body.productId});
        if(!data)
        {
            res.status(400);
            res.json({message:"no such product"});
            return;
        }
        if(data.stock<req.body.qty)
        {
            res.status(400);
            res.json({message:"insufficient qyantity"});
            return;
        }
        let addcartdata=await cartModel.findOne({userId:req.userId,productId:req.body.productId,checkout:false});
        if(data.stock<(addcartdata.qty+req.body.qty))
        {
            res.status(400);
            res.json({message:"insufficient qyantity"});
            return;
        }
        if(addcartdata)
        {
            let qty=(addcartdata.qty+Number(req.body.qty));
            await cartModel.updateOne({_id:addcartdata._id},{$set:{qty:qty}})
            res.status(200)
            res.json({message:"product added into the cart"});
            return;
        }
        let cart=new cartModel({productId:req.body.productId,userId:req.userId,qty:req.body.qty})
        await cart.save();
        res.status(200)
        res.json({message:"product added into the cart"});
        return;
    }
    catch(err)
    {
        res.status(500)
        res.json({message:"server error"});
        return;
    }
}

const deletecart=async(req,res)=>{
    try{
        let data=await cartModel.findOne({productId:req.body.productId,userId:req.userId,checkout:false});
        if(!data)
        {
            res.status(400);
            res.json({message:"no such product in your cart"});
            return;
        }
        await cartModel.deleteOne({_id:data._id});
        res.status(200);
        res.json({message:"product is removed form your cart"});
        return;
    }
    catch(err)
    {
        res.status(500)
        res.json({message:"server error"});
        return;
    }
}

const viewcart=async(req,res)=>{
    try{
        let data=await cartModel.find({userId:req.userId,checkout:false});
        if(!data.length)
        {
            res.status(400);
            res.json({message:"no products in your cart"});
            return;
        }
        let product=[];
        for(let i=0;i<data.length;i++)
        {
            let productId=data[i].productId;
            let productdata=await productsModel.findOne({_id:productId},{_id:0,__v:0,categoryId:0,stock:0}).lean();
            productdata.qty=data[i].qty;
            product.push(productdata);
        }
        res.status(200);
        res.json({message:"cart items",data:product});
        return;
    }
    catch(err)
    {
        res.status(500)
        res.json({message:"server error"});
        return;
    }
}

module.exports={addcart,viewcart,deletecart};