angular.module('smartNews.home')

.controller('HomeTweetsCtrl', function($scope, TopTrendsFactory) {
  $scope.news = TopTrendsFactory.primaryArticle;

  $scope.setTweets = function() {
    TopTrendsFactory.getTopicTweets($scope.news)
    .then(function(tweets) {
      console.log('tweets go here');
    });
  };

  $scope.setTweets();
});