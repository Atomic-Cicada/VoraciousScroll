angular.module('smartNews.home')

.controller('GraphCtrl', function($scope, $http, renderGraph) {

  $scope.placeHolderData = {
    data: {
      timeSeries: [
        {count: 850, publishedAt: "2016-03-24T03:01:11.181Z"},
        {count: 681, publishedAt: "2016-03-25T03:01:11.181Z"},
        {count: 981, publishedAt: "2016-03-26T03:01:11.181Z"}
      ]
    }
  };


  $scope.renderGraph = renderGraph.renderGraph($scope.placeHolderData, '#graphHomePage');





   // var tooltip = d3.select('#chart')
  //     .append('div')
  //     .style('position', 'absolute')
  //     .style('z-index', '10')
  //     .style('visibility', 'hidden')


  //   // Instead of the hard coded data we should be passing in an object with "topic" and "hits" properties which we will find
  //   // inside of topFiveHits
  //   // Why is it cutting off the first data entry ?!
  //   d3.select('#chart')
  //   .selectAll('div')
  //   .data([{hits: 6, topic: 'Tupac'}, {hits: 8, topic: 'Shakira'}, {hits: 15, topic: 'Trump'}, {hits: 16, topic: 'Clinton'}, {hits: 23, topic: 'Cher'}, {hits: 68, topic: 'HackReactor'}])
  //   .enter()
  //   .append('div')
  //   .style('height', (d)=> d.hits + 'px')
  //   .on('mouseover', function(d) {
  //     console.log('here is hits ', d.hits);
  //     d3.select(this).style('opacity', .6);
  //     return tooltip.text(d.topic + ' hits: ' + d.hits).style('visibility', 'visible');
  //   })
  //   .on('mouseout', function(d) {
  //     d3.select(this).style('opacity', 1);
  //     return tooltip.style('visibility', 'hidden');
  //   });
  // };

});
