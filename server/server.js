var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var itemController = require('./item/itemController.js');
var userController = require('./user/userController.js');

var app = express();

//for heroku
var port = process.env.PORT || 9000;
var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/airlistdb';
mongoose.connect(mongoUri);

// middleware
app.use(bodyParser.json());
//serve static files
app.use(express.static(__dirname + '/../Client'));

//api routes for items
app.get('/listings',itemController.getAllItems);

app.get('/listings/:id',itemController.getAnItem);

app.get('/listings/category/:category',itemController.getAllItemsWithCategory);

app.get('/listings/lent/:user',itemController.getAllLentItemsWithUser);

app.get('/listings/rent/:user',itemController.getAllRentedItemsWithUser);

app.post('/listings',itemController.createItem);

app.delete('/listings/:id',itemController.deleteItem);

app.put('/listings/:id',itemController.updateAnItem);

// api routes for users
app.get('/users', userController.getAllUsers);

app.get('/users/:id', userController.getAnUser);

app.post('/users', userController.createUser);

app.delete('/users/:id', userController.deleteUser);

app.listen(port, function () {
  console.log("server up and running on port:" + port);
});

