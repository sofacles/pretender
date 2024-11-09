import React, { useContext, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";

import {
  BULLET_PX_PER_FRAME,
  LEFT,
  RIGHT,
  UP_ARROW_PIXELS,
} from "../Constants";
import {
  moveBulletLeft,
  moveBulletRight,
  startBullet,
} from "../store/BulletSlice";

import { UP_DOWN_NEITHER_type } from "../types";
import { updateGameOffset } from "../store/MountainsSlice";
import { changeDirection, updateShipY } from "../store/ShipSlice";
import { useScreenDimensions } from "./useScreenDimensions";
import { Root } from "react-dom/client";

const useAnimationFrame = () => {
  const reduxDispatch = useDispatch();
  const { bullets, mountains, ship } = useSelector((state: RootState) => {
    return state;
  });
  const screenSize = useScreenDimensions();

  const PX_PER_SECOND = 800;

  const [isThrusting, setIsThrusting] = React.useState(false);
  const [shipMovingUpOrDown, setShipMovingUpOrDown] = React.useState("NEITHER");

  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  // https://css-tricks.com/using-requestanimationframe-with-react-hooks/ //(cb: FrameRequestCallback) => number
  const requestRef = React.useRef<number>(0);

  //for calculating how much the landscape moves by when you're thrusting
  const previousTimeRef_Thrust = React.useRef<number | undefined>();

  // Unwrapping this useCallback and just assigning the fxn of time
  // to animateCallback doesn't seem to hurt performance.  There may be other reasons for doing this, but I recently read that this can
  // be an issue because every time a component gets rendered, a brand new function gets re-created, so if you happen to be passing a function
  // as a prop to a child component and that component is memoized, memoization won't work.  Memoization means the the component won't rerender unless
  // the props change, but in this case the function prop will change every time.
  const animateCallback = (time: number) => {
    if (previousTimeRef_Thrust.current !== undefined) {
      if (isThrusting) {
        const deltaTime_Thrust = time! - previousTimeRef_Thrust.current;
        const amtToMove =
          ship.direction === "right"
            ? Math.floor((deltaTime_Thrust * PX_PER_SECOND) / 1000)
            : -Math.floor((deltaTime_Thrust * PX_PER_SECOND) / 1000);

        reduxDispatch(updateGameOffset({ offsetDifference: amtToMove }));
      }
    }

    if (isThrusting) {
      previousTimeRef_Thrust.current = time;
    } else {
      previousTimeRef_Thrust.current = undefined;
    }

    if (shipMovingUpOrDown !== "NEITHER") {
      const dispatchObj = {
        upOrDown: shipMovingUpOrDown,
        changeInY:
          shipMovingUpOrDown === "UP" ? -UP_ARROW_PIXELS : UP_ARROW_PIXELS,
      };
      reduxDispatch(updateShipY(dispatchObj));
    }

    for (let i = 0; i < bullets.length; i++) {
      if (bullets[i].isVisible) {
        const { width } = screenSize;
        if (bullets[i].direction === RIGHT && bullets[i].location.x < width) {
          reduxDispatch(
            moveBulletRight({
              index: i,
              pixelsToMove: BULLET_PX_PER_FRAME,
              screenWidth: width,
              lastTimeStamp: time,
            })
          );
        } else if (
          bullets[i].direction === LEFT &&
          bullets[i].location.x > 50
        ) {
          reduxDispatch(
            moveBulletLeft({
              index: i,
              pixelsToMove: BULLET_PX_PER_FRAME,
              lastTimeStamp: time,
            })
          );
        }
      }
    }

    requestRef.current = requestAnimationFrame(animateCallback);
  };

  const resetAnimationTimer = () => {
    previousTimeRef_Thrust.current = undefined;
  };

  React.useEffect(() => {
    /*
      We might be 
      1. thrusting without the ship moving up and down
      2. moving the ship up and down without thrusting 
      3. Neither thrusting nor moving the ship and down
      4. Both moving the ship and thrusting
      5. Shooting
      .. in combination with anything else that might be moving on the screen
    */
    if (
      isThrusting ||
      shipMovingUpOrDown !== "NEITHER" ||
      bullets.some((b) => b.isVisible)
    ) {
      requestRef.current = requestAnimationFrame(animateCallback);
      return () => cancelAnimationFrame(requestRef.current);
    } else {
      cancelAnimationFrame(requestRef.current);
    }
  }, [
    animateCallback,
    ship.direction,
    bullets[0].isVisible,
    bullets[1].isVisible,
    bullets[2].isVisible,
    isThrusting,
    shipMovingUpOrDown,
  ]);

  return {
    go: () => {
      setIsThrusting(true);
    },
    changeShipY: (upOrDown: UP_DOWN_NEITHER_type) => {
      setShipMovingUpOrDown(upOrDown);
    },
    resetAnimationTimer,
    stop: () => {
      previousTimeRef_Thrust.current = undefined;
      setIsThrusting(false);
    },
    changeShipDirection: () => {
      reduxDispatch(changeDirection());
    },
    shoot: () => {
      const nextBulletIndex = bullets.findIndex((b) => b.isVisible === false);
      if (nextBulletIndex !== -1) {
        reduxDispatch(
          startBullet({
            index: nextBulletIndex,
            direction: ship.direction,
            shipX: ship.offsetX,
          })
        );
      }
    },
  };
};

export default useAnimationFrame;
