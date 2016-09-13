var app = require('./server.js');
var port = process.env.PORT;

app.listen(port, function() {
  console.log('SmartNews server listening on port 3000.');
});