const mongoose =require("mongoose");
const Joi=require("joi");

const Schema = new mongoose.Schema({
  // ProductId: {
  //   type: String,
  //   required: true,
  //   unique: true
  // },
  Name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  MinAmount: {
    type: Number,
    required: true
  },
     supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }


}, { timestamps: true });





module.exports=mongoose.model('Product', Schema);
