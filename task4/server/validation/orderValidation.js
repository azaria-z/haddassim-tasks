
const Joi = require('joi');

const validOrder=Joi.object({
        // OrdersId:Joi.string().min(1).max(20).required(),
        products: Joi.array().items(Joi.object({
            productId: Joi.string().length(24).hex().required(),
            quantity: Joi.number().min(1).required()
      })).min(1).required(),
        supplier: Joi.string().length(24).required()

    })


 module.exports=validOrder;
