var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var itemController = require('./item/itemController.js');
// var userController = require('./user/userController.js');    NOT USED BUT AVAILBLE FOR LEGACY TEAM IF NEEDED

var app = express();

//for heroku
var port = process.env.PORT || 1337;
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

app.post('/listings',itemController.createItem);

app.delete('/listings/:id',itemController.deleteItem);

app.put('/listings/:id',itemController.updateAnItem);

// api routes for users
// routes for users schema if legacy team needs it, but we didn't use it. We only used the item schema.
/* ROUTES
app.get('/users', userController.getAllUsers);

app.get('/users/:id', userController.getAnUser);

app.post('/users', userController.createUser);

app.delete('/users/:id', userController.deleteUser);
*/
app.listen(port, function () {
  console.log("server up and running on port:" + port);
});

