var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var EducationSchema = new Schema({

student:{
    type:Boolean,
    default: false,
    required:true
},

college:{
    type:String,
    enum: ['UPES','IIT'],
    default: 'UPES',
    required:true
},
degree:{
    type:String,
    enum: ['B.Tech','B.Com'],
    default: 'B.Tech',
    required:true
},
specialization:{
    type:String,
    enum: ['CSE','CS'],
    default: 'CSE',
    required:true
},

start_year:{
    type:Number,
    default:2020
},
end_year:{
    type:Number,
    default:2020
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
Education=mongoose.model('Education',EducationSchema);
module.exports=Education
