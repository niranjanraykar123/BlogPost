const Joi = require('joi');
// Server Side validations for blog object and review object comming from client side;
module.exports.listingschema = Joi.object({
    listing:Joi.object({
       title: Joi.string().required(),
       description: Joi.string().required(),
       image: Joi.string().allow("",null),
       country:Joi.string().required(),
    }).required()
   
})
module.exports.reviewschema=Joi.object({
    review:Joi.object({
       comment:Joi.string().required(),
       rating:Joi.number().required().min(1).max(5)
    }).required()
   
})