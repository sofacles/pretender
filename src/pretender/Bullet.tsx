import React from "react";
import { LEFT, SHIP_WIDTH } from "./Constants";
import { BulletPropsType, DirectionType } from "./types";

const Bullet = (props: BulletPropsType) => {
  const { direction, isVisible, x, y, fill } = props;
  // For now, make the visual corrections for bullets right here.
  // Make the tracers behind the bullet appear on the correct side of the bullet
  // transform the x coordinate of the bullet so that it looks like it comes out of the front of the ship, whichever way it's moving
  const correctedX = direction === LEFT ? x - SHIP_WIDTH : x + SHIP_WIDTH;
  let trailingCorrection1 = 2;
  let trailingCorrection2 = 8;
  let trailingCorrection3 = 16;
  const bulletWidth = 4;
  if (direction === LEFT) {
    trailingCorrection1 *= -1;
    trailingCorrection2 *= -1;
    trailingCorrection3 *= -1;
  }
  return (
    isVisible && (
      <>
        <rect x={correctedX} y={y} width={5} height={5} fill={fill} />
        <rect
          x={correctedX - trailingCorrection1}
          y={y + bulletWidth / 2}
          width={bulletWidth}
          height={bulletWidth / 2}
          fill="orange"
        />
        <rect
          x={correctedX - trailingCorrection2}
          y={y + bulletWidth / 2}
          width={bulletWidth}
          height={bulletWidth / 2}
          fill="red"
        />
        <rect
          x={correctedX - trailingCorrection3}
          y={y + bulletWidth / 2}
          width={bulletWidth}
          height={bulletWidth / 2}
          fill="red"
        />
      </>
    )
  );
};

export default Bullet;
