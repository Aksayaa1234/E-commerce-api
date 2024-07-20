const express=require ("express");
const {auth}=require ("../middleware/auth");
const paymentCont=require("../controller/payment");
const userCont=require("../controller/user");

const router=express.Router();

router.get("/",auth,paymentCont.billing);
router.get("/add",auth,paymentCont.addtopayment);
router.post("/history",auth,userCont.paymenthistory);

module.exports=router;