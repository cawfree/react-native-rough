import React, { useEffect, useCallback, useState, useRef } from "react";
import { Path } from "react-native-svg";
import { Animated } from "react-native";

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const withWritableProps = (Component, cbk) => (propsAreUnused) => {
  const ref = useRef();
  const [props, setProps] = useState({});
  useEffect(() => cbk(ref, setProps), [ref, setProps, cbk]);
  return <Component {...props} ref={ref} />;
};

export const useAnimatedPath = () => {
  const [updatePath, setUpdatePath] = useState(() => () => null);
  const handleManagedPath = useCallback(
    (ref, setProps) =>
      setUpdatePath(() => ({ d, ...extras } = {}) => {
        ref.current.setNativeProps({ d });
        setProps(extras);
      }),
    [setUpdatePath]
  );
  const { current: ManagedPath } = useRef(
    withWritableProps(AnimatedPath, handleManagedPath)
  );
  return [ManagedPath, updatePath];
};
