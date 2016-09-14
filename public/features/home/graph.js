angular.module('smartNews.home', [])

.controller('GraphCtrl', function($scope, TopTrendsFactory, saveArticle, isAuth) {

  // $scope.graph = GraphFactory.currentGraph;

  $scope.isAuth = function() {
    $scope.user = isAuth();
    return !!isAuth();
  };

});