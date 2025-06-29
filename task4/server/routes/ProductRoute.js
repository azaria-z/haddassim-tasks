const express = require('express');
const router = express.Router();
const auth= require("../middleware/verifyJWT")
const {allProduct,productsOfSupplier,addProduct,searchProduct}=require("../controllers/productController")
const validate=require("../middleware/validate")
const validProduct= require("../validation/productValidation")

router.get('/',auth(['admin']), allProduct);
router.get('/supplier/:supplierId',auth(['admin']),productsOfSupplier);
router.get('/products',auth(['admin']), searchProduct);
router.post('/',auth(['supplier']),validate(validProduct), addProduct);



module.exports = router;
