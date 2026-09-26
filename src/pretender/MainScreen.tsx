import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "./store/store";
import Bullet from "./Bullet";
import useAnimationFrame from "./hooks/useAnimationFrame";
import { useMultipleKeys } from "./hooks/useMultipleKeys";
import { useScreenDimensions } from "./hooks/useScreenDimensions";
import InstrumentPanel from "./InstrumentPanel";
import Mountains from "./Mountains";
import Ship from "./Ship";
import AudioPlayer from "./AudioPlayer";
import { updateGameDimensions } from "./store/MountainsSlice";
import { updateScreenDimensions } from "./store/ShipSlice";
import { SHIP_HEIGHT } from "./Constants";

const MainScreen = () => {
  const screenRef = useRef<SVGSVGElement | null>(null);
  const ship = useSelector((state: RootState) => state.ship);
  const bullets = useSelector((state: RootState) => state.bullets);
  const mountains = useSelector((state: RootState) => state.mountains);

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
    <div className="App" style={{ width: "100%", height: "100%" }}>
      <InstrumentPanel
        gameOffset={mountains.gameOffset}
      />
      <div style={{ width: "100%", height: "90%" }}>
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
          tabIndex={0}
        >
          <Ship x={ship.offsetX} y={ship.offsetY} />
          <Bullet
            direction={ship.direction}
            fill="orange"
            isVisible={bullets[0].isVisible}
            x={bullets[0].location.x}
            y={ship.offsetY + SHIP_HEIGHT}
          />
          <Bullet
            direction={ship.direction}
            fill="green"
            isVisible={bullets[1].isVisible}
            x={bullets[1].location.x}
            y={ship.offsetY + SHIP_HEIGHT}
          />
          <Bullet
            direction={ship.direction}
            fill="blue"
            isVisible={bullets[2].isVisible}
            x={bullets[2].location.x}
            y={ship.offsetY + SHIP_HEIGHT}
          />


          <Mountains />
        </svg>
        <AudioPlayer />
      </div>
    </div>
  );
};

export default MainScreen;
