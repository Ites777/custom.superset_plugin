"use strict";

exports.__esModule = true;
exports.default = void 0;

var _core = require("@superset-ui/core");

var _chartControls = require("@superset-ui/chart-controls");

var _types = require("../types");

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
const config = {
  controlPanelSections: [{ ..._chartControls.sections.legacyTimeseriesTime,
    expanded: false
  }, {
    label: (0, _core.t)('Query'),
    expanded: true,
    controlSetRows: [[{
      name: 'groupbyRows',
      config: { ..._chartControls.sharedControls.groupby,
        label: (0, _core.t)('Rows'),
        description: (0, _core.t)('Columns to group by on the rows')
      }
    }], [{
      name: 'groupbyColumns',
      config: { ..._chartControls.sharedControls.groupby,
        label: (0, _core.t)('Columns'),
        description: (0, _core.t)('Columns to group by on the columns')
      }
    }], [{
      name: 'metrics',
      config: { ..._chartControls.sharedControls.metrics,
        validators: [_core.validateNonEmpty]
      }
    }], [{
      name: 'metricsLayout',
      config: {
        type: 'RadioButtonControl',
        renderTrigger: true,
        label: (0, _core.t)('Apply metrics on'),
        default: _types.MetricsLayoutEnum.COLUMNS,
        options: [[_types.MetricsLayoutEnum.COLUMNS, (0, _core.t)('Columns')], [_types.MetricsLayoutEnum.ROWS, (0, _core.t)('Rows')]],
        description: (0, _core.t)('Use metrics as a top level group for columns or for rows')
      }
    }], ['adhoc_filters'], _chartControls.emitFilterControl, [{
      name: 'row_limit',
      config: { ..._chartControls.sharedControls.row_limit
      }
    }], ..._chartControls.legacySortBy]
  }, {
    label: (0, _core.t)('Options'),
    expanded: true,
    tabOverride: 'data',
    controlSetRows: [[{
      name: 'aggregateFunction',
      config: {
        type: 'SelectControl',
        label: (0, _core.t)('Aggregation function'),
        clearable: false,
        choices: (0, _chartControls.formatSelectOptions)(['Custom', 'Count', 'Count Unique Values', 'List Unique Values', 'Sum', 'Average', 'Median', 'Sample Variance', 'Sample Standard Deviation', 'Minimum', 'Maximum', 'First', 'Last', 'Sum as Fraction of Total', 'Sum as Fraction of Rows', 'Sum as Fraction of Columns', 'Count as Fraction of Total', 'Count as Fraction of Rows', 'Count as Fraction of Columns']),
        default: 'Sum',
        description: (0, _core.t)('Aggregate function to apply when pivoting and computing the total rows and columns'),
        renderTrigger: true
      }
    }], [{
      name: 'rowTotals',
      config: {
        type: 'CheckboxControl',
        label: (0, _core.t)('Show rows total'),
        default: false,
        renderTrigger: true,
        description: (0, _core.t)('Display row level total')
      }
    }], [{
      name: 'colTotals',
      config: {
        type: 'CheckboxControl',
        label: (0, _core.t)('Show columns total'),
        default: false,
        renderTrigger: true,
        description: (0, _core.t)('Display column level total')
      }
    }], [{
      name: 'transposePivot',
      config: {
        type: 'CheckboxControl',
        label: (0, _core.t)('Transpose pivot'),
        default: false,
        description: (0, _core.t)('Swap rows and columns'),
        renderTrigger: true
      }
    }], [{
      name: 'combineMetric',
      config: {
        type: 'CheckboxControl',
        label: (0, _core.t)('Combine metrics'),
        default: false,
        description: (0, _core.t)('Display metrics side by side within each column, as ' + 'opposed to each column being displayed side by side for each metric.'),
        renderTrigger: true
      }
    }]]
  }, {
    label: (0, _core.t)('Options'),
    expanded: true,
    controlSetRows: [[{
      name: 'valueFormat',
      config: { ..._chartControls.sharedControls.y_axis_format,
        label: (0, _core.t)('Value format')
      }
    }], [{
      name: 'date_format',
      config: {
        type: 'SelectControl',
        freeForm: true,
        label: (0, _core.t)('Date format'),
        default: _core.smartDateFormatter.id,
        renderTrigger: true,
        choices: _chartControls.D3_TIME_FORMAT_OPTIONS,
        description: (0, _core.t)('D3 time format for datetime columns')
      }
    }], [{
      name: 'rowOrder',
      config: {
        type: 'SelectControl',
        label: (0, _core.t)('Rows sort by'),
        default: 'key_a_to_z',
        choices: [// [value, label]
        ['key_a_to_z', (0, _core.t)('key a-z')], ['key_z_to_a', (0, _core.t)('key z-a')], ['value_a_to_z', (0, _core.t)('value ascending')], ['value_z_to_a', (0, _core.t)('value descending')]],
        renderTrigger: true,
        description: (0, _core.t)('Order of rows')
      }
    }], [{
      name: 'colOrder',
      config: {
        type: 'SelectControl',
        label: (0, _core.t)('Cols sort by'),
        default: 'key_a_to_z',
        choices: [// [value, label]
        ['key_a_to_z', (0, _core.t)('key a-z')], ['key_z_to_a', (0, _core.t)('key z-a')], ['value_a_to_z', (0, _core.t)('value ascending')], ['value_z_to_a', (0, _core.t)('value descending')]],
        renderTrigger: true,
        description: (0, _core.t)('Order of columns')
      }
    }], [{
      name: 'rowSubtotalPosition',
      config: {
        type: 'SelectControl',
        label: (0, _core.t)('Rows subtotal position'),
        default: false,
        choices: [// [value, label]
        [true, (0, _core.t)('Top')], [false, (0, _core.t)('Bottom')]],
        renderTrigger: true,
        description: (0, _core.t)('Position of row level subtotal')
      }
    }], [{
      name: 'colSubtotalPosition',
      config: {
        type: 'SelectControl',
        label: (0, _core.t)('Cols subtotal position'),
        default: false,
        choices: [// [value, label]
        [true, (0, _core.t)('Left')], [false, (0, _core.t)('Right')]],
        renderTrigger: true,
        description: (0, _core.t)('Position of column level subtotal')
      }
    }], [{
      name: 'conditional_formatting',
      config: {
        type: 'ConditionalFormattingControl',
        renderTrigger: true,
        label: (0, _core.t)('Conditional formatting'),
        description: (0, _core.t)('Apply conditional color formatting to metrics'),

        mapStateToProps(explore) {
          var _explore$controls, _explore$controls$met, _explore$datasource;

          const values = (explore == null ? void 0 : (_explore$controls = explore.controls) == null ? void 0 : (_explore$controls$met = _explore$controls.metrics) == null ? void 0 : _explore$controls$met.value) ?? [];
          const verboseMap = (explore == null ? void 0 : (_explore$datasource = explore.datasource) == null ? void 0 : _explore$datasource.verbose_map) ?? {};
          const metricColumn = values.map(value => {
            if (typeof value === 'string') {
              return {
                value,
                label: verboseMap[value] ?? value
              };
            }

            return {
              value: value.label,
              label: value.label
            };
          });
          return {
            columnOptions: metricColumn,
            verboseMap
          };
        }

      }
    }]]
  }]
};
var _default = config;
exports.default = _default;