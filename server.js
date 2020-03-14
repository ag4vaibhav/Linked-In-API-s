var express = require('express');
var dbconnection = require('./dbconnection');

var swaggerUi = require('swagger-ui-express'),
      swaggerDocument = require('./swagger/swagger.json');

var router = require('./routers/');

var app=express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/user',router.Userroute);
app.use('/admin',router.Adminroute);
app.use('/message',router.Messageroute);
app.use('/product',router.Productroute);
app.use('/cart',router.Cartroute);
app.use('/upload',router.Multerroute);

app.listen(8080,()=>{
    console.log('WORKING AT 8080');
});