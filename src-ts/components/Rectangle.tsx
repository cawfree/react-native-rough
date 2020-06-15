import React from "react";
import { Path } from "react-native-svg";
import { useRough } from "../hooks";
import { RectangleProps } from "../type";

const Rectangle = ({ x, y, width, height, ...o }: RectangleProps) => {
  const generator = useRough(o as any); // TODO: fix typing
  const [a, b] = generator.toPaths(generator.rectangle(x, y, width, height, o));
  const { d: stroke, ...strokeProps } = a || {};
  const { d: fill, ...fillProps } = b || {};
  return (
    <>
      {!!stroke && <Path d={stroke} {...strokeProps} />}
      {!!fill && <Path d={fill} {...fillProps} />}
    </>
  );
};

export default Rectangle;
