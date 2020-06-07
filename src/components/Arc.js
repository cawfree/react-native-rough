import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Path } from "react-native-svg";
import { useRough } from "../hooks";

const Arc = ({ x, y, width, height, start, stop, closed, ...o }) => {
  const generator = useRough(o);
  const [a, b] = generator.toPaths(
    generator.arc(x, y, width, height, start, stop, closed, o)
  );
  const { d: stroke, ...strokeProps } = a || {};
  const { d: fill, ...fillProps } = b || {};
  return (
    <>
      {!!stroke && <Path d={stroke} {...strokeProps} />}
      {!!fill && <Path d={fill} {...fillProps} />}
    </>
  );
};

Arc.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  start: PropTypes.number.isRequired,
  stop: PropTypes.number.isRequired,
  closed: PropTypes.bool,
};

Arc.defaultProps = {
  closed: false,
};

export default Arc;
