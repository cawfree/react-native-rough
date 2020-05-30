import React, { useCallback } from "react";
import PropTypes from "prop-types";
import {Path} from "react-native-svg";
import {useRough} from "../hooks";

const Polygon = ({ points, ...o }) => {
  const generator = useRough(o);
  const [a, b] = generator.toPaths(
    generator.polygon(
      points,
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

Polygon.propTypes = {
  points: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
};

Polygon.defaultProps = {
  points: [],
};

export default Polygon;
