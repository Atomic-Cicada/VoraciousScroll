var express = require('express');
var app = express();
var bodyParser = require('body-parser');

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Listening on port ' + port + '.');
});

app.use(bodyParser.urlencoded({
  extended: true
}));

module.exports = app;
