const express = require("express");
const {addProductsController, getProductsController} = require("../controllers/productController")
const router = express.Router();

router.post("/addAllProducts", addProductsController);   //run this script initially when you run project locally, to add Products from faker
router.get("/getProducts", getProductsController)

module.exports = router;