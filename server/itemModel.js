var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  days: Number,
  price: Number
});

module.exports = mongoose.model('Item', ItemSchema);