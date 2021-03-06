"use strict";

exports.__esModule = true;
exports.default = PivotTableChart;

var _react = _interopRequireWildcard(require("react"));

var _icons = require("@ant-design/icons");

var _core = require("@superset-ui/core");

var _reactPivottable = require("./react-pivottable");

require("@superset-ui/react-pivottable/pivottable.css");

var _types = require("./types");

var _react2 = require("@emotion/react");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
// @ts-ignore
// @ts-ignore
// import PivotTable from '@superset-ui/react-pivottable/PivotTable';
// @ts-ignore
const Styles = _core.styled.div`
  ${({
  height,
  width,
  margin
}) => `
      margin: ${margin}px;
      height: ${height - margin * 2}px;
      width: ${typeof width === 'string' ? parseInt(width, 10) : width - margin * 2}px;
 `}
`;
const PivotTableWrapper = _core.styled.div`
  height: 100%;
  max-width: fit-content;
  overflow: auto;
`;
const METRIC_KEY = '??????????????';
const iconStyle = {
  stroke: 'black',
  strokeWidth: '16px'
};

const aggregatorsFactory = formatter => ({
  Custom: _reactPivottable.aggregatorTemplates.custom(formatter),
  Count: _reactPivottable.aggregatorTemplates.count(formatter),
  'Count Unique Values': _reactPivottable.aggregatorTemplates.countUnique(formatter),
  'List Unique Values': _reactPivottable.aggregatorTemplates.listUnique(', ', formatter),
  Sum: _reactPivottable.aggregatorTemplates.sum(formatter),
  Average: _reactPivottable.aggregatorTemplates.average(formatter),
  Median: _reactPivottable.aggregatorTemplates.median(formatter),
  'Sample Variance': _reactPivottable.aggregatorTemplates.var(1, formatter),
  'Sample Standard Deviation': _reactPivottable.aggregatorTemplates.stdev(1, formatter),
  Minimum: _reactPivottable.aggregatorTemplates.min(formatter),
  Maximum: _reactPivottable.aggregatorTemplates.max(formatter),
  First: _reactPivottable.aggregatorTemplates.first(formatter),
  Last: _reactPivottable.aggregatorTemplates.last(formatter),
  'Sum as Fraction of Total': _reactPivottable.aggregatorTemplates.fractionOf(_reactPivottable.aggregatorTemplates.sum(), 'total', formatter),
  'Sum as Fraction of Rows': _reactPivottable.aggregatorTemplates.fractionOf(_reactPivottable.aggregatorTemplates.sum(), 'row', formatter),
  'Sum as Fraction of Columns': _reactPivottable.aggregatorTemplates.fractionOf(_reactPivottable.aggregatorTemplates.sum(), 'col', formatter),
  'Count as Fraction of Total': _reactPivottable.aggregatorTemplates.fractionOf(_reactPivottable.aggregatorTemplates.count(), 'total', formatter),
  'Count as Fraction of Rows': _reactPivottable.aggregatorTemplates.fractionOf(_reactPivottable.aggregatorTemplates.count(), 'row', formatter),
  'Count as Fraction of Columns': _reactPivottable.aggregatorTemplates.fractionOf(_reactPivottable.aggregatorTemplates.count(), 'col', formatter)
});
/* If you change this logic, please update the corresponding Python
 * function (https://github.com/apache/superset/blob/master/superset/charts/post_processing.py),
 * or reach out to @betodealmeida.
 */


