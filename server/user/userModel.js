var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username:  {
    type: String,
    required: true,
    unique: true
  },
  email: String,
  password:{
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', UserSchema);