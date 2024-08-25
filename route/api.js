const express=require ("express");
const product=require("./product");
const category=require("./category");
const cart=require("./cart");
const payment=require("./payment");
const user=require("./user");
const loginCont=require ("../controller/login");

const router=express.Router();

router.use("/product",product);
router.use("/category",category);
router.use("/cart",cart);
router.use("/payment",payment);
router.use("/user",user);

router.post("/signup",loginCont.signup)
router.post("/login",loginCont.login)

module.exports=router;