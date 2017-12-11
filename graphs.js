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
      time: '30.11.2017 18:7:49',
      current_time: 82
    }, {
      status: 'play',
      time: '30.11.2017 18:7:50',
      current_time: 115
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:51',
      current_time: 116
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:52',
      current_time: 117
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:53',
      current_time: 118
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:54',
      current_time: 118
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:55',
      current_time: 119
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:56',
      current_time: 120
    }, {
      status: 'ended',
      time: '30.11.2017 18:7:57',
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
      time: '30.11.2017 18:7:49',
      current_time: 114
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:50',
      current_time: 115
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:51',
      current_time: 116
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:52',
      current_time: 117
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:53',
      current_time: 118
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:54',
      current_time: 118
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:55',
      current_time: 119
    }, {
      status: 'timeupdate',
      time: '30.11.2017 18:7:56',
      current_time: 120
    }, {
      status: 'ended',
      time: '30.11.2017 18:7:57',
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
  /*
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
  */
  /* </HELPER FUNCTIONS> */

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

    this.init();
  }
  LineChart.prototype = {
    init: function prepareGraphForRendering() {
      var svgStyles = this.svgRef.node().parentElement.getBoundingClientRect();
      var width = Math.round(svgStyles.width);
      var height = Math.round(svgStyles.height);
      if (width > 600) {
        width = 600;
      } else if (width < 500) {
        width = 500;
      }

      this.width = width;
      this.height = height;

      this.svgRef.attr('width', this.width);
      this.svgRef.attr('height', this.height);
      this.svgRef.attr('id', this.svgId);

      this.gRef = this.svgRef.append('g')
        .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    },
    // CREATE SEPARATELY
    createTooltip: function createTooltip() {
      this.tooltip =
        d3.select(this.svgRef.node().parentElement)
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
    createLineChart: function instantiateNewGraph(dataset) {
      this.lineChart =
        this.gRef
          .append('path')
          .attr('d', this.line(dataset))
          .attr('stroke', 'turquoise')
          .attr('stroke-width', 2)
          .attr('fill', 'none');
    },
    // UPDATE SEPARATELY
    updateLineChart: function updateInstantiatedGraph(dataset) {
      var transitionLineChart = function transitionLineChart(line) {
        return function actualTransition() {
          var previous = d3.select(this).attr('d');
          var current = line(dataset);
          return d3.interpolate(previous, current);
        };
      };

      this.lineChart
        .transition()
        .duration(this.duration)
        .attrTween('d', transitionLineChart(this.line));
    },
    // CREATE AND UPDATE
    makeScales: function adaptScalesForDataset(data, fullWidth, fullHeight, rangesToTruncate) {
      if (rangesToTruncate.length !== 0) {
        this.xScale = fc.scaleDiscontinuous(d3.scaleTime())
          .discontinuityProvider(fc.discontinuityRange.apply(fc, rangesToTruncate));
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
    makeOffsets: function makeOffsetsForGraphPoints(data, additionalOffsetVal) {
      this.xOffset = function calcXOffset(log, index) {
        // this is done to provide additional padding of everything that uses this.xOffset
        // this is only applied if there's a gap between play and pause on the graph
        var regularOffset = this.xScale(turnStrIntoDate(log.time));
        var additionalOffset = 0;
        switch (log.status) {
          case 'play': {
            var prevLog = data.statusLogs[index - 1] || null;
            if (
              (!!prevLog && prevLog.status === 'pause')
              && this.isGapLargerThanDuration(log.time, prevLog.time, data.video_duration)
            ) {
              additionalOffset = additionalOffsetVal;
            }
            break;
          }
          case 'pause': {
            var nextLog = data.statusLogs[index + 1] || null;
            if (
              (!!nextLog && nextLog.status === 'play')
              && this.isGapLargerThanDuration(log.time, nextLog.time, data.video_duration)
            ) {
              additionalOffset = -Math.abs(additionalOffsetVal);
            }
            break;
          }
          default:
            // 'ended' or 'timeupdate' - do nothing
        }
        return regularOffset + additionalOffset;
      }.bind(this);

      this.yOffset = function calcYOffset(log) {
        return this.yScale(turnSecondsIntoDate(log.current_time));
      }.bind(this);
    },
    makeLineFn: function makeLineFunction() {
      this.line = d3.line()
        .x(this.xOffset)
        .y(this.yOffset);
    },
    appendAxises: function appendAxises(data, fullHeight, rangesToTruncate) {
      function getRelativeTime(log) {
        return turnSecondsIntoDate(log.current_time);
      }
      function getAbsoluteTime(log) {
        return turnStrIntoDate(log.time);
      }
      function calcTickValues(dataset, getTimeCallback, tickTotal) {
        var totalLength;
        var tickValues = [];
        function getIntervalRangeInMillis(interval) {
          var rangeInDates = d3.extent(interval, getTimeCallback);
          return [rangeInDates[0].getTime(), rangeInDates[1].getTime()];
        }
        function createTickValuesForInterval(interval) {
          var range = getIntervalRangeInMillis(interval);
          var intervalLength = range[1] - range[0];
          var percentage = intervalLength / totalLength;
          var ticksPerInterval = tickTotal * percentage;
          var step = intervalLength / ticksPerInterval;
          return d3.range(range[0], range[1] + step, step);
        }

        // check if graph contains gaps
        // if it does we need to calculate tick values for each of the intervals separately
        // and also we need to examine the length of interval compared to the total length
        // in order to assign appropriate amount if ticks (out of total) for the given interval
        if (Object.prototype.toString.call(dataset[0]) === '[object Array]') { // has gaps
          totalLength = dataset.reduce(function sumAllIntervals(sum, interval) {
            var range = getIntervalRangeInMillis(interval);
            return sum + (range[1] - range[0]);
          }, 0);
          dataset.forEach(function calcTickValuesOfInterval(interval) {
            tickValues = tickValues.concat(createTickValuesForInterval(interval));
          });
        } else { // no gaps
          totalLength =
            d3.max(dataset, getTimeCallback).getTime() - d3.min(dataset, getTimeCallback).getTime();
          tickValues = createTickValuesForInterval(dataset);
        }

        return tickValues;
      }
      function filterIntervalsOut(intervals) {
        var statusLogsInMillis = data.statusLogs.map(function mapStrToDate(log) {
          return getAbsoluteTime(log).getTime();
        });
        var dataset = [];
        var startIndex = 0;
        var endIndex;

        // divide dataset into ranges that do not fall into intervals
        // this is done in order to callculate tick values properly
        intervals.forEach(function separateIntervals(interval) {
          endIndex = statusLogsInMillis.indexOf(interval[0].getTime());
          dataset.push(data.statusLogs.slice(startIndex, endIndex));
          startIndex = statusLogsInMillis.indexOf(interval[1].getTime());
        });

        if (startIndex !== -1) {
          dataset.push(data.statusLogs.slice(startIndex));
        }

        return dataset;
      }
      function calcXTickValues(intervalsToTruncate) {
        var dataset = data.statusLogs.slice();

        if (intervalsToTruncate.length !== 0) {
          dataset = filterIntervalsOut(intervalsToTruncate);
        }

        return calcTickValues(dataset, getAbsoluteTime, 6);
      }
      function calcYTickValues() {
        var alteredDataset = JSON.parse(JSON.stringify(data));

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

        return calcTickValues(alteredDataset.statusLogs, getRelativeTime, 8);
      }

      var yAxisGen = d3.axisLeft(this.yScale)
        .tickValues(calcYTickValues())
        .tickFormat(d3.timeFormat('%M:%S'));

      var xAxisGen = d3.axisBottom(this.xScale)
        .tickValues(calcXTickValues(rangesToTruncate))
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
    renderCircles: function renderCircles(dataset, radius) {
      var onHoverEvtHandler = (function onHoverEvtHandler(_this) {
        return function currythis(radiusVal) {
          return function doActualWork(log) {
            var xPos = this.getAttribute('cx');
            var yPos = this.getAttribute('cy');
            var evt = d3.event;

            if (log.status === 'play' || log.status === 'pause') {
              _this.toggleHorizontalLine(yPos, evt);
            }

            _this.toggleTooltip(xPos, yPos, evt, log);

            d3.select(this)
              .transition()
              .duration(_this.duration)
              .attr('r', radiusVal);
          };
        };
      }(this));
      function determineRadius(radiusVal) {
        return function inner(log) {
          return log.status !== 'timeupdate' ? radiusVal + (radiusVal / 2) : radiusVal;
        };
      }

      if (!this.circleGroup) {
        this.circleGroup =
          this.gRef
            .append('g')
            .classed('js-circle-group', true);
      }

      var circles =
        this.circleGroup
          .selectAll('circle')
          .data(dataset);

      circles
        .exit()
        .remove();

      circles
        .enter()
        .append('circle')
        .merge(circles)
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
    renderGaps: function renderGaps(dataset) {
      var gapsSel;
      var gapIntervals = [];
      var gapLine = d3.line()
        .x(function xOffsetWrapper(log) {
          var actualIndex = dataset.indexOf(log);
          return this.xOffset(log, actualIndex);
        }.bind(this))
        .y(this.yOffset);

      dataset.forEach(function checkForPauseStatus(log, index) {
        if (log.status === 'pause') {
          gapIntervals.push([log, dataset[index + 1]]);
        }
      });

      if (!this.gapGroup) {
        this.gapGroup =
          this.gRef
            .append('g')
            .classed('js-gap-group', true);
      }

      gapsSel =
        this.gapGroup
          .selectAll('.js-gap')
          .data(gapIntervals);

      gapsSel
        .exit()
        .remove();

      gapsSel
        .enter()
        .append('path')
        .merge(gapsSel)
        .classed('js-gap', true)
        .style('stroke', getComputedStyle(this.svgRef.node().parentElement).backgroundColor)
        .style('stroke-width', 4)
        .transition()
        .duration(this.duration)
        .attr('d', function applyGapInterval(gapInterval) {
          return gapLine(gapInterval);
        });
    },
    renderVerticalLines: function renderVerticalLines(dataset, intervals) {
      var translateOnX = function moveVerticalLineOnX(interval) {
        var datasetInMillis = dataset.map(function mapStrToDate(log) {
          return turnStrIntoDate(log.time).getTime();
        });
        var logIndex = datasetInMillis.indexOf(interval[0].getTime());
        return this.xOffset(dataset[logIndex]);
      }.bind(this);
      var margin = this.margin;
      var verticalLineSel;

      if (!this.verticalLineGroup) {
        this.verticalLineGroup =
          this.gRef
            .append('g')
            .classed('js-vertical-line-group', true);
      }

      verticalLineSel =
        this.verticalLineGroup
          .selectAll('.js-vertical-line')
          .data(intervals);

      verticalLineSel
        .exit()
        .remove();

      verticalLineSel
        .enter()
        .append('line')
        .merge(verticalLineSel)
        .classed('js-vertical-line', true)
        .attr('x1', translateOnX)
        .attr('x2', translateOnX)
        .attr('y1', 0)
        .attr('y2', this.height - margin.top - margin.bottom)
        .attr('stroke', 'grey')
        .style('stroke-dasharray', '5, 5')
        .style('stroke-width', 2);
    },
    replaceGapTicksWithTripleDot: function replaceGapTickValuesWithTripleDot() {
      var lineX;
      var tickSel = this.gRef.selectAll('.x-axis .tick');

      function compareTickAndLineXPos() {
        // turns 'translate(1, 0)' into 1
        var tick = d3.select(this);
        var tickX = Number(tick.attr('transform').split(/\(|,/)[1]);
        var rangeDiff = Math.abs(lineX - tickX); // lineX is local to the outer scope

        console.log(tick.style('font-size'));

        if (rangeDiff <= 3) {
          // close enough
          tick
            .select('text')
            .classed('text--ellipsed', true)
            .text('...');
          // bug - it get's changed back to the previous value
        } else if (tick.classed('text--ellipsed')) {
          tick.classed('text--ellipsed', false);
        }
      }

      this.verticalLineGroup
        .selectAll('line')
        .each(function matchLineToTicks() {
          lineX = Number(d3.select(this).attr('x1'));
          tickSel.each(compareTickAndLineXPos);
        });
    },
    render: function render(data) {
      if (!data || Object.prototype.toString.call(data) !== '[object Object]') {
        throw Error('Dataset doesn\'t exist or is not of the [object Object] type');
      }

      var margin = this.margin;
      var fullWidth = this.width - margin.left - margin.right;
      var fullHeight = this.height - margin.top - margin.bottom;
      var radius = 6;
      var rangesToTruncate = this.truncate(data);

      this.makeScales(data, fullWidth, fullHeight, rangesToTruncate);
      this.makeOffsets(data, radius * 2);
      this.makeLineFn();
      this.appendAxises(data, fullHeight, rangesToTruncate);

      if (!this.wasGraphRendered) {
        this.createTooltip();
        this.createLineChart(data.statusLogs); // 1
      } else {
        this.updateLineChart(data.statusLogs);
      }

      this.renderGaps(data.statusLogs); // 2
      this.renderCircles(data.statusLogs, radius);
      this.renderVerticalLines(data.statusLogs, rangesToTruncate);

      // put this.replaceGapTicksWithTripleDot() to the next call stack
      // to remove a bug where replaced ... would be overwritten with previous value
      setTimeout(function delay() {
        this.replaceGapTicksWithTripleDot();
      }.bind(this), 0);

      // we are checking !this.wasGraphRendered for the second time
      // in order to prevent race condition
      // this.createLineChart - first
      // this.renderGaps      - second
      // this.createHorLine   - third
      // this.createHorLine in the first check because of this
      if (!this.wasGraphRendered) {
        this.createHorLine(); // 3
        this.wasGraphRendered = true;
      }
    },
    truncate: function shouldTruncateLineChart(data) {
      var rangesToTruncate = [];
      data.statusLogs.forEach(function checkPauseLength(log, index) {
        if (log.status === 'pause' && data.statusLogs[index + 1]) {
          if (this.isGapLargerThanDuration(
            log.time,
            data.statusLogs[index + 1].time,
            data.video_duration
          )) {
            rangesToTruncate.push([
              turnStrIntoDate(log.time),
              turnStrIntoDate(data.statusLogs[index + 1].time)
            ]);
          }
        }
      }.bind(this));
      return rangesToTruncate;
    },
    isGapLargerThanDuration: function isGapLargerThanDur(currLogDateStr, compLogDateStr, duration) {
      var compLogDate = turnStrIntoDate(compLogDateStr);
      var currLogDate = turnStrIntoDate(currLogDateStr);
      return (Math.abs(currLogDate.getTime() - compLogDate.getTime())) / 1000 >= duration;
    }
  };

  window.addEventListener('load', function initLineChart() {
    var line = new LineChart('.js-graph', 'video-stats');
    line.render(dataWithTooMuchPause);
    // setTimeout(function updateExample() {
    //   line.render(exampleData2);
    // }, 1000);
  });
  /* </LINE CHART UI CLASS> */
}(d3, fc));
