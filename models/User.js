var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var UserSchema = new Schema({
    first_name:{
        type:String,
        minlength: 6,
        maxlength: 15,
        required:true
    },
    last_name:{
        type:String,
        minlength: 6,
        maxlength: 15,
        required:true
    },

    email:{
        type:String,
        match: /.+\@.+\..+/,
        index: true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        min:10,
        index: true,
        unique: true
    },
    recent_company:{
        type:String,
        enum: ['Google','Infosys','IBM','Dell'],
        default: 'Google',
        required:true
    },
    recent_job_title:{
        type:String,
        enum: ['Software Developer','Software Engineer'],
        default: 'Software Developer',
        required:true
    },
    location:{
        type: Schema.Types.ObjectId,
        ref: 'Location'
    },

    visitors:{
        type: Number,
        default: 0
    },
    search_appearances:{
        type: Number,
        default: 0
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
        type:Date
    }
    
});

//UserSchema.index({ email: 1, password: 1 }, { unique: true });
User=mongoose.model('User',UserSchema);
module.exports=User
