var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var SkillsSchema = new Schema({
    skill_name:{
        type:String,
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

Skills=mongoose.model('Skills',SkillsSchema);
module.exports=Skills