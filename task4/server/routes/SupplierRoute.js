const express = require('express')
const router=express.Router();
const auth= require("../middleware/verifyJWT")
const {allSupplier,findSupplierByName}= require("../controllers/supplierController")


router.get('/',auth(['admin']),allSupplier );
router.get('/find',auth(['admin']),findSupplierByName );

module.exports=router;