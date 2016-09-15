angular.module('smartNews.results', [])

.controller('ResultsCtrl', function($scope, $stateParams, $http, isAuth, saveArticle, renderGraph) {

  $scope.articleReceived = $stateParams.articleReceived;

  $scope.selectedDate = renderGraph.selectedDate;

  $scope.isAuth = function() {
    $scope.user = isAuth();
    return !!isAuth();
  };


  $scope.clickSave = function(el) {
    var now = new Date();

    var article = {
      title: el.title,
      author: el.author.name,
      publishDate: el.publishedAt,
      savedDate: now,
      articleLink: el.links.permalink,
      articleSource: el.source.name,
      img: el.media[0].url,
      body: el.body
    };
    saveArticle(article);
  };

  $scope.getArticle = function() {

    var input = $stateParams.input;
    var publishStart = $scope.selectedDate.startDate;
    var publishEnd = $scope.selectedDate.endDate;

    var url = '/seearticle?input=' + input + '&start=' + publishStart + '&end=' + publishEnd;

    $http({
      method: 'GET',
      url: url
    }).then(
      function(data) {
        $scope.articleReceived = true;
        $scope.articles = data.data.stories;
      },
      function(err) {
        console.log('THERE WAS AN ERROR RECEIVING DATA FROM SEEARTICLE', err);
      }
    );
  };
  // Render article
  $scope.getArticle();
  // Render new articles on graph click
  $scope.$on('user:clickDate', function(event, data) {
    $scope.getArticle();
  });

})
.directive('resultarticle', function() {
  return {
    templateUrl: 'features/results/article.html',
    controller: 'ResultsCtrl'
  };
});
