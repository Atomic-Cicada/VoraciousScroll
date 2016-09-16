angular.module('smartNews.home')

.controller('PrimaryArticleCtrl', function($scope, $stateParams, $http, TopTrendsFactory, saveArticle, isAuth, renderGraph) {


  $scope.news = TopTrendsFactory.primaryArticle;
  $scope.articleReceived = $stateParams.articleReceived;
  $scope.selectedDate = renderGraph.selectedDate;

  $scope.isAuth = function() {
    $scope.user = isAuth();
    return !!isAuth();
  };

  $scope.clickSave = function() {
    var now = new Date();
    var article = {
      title: $scope.news[0].title,
      author: $scope.news[0].author.name,
      publishDate: $scope.news[0].publishedAt,
      savedDate: now,
      articleLink: $scope.news[0].links.permalink,
      articleSource: $scope.news[0].source.name,
      img: $scope.news[0].media[0].url,
      body: $scope.news[0].body
    };
    saveArticle(article);
  };

  $scope.getArticle = function() {

    var input = $scope.topicName;
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
        $scope.news = $scope.articles;
      },
      function(err) {
        console.log('THERE WAS AN ERROR RECEIVING DATA FROM SEEARTICLE', err);
      }
    );
  };

  $scope.$on('user:clickDate', function(event, data) {
    $scope.getArticle();
  });

  // but this into a factory and into the services.js if it gets too big.
  $scope.sendEmail = function() {
    $http({
      method: 'POST',
      url: '/sendEmail',
      data: { "Article": "Tupac" }
    }).then(function successCallback(response) {
      console.log('SUCCESS ', response);
        // this callback will be called asynchronously
        // when the response is available
    }, function errorCallback(response) {
      console.log('FAIL ', response);
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });
  };


});