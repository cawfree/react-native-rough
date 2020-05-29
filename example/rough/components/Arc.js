import React, {useCallback} from "react";
import PropTypes from "prop-types";
import {throttle} from "lodash";

import {useAnimatedPath, useRough, useAnimatedCallback} from "../hooks";

const Arc = ({x, y, width, height, start, stop, closed, throttle: ms, ...o}) => {
  const generator = useRough(o);

  const [PathA, updateA] = useAnimatedPath();
  const [PathB, updateB] = useAnimatedPath();

  const onPathChanged = useCallback(
    throttle(
      () => {
        const [a, b, ...e] = generator.toPaths(generator.arc(x.__getValue(), y.__getValue(), width.__getValue(), height.__getValue(), start.__getValue(), stop.__getValue(), !!closed,  o)); 
        updateA(a);
        updateB(b);
      },
      ms,
    ),
    [updateA, updateB, x, y, width, height, start, stop, closed, ms],
  );
  
  useAnimatedCallback(x, onPathChanged);
  useAnimatedCallback(y, onPathChanged);
  useAnimatedCallback(width, onPathChanged);
  useAnimatedCallback(height, onPathChanged);
  useAnimatedCallback(start, onPathChanged);
  useAnimatedCallback(stop, onPathChanged);

  return (
    <>
      <PathA />
      <PathB />
    </>
  );
};

// TODO: implement force animated node
Arc.propTypes = {
  throttle: PropTypes.number,
  closed: PropTypes.bool,
};

Arc.defaultProps = {
  throttle: 35,
  closed: false,
};

export default Arc;
