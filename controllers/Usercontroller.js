const db= require('../models/')
var bcrypt = require('bcryptjs');
var jwt= require('../jwt/jwt')

function addUser(req,res,model){
    body=req.body;
    body.password=res.locals.password;
    console.log("Body Password======",body.password);
    console.log("Body ======",body);
    
    var obj=new db.User(body);
    obj.save(function (err, result) 
    {    
        if(err)
        {
            console.log(err);
            
            res.status(404);
            res.send(err.errmsg);
            
        }
        else
        {            
          //  console.log(result);

            res.status(200);
            res.send(result)

        }
   });
        
}

function addData(req,res,model){
    body=req.body;
   // body.password=res.locals.password;
  //  console.log("Body Password======",body.password);
    var obj=new model(body);
    obj.save(function (err, result) 
    {    
        if(err)
        {
            console.log(err.errmsg);
            
            res.status(404);
            res.send(err.errmsg);
            
        }
        else
        {            
            console.log(result);

            res.status(200);
            res.json(result);

        }
   });
        
}
function loginUser(req,res,next)
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
        db.User.findOne({email:email_body},function (err, result) {
            if(err){
                //console.log(err);
                res.status(404);
                res.json(err);
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
                        result.group_type="user";
                        console.log("Result is ",result);
                    
                        res.locals.user_data=result;      
                        next();
                    }
            }
        });
    }

}

module.exports = {
        addUser,
        loginUser,
        addData

}

