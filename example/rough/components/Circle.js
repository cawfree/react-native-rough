import React, {useCallback} from "react";
import PropTypes from "prop-types";

import Ellipse from "./Ellipse";

const Circle = ({diameter, ...extraProps}) => (
  <Ellipse
    width={diameter}
    height={diameter}
    {...extraProps}
  />
);

// TODO: implement force animated node
Circle.propTypes = {
  throttle: PropTypes.number,
};

Circle.defaultProps = {
  throttle: 35,
};

export default Circle;
