var multer = require('multer');

var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
})

var upload = multer({ 
    storage: storage,
    limits: {fileSize: 1200000000}  
});

function upload_process(req,res,next){
    const file = req.files

    // let imgPort = 'http://192.168.0.34:8080';
       if (!file) {
           const error = new Error('Please upload a file')
           error.httpStatusCode = 400
           res.send("err")
       }
       file_length=file.length;
       images=[];
   
       for(count=0;count<file_length;count++)
       {
          // console.log("File Info....",file_length);
          // console.log(file[count].path);
           images.push(file[count].path);   
       }
   
       res.locals.images=images;
   
       next();
}


module.exports={
    upload,
    upload_process
}