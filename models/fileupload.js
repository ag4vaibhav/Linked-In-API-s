let mongoose = require('mongoose');

let fileSchema = new mongoose.Schema({
    'image': [{ type: String}]
});

let Fileupload = mongoose.model('file', fileSchema);

module.exports = Fileupload;