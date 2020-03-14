const db= require('../models/')
var bcrypt = require('bcryptjs');

function addAdmin(req,res,model){
    body=req.body;
    body.password=res.locals.password;
    console.log("Body Password======",body.password);
    var obj=new model(body);
    obj.save(function (err, result) 
    {    
        if(err)
        {
            //console.log("Error is ",err);
            res.status(404);
            res.send(err);
        }
        else
        {
          //  console.log("Result is :",result);
            res.status(200);
            res.json(result);
        }
   });
        
}


function loginAdmin(req,res,next)
{
    var email_body = req.body.email;
    var password_body= req.body.password;
   
    if(email_body=='' || password_body=='')
    {
        res.status(404);
        res.send('Enter Valid Email Id and Password');
    }
    else
    {
        db.Admin.findOne({email:email_body},function (err, result) {
            if(err){
                //console.log(err);
                res.status(404);
                res.send(err);
            }
            else
            {
                if(result==null){
                    console.log(result);
                    res.status(404);
                    res.send('Email-Id Not Found!..');
                  }
                else
                    {
                        result = result.toObject();
                        result.group_type="admin";
                    //    console.log("Result is ",result);
                        res.locals.user_data=result;      
                        next();
                    }
            }
        });
    }

}

module.exports = {
        addAdmin,
        loginAdmin

}

