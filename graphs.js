var discontinuityRange = require('d3fc-discontinuous-scale');

console.log(discontinuityRange);

(function myModule(d3, fc) {
  /* <TEST DATASET> */
  var exampleData = {
    video_duration: 122,
    statusLogs: [{
      status: 'play',
      time: '30.11.2017 18:7:39',
      current_time: 100
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:40',
      current_time: 20
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:41',
      current_time: 21
    }, {
      status: 'pause',
      time: '30.11.2017 18:7:42',
      current_time: 22
    }, {
      status: 'play',
      time: '30.11.2017 18:7:47',
      current_time: 80
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:48',
      current_time: 81
    }, {
      status: 'pause',
      time: '30.11.2017 18:7:48',
      current_time: 82
    }, {
      status: 'play',
      time: '30.11.2017 18:7:48',
      current_time: 115
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:48',
      current_time: 116
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:48',
      current_time: 117
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:48',
      current_time: 118
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:48',
      current_time: 118
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:49',
      current_time: 119
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:50',
      current_time: 120
    }, {
      status: 'ended',
      time: '30.11.2017 18:7:51',
      current_time: 120
    }]
  };

  var exampleData2 = {
    video_duration: 122,
    statusLogs: [{
      status: 'play',
      time: '30.11.2017 18:7:39',
      current_time: 10
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:40',
      current_time: 20
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:41',
      current_time: 21
    }, {
      status: 'pause',
      time: '30.11.2017 18:7:42',
      current_time: 22
    }, {
      status: 'play',
      time: '30.11.2017 18:7:47',
      current_time: 80
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:48',
      current_time: 81
    }, {
      status: 'pause',
      time: '30.11.2017 18:7:49',
      current_time: 82
    }, {
      status: 'play',
      time: '30.11.2017 18:7:50',
      current_time: 10
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:51',
      current_time: 11
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:52',
      current_time: 12
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:53',
      current_time: 13
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:54',
      current_time: 14
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:55',
      current_time: 15
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:55',
      current_time: 16
    }, {
      status: 'ended',
      time: '30.11.2017 18:7:56',
      current_time: 17
    }]
  };

  var dataWithTooMuchPause = {
    video_duration: 122,
    statusLogs: [{
      status: 'play',
      time: '30.11.2017 17:7:39',
      current_time: 100
    }, {
      status: 'timeupdate',
      time: '30.11.2017 17:7:40',
      current_time: 20
    }, {
      status: 'timeupdate',
      time: '30.11.2017 17:7:41',
      current_time: 21
    }, {
      status: 'pause',
      time: '30.11.2017 17:7:42',
      current_time: 22
    }, {
      status: 'play',
      time: '30.11.2017 18:7:47',
      current_time: 112
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:48',
      current_time: 113
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:48',
      current_time: 114
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:48',
      current_time: 115
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:48',
      current_time: 116
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:48',
      current_time: 117
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:48',
      current_time: 118
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:48',
      current_time: 118
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:49',
      current_time: 119
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:50',
      current_time: 120
    }, {
      status: 'ended',
      time: '30.11.2017 18:7:51',
      current_time: 120
    }]
  };
  /* </TEST DATASET> */


  /* <HELPER FUNCTIONS> */
  function turnStrIntoDate(dateStr) {
    // 30.11.2017 18:7:41
    var dateArr = dateStr.split(/\.|\s/);

    var yearMonthDay = dateArr.slice(0, 3).reverse();
    var hourMinSec = dateArr.slice(3);
    var validDateArr = yearMonthDay.concat(hourMinSec);

    return new Date(Date.parse(validDateArr));
  }
  function turnSecondsIntoDate(secondsTotalVal) {
    var today = new Date();
    var seconds = Number(secondsTotalVal);
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    seconds = Math.floor(seconds % 3600 % 60);

    today.setHours(hours);
    today.setMinutes(minutes);
    today.setSeconds(seconds);

    return today;
  }
  function removeDuplicates(array) {
    var seen = {};

    return array.filter(function isItemADuplicate(item) {
      if (Object.prototype.hasOwnProperty.call(seen, item)) {
        return false;
      }

      seen[item] = true;

      return true;
    });
  }
  function formTickValues(finalLevel, level, prevSm, prevLg) {
    if (level === finalLevel) {
      return [];
    }

    var outputArray = [new Date(prevSm), new Date(prevLg)];
    var currTick = (prevLg + prevSm) / 2;

    outputArray.push(new Date(currTick));

    var valuesDown = formTickValues(finalLevel, level + 1, currTick, prevLg);
    if (valuesDown.length !== 0) {
      outputArray = outputArray.concat(valuesDown);
    }

    var valuesUp = formTickValues(finalLevel, level + 1, prevSm, currTick);
    if (valuesUp.length !== 0) {
      outputArray = outputArray.concat(valuesUp);
    }

    return removeDuplicates(outputArray); // Set is used to remove duplicates
  }
  /* </HELPER FUNCTIONS> */


  /* <ACTUAL GRAPH REPRESENTATION> */
  function Graph(params) {
    return Object.assign(this, params);
  }
  Graph.prototype = {
    append: function appendNewInstance(dataset) {
      this.container
        .append('path')
        .attr('d', this.lineFunction(dataset))
        .attr('stroke', this.color || 'black')
        .attr('stroke-width', this.strokeWidth || 2)
        .attr('fill', this.fill || 'none')
        .attr('class', 'graph-type__' + this.type)
        .style('opacity', this.opacityVal || (this.hidden ? 0 : 1));
    },
    update: function updateOldInstance(dataset) {
      var transitionLineChart = function transitionLineChart(line) {
        return function actualTransition() {
          var previous = d3.select(this).attr('d');
          var current = line(dataset);
          return d3.interpolate(previous, current);
        };
      };

      this.container
        .select('.graph-type__' + this.type)
        .transition()
        .duration(this.duration)
        .attrTween('d', transitionLineChart(this.lineFunction))
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

    if (svgId) {
      this.id = svgId;
    }
    this.duration = 300; // for animations
    this.margin = {
      top: 60, right: 60, bottom: 60, left: 60
    };
    this.wasGraphRendered = false;

    this.init();
  }
  LineChart.prototype = {
    init: function prepareGraphForRendering() {
      var width = Math.round(this.svgRef.node().parentElement.getBoundingClientRect().width);
      if (width > 600) {
        width = 600;
      } else if (width < 500) {
        width = 500;
      }

      this.width = width;
      this.height = width * 0.6;

      this.svgRef.attr('width', this.width);
      this.svgRef.attr('height', this.height);
      this.svgRef.attr('id', this.svgId);

      this.gRef = this.svgRef.append('g')
        .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    },
    // CREATE
    createTooltip: function createTooltip() {
      this.tooltip = d3.select(this.svgRef.node().parentElement)
        .append('div')
        .classed('tooltip', true)
        .style('opacity', 0)
        .style('transition', 'opacity .5s linear');

      this.tooltip
        .append('p')
        .classed('tooltip__field js-status', true);

      this.tooltip
        .append('p')
        .classed('tooltip__field js-absolute-time', true);

      this.tooltip
        .append('p')
        .classed('tooltip__field js-relative-time', true);
    },
    createHorLine: function createHorizotalLine() {
      this.horizontalLine =
        this.gRef
          .append('line')
          .attr('x1', 0)
          .attr('x2', this.width - this.margin.left - this.margin.right)
          .attr('y1', this.height)
          .attr('y2', this.height)
          .attr('stroke', 'grey')
          .attr('stroke-width', 2)
          .style('opacity', 0);
    },
    createGraphInstance: function instantiateNewGraph(dataset) {
      this.graphInstance = new Graph({
        type: 'video-metadata',
        color: 'turquoise',
        hidden: false,
        duration: this.duration,
        lineFunction: d3.line()
          .defined(function shouldPointRender(item) {
            return item.status !== 'pause';
          })
          .x(this.xOffset)
          .y(this.yOffset),
        container: this.gRef,
      });
      this.graphInstance.append(dataset);
      this.wasGraphRendered = true;
    },
    createOffsets: function createOffsetsForGraphPoints() {
      this.xOffset = function calcXOffset(log) {
        return this.xScale(turnStrIntoDate(log.time));
      }.bind(this);

      this.yOffset = function calcYOffset(log) {
        return this.yScale(turnSecondsIntoDate(log.current_time));
      }.bind(this);
    },
    // UPDATE
    updateGraphInstance: function updateInstantiatedGraph(dataset) {
      this.graphInstance.update(dataset);
    },
    // CREATE AND UPDATE
    makeScales: function adaptScalesForDataset(data, fullWidth, fullHeight) {
      var rangesToTruncate = this.truncate(data);

      if (rangesToTruncate.length !== 0) {
        this.xScale = fc.scaleDiscontinuous(d3.scaleTime())
          .discontinuityProvider(fc.discontinuityRange(rangesToTruncate));
      } else {
        this.xScale = d3.scaleTime();
      }

      this.xScale
        .domain([
          turnStrIntoDate(data.statusLogs[0].time),
          turnStrIntoDate(data.statusLogs[data.statusLogs.length - 1].time)
        ])
        .range([0, fullWidth]);

      this.yScale = d3.scaleTime()
        .domain([
          turnSecondsIntoDate(0),
          turnSecondsIntoDate(data.video_duration)
        ])
        .range([fullHeight, 0]);
    },
    appendAxises: function appendAxises(dataset, fullHeight) {
      function getRelativeTime(log) {
        return turnSecondsIntoDate(log.current_time);
      }
      function getAbsoluteTime(log) {
        return turnStrIntoDate(log.time);
      }
      function determineTickValues(dataset0, getTimeCallback) {
        var userValues = dataset0.statusLogs.map(getTimeCallback);
        var randomValues = formTickValues(
          3,
          0,
          d3.min(dataset0.statusLogs, getTimeCallback).getTime(),
          d3.max(dataset0.statusLogs, getTimeCallback).getTime(),
        );

        if (randomValues.length > 5) {
          return randomValues;
        }

        return userValues;
      }
      function determineXTickValues(dataset0) {
        return determineTickValues(dataset0, getAbsoluteTime);
      }
      function determineYTickValues(dataset0) {
        var alteredDataset = JSON.parse(JSON.stringify(dataset0));

        // if the first log is not the start of the video
        // we'll need to insert 00:00 manually to draw axises nicely
        if (alteredDataset.statusLogs[0].current_time !== 0) {
          alteredDataset.statusLogs.unshift({
            current_time: 0
          });
        }

        // if the last log is not the end of the video
        // we'll need to insert ${video_duration} manually to draw axises nicely
        if (
          alteredDataset.statusLogs[alteredDataset.statusLogs.length - 1].current_time
          !==
          alteredDataset.video_duration
        ) {
          alteredDataset.statusLogs.push({
            current_time: alteredDataset.video_duration
          });
        }

        return determineTickValues(alteredDataset, getRelativeTime);
      }

      var yAxisGen = d3.axisLeft(this.yScale)
        .tickValues(determineYTickValues(dataset))
        .tickFormat(d3.timeFormat('%M:%S'));


      var xAxisGen = d3.axisBottom(this.xScale)
        .tickValues(determineXTickValues(dataset))
        .tickFormat(d3.timeFormat('%H:%M:%S'));

      // Y AXIS
      var yAxis = this.gRef.select('g.y-axis');
      if (!yAxis.node()) {
        yAxis = this.gRef.append('g').attr('class', 'y-axis');
      }
      yAxis
        .transition()
        .duration(this.duration)
        .call(yAxisGen);

      // X AXIS
      var xAxis = this.gRef.select('g.x-axis');
      if (!xAxis.node()) {
        xAxis = this.gRef.append('g')
          .attr('transform', 'translate(0, ' + fullHeight + ')')
          .attr('class', 'x-axis');
      }

      xAxis
        .transition()
        .duration(this.duration)
        .call(xAxisGen);
    },
    toggleTooltip: function toggleTooltip(x, y, evt, log) {
      var opacityVal = 0; // default - mouseout
      var xPos = Number(x);
      var yPos = Number(y);

      if (evt.type === 'mouseover') {
        opacityVal = 0.95;
      }

      this.tooltip
        .select('.js-status')
        .text('status: ' + log.status);

      this.tooltip
        .select('.js-relative-time')
        .text('x: ' + d3.timeFormat('%M:%S')(turnSecondsIntoDate(log.current_time)));

      this.tooltip
        .select('.js-absolute-time')
        .text('y: ' + d3.timeFormat('%H:%M:%S')(turnStrIntoDate(log.time)));

      this.tooltip
        .style('left', xPos + 'px')
        .style('top', (yPos - 10) + 'px')
        .style('opacity', opacityVal);
    },
    toggleHorizontalLine: function toggleHorizontalLine(y, evt) {
      var opacityVal = 0;
      var yPos = Number(y);

      this.horizontalLine
        .attr('y1', yPos)
        .attr('y2', yPos);

      if (evt.type === 'mouseover') {
        opacityVal = 0.6;
      }

      this.horizontalLine
        .transition()
        .duration(this.duration)
        .style('opacity', opacityVal);
    },
    renderCircles: function renderCircles(dataset) {
      var radius = 6;
      var onHoverEvtHandler = (function onHoverEvtHandler(that) {
        return function curryThatArg(radiusVal) {
          return function inner(log) {
            var xPos = this.getAttribute('cx');
            var yPos = this.getAttribute('cy');
            var evt = d3.event;

            that.toggleHorizontalLine(yPos, evt);
            that.toggleTooltip(xPos, yPos, evt, log);

            d3.select(this)
              .transition()
              .duration(that.duration)
              .attr('r', radiusVal);
          };
        };
      }(this));

      function determineRadius(radiusVal) {
        return function inner(log) {
          return log.status !== 'timeupdate' ? radiusVal + (radiusVal / 2) : radiusVal;
        };
      }

      var circleAll =
        this.gRef
          .selectAll('circle')
          .data(dataset);

      circleAll
        .exit()
        .remove();

      circleAll
        .enter()
        .append('circle')
        .merge(circleAll)
        .on('mouseover', onHoverEvtHandler(determineRadius(radius * 2)))
        .on('mouseout', onHoverEvtHandler(determineRadius(radius)))
        .transition()
        .duration(this.duration)
        .attr('r', determineRadius(radius))
        .attr('fill', function determineColor(log) {
          var color;
          switch (log.status) {
            case 'timeupdate':
              color = 'turquoise';
              break;
            case 'play':
              color = 'springgreen';
              break;
            case 'pause':
              color = 'darkorange';
              break;
            case 'ended':
              color = 'salmon';
              break;
            default:
              console.warn('Unknown log.status of', log.status);
          }

          return color;
        })
        .attr('cx', this.xOffset)
        .attr('cy', this.yOffset)
        .style('cursor', 'pointer');
    },
    render: function render(data) {
      if (!data || Object.prototype.toString.call(data) !== '[object Object]') {
        throw Error('Dataset doesn\'t exist or not of the [object Object] type');
      }

      var margin = this.margin;
      var fullWidth = this.width - margin.left - margin.right;
      var fullHeight = this.height - margin.top - margin.bottom;

      this.makeScales(data, fullWidth, fullHeight);
      this.appendAxises(data, fullHeight);

      if (this.wasGraphRendered) {
        this.updateGraphInstance(data.statusLogs);
      } else {
        this.createOffsets();
        this.createTooltip();
        this.createHorLine();
        this.createGraphInstance(data.statusLogs);
      }

      this.renderCircles(data.statusLogs);
    },
    truncate: function shoudlTtruncateLineChart(data) {
      var rangesToTruncate = [];

      data.statusLogs.forEach(function checkPauseLength(item, index) {
        if (item.status === 'pause' && data.statusLogs[index + 1]) {
          var pausePoint = turnStrIntoDate(item.time);
          var nextPoint = turnStrIntoDate(data.statusLogs[index + 1].time);
          var timePassed = (nextPoint.getTime() - pausePoint.getTime()) / 1000;

          if (timePassed >= data.video_duration) {
            rangesToTruncate.push([pausePoint, nextPoint]);
          }
        }
      });

      return rangesToTruncate;
    }
  };

  window.addEventListener('load', function initLineChart() {
    var line = new LineChart('.js-graph', 'video-stats');
    line.render(dataWithTooMuchPause);
    // setTimeout(function updateExample() {
    //   line.render(exampleData);
    // }, 1000);
  });
  /* </LINE CHART UI CLASS> */
}(d3, fc));
