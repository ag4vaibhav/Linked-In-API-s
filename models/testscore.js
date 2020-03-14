var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var TestSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    score:{
        type:Number,
        required:true
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

    description:{
        type:String
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

Test=mongoose.model('Test',TestSchema);
module.exports=Test