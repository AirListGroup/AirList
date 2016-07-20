var mongoose = require('mongoose');
var Item = require('../item/itemModel.js');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  rentedItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  lentItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
});

module.exports = mongoose.model('User', UserSchema);