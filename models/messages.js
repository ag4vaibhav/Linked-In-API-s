var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var MessageSchema = new Schema({
    messageData:{
        type:String,
        required:true
    },
    image:{
        type: [String]
    },
    sender_id: { type: Schema.Types.ObjectId,
        ref: 'User'
     
    },
    receiver_id: { type: Schema.Types.ObjectId,
        ref: 'User',
        required:true 
    },
    
    status:{
        type: String,
        enum: ["Active",'Freezed','Deleted'],
        default: "Active"
    },
    created_at:{
        type: Date,
		default:Date.now()
    },
    updated_at:{
        type: Date
    }
    
});

Message=mongoose.model('Message',MessageSchema);
module.exports=Message