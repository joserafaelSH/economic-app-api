import express_prom_bundle from "express-prom-bundle";

export const metricsMiddleware = express_prom_bundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  includeUp: true,
  customLabels: {
    project_name: "economic-api",
    project_type: "test_metrics_labels",
  },
  promClient: {
    collectDefaultMetrics: {},
  },
});
