var mongoose = require('mongoose');

var digestSchema = new mongoose.Schema({
  _facebookUniqueID: String,
  firstname: String,
  lastname: String,
  email: String,
  interests: String

});

var Digest = mongoose.model('Digest', digestSchema);

// Digest.updateInterests = function() {

// }


module.exports = Digest;
