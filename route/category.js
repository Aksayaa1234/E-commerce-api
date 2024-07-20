const express=require ("express");
const productsCont=require("../controller/products");
const {auth}=require ("../middleware/auth");
const product=require("./product")

const router=express.Router();

router.use("/product",product);

// router.post("/product",auth,productsCont.viewcategoryproducts)
// router.post("/product/price",auth,productsCont.viewproductsprice)
router.get("/",auth,productsCont.viewcategory)

module.exports=router;