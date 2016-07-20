var User = require('./userModel.js');
var Q = require('q');

var makeUser = Q.nbind(User.create, User);
var getAll = Q.nbind(User.find, User);
var getUser = Q.nbind(User.findOne, User);
var removeUser = Q.nbind(User.remove, User);

module.exports.createUser = function(req, res) {
  makeUser(req.body)
  .then(function(newUser){
    res.status(201);
    res.send(newUser);
  })
  .fail(function(err){
    res.sendStatus(404);
  });
};

module.exports.getAllUsers = function(req, res) {
  getAll({})
  .then(function(items){
    res.status(200);
    res.json(items);
  })
  .fail(function(err){
    res.sendStatus(404);
  });
};

module.exports.getAnUser = function(req, res) {
  var id = req.params.id;
  getUser({_id: id})
  .then(function(user){
    res.status(200);
    res.json(user);
  })
  .fail(function(err){
    res.sendStatus(404);
  });
};

module.exports.deleteUser = function(req, res) {
  var id = req.params.id;
  removeUser({_id: id})
  .then(function(user){
    res.send(user);
  })
  .fail(function(err){
    res.sendStatus(404);
  })
};