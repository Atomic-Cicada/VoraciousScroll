var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: 'LqdOIQ4iD4uEj3CBAigjWjerf',
  consumer_secret: 'S1ZJozO4GG7kf6S2PTQ5m9a3g61GSgPWD3ISa1Ee1stsGycxia',
  access_token_key: '2892965124-14mckSA7P9SuQIRoyMgN4y3qWuPCLfBmWY57rIL',
  access_token_secret: 'LQTrbKWUKf7ukYABsdCj1dRwCmirDnulgBt3Kh66gm5qm'
});

var getTweets = function(term) {
  var stream = client.stream('statuses/filter', {track: 'javascript'});
  stream.on('data', function(event) {
    console.log(event && event.text);
  });
   
  stream.on('error', function(error) {
    throw error;
  });
};

module.exports = {
  getTweets: getTweets
};
 

