require ("dotenv").config();
const express=require ("express");
const loginCont=require ("./controller/login");
const {auth}=require ("./middleware/auth");
const cookieParser = require("cookie-parser");
const productsCont=require("./controller/products");
const cartCont=require("./controller/cart");

const app=express();
const PORT=process.env.PORT;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

app.post("/signup",loginCont.signup)
app.post("/login",loginCont.login)
app.post("/product/add",productsCont.addproduct)
app.get("/product",productsCont.viewallproducts)
app.get("/category",productsCont.viewcategory)
app.post("/category/product",productsCont.viewcategoryproducts)
app.post("/category/product/price",productsCont.viewproductsprice)
app.post("/product/delete",productsCont.deleteproduct)
app.post("/cart/add",auth,cartCont.addcart)
app.get("/cart",auth,cartCont.viewcart)
app.post("/cart/delete",auth,cartCont.deletecart)


app.listen(PORT,()=>{
    console.log(`server is running in port ${PORT}`);
})