var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  days: Number,
  price: Number
});

module.exports = mongoose.model('Item', ItemSchema);