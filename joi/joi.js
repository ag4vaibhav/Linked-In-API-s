const Joi = require('joi');

function schemafun(req,res,next){
    const schemas = Joi.object().keys({
        first_name: Joi.string().alphanum().min(6).max(15).required(),
        last_name: Joi.string().alphanum().min(6).max(15).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{10,30}$/).required(),
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        phone: Joi.number().min(10).required(),
        status: Joi.string()
    });
    res.locals.schemas=schemas;
   // console.log("Middle ware 1",res.locals.schemas);
    next();
    }

module.exports={
    schemafun
}