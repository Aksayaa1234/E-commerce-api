const express=require ("express");
const cartCont=require("../controller/cart");
const {auth}=require ("../middleware/auth");
const payment=require("../route/payment");

const router=express.Router();

router.use("/payment",payment);

router.post("/add",auth,cartCont.addcart)
router.get("/",auth,cartCont.viewcart)
router.post("/delete",auth,cartCont.deletecart)



module.exports=router;

