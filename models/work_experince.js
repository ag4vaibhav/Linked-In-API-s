var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Work_experinceSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    employment_type:{
        type: String,
        enum: ['Student','Intern'],
        required:true
    },
    company:{
        type:String,
        enum: ['Google','Dell'],
        required:true
    },
    location:{
        type:String,
        required:true
    },

    start_date:{
        type: Number,
        required:true
    },
    end_date:{
        type: Number,
        required:true
    },

    description:{
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

Work_experince=mongoose.model('Work_experince',Work_experinceSchema);
module.exports=Work_experince