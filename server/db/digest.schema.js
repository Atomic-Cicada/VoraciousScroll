var mongoose = require('mongoose');

var digestSchema = new mongoose.Schema({
  _facebookUniqueID: String,
  firstname: String,
  lastname: String,
  email: String,
  interests: Array,
  subscriptions: Array

});

var Digest = mongoose.model('Digest', digestSchema);

// Digest.updateInterests = function() {

// }


module.exports = Digest;
