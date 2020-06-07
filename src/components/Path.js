import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Path as SvgPath } from "react-native-svg";
import { useRough } from "../hooks";

const Path = ({ d, ...o }) => {
  const generator = useRough(o);
  const paths = generator.toPaths(generator.path(d, o));
  return (
    <>
      {paths.map((_) => (
        <SvgPath
          key={_.d}
          d={_.d}
          stroke={_.stroke}
          strokeWidth={_.strokeWidth}
          fill={_.fill}
        />
      ))}
    </>
  );
};

Path.propTypes = {
  d: PropTypes.string.isRequired,
};

Path.defaultProps = {};

export default Path;
