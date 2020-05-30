import React, { useCallback } from "react";
import PropTypes from "prop-types";

import Ellipse from "./Ellipse";

const Circle = ({ diameter, ...extraProps }) => (
  <Ellipse width={diameter} height={diameter} {...extraProps} />
);

Circle.propTypes = {
  diameter: PropTypes.number.isRequired,
};

Circle.defaultProps = {};

export default Circle;
