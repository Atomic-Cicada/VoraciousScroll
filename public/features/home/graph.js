angular.module('smartNews.home')

.controller('GraphCtrl', function($scope, $http, TopTrendsFactory) {
  d3.select('#chart')
  .selectAll("div")
  .data([4, 8, 15, 16, 23, 42])
  .enter()
  .append("div")
  .style("height", (d)=> d + "px");
});

