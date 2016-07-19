var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var itemController = require('./itemController.js')

var app = express();

//for heroku
var port = process.env.PORT || 9000;
var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/airlistdb';
mongoose.connect(mongoUri);

// middleware
app.use(bodyParser.json());
//serve static files
app.use(express.static(__dirname + '/../Client'));

//api routes
app.get('/listings',itemController.getAllItems);

app.post('/listings',itemController.createItem);

app.delete('/listings/:id',itemController.deleteItem);

app.put('/listings/:id', itemController.updateAnItem);

app.listen(port, function () {
  console.log("server up and running on port:" + port);
});

