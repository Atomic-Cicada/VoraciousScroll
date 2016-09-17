angular.module('smartNews.graphServices', [])
.factory('renderGraph', function($rootScope) {
  var selectedDate = {
    startDate: 'NOW-2DAYS',
    endDate: 'NOW'
  };

  var renderGraph = function(dataObj, renderTo) {
    data = dataObj.data.timeSeries;
    // parse UTC date/time
    var parseTime = d3.timeParse('%Y-%m-%dT%H:%M:%S.%LZ');
    // format data
    data.forEach(function(d) {
      d.date = parseTime(d.publishedAt);
      d.value = d.count;
    });

    // set graph dimensions and margins
    var margin = { top: 50, right: 50, bottom: 50, left: 50 };
    var width = window.innerWidth - margin.left - margin.right;
    var height = 200 - margin.top - margin.bottom;

    // set X & Y range
    // range is the raw data values scaled to fit the graph dimensions
    var x = d3.scaleTime().domain(d3.extent(data, function(d) {
      return d.date;
    })).range([0, width - margin.right]);
    var y = d3.scaleLinear().domain([0, d3.max(data, function(d) {
      return d.value;
    })]).range([height, 0]);

    var svg = d3.select(renderTo)
      .append('svg')
      .classed('svg-chart', true)
      .attr('viewBox', '0 0 ' + (width) + ' ' + 200)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // add x-axis labels
    svg.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    // add y-axis labels
    svg.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + '0' + ')')
      .call(d3.axisLeft(y).ticks(5));

    // div element for tooltip
    var div = d3.select(renderTo).append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    // create line and set x/y values
    var valueline = d3.line()
      .x(function(d) {
        return x(d.date);
      })
      .y(function(d) {
        return y(d.value);
      });

    // filled area definition
    var dataFill = d3.area()
      .x(function(d) { return x(d.date); })
      .y0(height)
      .y1(function(d) { return y(d.value); });

    // create filled area
    svg.append('path')
      .datum(data)
      .attr('class', 'datafill')
      .attr('d', dataFill);

    // add valueline path to graph
    svg.append('path')
      .data([data])
      .attr('class', 'line')
      .attr('d', valueline);

    // rectangles
    svg.selectAll('rect')
      .data(data)
      .enter().append('rect')
      .attr('width', width / data.length)
      .attr('height', height)
      .attr('x', function(d) {
        return x(d.date - (width / data.length / 2));
      })
      .attr('y', 0)
      .attr('class', 'tooltip-target')
      .on('mouseover', function(d) {
        d3.select(this)
          .classed('tooltip-target-on', true);
        div.transition()
          .duration(100)
          .style('opacity', 0.75);
        div.html(
            '<span class="tooltip-date">' + moment(d.date).format('MM/DD/YYYY') + '<br/>' + '<span class="tooltip-value">' + d.value + ' articles'
          )
          .style('left', (d3.event.pageX) + 'px')
          .style('top', (d3.event.pageY - 28) + 'px');
      })
      .on('mouseout', function(d) {
        d3.select(this)
          .classed('tooltip-target-on', false);
        div.transition()
          .duration(250)
          .style('opacity', 0);
      })
      .on('click', function(d) {
        var startDate = d.publishedAt.split('T')[0];
        selectedDate.startDate = new Date(startDate).toISOString();
        var endDate = new Date(startDate);
        endDate = endDate.setDate(endDate.getDate() + 1);
        selectedDate.endDate = new Date(endDate).toISOString();
        $rootScope.$broadcast('user:clickDate', selectedDate);
      });
  };

  return {
    renderGraph: renderGraph,
    selectedDate: selectedDate
  };
})
