var cron = require('node-cron');
var db=require('../models/');


function scheduling(req,res,next){
    var currentDate = new Date();
    if(req.authData.group_type =="user"){
        
        db.Cart.aggregate([
              {
                $project: {
                            hour: { $hour: "$created_at" },
                            minutes: { $minute: "$created_at" },
                            seconds: { $second: "$created_at" },
                            day: { $dayOfMonth: "$created_at" },
                            month: { $month: "$created_at" },
                            year: { $year: "$created_at" },   
                            currentDate,
                            created_at: 1,
                            duration: {$divide: [{$subtract: [currentDate,"$created_at"]}, 3600000]}
              }
              

              }
            
            
           


           
           
        //     {
        //         $project: {
        //             finalTotal: {
        //                 $let: {
        //                     vars: {
        //                    hour: { $hour: "$created_at" },
        //                    minutes: { $minute: "$created_at" },
        //                    seconds: { $second: "$created_at" }, 
        //                    total_hour_minutes: { $subtract: [{ $hour: "$created_at" },0]},
                          
        //                  },
        //                   in: { $add: [ "$$total_hour_minutes" ] }
        //               }
        //            },
                
        //            dateabc: {
        //             $let: {
        //                 vars: {
        //                date1: new Date()  ,
        //              },
        //               in: { $add: [ "$$date1" ] }
        //           }
        //        }
        //       }
        //  }
        ]).exec((err, locations) => {
            if (err){ 
                res.status(404);
                res.send(err);
            }
            else{
                res.status(200);
                res.send(locations)
            }
        });
/*
        cron.schedule('* * * * *', () => {
            console.log("Request in Schedulng Cron=====",req);
            console.log("Request Body in Schedulng Cron=====",req.body);
            console.log('running a task every two minutes');
            res.status(200);
            res.send("Request Body in Schedulng Cron=====");
          });
    }
    else if(req.authData.group_type =="admin"){
        console.log('running a task every two minutes');
        res.status(404);
        res.send("Permission Denied !....");
    }
*/
}
}

module.exports={
    scheduling
}