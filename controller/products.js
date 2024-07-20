const categoryModel=require("../database/models/category");
const productsModel=require("../database/models/products");

const addproduct=async(req,res)=>{
    try{
        if(!req.admin)
        {
            res.status(400);
            res.json({message:"invalid access"});
            return;
        }
        let categorydata=await categoryModel.findOne({category:req.body.category});
        if(!categorydata)
        {
            let category=new categoryModel({category:req.body.category});
            categorydata= await category.save();
        }
        let data= new productsModel({name:req.body.name,discription:req.body.discription,stock:req.body.stock,price:req.body.price,categoryId:categorydata._id});
        await data.save();
        res.status(200)
        res.json({message:"product added"});
        return;
    }
    catch(err)
    {
        res.status(500)
        res.json({message:"server error"});
        return;
    }
}

const viewcategory=async(req,res)=>{
    try{
        let data=await categoryModel.find({},{category:1,_id:0});
        if(!data.length)
        {
            res.status(400);
            res.json({message:"no category found"})
            return;
        }
        res.status(200);
        res.json({message:"categories",data:data})
        return;
    }
    catch(err)
    {
        res.status(500)
        res.json({message:"server error"});
        
        return;
    }
}

const viewcategoryproducts=async(req,res)=>{
    try{
        let category=await categoryModel.findOne({category:req.body.category});
        if(!category)
        {
            res.status(400);
            res.json({message:"no such category"})
            return;
        }
        let data=await productsModel.find({categoryId:category._id},{categoryId:0,_id:0,__v:0});
        if(!data.length)
        {
            res.status(400);
            res.json({message:"no products in this category"})
            return;
        }
        res.status(200);
        res.json({message:req.body.category,data:data});
        return;
    }
    catch(err)
    {
        res.status(500)
        res.json({message:"server error"});
        return;
    }
}

const viewallproducts=async(req,res)=>{
    try{
        let data=await productsModel.find({},{categoryId:0,_id:0,__v:0});
        if(!data.length)
        {
            res.status(400);
            res.json({message:"no products yet"})
            return;
        }
        res.status(200);
        res.json({message:req.body.category,data:data});
        return;
    }
    catch(err)
    {
        res.status(500)
        res.json({message:"server error"});
        return;
    }
}

const viewproductsprice=async(req,res)=>{
    try{
        console.log(req.body.userId);
        let categorydata=await categoryModel.findOne({category:req.body.category})
        if(!categorydata)
        {
            res.status(400);
            res.json({message:"no such category"})
            return;
        }
        let data=await productsModel.find({categoryId:categorydata._id,price:{$lte:req.body.max,$gte:req.body.min}},{categoryId:0,_id:0,__v:0});
        if(!data.length)
        {
            res.status(400);
            res.json({message:"no products in this category of this price range"})
            return;
        }
        res.status(200);
        res.json({message:req.body.category,data:data});
        return;
    }
    catch(err)
    {
        res.status(500)
        res.json({message:"server error"});
        return;
    }
}

const deleteproduct=async(req,res)=>{
    try{
        if(!req.admin)
        {
            res.status(400);
            res.json({message:"invalid access"});
            return;
        }
        let data=await productsModel.findOne({_id:req.body.productId});
        if(!data)
        {
            res.status(400);
            res.json({message:"no such product"});
            return;
        }
        await productsModel.deleteOne({_id:req.body.productId});
        res.status(200);
        res.json({message:"product deleted"});
        return;
    }
    catch(err)
    {
        res.status(500)
        res.json({message:"server error"});
        return;
    }
}

module.exports={addproduct,viewcategory,viewcategoryproducts,viewallproducts,viewproductsprice,deleteproduct};