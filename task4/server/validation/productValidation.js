import Joi from "joi";

const validProduct=((_badyData)=>{
    let joiSchema=Joi.object({
        // ProductId:Joi.string().min(1).max(20).required(),
        Name:Joi.string().min(1).max(20).required(),
        price:Joi.number().min(1).required(),
        minAmount:Joi.string().min(1).required(),
        supplier: Joi.string().length(24).required()

    })
    return joiSchema.validate(_badyData);
})
module.exports=validProduct