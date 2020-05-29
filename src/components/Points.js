import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { throttle } from "lodash";

import { useAnimatedPath, useRough, useAnimatedCallback } from "../hooks";

const Points = ({ points, throttle: ms, method, ...o }) => {
  const generator = useRough(o);

  const [PathA, updateA] = useAnimatedPath();
  const [PathB, updateB] = useAnimatedPath();

  const onPathChanged = useCallback(
    throttle(() => {
      const [a, b] = generator.toPaths(
        generator[method](
          points.map((point) => [point.x.__getValue(), point.y.__getValue()]),
          o
        )
      );
      updateA(a);
      updateB(b);
    }, ms),
    [updateA, updateB, points, ms]
  );
  useEffect(() => {
    points.forEach((point) => {
      point.x.addListener(onPathChanged);
      point.y.addListener(onPathChanged);
    });
    return () =>
      points.forEach((point) => {
        point.x.removeListener(onPathChanged);
        point.y.removeListener(onPathChanged);
      });
  }, [points, onPathChanged]);

  return (
    <>
      <PathA />
      <PathB />
    </>
  );
};

// TODO: implement force animated node
Points.propTypes = {
  method: PropTypes.string.isRequired,
  throttle: PropTypes.number,
};

Points.defaultProps = {
  throttle: 35,
};

export default Points;
