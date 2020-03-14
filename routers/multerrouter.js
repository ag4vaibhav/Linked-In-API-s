var express = require('express');
var router = express.Router();
var bodyParser=require('body-parser');
var controller = require('../controllers/');
const db= require('../models/')
var joi=require('../joi/joi');
var jwt=require('../jwt/jwt');


router.use(bodyParser.json({limit: '200mb',extended:true}));

router.use(bodyParser.urlencoded());
router.use('/uploads', express.static('uploads'));
/*******************************************************************************************/

router.get('/:id', async (req, res) => {
    var id = req.params.id;
    let Image = await db.Fileupload.findOne({ _id: id });
    if (!Image) { return res.status(404).send({ message: 'not found Images' }) }
    Image = Image.image
    res.send({
        data: Image
    });

});

router.post('/image',controller.MulterController.upload.array('image',3),controller.MulterController.upload_process,async (req,res)=>{
    console.log("In");    
    images=res.locals.images;

    let fileup = await new db.Fileupload({
            image: images
        });
    
    let data = await fileup.save();
   
     res.send({
         message: 'file uploaded',
         data: data
    });

})



module.exports= router;