"use strict";

exports.__esModule = true;
exports.default = void 0;

var _core = require("@superset-ui/core");

var _buildQuery = _interopRequireDefault(require("./buildQuery"));

var _controlPanel = _interopRequireDefault(require("./controlPanel"));

var _transformProps = _interopRequireDefault(require("./transformProps"));

var _thumbnail = _interopRequireDefault(require("../images/thumbnail.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class PivotTableChartPlugin extends _core.ChartPlugin {
  /**
   * The constructor is used to pass relevant metadata and callbacks that get
   * registered in respective registries that are used throughout the library
   * and application. A more thorough description of each property is given in
   * the respective imported file.
   *
   * It is worth noting that `buildQuery` and is optional, and only needed for
   * advanced visualizations that require either post processing operations
   * (pivoting, rolling aggregations, sorting etc) or submitting multiple queries.
   */
  constructor() {
    const metadata = new _core.ChartMetadata({
      behaviors: [_core.Behavior.INTERACTIVE_CHART],
      category: (0, _core.t)('Table'),
      description: (0, _core.t)('Used to summarize a set of data by grouping together multiple statistics along two axes. Examples: Sales numbers by region and month, tasks by status and assignee, active users by age and location. Not the most visually stunning visualization, but highly informative and versatile.'),
      name: (0, _core.t)('MAZAFAKA'),
      tags: [(0, _core.t)('Additive'), (0, _core.t)('Report'), (0, _core.t)('Tabular'), (0, _core.t)('Popular')],
      thumbnail: _thumbnail.default
    });
    super({
      buildQuery: _buildQuery.default,
      controlPanel: _controlPanel.default,
      loadChart: () => Promise.resolve().then(() => _interopRequireWildcard(require('../PivotTableChart'))),
      metadata,
      transformProps: _transformProps.default
    });
  }

}

exports.default = PivotTableChartPlugin;