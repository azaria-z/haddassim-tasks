const mongoose =require("mongoose");
const Joi=require("joi");

const Schema = new mongoose.Schema({
  // OrdersId: {
  //   type: String,
  //   required: true,
  //   unique: true
  // },
  date: {
    type: String,
    required: true
  },
 products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }],

    status: {
    type: String,
    default: "pending",
    required: true
  },
    supplier: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Supplier', 
    required: true 
  }

}, { timestamps: true });



//בדיקת תקינות

module.exports=mongoose.model('Order', Schema);