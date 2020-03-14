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


/*******************************************/

router.post('/add',jwt.verifyToken,controller.CartController.addCart,(req,res)=>{
    console.log("In Add Cart");
    console.log("Body Before-----",req.body);
    controller.CartController.update_stock(req,res);
    });

router.post('/updateStock',jwt.verifyToken,(req,res)=>{
    console.log("In Update Stock by Cart");
    console.log("Body Before-----",req.body);
    controller.CartController.update_stock(req,res);
    });

router.post('/view',jwt.verifyToken,(req,res)=>{
    console.log("In View Cart");
    console.log("Body Before-----",req.body);
    controller.CartController.viewCart(req,res,db.Cart);
    });

router.post('/schedule',jwt.verifyToken,(req,res)=>{
    console.log("In Schedule Cron Cart");
    console.log("Body Before-----",req.body);
    controller.CronController.scheduling(req,res);
    });

module.exports= router;