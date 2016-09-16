angular.module('smartNews')

.controller('NavCtrl', function($scope, $http, $cookies, $location, isAuth) {

  $scope.isAuth = function() {
    $scope.user = isAuth();
    return !!isAuth();
  };

  $scope.logout = function() {
    $cookies.remove('authenticate');
    $location.url('/');
  };
});
