
import Joi from "joi";

const validOrder=((_badyData)=>{
    let joiSchema=Joi.object({
        // OrdersId:Joi.string().min(1).max(20).required(),
        date:Joi.string().pattern(/^\d{2}\/\d{2}\/\d{4}$/).required(),
        products: Joi.array().items(Joi.string().length(24).hex()).min(1).required(),
        status: Joi.string().valid("pending", "approved", "shipped", "delivered", "cancelled").required(),
        supplier: Joi.string().length(24).required()

    })
    return joiSchema.validate(_badyData);
})

 module.exports=validOrder;
