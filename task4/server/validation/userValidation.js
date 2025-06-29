// userValidation.js
const Joi = require('joi');

// ולידציה להרשמה
const registerUserValidation = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().min(9).max(10).required(),
  role: Joi.string().valid('admin', 'supplier').required(),
  supplierInfo: Joi.alternatives().conditional('role', {
    is: 'supplier',
    then: Joi.object({
      companyName: Joi.string().min(1).max(30).required(),
      products: Joi.array().items(
        Joi.object({
          name: Joi.string().required(),
          price: Joi.number().positive().required(),
          minAmount: Joi.number().min(1).required() 
        })
      ).min(1).required()
    }).required(),
    otherwise: Joi.forbidden()})

});

// ולידציה להתחברות
const loginUserValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

module.exports = {
  registerUserValidation,
  loginUserValidation
};
