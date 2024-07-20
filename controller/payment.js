const paymentModel=require("../database/models/payment")
const cartModel=require("../database/models/cart")
const productsModel=require("../database/models/products")

const addtopayment=async(req,res)=>{
    try{
        let data=await cartModel.find({userId:req.userId,checkout:false},{_v:0,checkout:0,useId:0,qty:0});
        if(!data)
        {
            res.status(400);
            res.json({message:"there is product added in your cart"});
            return;
        }
        let d=new Date();
        let date=d.getDate()+"-"+d.getMonth()+"-"+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
        let paymentdata=new paymentModel({date:date,cartId:data,userId:req.userId});
        await paymentdata.save();
        res.status(200)
        res.json({message:"added to payment"});
        return;
    }
    catch(err)
    {
        console.log(err);
        res.status(500)
        res.json({message:"server error"});
        return;
    }
}

const billing=async(req,res)=>{
    try{
        let amount=0;
        let paymentdata=await paymentModel.findOne({userId:req.userId},{__v:0,userId:0}).populate([
            {path:"cartId",select:"productId qty -_id",populate:
                {path:"productId",select:"-stock -categoryId -__v"}
            }
        ])
        if(!paymentdata)
        {
            res.status(400);
            res.json({message:"there is product added in your cart"});
            return;
        }
        for(let i=0;i<paymentdata.cartId.length;i++)
        {
            let productId=paymentdata.cartId[i].productId._id;
            let qty=paymentdata.cartId[i].qty;
            amount+=qty*paymentdata.cartId[i].productId.price;
            await cartModel.updateOne({userId:req.userId,productId:productId},{$set:{checkout:true}});
            let stock=await productsModel.findOne({_id:productId},{stock:1,_id:0});
            await productsModel.updateOne({_id:productId},{$set:{stock:(stock.stock-qty)}})
            //console.log(stock.stock-qty);
        }
        paymentdata._doc["total_amount"]=amount;
        res.status(200);
        res.json(paymentdata);
        return;
    }
    catch(err)
    {
        console.log(err);
        res.status(500)
        res.json({message:"server error"});
        return;
    }
}

module.exports={addtopayment,billing};