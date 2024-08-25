require ("dotenv").config();
const express=require ("express");
const {auth}=require ("./middleware/auth");
const cookieParser = require("cookie-parser");
const api=require("./route/api");
const userCont=require("./controller/user");


const app=express();
const PORT=process.env.PORT;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use("/api",api);


app.get("/health_check",userCont.health_check);
// app.get("/product",auth,productsCont.viewallproducts)
// app.post("/product/add",auth,productsCont.addproduct)
// app.post("/product/delete",auth,productsCont.deleteproduct)
// app.get("/category",auth,productsCont.viewcategory)
// app.post("/category/product/view",auth,productsCont.viewcategoryproducts)
// app.post("/category/product/price",auth,productsCont.viewproductsprice)
// app.get("/cart",auth,cartCont.viewcart)
// app.post("/cart/add",auth,cartCont.addcart)
// app.post("/cart/delete",auth,cartCont.deletecart)
// app.get("/cart/payment/add",auth,paymentCont.addtopayment)
// app.get("/payment",auth,paymentCont.billing);
// app.post("/user",auth,userCont.userdetails);
// app.post("/user/payment/history",auth,userCont.paymenthistory);

app.listen(PORT,()=>{
    console.log(`server is running in port ${PORT}`);
})