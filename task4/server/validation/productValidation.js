const Joi = require('joi');

const validProduct= Joi.object({
        // ProductId:Joi.string().min(1).max(20).required(),
        name:Joi.string().min(1).max(20).required(),
        price: Joi.number().positive().required(),
        minAmount: Joi.number().min(1).required()

    });
module.exports=validProduct


