angular.module('smartNews.results', ['chart.js'])

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
        $http({
          method: 'GET',
          url: '/api/toneanalysis',
          params: {text: data.data.stories[0].body}
        }).then(function(data) {
          var emotionArr = data.data.document_tone.tone_categories[0].tones;
          var labelArr = [];
          var scoreArr = [];
          for (var i = 0; i < emotionArr.length; i++) {
            labelArr[i] = emotionArr[i].tone_name;
            scoreArr[i] = emotionArr[i].score;
          }
          $scope.labels = labelArr;
          $scope.data = scoreArr;
        }
        );
      },
      function(err) {
        console.log('THERE WAS AN ERROR RECEIVING DATA FROM SEEARTICLE', err);
      }
    );
  };
  // Render article
  $scope.getArticle();
  // Render new articles on graph click

})
.directive('resultarticle', function() {
  return {
    templateUrl: 'features/results/article.html',
    controller: 'ResultsCtrl'
  };
});
