var mongoose = require('mongoose');

var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/voraciousscroll';

mongoose.connect(mongoUri);

module.exports = mongoose;