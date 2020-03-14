var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var LicenseSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    issuing_organization:{
        type: String,
        enum: ['Student','Intern'],
        required:true
    },
    expires:{
        type: Boolean,
        default: false
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

    credential_id:{
        type:String,
        required:true
    },
    
    credential_url:{
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

License=mongoose.model('License',LicenseSchema);
module.exports=License