import React, { useEffect, useRef } from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import Bullet from "./Bullet";
import useAnimationFrame from "./hooks/useAnimationFrame";
import { useMultipleKeys } from "./hooks/useMultipleKeys";
import { useScreenDimensions } from "./hooks/useScreenDimensions";
import InstrumentPanel from "./InstrumentPanel";
import Mountains from "./Mountains";
import Ship from "./Ship";
import { updateGameDimensions } from "./store/MountainsSlice";
import { updateScreenDimensions } from "./store/ShipSlice";

const MainScreen = () => {
  const screenRef = useRef();
  const ship = useSelector((state) => state.ship);
  const bullets = useSelector((state) => state.bullets);
  const mountains = useSelector((state) => state.mountains);

  const screenSize = useScreenDimensions();
  const dispatch = useDispatch();
  useEffect(() => {
    //Both ship and mountain slices need to know about screen size.  I wonder what is the best way to share data between slices.
    dispatch(updateGameDimensions(screenSize));
    dispatch(updateScreenDimensions(screenSize));
  }, [screenSize, dispatch]);

  useEffect(() => {
    if (screenRef.current) {
      screenRef.current.focus();
    }
  }, []);

  const {
    changeShipDirection,
    go,
    resetAnimationTimer,
    stop,
    changeShipY,
    shoot,
  } = useAnimationFrame();

  const { onKeyDown, onKeyUp } = useMultipleKeys({
    changeShipDirectionHandler: changeShipDirection,
    changeShipYHandler: changeShipY,
    goHandler: go,
    resetAnimationHandler: resetAnimationTimer,
    fireShotHandler: shoot,
    stopHandler: stop,
  });

  return (
    <>
      <InstrumentPanel
        shipOffset={ship.offsetY}
        gameOffset={mountains.gameOffset}
      />
      <svg
        height={mountains.screenDimensions.height}
        ref={screenRef}
        width={mountains.screenDimensions.width}
        xmlns="http://www.w3.org/2000/svg"
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        style={{
          outline: "0px solid transparent",
          overflow: "hidden",
          position: "relative",
          backgroundColor: "#000000",
        }}
        tabIndex="0"
      >
        <Ship x={ship.offsetX} y={ship.offsetY} />
        <Bullet
          direction={ship.direction}
          fill="orange"
          isVisible={bullets[0].isVisible}
          x={bullets[0].location.x}
          y={ship.offsetY}
        />
        <Bullet
          direction={ship.direction}
          fill="green"
          isVisible={bullets[1].isVisible}
          x={bullets[1].location.x}
          y={ship.offsetY}
        />
        <Bullet
          direction={ship.direction}
          fill="blue"
          isVisible={bullets[2].isVisible}
          x={bullets[2].location.x}
          y={ship.offsetY}
        />

        <Mountains />
      </svg>
    </>
  );
};

export default MainScreen;
