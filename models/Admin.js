var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var AdminSchema = new Schema({
    name:{
        type:String,
        minlength: 5,
        maxlength: 20,
        required:true
    },
    email:{
        type:String,
        required:true,
        index: true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        index: true,
        unique:true
    },
    status:{
        type: String,
        enum: ["Active",'Freezed'],
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

Admin=mongoose.model('Admin',AdminSchema);
module.exports=Admin
