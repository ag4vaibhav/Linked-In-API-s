var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NotificationSchema = new Schema({
    sender_id:{
        type:Schema.Types.ObjectId
    },
    receiver_id:{
        type:Schema.Types.ObjectId
    },
    notificationData:{
        type:String,
        required:true
    },
    enable:{
        type:Boolean,
        default:true
    },
    notificationType:{
        type:String,
        enum:['Message','Other']
    },

    user_id: { type: Schema.Types.ObjectId,
        ref: 'User',
        required:true }

})

Notification=mongoose.model('Notification',NotificationSchema);
module.exports=Notification