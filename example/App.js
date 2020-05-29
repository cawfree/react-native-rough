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
      <Rough.Rectangle
        seed={40}
        x={x}
        bowing={2}
        roughness={2.8}
        y={Animated.add(y, 300)}
        width={width}
        height={width}
        stroke="green"
        strokeWidth={5}
        fillStyle="zigzag"
        fill="blue"
      />
    </Svg>
  );
};
