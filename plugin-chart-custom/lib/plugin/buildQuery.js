"use strict";

exports.__esModule = true;
exports.default = buildQuery;

var _core = require("@superset-ui/core");

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
function buildQuery(formData) {
  const {
    groupbyColumns = [],
    groupbyRows = []
  } = formData; // TODO: add deduping of AdhocColumns

  const groupbySet = new Set([...(0, _core.ensureIsArray)(groupbyColumns), ...(0, _core.ensureIsArray)(groupbyRows)]);
  return (0, _core.buildQueryContext)(formData, baseQueryObject => {
    const {
      series_limit_metric,
      metrics,
      order_desc
    } = baseQueryObject;
    let orderBy;

    if (series_limit_metric) {
      orderBy = [[series_limit_metric, !order_desc]];
    } else if (Array.isArray(metrics) && metrics[0]) {
      orderBy = [[metrics[0], !order_desc]];
    }

    return [{ ...baseQueryObject,
      orderby: orderBy,
      columns: [...groupbySet]
    }];
  });
}