const mongoose =require("mongoose");
const Joi=require("joi");

const Schema = new mongoose.Schema({
  // ProductId: {
  //   type: String,
  //   required: true,
  //   unique: true
  // },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  minAmount: {
    type: Number,
    required: true
  },
     supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }


});





module.exports=mongoose.model('Product', Schema);
