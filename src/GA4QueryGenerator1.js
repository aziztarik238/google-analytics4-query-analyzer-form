import React from "react";
import { Formik, Form, Field } from "formik";

function GA4QueryGenerator1() {
  const initialValues = {
    viewId: "",
    startDate: "",
    endDate: "",
    metrics: [],
    dimensions: [],
    filters: [],
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        const { viewId, startDate, endDate, metrics, dimensions, filters } =
          values;
        const query = {
          reportRequests: [
            {
              viewId: viewId,
              dateRanges: [{ startDate: startDate, endDate: endDate }],
              metrics: metrics.map((metric) => ({ expression: metric })),
              dimensions: dimensions.map((dimension) => ({ name: dimension })),
              dimensionFilterClauses: filters.map((filter) => ({
                filters: [
                  {
                    dimensionName: filter.dimension,
                    operator: filter.operator,
                    expressions: filter.values,
                  },
                ],
              })),
            },
          ],
        };
        alert(JSON.stringify(query, null, 2));
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <label>View ID</label>
          <Field type="text" name="viewId" />
          <br />
          <label>Start Date</label>
          <Field type="date" name="startDate" />
          <br />
          <label>End Date</label>
          <Field type="date" name="endDate" />
          <br />
          <label>Metrics</label>
          <Field
            type="text"
            name="metrics"
            placeholder="Comma separated list of metrics"
          />
          <br />
          <label>Dimensions</label>
          <Field
            type="text"
            name="dimensions"
            placeholder="Comma separated list of dimensions"
          />
          <br />
          <label>Filters</label>
          <Field
            type="text"
            name="filters"
            placeholder="Comma separated list of filters in the format dimension:operator:value"
          />
          <br />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default GA4QueryGenerator1;
