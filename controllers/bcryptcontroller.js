var bcrypt = require('bcryptjs');

function encrypt_password(req,res,next)
{
    password_body=req.body.password;
    var salt = bcrypt.genSaltSync(10);
    hashed_password=bcrypt.hashSync(password_body, salt);  //Hashed Password
    console.log("Hashed Password is : ",hashed_password);

    res.locals.password=hashed_password;
    next();
}

function decrypt_password(req,res,next)
{
    user_data=res.locals.user_data;
    password_body=req.body.password;

    var compare=bcrypt.compareSync(password_body, user_data.password);
    console.log("Compare is ",compare)
    if(!compare)
    {
        res.status(404);
        res.send('Password is Incorrect!..');
    }
    else{
        res.locals.user_data=user_data;
        //console.log("USer data Local  in Decrypt Password",res.locals.user_data);
        next();
    }
}

module.exports={
    encrypt_password,
    decrypt_password
}