import React from "react";
import Ellipse from "./Ellipse";
import { CircleProps } from "../type";

const Circle = ({ diameter, ...extraProps }: CircleProps) => (
  <Ellipse width={diameter} height={diameter} {...extraProps} />
);

export default Circle;
