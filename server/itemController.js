var Item = require('./itemModel.js');
var Q = require('q');

var makeItem = Q.nbind(Item.create, Item);
var getAll = Q.nbind(Item.find, Item);

var createItem = function(item, callback) {
  makeItem(item)
  .then(function(newItem){
    callback(newItem);
  })
  .fail(function(err){
    console.error(err);
  });
};

var getAllItems = function(callback) {
  getAll({})
  .then(function(items){
    callback(items);
  })
  .fail(function(err){
    console.error(err);
  });
};

var updateAnItem = function(itemName, newParams, callback) {
  Item.findOne({
    name: itemName
  }, function(err, doc) {
    if (newParams.days) {
        doc.days = newParams.days
    }
    if (newParams.price) {
        doc.price = newParams.price
    }
    if (newParams.description) {
        doc.description = newParams.description
    }
    if (newParams.name) {
        doc.name = newParams.name
    }
    doc.save();
    callback(err, doc)
  });
}
module.exports.createItem = createItem;
module.exports.getAllItems = getAllItems;