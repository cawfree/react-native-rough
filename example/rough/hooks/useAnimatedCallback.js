import {useEffect} from "react";

export const useAnimatedCallback = (animValue, callback) => {
  useEffect(
    () => {
      animValue.addListener(callback);
      return () => animValue.removeListener(callback);
    },
    [animValue, callback],
  );
};
