var mongoose = require('mongoose');

var mongoUri = process.env.NEWS_JUICE_MONGODB_URI || 'mongodb://localhost/voraciousscroll';

mongoose.connect(mongoUri);

module.exports = mongoose;
