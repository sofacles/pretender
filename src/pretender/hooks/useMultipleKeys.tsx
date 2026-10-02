import { KeyboardEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { UP_DOWN_NEITHER } from "../Constants";
import { RootState } from "../store/store";
import useAnimationFrame from "./useAnimationFrame";
import { updateIsThrusting, updateIsShooting } from "../store/ShipSlice";
import useAudioPlayer from "../useAudioPlayer";

export const useMultipleKeys = () => {
  const {
    changeShipDirection,
    go,
    resetAnimationTimer,
    stop,
    changeShipY,
    shoot,
  } = useAnimationFrame();


  const [currentlyPressedKeys] = useState(new Map());
  const keyMappings = useSelector((state: RootState) => state.keyMappings);
  useAudioPlayer();

  const reduxDispatch = useDispatch();
  const { changeShipDirection: changeShipDirectionKeyMapping, shipUp, shipDown, shoot: shootKeyMapping, thrust } = keyMappings;

  const onKeyDown = (evt: KeyboardEvent) => {
    const plainKey = evt.key.toLowerCase();
    currentlyPressedKeys.set(plainKey, true);
    if (
      currentlyPressedKeys.has(thrust.mappedKey) &&
      currentlyPressedKeys.get(thrust.mappedKey)
    ) {
      go();
      reduxDispatch(updateIsThrusting(true));
    }
    if (
      currentlyPressedKeys.has(changeShipDirectionKeyMapping.mappedKey) &&
      currentlyPressedKeys.get(changeShipDirectionKeyMapping.mappedKey)
    ) {
      changeShipDirection();
    }
    if (
      currentlyPressedKeys.has(shipUp.mappedKey) &&
      currentlyPressedKeys.get(shipUp.mappedKey)
    ) {
      evt.preventDefault();
      changeShipY(UP_DOWN_NEITHER.UP);
    }

    if (
      currentlyPressedKeys.has(shipDown.mappedKey) &&
      currentlyPressedKeys.get(shipDown.mappedKey)
    ) {
      evt.preventDefault();
      changeShipY(UP_DOWN_NEITHER.DOWN);
    }

    if (
      currentlyPressedKeys.has(shootKeyMapping.mappedKey) &&
      currentlyPressedKeys.get(shootKeyMapping.mappedKey)
    ) {
      shoot();
      reduxDispatch(updateIsShooting(true));
    }
  };

  const onKeyUp = (evt: KeyboardEvent) => {
    const plainKey = evt.key.toLowerCase();
    currentlyPressedKeys.set(plainKey, false);
    if (plainKey === thrust.mappedKey) {
      stop();
      reduxDispatch(updateIsThrusting(false));
    }

    if (plainKey === shipUp.mappedKey || plainKey === shipDown.mappedKey) {
      resetAnimationTimer();
      changeShipY(UP_DOWN_NEITHER.NEITHER);
    }

    if (plainKey === shootKeyMapping.mappedKey) {
      setTimeout(() => {
        reduxDispatch(updateIsShooting(false));
      }, 10);
    }

    evt.preventDefault();
  };

  return { onKeyDown, onKeyUp };

};
