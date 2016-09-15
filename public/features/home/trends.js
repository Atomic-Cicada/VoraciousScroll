angular.module('smartNews.home')

.controller('TopTrendsCtrl', function($scope, $http, TopTrendsFactory, renderGraph) {
  var sanitizeTitle = TopTrendsFactory.sanitizeTitle;
  $scope.topTrends = TopTrendsFactory.topTrends;
  $scope.topicName;

  $scope.selectArticle = function (topic, topicName) {
    $scope.topicName = topicName;
    var url = '/results/' + $scope.topicName;
    $http({
      method: 'GET',
      url: url
    })
    .then(function(obj) {
      renderGraph.renderGraph(obj, '#graphHomePage');
    });
    var title = sanitizeTitle(topic.articleTitle);
    TopTrendsFactory.getPrimaryArticle(title)
    .then(function (article) {
      TopTrendsFactory.primaryArticle[0] = article.data.stories[0];
    });
  };

});
