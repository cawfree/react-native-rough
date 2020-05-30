import React, { useCallback } from "react";
import PropTypes from "prop-types";
import {Path} from "react-native-svg";
import {useRough} from "../hooks";

const Rectangle = ({ x, y, width, height, ...o }) => {
  const generator = useRough(o);
  const [a, b] = generator.toPaths(
    generator.rectangle(
      x,
      y,
      width,
      height,
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

Rectangle.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

Rectangle.defaultProps = {};

export default Rectangle;
