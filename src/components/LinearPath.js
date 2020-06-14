import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Path } from "react-native-svg";
import { useRough } from "../hooks";

const LinearPath = ({ points, ...o }) => {
  const generator = useRough(o);
  const [a, b] = generator.toPaths(generator.linearPath(points, o));
  const { d: stroke, ...strokeProps } = a || {};
  const { d: fill, ...fillProps } = b || {};
  return (
    <>
      {!!stroke && <Path d={stroke} {...strokeProps} />}
      {!!fill && <Path d={fill} {...fillProps} />}
    </>
  );
};

LinearPath.propTypes = {
  points: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
};

LinearPath.defaultProps = {
  points: [],
};

export default LinearPath;
