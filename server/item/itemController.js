var Item = require('./itemModel.js');
var Q = require('q');

var makeItem = Q.nbind(Item.create, Item);
var getAll = Q.nbind(Item.find, Item);
var removeItem = Q.nbind(Item.remove, Item);
var getItem = Q.nbind(Item.findOne, Item);

module.exports.createItem = function(req, res) {
  makeItem(req.body)
  .then(function(newItem){
    console.log(newItem);
    res.status(201);
    res.send(newItem);
  })
  .fail(function(err){
    res.sendStatus(404);
  });
};

module.exports.getAllItems = function(req, res) {
  getAll({})
  .then(function(items){
    res.status(200);
    res.json(items);
  })
  .fail(function(err){
    res.sendStatus(404);
  });
};

module.exports.getAllItemsWithCategory = function(req, res) {
  var category = req.params.category;
  getAll({category: category})
  .then(function(items){
    res.status(200);
    res.json(items);
  })
  .fail(function(err){
    res.sendStatus(404);
  });
};

module.exports.getAllLentItemsWithUser = function(req, res) {
  var user = req.params.user;
  getAll({lentby: user})
  .then(function(item){
    res.status(200);
    res.json(items);
  })
  .fail(function(err){
    res.sendStatus(404);
  });
};

module.exports.getAllRentedItemsWithUser = function(req, res) {
  var user = req.params.user;
  getAll({rentedyBy: user})
  .then(function(item){
    res.status(200);
    res.json(items);
  })
  .fail(function(err){
    res.sendStatus(404);
  });
};

module.exports.getAnItem = function(req, res) {
  var id = req.params.id;
  getItem({_id:id})
  .then(function(item){
    res.status(200);
    res.json(item);
  })
  .fail(function(err){
    res.sendStatus(404);
  });
};

module.exports.deleteItem = function(req, res) {
  var id = req.params.id;
  removeItem({_id: id})
  .then(function(item){
    res.send(item);
  })
  .fail(function(err){
    res.sendStatus(404);
  })
};

module.exports.updateAnItem = function(req, res) {
  var id = req.params.id;
  var newParams = req.body;

  Item.findOne({_id: id}, function(err, doc) {
    if (newParams.days) {
      doc.days = newParams.days;
    }
    if (newParams.price) {
      doc.price = newParams.price;
    }
    if (newParams.description) {
      doc.description = newParams.description
    }
    if (newParams.name) {
      doc.name = newParams.name;
    }
    if (newParams.category) {
      doc.category = newParams.category;
    }
    if (err) {
      res.status(404);
      res.send(err);
     } else {
      doc.save();
      res.status(200);
      res.send(doc);
     }
  });
};