const db= require('../models/')

function addMessage(req,res,model){
    body=req.body;
    var obj=new model(body);

    //console.log("Request Auth Data in add Category ----",req.authData);
    if(req.authData.group_type == "user" || req.authData.group_type == "admin")
    {
        obj.save(function (err, result) 
        {    
            if(err)
            {
                //console.log(err.errmsg);
                res.status(404);
                res.send(err.errmsg)
           }
            else{
                //console.log(result);
                res.status(200);
                res.json(result);    
            }
        });
    }
    else{
        console.log("Permission Denied!....");
    }
        
}

function listSenders(req,res,model){

    // console.log("Request Auth Data in add Category ----",req.authData);
     senderid=req.authData._id;
     receiverid=req.body.receiver_id;
  //   console.log("request id-------gdfg === ",req);
     if(req.authData.group_type == "user")
     {
 
        db.Message.
        distinct('sender_id',{ "sender_id": { $in: [ senderid, receiverid ] }}).
        //populate('sender_id',{ first_name: 1}).
        populate({
            path: 'sender_id',
            options: {
              limit: 5
            }
        }).
        exec(function (err, rest) {
           if (err) {
               throw err;
           }
           else{
               console.log(rest); 
               res.status(200);
               res.json(rest);
               }
       }); 

     }
 
     else{
         console.log("Permission Denied!....");
         res.status(404);
         res.send("Permissions Denied !.....")
 
     }
         
 }

function listMessages(req,res,model){

   // console.log("Request Auth Data in add Category ----",req.authData);
   senderid=req.authData._id;
    receiverid=req.body.receiver_id;
   // console.log("request id-------gdfg === ",req.id);
    if(req.authData.group_type == "user")
    {
db.Message.find
    db.Message.find( { 
            $and: [
            {$and: [ { "sender_id": senderid },{"receiver_id": receiverid } ]},
            // {$and: [ { "sender_id": receiverid  },{"receiver_id": senderid } ]} 
            ]
    },
    ['messageData'],
    {
        sort:{
            created_at: 1 
        },
        limit:5
    },
        (err,result)=>{
            console.log(result);
            res.json({result});
        }); 

      

    }

    else{
        console.log("Permission Denied!....");
        res.status(404);
        res.send("Permissions Denied !.....")

    }
        
}

module.exports={
    addMessage,
    listMessages,
    listSenders
}