import React from "react";
import { Formik, Form, Field } from "formik";
import Select from "react-select";
import _ from "lodash";

const metricOptions = [
  { value: "sessions", label: "Sessions (sessions)" },
  { value: "users", label: "Users" },
  { value: "bounceRate", label: "Bounce Rate" },
  { value: "avgSessionDuration", label: "Average Session Duration" }
];

const dimensionOptions = [
  { value: "date", label: "Date" },
  { value: "device", label: "Device" },
  { value: "country", label: "Country" },
  { value: "city", label: "City" }
];

const filterOptions = [
  { value: "dateRange", label: "Date Range" },
  { value: "deviceType", label: "Device Type" },
  { value: "country", label: "Country" },
  { value: "city", label: "City" }
];

function GA4QueryGenerator() {
  const metrics = [
    { name: "sessions" }
    // { name: "totalRevenue" },
    // { name: "sessionConversionRate" },
    // { name: "transactions......" }
  ];
  const metx = metrics.map((name) => ({
    value: name.name,
    label: name.name
  }));
  return (
    <Formik
      initialValues={{
        // metrics: [
        //   { value: "sessions", label: "sessions" },
        //   { value: "totalRevenue", label: "totalRevenue" },
        //   { value: "sessionConversionRate", label: "sessionConversionRate" },
        //   { value: "transactions", label: "transactions" }
        // ],
        metrics: metx,
        dimensions: [],
        filters: [],
        orderBys_metric: [],
        orderBys_dimension: []
      }}
      onSubmit={(values) => {
        const { metrics, dimensions, filters } = values;
        const query = {
          reportRequests: [
            {
              viewId: "YOUR_VIEW_ID",
              dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
              metrics: metrics.map((metric) => ({ name: metric.value })),
              dimensions: dimensions.map((dimension) => ({
                name: dimension.value
              })),
              orderBys_metric: values.orderBys_metric,
              orderBys_dimension: values.orderBys_dimension,
              dimensionFilterClauses: filters.map((filter) => ({
                operator: "AND",
                filters: [
                  {
                    dimensionName: filter.value,
                    operator: "REGEXP",
                    expressions: ["YOUR_FILTER_EXPRESSION"]
                  }
                ]
              }))
            }
          ]
        };
        alert(JSON.stringify(query, null, 2));
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <label>Metrics</label>
          <Field
            name="metrics"
            render={({ field }) => (
              <Select
                {...field}
                options={metricOptions}
                isMulti
                onChange={(selectedOptions) => {
                  setFieldValue(field.name, selectedOptions);
                }}
              />
            )}
          />
          <br />
          <label>Dimensions</label>
          <Field
            name="dimensions"
            render={({ field }) => (
              <Select
                {...field}
                options={dimensionOptions}
                isMulti
                onChange={(selectedOptions) =>
                  setFieldValue(field.name, selectedOptions)
                }
              />
            )}
          />
          <br />
          <label>Order By Metric</label>
          <Field
            name="orderBys_metric"
            render={({ field }) => (
              <Select
                options={values.metrics}
                onChange={(selectedOptions) =>
                  setFieldValue(field.name, selectedOptions.value)
                }
              />
            )}
          />
          <br />
          <label>Order By Dimension</label>
          <Field
            name="orderBys_dimension"
            render={({ field }) => (
              <Select
                {...field}
                options={values.dimensions}
                onChange={(selectedOptions) =>
                  setFieldValue(field.name, selectedOptions)
                }
              />
            )}
          />
          <label>Filters</label>
          <Field
            name="filters"
            render={({ field }) => (
              <Select
                {...field}
                options={filterOptions}
                isMulti
                onChange={(selectedOptions) =>
                  setFieldValue(field.name, selectedOptions)
                }
              />
            )}
          />
          <br />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}
export default GA4QueryGenerator;
