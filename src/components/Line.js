import React, { useCallback } from "react";
import PropTypes from "prop-types";
import {Path} from "react-native-svg";
import {useRough} from "../hooks";

const Line = ({ x1, y1, x2, y2, ...o }) => {
  const generator = useRough(o);
  const [a, b] = generator.toPaths(
    generator.line(
      x1,
      y1,
      x2,
      y2,
      o
    )
  );
  const {d: stroke, ...strokeProps} = (a || {});
  const {d: fill, ...fillProps} = (b || {});
  return (
    <>
      {(!!stroke) && (
        <Path d={stroke} {...strokeProps}/>
      )}
      {(!!fill) && (
        <Path d={fill} {...fillProps}/>
      )}
    </>
  );
};

Line.propTypes = {
  x1: PropTypes.number.isRequired,
  y1: PropTypes.number.isRequired,
  x2: PropTypes.number.isRequired,
  y2: PropTypes.number.isRequired,
};

Line.defaultProps = {};

export default Line;
