import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { throttle } from "lodash";

import { useAnimatedPath, useRough, useAnimatedCallback } from "../hooks";

const Line = ({ x1, y1, x2, y2, throttle: ms, ...o }) => {
  const generator = useRough(o);

  const [Path, update] = useAnimatedPath();

  const onPathChanged = useCallback(
    throttle(() => {
      const [path] = generator.toPaths(
        generator.line(
          x1.__getValue(),
          y1.__getValue(),
          x2.__getValue(),
          y2.__getValue(),
          o
        )
      );
      update(path);
    }, ms),
    [update, x1, y1, x2, y2, ms]
  );

  useAnimatedCallback(x1, onPathChanged);
  useAnimatedCallback(y1, onPathChanged);
  useAnimatedCallback(x2, onPathChanged);
  useAnimatedCallback(y2, onPathChanged);

  return <Path />;
};

// TODO: implement force animated node
Line.propTypes = {
  throttle: PropTypes.number,
};

Line.defaultProps = {
  throttle: 35,
};

export default Line;
