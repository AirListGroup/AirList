var Item = require('./itemModel.js');
var Q = require('q');

var makeItem = Q.nbind(Item.create, Item);
var getAll = Q.nbind(Item.find, Item);
var removeItem = Q.nbind(Item.remove, Item);

var createItem = function(req, res) {
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

var getAllItems = function(req, res) {
  getAll({})
  .then(function(items){
    res.status(200);
    res.json(items);
  })
  .fail(function(err){
    res.status(404);
  });
};

var deleteItem = function(req, res) {
  var id = req.params.id;
  removeItem({_id: id})
  .then(function(item){
    res.send(item);
  })
  .fail(function(err){
    console.error(err);
  })
};

var updateAnItem = function(req, res) {
  var id = req.params.id;
  var newParams = req.body;
  console.log("unicornsBODY", req.body);
  console.log("trollsPARAMS", req.params);

  Item.findOne({_id: id}, function(err, doc) {
    if (newParams.days) {
        doc.days = newParams.days;
    }
    if (newParams.price) {
        doc.price = newParams.price;
    }
    if (newParams.description) {
        doc.description = newParams.description;
    }
    if (newParams.name) {
        doc.name = newParams.name;
    }
    if (newParams.hasOwnProperty('rentable')) {
        doc.rentable = newParams.rentable;
    }
    console.log("This is the doc!", doc)
    doc.save();
    res.status(200);
    res.send(doc);
  });
}
module.exports.createItem = createItem;
module.exports.getAllItems = getAllItems;
module.exports.deleteItem = deleteItem;
module.exports.updateAnItem = updateAnItem;