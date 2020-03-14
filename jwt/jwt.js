var jwt=require('jsonwebtoken');

function verifyToken(req,res,next){
    secretKey="vaibhav";
    const bearerHeader=req.headers['authorization'];

    if(typeof(bearerHeader != 'undefined'))
    {
        const bearer= bearerHeader.split(' ');
        const bearerToken=bearer[1];
   
		jwt.verify(bearerToken,secretKey,(err,authData) => 
		{
			if(err)
			{
                res.status(401).json({status:"401",Message:'unauthenticated'});
                res.status(400).json({status:"400",Message:'Bad Request'});
                res.status(407).json({status:"407",Message:'Proxy Authentication Required'})  
                res.status(403).json({status:"403",Message:'Access token does not have the required scope'}) 
			}
			else{
                console.log("Auth Data is ",authData);
			    // console.log("Request ",a);
                
				req.authData=authData;
				next();
			}
		})
        
    }
    else{
        res.status(400).json({status:"400",Message:'Token Type Not Corrrect'});

    }
}


function createToken(req,res){
    user_data=res.locals.user_data;

    secretKey="vaibhav";
    
    jwt.sign(user_data,secretKey,(err,token)=>{
        if(err){
            //console.log(err);
            res.status(404);
            res.send(err);
        }
        else{
             console.log("Request : ",user_data);
             console.log("Token is : ",token);
            //  datatosend=[];
             var datatosend={
                 name: user_data.name,
                 email: user_data.email,
                 token: token
              }
            //  datatosend.push(user_data.name);
            //  datatosend.push(user_data.email);
            //  datatosend.push(token);
             console.log("datatosend",datatosend)
             res.status(200);
             res.json({datatosend});
        }
    });

}

module.exports={
    createToken,
    verifyToken
}

