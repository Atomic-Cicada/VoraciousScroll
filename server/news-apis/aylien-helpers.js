// var aylienKeys = require('../../keys.js').aylien;
var AylienNewsApi = require('aylien-news-api');

/************* AYLIEN API HELPERS ********************/

// Instantiate AylienNewsApi model
var api = new AylienNewsApi.DefaultApi();

// Configure API ID: app_id
var appId = api.apiClient.authentications['app_id'];
appId.apiKey = process.env.AYLIEN_APP_ID;

// Configure API key: app_key
var appKey = api.apiClient.authentications['app_key'];
appKey.apiKey = process.env.AYLIEN_APP_KEY;

var timelineData = function(input, res) {

  // more options here: https://newsapi.aylien.com/docs/endpoints/time_series/nodejs
  // date/time formatting: https://newsapi.aylien.com/docs/working-with-dates
  // if period !== 1, start and/or end date should probably be adjusted to result in an even multiple of period. i.e. if period=7days, end minus start should be some multiple of 7 so that data is not skewed by a partial period.
  // values prior to about 3/15/2016 are consistently much lower, reason currently unknown

  var opts = {
    'title': input,
    'language': ['en'],
    'publishedAtStart': 'NOW-175DAYS',
    'publishedAtEnd': 'NOW',
  };

  api.listTimeSeries(opts, function(err, data) {
    if (err) {
      console.log('<------ERROR--------->', err);
    } else {
      res.send(data);
    }
  });
};

var articleImport = function(input, res, start, end, limit, nextPageCursor) {
  limit = limit || 3;
  var opts = {
    'title': input,
    'language': ['en'],
    'sortBy': 'relevance',
    'publishedAtStart': start,
    'publishedAtEnd': end,
    'cursor': nextPageCursor,
    'perPage': limit,
  };
  api.listStories(opts, function(err, data) {
    if (err) {
      console.log('<------ERROR--------->', err);
    } else {
      opts.cursors = data.nextPageCursor;
      res.send(data);
    }
  });

};

module.exports = {
  timelineData: timelineData,
  articleImport: articleImport
};
