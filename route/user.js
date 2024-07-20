const express=require ("express");
const {auth}=require ("../middleware/auth");
const userCont=require("../controller/user");
const payment=require("../route/payment");

const router=express.Router();

router.use("/payment",payment)

router.post("/",auth,userCont.userdetails);

module.exports=router;