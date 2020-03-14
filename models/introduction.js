var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var IntroductionSchema = new Schema({
    headline:{
        type:String,
        required:true
    },
    current_position:{
        type: String,
        enum: ['Student','Intern'],
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

Introduction=mongoose.model('Introduction',IntroductionSchema);
module.exports=Introduction