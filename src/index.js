import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import MultiSelectFormField from "./MultiSelectFormField";
import GA4QueryGenerator from "./GA4QueryGenerator";
import GA4QueryGenerator1 from "./GA4QueryGenerator1";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    {/* <App /> */}
    {/* <MultiSelectFormField /> */}
    {/* <GA4QueryGenerator /> */}
    <GA4QueryGenerator1 />
  </StrictMode>
);
