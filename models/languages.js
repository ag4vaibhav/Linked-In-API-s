var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var LanguageSchema = new Schema({
    name:{
        type:String,
        enum: ['Hindi','English'],
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

Language=mongoose.model('Language',LanguageSchema);
module.exports=Language