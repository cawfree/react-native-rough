import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Path } from "react-native-svg";
import { useRough } from "../hooks";

const Curve = ({ points, ...o }) => {
  const generator = useRough(o);
  const [a, b] = generator.toPaths(generator.curve(points, o));
  const { d: stroke, ...strokeProps } = a || {};
  const { d: fill, ...fillProps } = b || {};
  return (
    <>
      {!!stroke && <Path d={stroke} {...strokeProps} />}
      {!!fill && <Path d={fill} {...fillProps} />}
    </>
  );
};

Curve.propTypes = {
  points: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
};

Curve.defaultProps = {
  points: [],
};

export default Curve;
