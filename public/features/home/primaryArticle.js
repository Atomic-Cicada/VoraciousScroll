angular.module('smartNews.home')

.controller('PrimaryArticleCtrl', function($scope, $stateParams, $http, TopTrendsFactory, saveArticle, isAuth, renderGraph) {


  $scope.news = TopTrendsFactory.primaryArticle;
  $scope.getTopThree = TopTrendsFactory.getTopThree;
  // scope.newsThree = TopTrendsFactory.primaryArticle;
  $scope.articleReceived = $stateParams.articleReceived;
  $scope.selectedDate = renderGraph.selectedDate;
  $scope.user = isAuth();

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

  // put this into a factory and into the services.js if it gets too big.
  $scope.sendEmail = function() {
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
    var articleTwo = {
      title: $scope.getTopThree[1].title,
      author: $scope.getTopThree[1].author.name,
      publishDate: $scope.getTopThree[1].publishedAt,
      savedDate: now,
      articleLink: $scope.getTopThree[1].links.permalink,
      articleSource: $scope.getTopThree[1].source.name,
      img: $scope.getTopThree[1].media[0].url,
      body: $scope.getTopThree[1].body
    };
    var articleThree = {
      title: $scope.getTopThree[2].title,
      author: $scope.getTopThree[2].author.name,
      publishDate: $scope.getTopThree[2].publishedAt,
      savedDate: now,
      articleLink: $scope.getTopThree[2].links.permalink,
      articleSource: $scope.getTopThree[2].source.name,
      img: $scope.getTopThree[2].media[0].url,
      body: $scope.getTopThree[2].body
    };

    $http({
      method: 'POST',
      url: '/sendEmail',
      data: { article: article, articleTwo: articleTwo, articleThree: articleThree, user: $scope.user }
    }).then(function successCallback(response) {
      console.log('SUCCESS ', response);
    }, function errorCallback(response) {
      console.log('FAIL ', response);
    });
  };

});