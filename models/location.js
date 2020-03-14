var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var LocationSchema = new Schema({
    city:{
        type:String,
        required:true
    },
    state:{
        type: String,
        enum: ['UP','UK','Bihar'],
        required:true
    },
    country:{
        type: String,
        enum: ['India','America'],
        default: "India",
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
    },

    user_id: { type: Schema.Types.ObjectId,
        ref: 'User',
        required:true }

    
});

Location=mongoose.model('Location',LocationSchema);
module.exports=Location