angular.module('smartNews.results', ['chart.js'])

.controller('ResultsCtrl', function($scope, $stateParams, $http, isAuth, saveArticle, renderGraph) {
  $scope.resultsBusy = true;
  $scope.articles = [];
  $scope.nextPageCursor = '*';
  $scope.nextPage = function(){
    if ($scope.resultsBusy) return;
    $scope.resultsBusy = true;
    $scope.getArticle();
  };
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
    var url = '/seearticle?input=' + input + '&start=' + publishStart + '&end=' + publishEnd + '&nextPageCursor=' + encodeURIComponent($scope.nextPageCursor);
    $http({
      method: 'GET',
      url: url
    }).then(
      function(data) {
        $scope.articleReceived = true;
        $scope.nextPageCursor = data.data.nextPageCursor;
        $scope.articles = $scope.articles.concat(data.data.stories);
        $scope.articles.forEach(function(story) {
          $http({
            method: 'GET',
            url: '/api/toneanalysis',
            params: { text: story.body }
          })
            .then(function(data) {
              var emotionArr = data.data.document_tone.tone_categories[0].tones;
              var labelArr = [];
              var scoreArr = [];
              for (var i = 0; i < emotionArr.length; i++) {
                labelArr[i] = emotionArr[i].tone_name;
                scoreArr[i] = emotionArr[i].score;
              }
              story.sentimentLabels = labelArr;
              story.sentimentData = scoreArr;
              $scope.resultsBusy = false;
            });
        });
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
    console.log('click');
    $scope.articles=[];
    $scope.getArticle();
  });

})
.directive('resultarticle', function() {
  return {
    templateUrl: 'features/results/article.html',
    controller: 'ResultsCtrl'
  };
});
