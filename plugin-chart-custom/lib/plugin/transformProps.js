"use strict";

exports.__esModule = true;
exports.default = transformProps;

var _core = require("@superset-ui/core");

var _chartControls = require("@superset-ui/chart-controls");

/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
const {
  DATABASE_DATETIME
} = _core.TimeFormats;

function isNumeric(key, data = []) {
  return data.every(record => record[key] === null || record[key] === undefined || typeof record[key] === 'number');
}

function transformProps(chartProps) {
  /**
   * This function is called after a successful response has been
   * received from the chart data endpoint, and is used to transform
   * the incoming data prior to being sent to the Visualization.
   *
   * The transformProps function is also quite useful to return
   * additional/modified props to your data viz component. The formData
   * can also be accessed from your PivotTableChart.tsx file, but
   * doing supplying custom props here is often handy for integrating third
   * party libraries that rely on specific props.
   *
   * A description of properties in `chartProps`:
   * - `height`, `width`: the height/width of the DOM element in which
   *   the chart is located
   * - `formData`: the chart data request payload that was sent to the
   *   backend.
   * - `queriesData`: the chart data response payload that was received
   *   from the backend. Some notable properties of `queriesData`:
   *   - `data`: an array with data, each row with an object mapping
   *     the column/alias to its value. Example:
   *     `[{ col1: 'abc', metric1: 10 }, { col1: 'xyz', metric1: 20 }]`
   *   - `rowcount`: the number of rows in `data`
   *   - `query`: the query that was issued.
   *
   * Please note: the transformProps function gets cached when the
   * application loads. When making changes to the `transformProps`
   * function during development with hot reloading, changes won't
   * be seen until restarting the development server.
   */
  const {
    width,
    height,
    queriesData,
    formData,
    rawFormData,
    hooks: {
      setDataMask = () => {}
    },
    filterState,
    datasource: {
      verboseMap = {},
      columnFormats = {}
    }
  } = chartProps;
  const {
    data,
    colnames,
    coltypes
  } = queriesData[0];
  const {
    groupbyRows,
    groupbyColumns,
    metrics,
    tableRenderer,
    colOrder,
    rowOrder,
    aggregateFunction,
    transposePivot,
    combineMetric,
    rowSubtotalPosition,
    colSubtotalPosition,
    colTotals,
    rowTotals,
    valueFormat,
    dateFormat,
    emitFilter,
    metricsLayout,
    conditionalFormatting
  } = formData;
  const {
    selectedFilters
  } = filterState;
  const granularity = (0, _core.extractTimegrain)(rawFormData);
  const dateFormatters = colnames.filter((colname, index) => coltypes[index] === _core.GenericDataType.TEMPORAL).reduce((acc, temporalColname) => {
    let formatter;

    if (dateFormat === _core.smartDateFormatter.id) {
      if (granularity) {
        // time column use formats based on granularity
        formatter = (0, _core.getTimeFormatterForGranularity)(granularity);
      } else if (isNumeric(temporalColname, data)) {
        formatter = (0, _core.getTimeFormatter)(DATABASE_DATETIME);
      } else {
        // if no column-specific format, print cell as is
        formatter = String;
      }
    } else if (dateFormat) {
      formatter = (0, _core.getTimeFormatter)(dateFormat);
    }

    if (formatter) {
      acc[temporalColname] = formatter;
    }

    return acc;
  }, {});
  const metricColorFormatters = (0, _chartControls.getColorFormatters)(conditionalFormatting, data);
  return {
    width,
    height,
    data,
    groupbyRows,
    groupbyColumns,
    metrics,
    tableRenderer,
    colOrder,
    rowOrder,
    aggregateFunction,
    transposePivot,
    combineMetric,
    rowSubtotalPosition,
    colSubtotalPosition,
    colTotals,
    rowTotals,
    valueFormat,
    emitFilter,
    setDataMask,
    selectedFilters,
    verboseMap,
    columnFormats,
    metricsLayout,
    metricColorFormatters,
    dateFormatters
  };
}