import React from "react";
import { Path } from "react-native-svg";
import { useRough } from "../hooks";
import { ArcProps } from "../type";

const Arc = ({ x, y, width, height, start, stop, closed, ...o }: ArcProps) => {
  const generator = useRough(o as any); // TODO: fix typing
  const [a, b] = generator.toPaths(
    generator.arc(x, y, width, height, start, stop, closed, o)
  );
  const { d: stroke, ...strokeProps } = a || {};
  const { d: fill, ...fillProps } = b || {};
  return (
    <>
      {!!stroke && <Path d={stroke} {...strokeProps} />}
      {!!fill && <Path d={fill} {...fillProps} />}
    </>
  );
};

export default Arc;
