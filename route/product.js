const express=require ("express");
const productsCont=require("../controller/products");
const {auth}=require ("../middleware/auth");

const router=express.Router();

router.get("/",auth,productsCont.viewallproducts)
router.post("/add",auth,productsCont.addproduct)
router.post("/delete",auth,productsCont.deleteproduct)
router.post("/price",auth,productsCont.viewproductsprice)
router.post("/view",auth,productsCont.viewcategoryproducts)


module.exports=router;