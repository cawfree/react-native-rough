import React from "react";

import Points from "./Points";

export default ({ ...extraProps }) => (
  <Points {...extraProps} method="linearPath" />
);
