import React from "react";
import { SHIP_HEIGHT, SHIP_WIDTH } from "./Constants";

const Ship = ({ x, y }) => {
  return (
    <rect
      data-testid="ship"
      x={x}
      y={y}
      width={SHIP_WIDTH}
      height={SHIP_HEIGHT}
      fill="#678A32"
    />
  );
};

export default Ship;