function PivotTableChart(props) {
  const {
    data,
    height,
    width,
    groupbyRows,
    groupbyColumns,
    metrics,
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
  } = props;
  const theme = (0, _core.useTheme)();
  const defaultFormatter = (0, _core.getNumberFormatter)(valueFormat);
  const columnFormatsArray = Object.entries(columnFormats);
  const hasCustomMetricFormatters = columnFormatsArray.length > 0;
  const metricFormatters = hasCustomMetricFormatters && Object.fromEntries(columnFormatsArray.map(([metric, format]) => [metric, (0, _core.getNumberFormatter)(format)]));
  const metricNames = (0, _react.useMemo)(() => metrics.map(metric => typeof metric === 'string' ? metric : metric.label), [metrics]);
  const unpivotedData = (0, _react.useMemo)(() => data.reduce((acc, record) => [...acc, ...metricNames.map(name => ({ ...record,
    [METRIC_KEY]: name,
    value: record[name]
  })).filter(record => record.value !== null)], []), [data, metricNames]);
  let [rows, cols] = transposePivot ? [groupbyColumns, groupbyRows] : [groupbyRows, groupbyColumns];

  if (metricsLayout === _types.MetricsLayoutEnum.ROWS) {
    rows = combineMetric ? [...rows, METRIC_KEY] : [METRIC_KEY, ...rows];
  } else {
    cols = combineMetric ? [...cols, METRIC_KEY] : [METRIC_KEY, ...cols];
  }

  const handleChange = (0, _react.useCallback)(filters => {
    const groupBy = Object.keys(filters);
    setDataMask({
      extraFormData: {
        filters: groupBy.length === 0 ? undefined : groupBy.map(col => {
          const val = filters == null ? void 0 : filters[col];
          if (val === null || val === undefined) return {
            col,
            op: 'IS NULL'
          };
          return {
            col,
            op: 'IN',
            val: val
          };
        })
      },
      filterState: {
        value: filters && Object.keys(filters).length ? Object.values(filters) : null,
        selectedFilters: filters && Object.keys(filters).length ? filters : null
      }
    });
  }, [setDataMask]);
  const toggleFilter = (0, _react.useCallback)((e, value, filters, pivotData, isSubtotal, isGrandTotal) => {
    if (isSubtotal || isGrandTotal || !emitFilter) {
      return;
    }

    const isActiveFilterValue = (key, val) => {
      var _selectedFilters$key;

      return !!selectedFilters && ((_selectedFilters$key = selectedFilters[key]) == null ? void 0 : _selectedFilters$key.includes(val));
    };

    const filtersCopy = { ...filters
    };
    delete filtersCopy[METRIC_KEY];
    const filtersEntries = Object.entries(filtersCopy);

    if (filtersEntries.length === 0) {
      return;
    }

    const [key, val] = filtersEntries[filtersEntries.length - 1];
    let updatedFilters = { ...(selectedFilters || {})
    }; // multi select
    // if (selectedFilters && isActiveFilterValue(key, val)) {
    //   updatedFilters[key] = selectedFilters[key].filter((x: DataRecordValue) => x !== val);
    // } else {
    //   updatedFilters[key] = [...(selectedFilters?.[key] || []), val];
    // }
    // single select

    if (selectedFilters && isActiveFilterValue(key, val)) {
      updatedFilters = {};
    } else {
      updatedFilters = {
        [key]: [val]
      };
    }

    if (Array.isArray(updatedFilters[key]) && updatedFilters[key].length === 0) {
      delete updatedFilters[key];
    }

    handleChange(updatedFilters);
  }, [emitFilter, selectedFilters, handleChange]);
  return (0, _react2.jsx)(Styles, {
    height: height,
    width: width,
    margin: theme.gridUnit * 4
  }, (0, _react2.jsx)(PivotTableWrapper, null, (0, _react2.jsx)(_reactPivottable.PivotTable, {
    data: unpivotedData,
    rows: rows,
    cols: cols,
    aggregatorsFactory: aggregatorsFactory,
    defaultFormatter: defaultFormatter,
    customFormatters: hasCustomMetricFormatters ? {
      [METRIC_KEY]: metricFormatters
    } : undefined,
    aggregatorName: aggregateFunction,
    vals: ['value'],
    rendererName: "Table With Subtotal",
    colOrder: colOrder,
    rowOrder: rowOrder,
    sorters: {
      metric: (0, _reactPivottable.sortAs)(metricNames)
    },
    tableOptions: {
      clickRowHeaderCallback: toggleFilter,
      clickColumnHeaderCallback: toggleFilter,
      colTotals,
      rowTotals,
      highlightHeaderCellsOnHover: emitFilter,
      highlightedHeaderCells: selectedFilters,
      omittedHighlightHeaderGroups: [METRIC_KEY],
      cellColorFormatters: {
        [METRIC_KEY]: metricColorFormatters
      },
      dateFormatters
    },
    subtotalOptions: {
      colSubtotalDisplay: {
        displayOnTop: colSubtotalPosition
      },
      rowSubtotalDisplay: {
        displayOnTop: rowSubtotalPosition
      },
      arrowCollapsed: (0, _react2.jsx)(_icons.PlusSquareOutlined, {
        style: iconStyle
      }),
      arrowExpanded: (0, _react2.jsx)(_icons.MinusSquareOutlined, {
        style: iconStyle
      })
    },
    namesMapping: verboseMap
  })));
}