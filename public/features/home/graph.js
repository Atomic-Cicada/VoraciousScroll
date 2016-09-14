angular.module('smartNews.home')

.controller('GraphCtrl', function($scope, $http, TopTrendsFactory) {

  $scope.topFiveHits = {
    One: 'First',
    Two: 'Second',
    Three: 'Third',
    Four: 'Fourth',
    Five: 'Fifth'
  };

  $scope.renderGraph = function() {
    var tooltip = d3.select('#chart')
      .append('div')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style('visibility', 'hidden')
      .text($scope.topFiveHits.One);


    d3.select('#chart')
    .selectAll('div')
    .data([4, 8, 15, 16, 23, 42])
    .enter()
    .append('div')
    .style('height', (d)=> d + 'px')
    .on('mouseover', function(d) {
      console.log(this);
      d3.select(this).style('opacity', .6);
      return tooltip.style('visibility', 'visible');
    })
    .on('mouseout', function(d) {
      d3.select(this).style('opacity', 1);
      return tooltip.style('visibility', 'hidden');
    });
  };

});
