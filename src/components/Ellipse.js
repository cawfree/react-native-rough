import React, { useCallback } from "react";
import PropTypes from "prop-types";
import {Path} from "react-native-svg";
import {useRough} from "../hooks";

const Ellipse = ({ x, y, width, height, ...o }) => {
  const generator = useRough(o);
  const [a, b] = generator.toPaths(
    generator.ellipse(
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

Ellipse.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

Ellipse.defaultProps = {};

export default Ellipse;
