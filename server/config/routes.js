var app = require('../server.js');
var routes = require('express').Router();
var passport = require('./passport.js');
var aylien = require('../news-apis/aylien-helpers.js');
var googleTrends = require('../news-apis/google-trends-helpers.js');
var watsonTone = require('../news-apis/watson-tone-analysis-helpers.js');
var request = require('request');
var db = require('./db.controller.js');
var mail = require('../mails/helloWorld.js');
var path = require('path');

module.exports = function(app, express) {

/**************** AUTOCOMPLETE *****************/
  app.route('/input/:input')
    .get(function(req, res) {
      var url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&generator=prefixsearch&prop=pageprops%7Cpageimages%7Cpageterms&redirects=&ppprop=displaytitle&piprop=thumbnail&pithumbsize=80&pilimit=5&wbptterms=description&gpssearch=' + req.params.input + '&gpsnamespace=0&gpslimit=5';
      request(url, function(err, resp, body) {
        if (err) {
          console.log('there was an error requesting via express', err);
        } else {
          res.status(200).send(body);
        }
      });
    });

/**************** USER AUTH FACEBOOK *****************/
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/enter', function(req, res) {
    res.sendFile(path.join(__dirname + '/../../public/index.html'));
  });

  app.get('/auth/facebook',
    passport.authenticate('facebook'));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
      function(req, res) {
      // Successful authentication, redirect home.
        res.cookie('authenticate', req.session.passport);
        res.redirect('/enter');
      });

  app.route('/results/:input')
    .get(function(req, res) {
      aylien.timelineData(req.params.input, res);
    });

  app.route('/seearticle')
    .get(function(req, res) {
      aylien.articleImport(req.query.input, res, req.query.start, req.query.end, req.query.limit, req.query.nextPageCursor);
    });

  /************************ GOOGLE TRENDS **********************************/
  // Top trends pull top # of trends from specified country
    // googleTrends.hotTrends(resultLimit, country, res)
      // resultLimit: Number
      // country: String, ex: 'US', default is US

  app.route('/api/news/topTrendsDetail')
    .get(function(req, res) {
      googleTrends.hotTrendsDetail(res, 10, 'US');
    });

  /************************ SAVE ARTICLE **********************************/
  app.route('/article')
    .post(function(req, res) {
      db.saveArticle.post(req, function(error, success) {
        if (error) {
          res.sendStatus(501);
        } else {
          res.send({article: success});
        }
      });
    });

  app.route('/unsaveArticle/:id')
    .delete(function(req, res) {
      db.unsaveArticle.delete(req, function(err, success) {
        res.send(success);
      });
    });

  app.route('/profile')
    .get(function(req, res) {
      db.profile.get(req, function(error, success) {
        res.send(success);
      });
    });

  /************************ SEND EMAILS **********************************/
  app.route('/sendEmail')
    .post(function(req, res) {
      console.log('here is title ', req.body.article.title);
      console.log('here is user ', req.body.user.firstname);
      mail.sendEmail(req.body);
    });


  /************************ TONE ANALYSIS **********************************/
  app.route('/api/toneanalysis')
    .get(function(req, res) {
      watsonTone.analyzeTone(req, res);
    });
<<<<<<< d8e2bdaff2b0ce2ded2365652a99c33afc4d5132
=======

// Error handling: send log the error and send status 500. This handles one error.
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
>>>>>>> Sending out a barebones email when button is clicked on user side

};
