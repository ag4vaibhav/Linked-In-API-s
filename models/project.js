var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ProjectSchema = new Schema({
    name:{
        type:String,
        required:true
    },

    current_working:{
        type:Boolean,
        default:false
    },
    
    start_month:{
        type: String,
        enum: ['January','February'],
        required:true
    },
    start_year:{
        type: Number,
        enum: ['2000','2001'],
        required:true
    },
    end_month:{
        type: String,
        enum: ['January','February'],
        required:true
    },
    end_year:{
        type: Number,
        enum: ['2000','2001'],
        required:true
    },



    project_url:{
        type:String,
        required:true
    },
    
    description:{
        type:String,
        required:true
    },

    creator_id: [{ type: Schema.Types.ObjectId,
        ref: 'User',
        required:true 
    }],


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

Project=mongoose.model('Project',ProjectSchema);
module.exports=Project