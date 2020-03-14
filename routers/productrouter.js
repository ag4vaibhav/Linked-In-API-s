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

router.post('/add',jwt.verifyToken,controller.MulterController.upload.array('image',3),controller.MulterController.upload_process,(req,res)=>{
    // console.log("In Add Product");
    // console.log("Body Before-----",req.body);
    controller.ProductController.addProduct(req,res,db.Message);
    });

/*******************************************************************************************/


module.exports= router;