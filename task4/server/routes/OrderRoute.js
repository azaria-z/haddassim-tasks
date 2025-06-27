const express = require('express')
const router=express.Router();
const verifyJWT = require('../middleware/verifyJWT');
const { getOrders } = require('../controllers/orderController');

// router.get('/',verifyJWT,getOrders);

module.exports=router;

//יצירת הזמנה חדשה

router.post('/', async (req, res) => {
  try {
    let validBody=order(req.body);
    if(validBody.error){
          return res.status(400).json(validBody.error.details);}
    let order=new productModule(req.body);
    await order.save();
    res.status(200).send(Groups) 
    console.log("Retrieved data:", data);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
});
