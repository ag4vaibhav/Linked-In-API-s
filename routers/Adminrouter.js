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

router.post('/register',controller.BcryptController.encrypt_password,(req,res)=>{
    controller.AdminController.addAdmin(req,res,db.Admin);
    });

router.post('/login',controller.AdminController.loginAdmin,controller.BcryptController.decrypt_password,(req,res)=>{
    console.log("In Login");
    jwt.createToken(req,res);
    });

/*******************************************************************************************/


module.exports= router;