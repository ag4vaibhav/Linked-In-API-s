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
router.post('/register',joi.schemafun,controller.Joicontroller.validate,controller.BcryptController.encrypt_password,(req,res)=>{
controller.Usercontroller.addUser(req,res,db.User);
});

router.post('/login',controller.Usercontroller.loginUser,controller.BcryptController.decrypt_password,(req,res)=>{
    console.log("In Login");
    jwt.createToken(req,res);
    });

/*******************************************************************************************/


module.exports= router;