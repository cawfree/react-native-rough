import React, {useEffect, useRef} from "react";
import Svg from "react-native-svg";
import {Animated} from "react-native";
import Rough from "./rough";

export default () => {
  const {current:x} = useRef(new Animated.Value(10));
  const {current:y} = useRef(new Animated.Value(100));
  const {current:width} = useRef(new Animated.Value(1));
  const {current:height} = useRef(new Animated.Value(200));

  useEffect(
    () => {
      Animated.timing(
        width,
        {
          toValue: 300,
          duration: 1000,
          useNativeDriver: true,
        },
      )
        .start();
    },
    [],
  );
  
  return (
    <Svg
      width="100%"
      height="100%"
    >
      <Rough.Rectangle
        x={x}
        hachureAngle={60}
        hachureGap={30}
        fillWeight={3}
        y={y}
        width={width}
        height={height}
        stroke="red"
        strokeWidth={5}
        fill="blue"
      />
      <Rough.Ellipse
        bowing={2}
        roughness={2.8}
        x={x}
        y={Animated.add(y, 300)}
        width={width}
        height={height}
        stroke="green"
        strokeWidth={5}
        fillStyle="zigzag"
        fill="blue"
      />
      <Rough.Line
        x1={y}
        y1={y}
        x2={width}
        y2={width}
        stroke="red"
        strokeWidth={5}
        fill="blue"
      />
      <Rough.Circle
        x={x}
        y={x}
        diameter={width}
        stroke="red"
        strokeWidth={5}
        fill="blue"
      />
      <Rough.Arc
        x={width}
        y={Animated.add(400, 0)}
        closed
        roughClosure
        width={Animated.add(200, 0)}
        height={Animated.add(180, 0)}
        start={Animated.add(Math.PI / 2, 0)}
        stop={Animated.add(Math.PI, 0)}
        fillStyle="zigzag"
        strokeWidth={2}
        stroke="blue"
        fill="rgba(255,0,255,0.4)"
      />
    </Svg>
  );
};
