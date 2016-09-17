angular.module('smartNews.profile', ['smartNews.services'])

.controller('ProfileCtrl', ['$scope', 'isAuth', 'getSavedSearches', 'unsaveArticle', '$http', function($scope, isAuth, getSavedSearches, unsaveArticle, $http) {

  $scope.profile = 'Hi this is the profile page.';
  $scope.user = isAuth();


  $scope.saveEmail = function() {
    console.log('we in here breh');
    $http({
      method: 'POST',
      url: '/saveEmail',
      data: { email: $scope.email }
    }).then(function successCallback(response) {
      console.log('SUCCESS POSTING EMAIL TO DB ', response);
        // this callback will be called asynchronously
        // when the response is available
    }, function errorCallback(response) {
      console.log('FAIL ', response);
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });
  };

  var getHistory = function() {
    getSavedSearches(function(resp) {
      resp.sort(function(a, b) {
        return new Date(b.savedDate) - new Date(a.savedDate);
      });
      $scope.searchHistory = resp;
    });
  };

  getHistory();

  $scope.unsave = function(article) {
    unsaveArticle(article, function() {
      getHistory();
    });
  };

}]);
