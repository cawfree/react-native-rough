import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { throttle } from "lodash";

import { useAnimatedPath, useRough, useAnimatedCallback } from "../hooks";

const Rectangle = ({ x, y, width, height, throttle: ms, ...o }) => {
  const generator = useRough(o);

  const [PathA, updateA] = useAnimatedPath();
  const [PathB, updateB] = useAnimatedPath();

  const onPathChanged = useCallback(
    throttle(() => {
      const [a, b] = generator.toPaths(
        generator.rectangle(
          x.__getValue(),
          y.__getValue(),
          width.__getValue(),
          height.__getValue(),
          o
        )
      );
      updateA(a);
      updateB(b);
    }, ms),
    [updateA, updateB, x, y, width, height, ms]
  );

  useAnimatedCallback(x, onPathChanged);
  useAnimatedCallback(y, onPathChanged);
  useAnimatedCallback(width, onPathChanged);
  useAnimatedCallback(height, onPathChanged);

  return (
    <>
      <PathA />
      <PathB />
    </>
  );
};

// TODO: implement force animated node
Rectangle.propTypes = {
  throttle: PropTypes.number,
};

Rectangle.defaultProps = {
  throttle: 35,
};

export default Rectangle;
