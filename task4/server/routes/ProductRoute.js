const express = require('express');
const router = express.Router();

const {allProduct,productsOfSupplier,addProduct,searchProduct}=require("../controllers/productController")



// GET / - מחזיר את כל המוצרים
router.get('/', allProduct);
router.get('/:supplierName',productsOfSupplier);
router.get('/products', searchProduct);
router.post('/', addProduct);



module.exports = router;
