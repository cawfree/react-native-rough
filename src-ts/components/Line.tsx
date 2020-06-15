import React from "react";
import { Path } from "react-native-svg";
import { useRough } from "../hooks";
import { LineProps } from "../type";

const Line = ({ x1, y1, x2, y2, ...o }: LineProps) => {
  const generator = useRough(o as any); // TODO: fix typing
  const [a, b] = generator.toPaths(generator.line(x1, y1, x2, y2, o));
  const { d: stroke, ...strokeProps } = a || {};
  const { d: fill, ...fillProps } = b || {};
  return (
    <>
      {!!stroke && <Path d={stroke} {...strokeProps} />}
      {!!fill && <Path d={fill} {...fillProps} />}
    </>
  );
};

export default Line;
