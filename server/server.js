var express = require('express');
var mongoose = require('mongoose');

var app = express();

//for heroku
var port = process.env.PORT || 9000;
var mongoUri = process.env.MONGODB_URI || 'mongodb://local/airlistdb';
mongoose.connect(mongoUri);

//serve static files
app.use(express.static(__dirname + '../Client'));

app.listen(port, function(){
  console.log("server up and running on port:" + port);
});

