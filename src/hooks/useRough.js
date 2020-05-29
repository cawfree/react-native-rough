import { useState } from "react";
import { RoughGenerator } from "roughjs/bin/generator.js";

// TODO: Use less intensive default options for React.
const defaultOptions = Object.freeze({
  ...new RoughGenerator().defaultOptions,
});

// TODO: Implement all path styles.
// TODO: How to cache to make function as a proper hook?
export const useRough = (options = defaultOptions) =>
  useState(() => new RoughGenerator({ ...defaultOptions, ...options }))[0];
