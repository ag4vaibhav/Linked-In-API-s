const Joi = require('joi');

function validate(req,res,next)
{
    schemas=res.locals.schemas;
  //  console.log("Middle ware 2================================",res.locals.schemas);
    body=req.body;
    Joi.validate(body, schemas, function (err, value) {
        if(err)
        {
            console.log("Error is : ",err.details[0].message);
            res.status(404);
            res.send(err.details[0].message);

        }
        else{
            console.log("Joi value",value);
            next();
        }
    });
}

module.exports={
    validate
}