var app = require('./server.js');
var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('SmartNews server listening on port ' + port + '.');
});
