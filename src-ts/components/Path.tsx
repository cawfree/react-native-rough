import React from "react";
import { Path as SvgPath } from "react-native-svg";
import { useRough } from "../hooks";
import { PathProps } from "../type";

const Path = ({ d, ...o }: PathProps) => {
  const generator = useRough(o as any); // TODO: fix typing
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

export default Path;
