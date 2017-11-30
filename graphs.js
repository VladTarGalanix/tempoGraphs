(function myModule(d3) {
  /* <TEST DATASET> */
  var data = {
    video_duration: 122,
    statusLogs: [{
      status: 'timeupdate',
      time: '30.11.2017 18:7:39',
      current_time: 100
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:40',
      current_time: 20
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:41',
      current_time: 120
    }]
  };
  /* </TEST DATASET> */


  /* <HELPER FUNCTIONS> */
  function turnIntoValidDate(dateStr) {
    // 30.11.2017 18:7:41
    var dateArr = dateStr.split(/\.|\s/);

    var yearMonthDay = dateArr.slice(0, 3).reverse();
    var hourMinSec = dateArr.slice(3);
    var validDateArr = yearMonthDay.concat(hourMinSec);

    return new Date(Date.parse(validDateArr));
  }
  /* </HELPER FUNCTIONS> */


  /* <ACTUAL GRAPH REPRESENTATION> */
  function Graph(params) {
    Object.assign(this, params);
  }
  Graph.prototype = {
    append: function appendNewInstance(dataset) {
      this.container
        .append('path')
        .attr('d', this.lineFunction(dataset.statusLogs))
        .attr('stroke', this.color)
        .attr('stroke-width', this.strokeWidth || 2)
        .attr('fill', this.fill || 'none')
        .attr('id', 'graph-type__' + this.type)
        .style('opacity', this.opacityVal || (this.hidden ? 0 : 1));
    },
    update: function updateOldInstance(dataset) {
      this.container
        .select('#graph-type__' + this.type)
        .transition()
        .duration(1200)
        .attrTween('d', (_d, _i, el) => {
          var previous = d3.select(el[0]).attr('d');
          var current = this.lineFunction(dataset.statusLogs);
          return d3.interpolate(previous, current);
          // adds/removes points from prev to match current => for better graph transformations
        })
        .style('opacity', this.opacityVal || (this.hidden ? 0 : 1));
    }
  };
  /* </ACTUAL GRAPH REPRESENTATION> */


  /* <LINE CHART UI CLASS> */
  function LineChart(svgSelector, svgId) {
    if (!svgSelector) {
      throw Error('Please provide selector of DOM Element for graph to render inside');
    }
    this.svgRef = d3.select(svgSelector);
    this.id = svgId || 'defaultId';
    this.margin = {
      top: 60, right: 60, bottom: 60, left: 60
    };
  }
  LineChart.prototype = {
    // RENDERING GRAPH FOR THE FIRST TIME
    append: function appendLineChart(dataset) {
      if (!dataset || Object.prototype.toString.call(dataset) !== '[object Object]') {
        throw Error('Dataset doesn\'t exist or not of the [object Object] type');
      }

      var width = Math.round(this.svgRef.node().parentElement.getBoundingClientRect().width);
      if (width > 600) {
        width = 600;
      } else if (width < 500) {
        width = 500;
      }
      var margin = this.margin;
      var height = width * 0.6;
      var fullWidth = width - margin.left - margin.right;
      var fullHeight = height - margin.top - margin.bottom;

      this.svgRef.attr('width', width);
      this.svgRef.attr('height', height);
      this.svgRef.attr('id', this.svgId);

      this.width = width;
      this.heigth = height;
      this.gRef = this.svgRef.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      this.render(dataset, fullWidth, fullHeight);
    },
    createGraphInstance: function instantiateNewGraph(dataset) {
      var xOffset = function calcXOffsetOfPoint(log) {
        return this.xScale(turnIntoValidDate(log.time));
      }.bind(this);

      var yOffset = function calcYOffsetOfPoint(log) {
        return this.yScale(log.current_time);
      }.bind(this);

      this.lineGraphInstance = new Graph({
        type: 'video-metadata',
        color: '#c9302c',
        hidden: false,
        lineFunction: d3.line()
          .x(xOffset)
          .y(yOffset),
        container: this.gRef,
      });
      this.lineGraphInstance.append(dataset);
    },
    // UPDATING ALREADY BUILT GRAPH
    update: function updateLineChart(dataset) {
      if (!dataset || Object.prototype.toString.call(dataset) !== '[object Object]') {
        throw Error('Dataset doesn\'t exist or not of the [object Object] type');
      }

      var margin = this.margin;
      var width = this.width;
      var height = this.height;
      var fullWidth = width - margin.left - margin.right;
      var fullHeight = height - margin.top - margin.bottom;

      this.render(dataset, fullWidth, fullHeight);
    },
    updateGraphInstance: function updateInstantiatedGraph(dataset) {
      this.lineGraphInstance.update(dataset);
    },
    // GENERAL METHOD (USED BY BOTH this.append AND this.update)
    render: function renderFirstTime(dataset, fullWidth, fullHeight) {
      this.makeScales(dataset, fullWidth, fullHeight);
      this.appendAxises(dataset, fullHeight);
      this.createGraphInstance(dataset);
    },
    makeScales: function adaptScalesForDataset(dataset, fullWidth, fullHeight) {
      var firstDate =
        new Date(turnIntoValidDate(dataset.statusLogs[0].time))
          .getTime();
      var lastDate =
        new Date(turnIntoValidDate(dataset.statusLogs[dataset.statusLogs.length - 1].time))
          .getTime();

      this.xScale = d3.scaleLinear()
        .domain([firstDate, lastDate])
        .range([0, fullWidth]);

      this.yScale = d3.scaleLinear()
        .domain([0, dataset.video_duration])
        .range([fullHeight, 0]);
    },
    appendAxises: function creatAxises(dataset, fullHeight) {
      var yAxisGen = d3.axisLeft(this.yScale)
        .tickFormat(d3.timeFormat('%M:%S'));
      var xAxisGen = d3.axisBottom(this.xScale)
        .tickFormat(d3.timeFormat('%H:%M:%S'));

      const duration = 300;

      // Y AXIS
      let yAxis = this.gRef.select('g.y-axis');
      if (!yAxis.node()) {
        yAxis = this.gRef.append('g').attr('class', 'y-axis');
      }
      yAxis
        .transition()
        .duration(duration)
        .call(yAxisGen);

      // X AXIS
      let xAxis = this.gRef.select('g.x-axis');
      if (!xAxis.node()) {
        xAxis = this.gRef.append('g')
          .attr('transform', 'translate(0, ' + fullHeight + ')')
          .attr('class', 'x-axis');
      }

      xAxis
        .transition()
        .duration(duration)
        .call(xAxisGen);
    }
  };

  window.addEventListener('load', function initLineChart() {
    var lineChart = new LineChart('.js-graph', 'video-stats');
    lineChart.append(data);
  });
  /* </LINE CHART UI CLASS> */
}(d3));
