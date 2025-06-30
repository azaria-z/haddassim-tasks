const express = require('express')
const router=express.Router();
const auth = require('../middleware/verifyJWT');
const { getOrders,newOrder,OrderStatuse,getOrdersOfSupplier,getCompletedOrders } = require('../controllers/orderController');
const validate=require("../middleware/validate")
const validOrder= require("../validation/orderValidation")


module.exports=router;

router.get('/', auth(['admin']),getOrders);
router.get('/supplier/:supplierId', auth(['admin']),getOrdersOfSupplier);
router.get('/completed', auth(['admin']),getCompletedOrders);
router.post('/new', auth(['admin']),validate(validOrder),newOrder);
router.put('/status/:status/order/:orderId', auth(['admin','supplier']),OrderStatuse);//יש לשנות הפונקציה המקורית
