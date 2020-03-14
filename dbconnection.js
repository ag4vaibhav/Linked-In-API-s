var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost/Royo_Updated';

mongoose.connect(mongoDB,{ useNewUrlParser: true ,useUnifiedTopology: true,useFindAndModify:false},function(err){
    if(err)
        throw err;
    else
        console.log('CONNECTED');
});
