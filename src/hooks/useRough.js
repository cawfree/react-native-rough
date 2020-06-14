import { RoughGenerator } from "roughjs/bin/generator.js";

// TODO: Use less intensive default options for React.
const defaultOptions = Object.freeze({
  ...new RoughGenerator().defaultOptions,
});

// TODO: How to cache to make function as a proper hook?
export const useRough = (options = defaultOptions) =>
  new RoughGenerator({ ...defaultOptions, ...options });
